import { BadRequestException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ExternalApiCalls } from 'src/external-call/external-call.service';
import { ResolveAccountNumberDto } from './dto/resolve-account-number.dto';
import { IInitializePaystack, ITransferRecipient } from './paystack.interface';

@Injectable()
export class PaystackService {
  constructor(
    private readonly configService: ConfigService,
    private readonly call: ExternalApiCalls,
  ) {}

  async initializePaystack(
    data: IInitializePaystack,
  ): Promise<Record<string, any>> {
    const payload = {
      key: this.configService.get('PAYSTACK_PUBLIC'),
      payer_id: data.payer_id,
      reciever_id: data.reciever_id,
      entity: data.entity,
      entity_id: data.entity_id,
      amount: data.amount,
      email: data.email,
      reference: data.reference,
      currency: 'NGN',
      metadata: {
        payer_id: data.payer_id,
        reciever_id: data.reciever_id,
        entity: data.entity,
        entity_id: data.entity_id,
        amount: data.amount,
        email: data.email,
        others: data.metadata,
      },
      channels: ['card', 'bank', 'ussd', 'qr', 'mobile_money', 'bank_transfer'],
    };

    const { result, err } = await this.call.postData(
      this.configService.get('INITIALIZE_PAYMENT_ENDPOINT'),
      payload,
      {
        Authorization: `Bearer ${this.configService.get('PAYSTACK_SECRET')}`,
      },
    );

    if (err) throw new BadRequestException(err.data ? err.data.message : err);

    return result;
  }

  async verifyPayment(reference: string): Promise<Record<string, any>> {
    const { result, err } = await this.call.fetchData(
      `${this.configService.get(
        'VERIFY_PAYMENT_ENDPOINT',
      )}/${encodeURIComponent(reference)}`,
      {
        Authorization: `Bearer ${this.configService.get('PAYSTACK_SECRET')}`,
      },
    );

    if (err) throw new BadRequestException(err.data ? err.data.message : err);

    const payment_data = result.data;
    if (payment_data.status != 'success' && payment_data.status != 'abandoned')
      throw new BadRequestException(
        'Unable to verify paystack payment request',
      );
    return result.data;
  }

  async fetchBankList(): Promise<Record<string, any>[]> {
    const { result, err } = await this.call.fetchData(
      `${this.configService.get('BANK_LIST_ENDPOINT')}`,
      {
        Authorization: `Bearer ${this.configService.get('PAYSTACK_SECRET')}`,
      },
    );

    if (err) throw new BadRequestException(err.data ? err.data.message : err);

    return result.data;
  }

  async resolveAccountNumber(
    dto: ResolveAccountNumberDto,
  ): Promise<Record<string, any>[]> {
    const { result, err } = await this.call.fetchData(
      `${this.configService.get(
        'RESOLVE_ACCOUNT_ENDPOINT',
      )}?account_number=${encodeURIComponent(
        dto.account_number,
      )}&bank_code=${encodeURIComponent(dto.bank_code)}`,
      {
        Authorization: `Bearer ${this.configService.get('PAYSTACK_SECRET')}`,
      },
    );

    if (err) throw new BadRequestException(err.data ? err.data.message : err);

    return result.data;
  }

  async transferRecipient(data: ITransferRecipient) {
    const { result, err } = await this.call.postData(
      this.configService.get('TRANSFER_RECIPIENT_ENDPOINT'),
      { ...data, metadata: { user_id: data.user_id } },
      {
        Authorization: `Bearer ${this.configService.get('PAYSTACK_SECRET')}`,
      },
    );

    if (err) throw new BadRequestException(err.data ? err.data.message : err);

    return result.data;
  }

  async transfer(recipient: string, amount: number) {
    const { result, err } = await this.call.postData(
      this.configService.get('TRANSFER_ENDPOINT'),
      {
        source: 'balance',
        amount,
        recipient: recipient,
        reason: 'Transfer',
      },
      {
        Authorization: `Bearer ${this.configService.get('PAYSTACK_SECRET')}`,
      },
    );
    if (err) throw new BadRequestException(err.data ? err.data.message : err);

    return result.data;
  }
}
