import { BadRequestException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { CoreService } from 'src/common/core/service.core';
import { ExcelService } from 'src/file-processor/excel-processor.service';
import { LinkUsageEnum } from 'src/link/link.enum';
import { LinkService } from 'src/link/link.service';
import { GenerateRandomString } from 'src/utils/code-generator.util';
import {
  ChangePaymentLinkStateDto,
  ChangePaymentLinkStatusDto,
  CreatePaymentLinkDto,
  ViewPaymentLinkDto,
} from './dto/create-payment-link.dto';
import { UpdatePaymentLinkDto } from './dto/update-payment-link.dto';
import { PaymentLinkStateEnum } from './payment-link.enum';
import { PaymentLinkFactory } from './payment-link.factory';
import { PaymentLinkRepository } from './repositories/payment-link.repository';
import { PayerSheetRepository } from './repositories/payer_sheet.repository';
import { ViewPaymentDto } from 'src/payment/dto/view-payment.dto';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';
import { TransactionStatus } from 'src/transaction/transaction.enum';
import { PaymentLink } from './models/payment-link.model';
import { QRCodeService } from 'src/qrcode/qrcode.service';
import { CoreSearchFilterDatePaginationDto } from 'src/common/core/dto.core';
import { CheckDateDifference } from 'src/utils/date-formatter.util';
import { addDays, format, parseISO, subDays } from 'date-fns';

@Injectable()
export class PaymentLinkService extends CoreService<PaymentLinkRepository> {
  constructor(
    private readonly paymentLinkRepository: PaymentLinkRepository,
    private readonly payerSheetRepository: PayerSheetRepository,
    private readonly paymentLinkFactory: PaymentLinkFactory,
    private readonly linkService: LinkService,
    private readonly configService: ConfigService,
    private readonly excelService: ExcelService,
    private readonly cloudinaryService: CloudinaryService,
    private readonly qRCodeService: QRCodeService,
  ) {
    super(paymentLinkRepository);
  }

  async generateCode(): Promise<string> {
    const unique_code = GenerateRandomString(30);
    if (await this.findOne({ code: unique_code })) {
      return await this.generateCode();
    } else {
      return unique_code;
    }
  }

  async createPaymentLink(dto: CreatePaymentLinkDto, user_id: string) {
    const get_link = await this.linkService.findOne({
      user_id,
      usage: LinkUsageEnum.AVAILABLE,
    });
    if (!get_link)
      throw new BadRequestException('You dont have an available payment link.');
    // console.log('get_link >> ', get_link);
    const code = await this.generateCode();
    const paymentLinkAttribute = this.paymentLinkFactory.createNew(
      dto,
      code,
      user_id,
      get_link._id,
      this.configService.get('FRONTEND_BASEURL'),
    );
    const codeQR = await this.qRCodeService.generateQRCode(
      paymentLinkAttribute.link,
    );
    paymentLinkAttribute.qr_code = codeQR;
    await this.paymentLinkRepository.create(paymentLinkAttribute);
    await this.linkService.updateOne(get_link._id, {
      usage: LinkUsageEnum.USED,
    });
  }

  async changePaymentLinkStatus(
    dto: ChangePaymentLinkStatusDto,
    code: string,
    user_id: string,
  ) {
    const get_payment_link = await this.paymentLinkRepository.findOne({
      creator_id: user_id,
      code: code,
    });
    if (!get_payment_link)
      throw new BadRequestException('This payment link does not exist.');
    await this.updateOne(get_payment_link._id, {
      status: dto.status,
    });
  }

  async changePaymentLinkToPublicState(code: string, user_id: string) {
    const get_payment_link = await this.paymentLinkRepository.findOne({
      creator_id: user_id,
      code: code,
    });
    if (!get_payment_link)
      throw new BadRequestException('This payment link does not exist.');

    return await this.updateOne(get_payment_link._id, {
      state: PaymentLinkStateEnum.PUBLIC,
    });
  }

  async activatePublicLink(code: string, user_id: string) {
    const get_payment_link = await this.paymentLinkRepository.findOne({
      creator_id: user_id,
      code: code,
    });
    if (!get_payment_link)
      throw new BadRequestException('This payment link does not exist.');

    return await this.updateOne(get_payment_link._id, {
      activate_public_link: !get_payment_link.activate_public_link,
    });
  }

  async changePaymentLinkToPrivateState(
    file,
    code: string,
    user_id: string,
    buffer: Buffer,
  ) {
    const get_payment_link = await this.paymentLinkRepository.findOne({
      creator_id: user_id,
      code: code,
    });
    if (!get_payment_link)
      throw new BadRequestException('This payment link does not exist.');
    if (get_payment_link.recieved_payment)
      throw new BadRequestException(
        `You can't move to private after recieving payment with this link.`,
      );

    const data = await this.excelService.extractJsonFromExcel(buffer);

    if (!data.length)
      throw new BadRequestException(`You can't upload an empty sheet.`);

    const payload = this.paymentLinkFactory.createPayerSheet(
      user_id,
      get_payment_link._id,
      data,
    );

    if (!payload.length)
      throw new BadRequestException(
        `There is no valid item in the sheet you uploaded. Please note that Unique Field is a required field.`,
      );

    let payerCount = 0;

    for (let i = 0; i < payload.length; i++) {
      const eachPayload = payload[i];
      const uploadedSheet = await this.payerSheetRepository.findOne({
        payment_link_id: get_payment_link._id,
        unique_answer: eachPayload.unique_answer,
      });

      if (!uploadedSheet) {
        payerCount += 1;
        await this.payerSheetRepository.create(eachPayload);
      }
    }

    let documentData = {};

    if (payerCount) {
      const folderName = 'payer_sheets';
      const uploadData = await this.cloudinaryService.uploadFile(
        file,
        folderName,
      );
      console.log('uploadData >> ', uploadData);

      documentData = {
        publicId: uploadData.public_id || '',
        secureUrl: uploadData.secure_url || '',
      };
    }

    return await this.updateOne(get_payment_link._id, {
      state: PaymentLinkStateEnum.PRIVATE,
      ...(!get_payment_link.sheet_uploaded && {
        expected_number_of_payments: get_payment_link.sheet_uploaded
          ? get_payment_link.expected_number_of_payments + payerCount
          : payerCount,
      }),
      sheet_uploaded: true,
      ...(payerCount && {
        $push: {
          sheetUrl: documentData,
        },
      }),
    });
  }

  async getPayerData(payment_link_id: string, unique_answer: string) {
    const resp = await this.payerSheetRepository.findOne({
      payment_link_id,
      unique_answer,
    });

    return resp;
  }

  async updatePayerInfo(query: Record<string, any>, data: Record<string, any>) {
    const resp = await this.payerSheetRepository.findOneAndUpdate(
      query,
      data,
      {},
    );

    return resp;
  }

  async getPaymentLink(user_id: string = null) {
    const resp = await this.paymentLinkRepository.find(
      {
        ...(user_id && { creator_id: user_id }),
      },
      {},
      {
        sort: { createdAt: -1 },
        populate: [{ path: 'creator_id' }],
      },
    );

    return resp;
  }

  async getAllPaymentLink(query: Record<string, any>): Promise<PaymentLink[]> {
    const resp = await this.paymentLinkRepository.find(query, {}, {});

    return resp;
  }

  async singlePaymentLink(code: string) {
    const resp = await this.paymentLinkRepository.findOne(
      { code },
      {},
      {
        populate: [{ path: 'creator_id' }],
      },
    );

    return resp;
  }

  async getPayerSheet(code: string, query: ViewPaymentDto, user_id: string) {
    const paymentLink = await this.findOne({
      code,
      ...(user_id ? { creator_id: user_id } : {}),
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
          payment_date: {
            $gte: new Date(query.startDate).toISOString(),
          },
        }),
      ...(!query.startDate &&
        query.endDate && {
          payment_date: {
            $lte: new Date(query.endDate).toISOString(),
          },
        }),
      ...(query.startDate &&
        query.endDate && {
          payment_date: {
            $lte: new Date(query.endDate).toISOString(),
            $gte: new Date(query.startDate).toISOString(),
          },
        }),
    };

    const total = await this.payerSheetRepository
      .model()
      .find({
        ...searchQuery,
        payment_link_id: paymentLink._id,
        ...(user_id ? { creator_id: user_id } : {}),
      })
      .count();

    const { page, perPage } = query;
    const payerSheets = await this.payerSheetRepository
      .model()
      .find({
        ...searchQuery,
        payment_link_id: paymentLink._id,
        ...(user_id ? { creator_id: user_id } : {}),
      })
      .populate(['payment_id'])
      .sort({ _id: -1 })
      .skip(((+page || 1) - 1) * (+perPage || 10))
      .limit(+perPage || 10);

    return {
      data: payerSheets,
      meta: {
        total,
        page: +page || 1,
        lastPage: total === 0 ? 1 : Math.ceil(total / (+perPage || 10)),
      },
    };
  }

  async getExternalPaymentData(
    query: Record<string, any>,
    paymentLink: PaymentLink,
  ) {
    const total = await this.payerSheetRepository.model().find(query).count();

    const { page, perPage } = query;
    const payments = await this.payerSheetRepository
      .model()
      .find(query)
      .populate(['payment_id'])
      .sort({ _id: -1 })
      .skip(((+page || 1) - 1) * (+perPage || 10))
      .limit(+perPage || 10);

    let recievedAmount = 0;
    let numberOfRecipient = 0;

    for (let i = 0; i < payments.length; i++) {
      const payment = payments[i];
      if (payment.status === TransactionStatus.PAID) {
        recievedAmount += +paymentLink.amount;
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

  async dashboardPaymentLink(query: CoreSearchFilterDatePaginationDto) {
    const searchAllQuery = {
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

    const totalAll = await this.paymentLinkRepository
      .model()
      .find({
        ...searchAllQuery,
      })
      .count();

    return { totalAll };
  }

  async adminPaymentLink(query: ViewPaymentLinkDto) {
    let searchQuery: Record<string, any> = {};
    if (query.q) {
      searchQuery = {
        name: { $regex: query.q, $options: 'i' },
      };
    }
    if (query.status) {
      searchQuery.status = query.status;
    }
    if (query.state) {
      searchQuery.state = query.state;
    }

    searchQuery = {
      // is_charges: false,
      ...searchQuery,
      ...(query.startDate &&
        !query.endDate && {
          createdAt: {
            $gte: new Date(query.startDate),
          },
        }),
      ...(!query.startDate &&
        query.endDate && {
          createdAt: {
            $lte: new Date(query.endDate),
          },
        }),
      ...(query.startDate &&
        query.endDate && {
          createdAt: {
            $lte: new Date(query.endDate),
            $gte: new Date(query.startDate),
          },
        }),
    };

    const total = await this.paymentLinkRepository
      .model()
      .find({
        ...searchQuery,
      })
      .count();

    const { page, perPage } = query;

    const paymentLinks = await this.paymentLinkRepository.model().aggregate([
      {
        $match: {
          ...searchQuery,
        },
      },
      {
        $lookup: {
          from: 'users',
          let: { creator_id: '$creator_id' },
          pipeline: [
            { $match: { $expr: { $eq: ['$_id', '$$creator_id'] } } },
            { $limit: 1 },
          ],
          as: 'users',
        },
      },
      {
        $lookup: {
          from: 'payments',
          let: { payment_link_id: '$_id' },
          pipeline: [
            {
              $match: {
                $expr: {
                  $eq: ['$payment_link_id', '$$payment_link_id'],
                },
              },
            },
            {
              $match: {
                status: TransactionStatus.PAID,
              },
            },
          ],
          as: 'payments',
        },
      },
      {
        $addFields: {
          user_details: '$users',
          paymentCount: { $size: '$payments' },
          totlaPayment: { $sum: '$payments.amount' },
          totalCharges: { $sum: '$payments.charges' },
        },
      },
      {
        $project: {
          _id: 1,
          creator_id: 1,
          user_details: 1,
          amount: 1,
          charges: 1,
          name: 1,
          role: 1,
          unique_field: 1,
          link: 1,
          expected_number_of_payments: 1,
          status: 1,
          activate_public_link: 1,
          state: 1,
          paymentCount: 1,
          totlaPayment: 1,
          totalCharges: 1,
          createdAt: 1,
        },
      },
      {
        $sort: {
          createdAt: -1, // Replace "fieldName" with the actual field name for ordering
        },
      },
      {
        $skip: ((+page || 1) - 1) * (+perPage || 10),
      },
      {
        $limit: +perPage || 10,
      },
    ]);

    // const paymentLinks = await this.paymentLinkRepository
    //   .model()
    //   .find({
    //     ...searchQuery,
    //   })
    //   .populate(['creator_id', 'link_id'])
    //   .sort({ _id: -1 })
    //   .skip(((+page || 1) - 1) * (+perPage || 10))
    //   .limit(+perPage || 10);

    return {
      data: paymentLinks,
      meta: {
        total,
        page: +page || 1,
        lastPage: total === 0 ? 1 : Math.ceil(total / (+perPage || 10)),
      },
    };
  }

  async adminPaymentLinksCount(query: ViewPaymentLinkDto) {
    let searchQuery: Record<string, any> = {};
    if (query.q) {
      searchQuery = {
        name: { $regex: query.q, $options: 'i' },
      };
    }
    if (query.status) {
      searchQuery.status = query.status;
    }

    const searchAllQuery = {
      ...searchQuery,
      ...(query.startDate &&
        !query.endDate && {
          createdAt: {
            $gte: new Date(query.startDate),
          },
        }),
      ...(!query.startDate &&
        query.endDate && {
          createdAt: {
            $lte: new Date(query.endDate),
          },
        }),
      ...(query.startDate &&
        query.endDate && {
          createdAt: {
            $lte: new Date(query.endDate),
            $gte: new Date(query.startDate),
          },
        }),
    };

    const searchPrivateQuery = {
      state: PaymentLinkStateEnum.PRIVATE,
      ...searchAllQuery,
    };

    const searchPublicQuery = {
      state: PaymentLinkStateEnum.PUBLIC,
      ...searchAllQuery,
    };

    const totalPrivate = await this.paymentLinkRepository
      .model()
      .find({
        ...searchPrivateQuery,
      })
      .count();

    const totalPublic = await this.paymentLinkRepository
      .model()
      .find({
        ...searchPublicQuery,
      })
      .count();

    const totalAll = await this.paymentLinkRepository
      .model()
      .find({
        ...searchAllQuery,
      })
      .count();

    let privatePercentage = 0;
    let allPercentage = 0;
    let publicPercentage = 0;

    const checkLast = query.startDate && query.endDate;

    if (!!checkLast) {
      const getDifferenceInDays = CheckDateDifference(
        query.startDate,
        query.endDate,
      );

      const lastSearchQueries = {
        ...searchQuery,
        ...(query.startDate &&
          query.endDate && {
            createdAt: {
              $gte: new Date(
                format(
                  subDays(parseISO(query.startDate), getDifferenceInDays),
                  'yyyy-MM-dd',
                ),
              ).toISOString(),
              $lte: new Date(query.startDate).toISOString(),
            },
          }),
      };

      const lastSearchPrivateQuery = {
        ...lastSearchQueries,
        state: PaymentLinkStateEnum.PRIVATE,
      };

      const lastSearchPublicQuery = {
        ...lastSearchQueries,
        state: PaymentLinkStateEnum.PUBLIC,
      };

      const lastTotalPrivate = await this.paymentLinkRepository
        .model()
        .find({
          ...lastSearchPrivateQuery,
        })
        .count();

      const lastTotalPublic = await this.paymentLinkRepository
        .model()
        .find({
          ...lastSearchPublicQuery,
        })
        .count();

      const lastTotalAll = await this.paymentLinkRepository
        .model()
        .find({
          ...lastSearchQueries,
        })
        .count();

      allPercentage = ((totalAll - lastTotalAll) / (lastTotalAll || 1)) * 100;
      publicPercentage =
        ((totalPublic - lastTotalPublic) / (lastTotalPublic || 1)) * 100;
      privatePercentage =
        ((totalPrivate - lastTotalPrivate) / (lastTotalPrivate || 1)) * 100;
    }

    return {
      data: {
        all: totalAll,
        private: totalPrivate,
        public: totalPublic,
        allPercentage,
        publicPercentage,
        privatePercentage,
        showPercent: !!checkLast,
      },
    };
  }
}
