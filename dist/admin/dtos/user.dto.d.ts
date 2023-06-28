import { CoreSearchFilterDatePaginationDto } from 'src/common/core/dto.core';
import { UserStatusEnum } from 'src/user/user.enum';
export declare class AllUserDto extends CoreSearchFilterDatePaginationDto {
    isActive: UserStatusEnum;
}
