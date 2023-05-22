import { CanActivate, ExecutionContext } from '@nestjs/common';
import { SubscriptionService } from 'src/subscription/services/subscription.service';
import { UserService } from 'src/user/user.service';
import { Reflector } from '@nestjs/core';
export declare class AuthGuard implements CanActivate {
    private readonly userService;
    private readonly subscriptionService;
    private reflector;
    constructor(userService: UserService, subscriptionService: SubscriptionService, reflector: Reflector);
    canActivate(context: ExecutionContext): Promise<boolean>;
    private validateRequest;
    getAuthTokenFromRequest(request: Request): string;
}
