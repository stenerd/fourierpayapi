import { Module, forwardRef } from '@nestjs/common';
import { PaymentLinkService } from './payment-link.service';
import { PaymentLinkController } from './payment-link.controller';
import { PaymentLinkSchema } from './models/payment-link.model';
import { MongooseModule } from '@nestjs/mongoose';
import { PaymentLinkRepository } from './repositories/payment-link.repository';
import { PaymentLinkFactory } from './payment-link.factory';
import { UserModule } from 'src/user/user.module';
import { LinkModule } from 'src/link/link.module';
import { ExcelService } from 'src/file-processor/excel-processor.service';
import { PayerSheetSchema } from './models/payer-sheet.model';
import { PayerSheetRepository } from './repositories/payer_sheet.repository';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';
import { QRCodeModule } from 'src/qrcode/qrcode.module';

@Module({
  imports: [
    forwardRef(() => UserModule),
    LinkModule,
    QRCodeModule,
    MongooseModule.forFeature([
      { name: 'PaymentLink', schema: PaymentLinkSchema },
      { name: 'PayerSheet', schema: PayerSheetSchema },
    ]),
  ],
  controllers: [PaymentLinkController],
  providers: [
    PaymentLinkService,
    PaymentLinkRepository,
    PayerSheetRepository,
    PaymentLinkFactory,
    ExcelService,
    CloudinaryService,
  ],
  exports: [
    PaymentLinkService,
    PaymentLinkRepository,
    PaymentLinkFactory,
    PayerSheetRepository,
  ],
})
export class PaymentLinkModule {}
