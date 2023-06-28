import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsEnum, IsOptional } from 'class-validator';
import { CoreSearchFilterDatePaginationDto } from 'src/common/core/dto.core';
import { UserStatusEnum } from 'src/user/user.enum';

export class AllUserDto extends CoreSearchFilterDatePaginationDto {
  @ApiProperty()
  @IsEnum(UserStatusEnum)
  @IsOptional()
  isActive: UserStatusEnum;
}
