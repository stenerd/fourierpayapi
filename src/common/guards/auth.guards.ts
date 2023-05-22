import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import * as jwt from 'jsonwebtoken';
import { UserRequest } from 'src/auth/auth.interface';
import { SubscriptionService } from 'src/subscription/services/subscription.service';
import { UserService } from 'src/user/user.service';
import { Reflector } from '@nestjs/core';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly userService: UserService,
    private readonly subscriptionService: SubscriptionService,
    private reflector: Reflector,
  ) {}

  public async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();

    const getSubscription = this.reflector.get<string>(
      'getSubscription',
      context.getHandler(),
    );
    const valid = await this.validateRequest(
      request,
      getSubscription && getSubscription.toLowerCase() == 'get',
    );
    if (!valid) throw new UnauthorizedException('Unauthorized access');

    return true;
  }

  private async validateRequest(
    request: UserRequest,
    withSubscription = false,
  ): Promise<boolean> {
    const authToken = this.getAuthTokenFromRequest(request);

    if (!authToken) return false;

    const authData: any = jwt.decode(authToken, { complete: true });

    if (!authData || !authData.payload) return false;

    const userExist = await this.userService.findOne({
      _id: authData.payload._id,
    });
    if (!userExist) {
      throw new UnauthorizedException('Unauthorized access');
    }

    request.user = userExist;
    request.subscription = null;

    if (withSubscription) {
      const subscriptionExist = await this.subscriptionService.findOne(
        {
          useer_id: authData.payload._id,
          is_active: true,
        },
        {},
        {
          populate: ['subscription_setting_id'],
        },
      );

      request.subscription = subscriptionExist || null;
    }

    return true;
  }

  getAuthTokenFromRequest(request: Request): string {
    const authTokenSegment = (request.headers['authorization'] || '').split(
      ' ',
    );

    return authTokenSegment.length == 2 ? authTokenSegment[1] : null;
  }
}
