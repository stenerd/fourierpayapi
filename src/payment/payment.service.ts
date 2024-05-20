import { BadRequestException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { CoreService } from 'src/common/core/service.core';
import {
  PaymentLinkStateEnum,
  PaymentLinkStatusEnum,
} from 'src/payment-link/payment-link.enum';
import { PaymentLinkService } from 'src/payment-link/payment-link.service';
import { PaystackFactory } from 'src/paystack/paystack.factory';
import { PaystackService } from 'src/paystack/paystack.service';
import {
  TransactionEntity,
  TransactionStatus,
  TransactionType,
} from 'src/transaction/transaction.enum';
import { TransactionService } from 'src/transaction/transaction.service';
import { UserService } from 'src/user/user.service';
import { WalletService } from 'src/wallet/wallet.service';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { InitializePaymentDto } from './dto/initialize-payment.dto';
import { UpdatePaymentDto } from './dto/update-payment.dto';
import { VerifyPaymentDto } from './dto/verify-payment.dto';
import { ViewPaymentDto } from './dto/view-payment.dto';
import { IInitializePayment } from './payment.interface';
import { Payment } from './payment.model';
import { PaymentRepository } from './payment.repository';

@Injectable()
export class PaymentService extends CoreService<PaymentRepository> {
  constructor(
    private readonly paymentRepository: PaymentRepository,
    private readonly paystackService: PaystackService,
    private readonly paystackFactory: PaystackFactory,
    private readonly paymentLinkService: PaymentLinkService,
    private readonly transactionService: TransactionService,
    private readonly walletService: WalletService,
    private readonly configService: ConfigService,
    private readonly userService: UserService,
  ) {
    super(paymentRepository);
  }

  async newPayment(data: IInitializePayment): Promise<Payment> {
    const payment = await this.paymentRepository.create({ ...data });
    return payment;
  }

  async initializePayment(
    dto: InitializePaymentDto,
  ): Promise<Record<string, any>> {
    // await this.transactionService.checkReference(dto.reference);

    const get_reference = await this.transactionService.generateReference();

    const payment_link = await this.paymentLinkService.findOne(
      {
        _id: dto.payment_link_id,
      },
      {},
      {
        populate: [{ path: 'creator_id' }],
      },
    );

    if (!payment_link)
      throw new BadRequestException('payment link does not exist');

    // const unique_question = dto.form.filter(
    //   (each) => each.field_name == payment_link.unique_field,
    // );

    let unique_answer = '';
    let priority_1_answer = '';
    let priority_2_answer = '';
    let priority_3_answer = '';

    for (let i = 0; i < dto.form.length; i++) {
      const eachForm = dto.form[i];
      if (eachForm.field_name.trim() == payment_link.unique_field) {
        unique_answer = eachForm.answer;
      }
      if (eachForm.field_name.trim() == payment_link.priority_1) {
        priority_1_answer = eachForm.answer;
      }
      if (eachForm.field_name.trim() == payment_link.priority_2) {
        priority_2_answer = eachForm.answer;
      }
      if (eachForm.field_name.trim() == payment_link.priority_3) {
        priority_3_answer = eachForm.answer;
      }
    }

    if (payment_link.status !== PaymentLinkStatusEnum.ACTIVE)
      throw new BadRequestException('Payment link is not active.');

    if (payment_link.state == PaymentLinkStateEnum.PRIVATE) {
      const get_payer_data = await this.paymentLinkService.getPayerData(
        dto.payment_link_id,
        unique_answer,
      );

      if (!get_payer_data)
        throw new BadRequestException(
          'You are not eligible to make this payment.',
        );

      if (get_payer_data.status == TransactionStatus.PAID)
        throw new BadRequestException('You have already made your payment.');
    }

    const payment = await this.newPayment({
      payment_link_id: payment_link._id,
      amount: payment_link.amount,
      charges: payment_link.charges,
      form: dto.form,
      unique_field: payment_link.unique_field,
      unique_answer: unique_answer || '',
      priority_1: payment_link.priority_1,
      priority_1_answer: priority_1_answer || '',
      priority_2: payment_link.priority_2,
      priority_2_answer: priority_2_answer || '',
      priority_3: payment_link.priority_3,
      priority_3_answer: priority_3_answer || '',
      reciever_id: payment_link.creator_id._id,
    });

    const generate_paystack_payload =
      this.paystackFactory.initilizePaymentPayload(
        dto,
        get_reference.reference,
        payment_link,
        payment,
        TransactionEntity.PAYMENT,
      );

    // const resp = await this.paystackService.initializePaystack(
    //   generate_paystack_payload,
    // );

    const trnx_payload = {
      amount: payment_link.amount,
      reciever_id: payment_link.creator_id,
      payment_link_id: payment_link._id,
      in_entity_id: payment._id,
      in_entity: TransactionEntity.PAYMENT,
      reference: get_reference.reference,
      type: TransactionType.CREDIT,
    };

    const trnx = await this.transactionService.create({ ...trnx_payload });

    await this.updateOne(payment._id, { transaction_id: trnx._id });

    return {
      ...generate_paystack_payload,
      publicKey: this.configService.get('PAYSTACK_PUBLIC'),
    };
    // return resp;
  }

  async verifyPayment(dto: VerifyPaymentDto): Promise<Record<string, any>> {
    const result = await this.paystackService.verifyPayment(dto.reference);

    const {
      // channel,
      metadata,
      // authorization,
      // customer,
      amount,
      // reference: payment_reference,
      // currency,
      // ip_address,
    } = result;

    console.log('amount >> ', amount, dto.reference);

    const transaction = await this.transactionService.findOne({
      reference: dto.reference,
    });

    if (!transaction)
      throw new BadRequestException('Transaction does not exist');

    if (transaction.status === TransactionStatus.PAID) {
      console.log(
        'transaction.status === TransactionStatus.PAID >> ',
        transaction,
      );
      const pay = await this.findOne({
        _id: transaction.in_entity_id,
      });

      return {
        payment: pay,
        transaction,
      };
    }

    if (result.status == 'success') {
      const session = await this.paymentRepository.model().startSession();
      session.startTransaction();

      let transacionData = null;
      let payment = null;

      try {
        const resp = await this.walletService.getRepository().findOneAndUpdate(
          { user_id: transaction.reciever_id },
          {
            $inc: { amount: transaction.amount },
          },
          { session },
        );

        transacionData = await this.transactionService
          .getRepository()
          .findOneAndUpdate(
            { _id: transaction._id },
            {
              status: TransactionStatus.PAID,
              out_entity_id: resp._id,
              out_entity: TransactionEntity.WALLET,
            },
            { session },
          );

        payment = await this.getRepository().findOneAndUpdate(
          { _id: transaction.in_entity_id },
          {
            status: TransactionStatus.PAID,
          },
          { session },
        );

        const payment_link = await this.paymentLinkService
          .getRepository()
          .findOneAndUpdate(
            { _id: transaction.payment_link_id },
            {
              recieved_payment: true,
            },
            { session },
          );

        if (payment_link.state == PaymentLinkStateEnum.PRIVATE) {
          await this.paymentLinkService.getRepository().findOneAndUpdate(
            {
              payment_link_id: transaction.payment_link_id,
              unique_answer: payment.unique_answer,
            },
            {
              payment_id: payment._id,
              status: TransactionStatus.PAID,
              payment_date: payment.createdAt,
            },
            { session },
          );
        }

        if (amount / 100 > transaction.amount) {
          const get_reference =
            await this.transactionService.generateReference();

          const superAdmin = await this.userService.findOne({
            email: this.configService.get('ADMIN_EMAIL'),
          });

          const adminWallet = await this.walletService
            .getRepository()
            .findOneAndUpdate(
              {
                user_id: superAdmin._id,
              },
              {
                $inc: { amount: amount / 100 - transaction.amount },
              },
              { session },
            );
          const trnx_payload = {
            amount: amount / 100 - transaction.amount,
            reciever_id: superAdmin._id,
            payment_link_id: transaction.payment_link_id,
            in_entity_id: transaction.in_entity_id,
            in_entity: TransactionEntity.PAYMENT,
            reference: get_reference.reference,
            type: TransactionType.CREDIT,
            status: TransactionStatus.PAID,
            out_entity_id: adminWallet._id,
            out_entity: TransactionEntity.WALLET,
            is_charges: true,
          };

          await this.transactionService
            .getRepository()
            .saveData({ ...trnx_payload }, { session });
        }

        const tranx = await this.transactionService.findOne({
          reference: dto.reference,
        });

        if (tranx.status === TransactionStatus.PAID) {
          session.endSession();

          return {
            payment,
            transaction: transacionData,
          };
        }

        await session.commitTransaction();
      } catch (error) {
        await session.abortTransaction();
        throw new BadRequestException('Something went wrong!');
      } finally {
        session.endSession();

        if (!payment && !transacionData) {
          const pay = await this.findOne({
            _id: transaction.in_entity_id,
          });

          return {
            payment: pay,
            transaction,
          };
        }
        return {
          payment,
          transaction: transacionData,
        };
      }
    } else {
      const trans = await this.transactionService.updateOne(transaction._id, {
        status: TransactionStatus.ABANDONED,
      });

      const pay = await this.updateOne(transaction.in_entity_id, {
        status: TransactionStatus.ABANDONED,
      });

      return {
        transaction: trans,
        payment: pay,
      };
    }
  }

  async abandonPayment(dto: VerifyPaymentDto): Promise<Record<string, any>> {
    const transaction = await this.transactionService.findOne({
      reference: dto.reference,
    });

    if (!transaction)
      throw new BadRequestException('Transaction does not exist');

    await this.transactionService.updateOne(transaction._id, {
      status: TransactionStatus.ABANDONED,
    });

    await this.updateOne(transaction.in_entity_id, {
      status: TransactionStatus.ABANDONED,
    });

    return {
      transaction,
    };
  }

  async getPaymentByCode(code, query: ViewPaymentDto | Record<string, any>) {
    const paymentLink = await this.paymentLinkService.findOne({
      code,
    });

    if (!paymentLink)
      throw new BadRequestException('payment link does not exist');

    let searchQuery: Record<string, any> = {};
    if (query.q) {
      searchQuery = {
        $or: [
          { unique_answer: { $regex: query.q, $options: 'i' } },
          { priority_1_answer: { $regex: query.q, $options: 'i' } },
          { priority_2_answer: { $regex: query.q, $options: 'i' } },
          { priority_3_answer: { $regex: query.q, $options: 'i' } },
        ],
      };
    }

    if (query.priority_1_answer) {
      searchQuery.priority_1_answer = query.priority_1_answer;
    }
    if (query.priority_2_answer) {
      searchQuery.priority_2_answer = query.priority_2_answer;
    }
    if (query.priority_3_answer) {
      searchQuery.priority_3_answer = query.priority_3_answer;
    }
    if (query.status) {
      searchQuery.status = query.status;
    }
    searchQuery = {
      ...searchQuery,
      ...(query.startDate &&
        !query.endDate && {
          createdAt: {
            $gte: new Date(query.startDate).toISOString(),
          },
        }),
      ...(!query.startDate &&
        query.endDate && {
          createdAt: {
            $lte: new Date(query.endDate).toISOString(),
          },
        }),
      ...(query.startDate &&
        query.endDate && {
          createdAt: {
            $lte: new Date(query.endDate).toISOString(),
            $gte: new Date(query.startDate).toISOString(),
          },
        }),
    };

    const total = await this.paymentRepository
      .model()
      .find({
        ...searchQuery,
        payment_link_id: paymentLink._id,
      })
      .count();

    const { page, perPage } = query;
    const payments = await this.paymentRepository
      .model()
      .find({
        ...searchQuery,
        payment_link_id: paymentLink._id,
      })
      .populate(['transaction_id'])
      .sort({ _id: -1 })
      .skip(((+page || 1) - 1) * (+perPage || 10))
      .limit(+perPage || 10);

    // let recievedAmount = 0;
    // let numberOfRecipient = 0;

    // for (let i = 0; i < payments.length; i++) {
    //   const payment = payments[i];
    //   if (payment.status === TransactionStatus.PAID) {
    //     recievedAmount += +payment.amount;
    //     numberOfRecipient++;
    //   }
    // }

    const result = await this.paymentRepository.model().aggregate([
      {
        $match: {
          ...searchQuery,
          payment_link_id: paymentLink._id,
          status: TransactionStatus.PAID,
        },
      },
      {
        $group: {
          _id: null,
          totalAmount: { $sum: '$amount' },
          totalCount: { $sum: 1 },
        },
      },
    ]);

    const { totalAmount: recievedAmount, totalCount: numberOfRecipient } =
      result.length > 0 ? result[0] : { totalAmount: 0, totalCount: 0 };

    return {
      data: {
        payments,
        paymentLink,
        recievedAmount,
        numberOfRecipient,
        result,
      },
      meta: {
        total,
        page: +page || 1,
        lastPage: total === 0 ? 1 : Math.ceil(total / (+perPage || 10)),
      },
    };
  }

  async getExternalPayment(code, query: ViewPaymentDto) {
    const paymentLink = await this.paymentLinkService.findOne(
      {
        code,
      },
      {},
      {
        populate: ['creator_id'],
      },
    );

    if (!paymentLink)
      throw new BadRequestException('payment link does not exist');

    let searchQuery: Record<string, any> = {};
    if (query.q) {
      searchQuery = {
        $or: [
          { unique_answer: { $regex: query.q, $options: 'i' } },
          { priority_1_answer: { $regex: query.q, $options: 'i' } },
          { priority_2_answer: { $regex: query.q, $options: 'i' } },
          { priority_3_answer: { $regex: query.q, $options: 'i' } },
        ],
      };
    }

    if (query.priority_1_answer) {
      searchQuery.priority_1_answer = query.priority_1_answer;
    }
    if (query.priority_2_answer) {
      searchQuery.priority_2_answer = query.priority_2_answer;
    }
    if (query.priority_3_answer) {
      searchQuery.priority_3_answer = query.priority_3_answer;
    }
    searchQuery = {
      ...searchQuery,
      ...(query.startDate &&
        !query.endDate && {
          createdAt: {
            $gte: new Date(query.startDate).toISOString(),
          },
        }),
      ...(!query.startDate &&
        query.endDate && {
          createdAt: {
            $lte: new Date(query.endDate).toISOString(),
          },
        }),
      ...(query.startDate &&
        query.endDate && {
          createdAt: {
            $lte: new Date(query.endDate).toISOString(),
            $gte: new Date(query.startDate).toISOString(),
          },
        }),
    };

    if (paymentLink.state === PaymentLinkStateEnum.PRIVATE) {
      return this.paymentLinkService.getExternalPaymentData(
        {
          ...searchQuery,
          payment_link_id: paymentLink._id,
        },
        paymentLink,
      );
    } else {
      const total = await this.paymentRepository
        .model()
        .find({
          ...searchQuery,
          payment_link_id: paymentLink._id,
          status: TransactionStatus.PAID,
        })
        .count();

      const { page, perPage } = query;
      const payments = await this.paymentRepository
        .model()
        .find({
          ...searchQuery,
          payment_link_id: paymentLink._id,
          status: TransactionStatus.PAID,
        })
        .populate(['transaction_id'])
        .sort({ _id: -1 })
        .skip(((+page || 1) - 1) * (+perPage || 10))
        .limit(+perPage || 10);

      let recievedAmount = 0;
      let numberOfRecipient = 0;

      for (let i = 0; i < payments.length; i++) {
        const payment = payments[i];
        if (payment.status === TransactionStatus.PAID) {
          recievedAmount += +payment.amount;
          numberOfRecipient++;
        }
      }

      return {
        data: {
          payments,
          paymentLink,
          recievedAmount,
          numberOfRecipient,
        },
        meta: {
          total,
          page: +page || 1,
          lastPage: total === 0 ? 1 : Math.ceil(total / (+perPage || 10)),
        },
      };
    }
  }

  async singlePaymentVerification(code, unique_answer) {
    const paymentLink = await this.paymentLinkService.findOne({
      code,
    });

    if (!paymentLink)
      throw new BadRequestException('payment link does not exist');

    const payment = await this.paymentRepository.findOne(
      {
        unique_answer: unique_answer,
        payment_link_id: paymentLink._id,
        status: TransactionStatus.PAID,
      },
      {},
      {
        populate: ['transaction_id'],
      },
    );

    if (!payment) throw new BadRequestException('payment does not exist');

    return payment;
  }

  async getPaymentReference(reference) {
    const transaction = await this.transactionService.findOne(
      {
        reference,
      },
      {},
      {
        populate: ['in_entity_id'],
      },
    );

    console.log('transaction >> ', transaction);

    if (!transaction) throw new BadRequestException('reference does not exist');
    if (transaction.in_entity !== TransactionEntity.PAYMENT)
      throw new BadRequestException('reference is not valid');

    const payment_link = await this.paymentLinkService.findOne({
      _id: transaction.payment_link_id,
    });

    console.log('payment_link >> ', payment_link);

    return { transaction, payment_link };
  }
}
