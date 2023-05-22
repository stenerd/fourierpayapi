import { Subscription } from 'src/subscription/models/subscription.model';
import { RoleEnum } from 'src/user/user.enum';
export interface IJWTUser {
    firstname: string;
    lastname: string;
    email: string;
    role: RoleEnum;
    _id: string;
}
export interface UserRequest extends Request {
    user: IJWTUser;
    subscription: Subscription;
}
