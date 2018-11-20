import { User } from './api/user';
export class CreateUserModel implements User {
    username?: string;
    realName?: string;
    email?: string;
    phoneNumber?: string;
    password?: string;

}