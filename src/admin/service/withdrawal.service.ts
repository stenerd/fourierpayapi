import { BadRequestException, Injectable } from '@nestjs/common';
import { ViewWithdrawalDto } from 'src/withdrawal/withdrawal.dto';
import { WithdrawalService } from 'src/withdrawal/withdrawal.service';

@Injectable()
export class AdminWithdrawalService {
  constructor(private readonly withdrawalService: WithdrawalService) {}

  async withdrawals(query: ViewWithdrawalDto) {
    const resp = await this.withdrawalService.adminWithdrawal(query);
    return resp;
  }
}
