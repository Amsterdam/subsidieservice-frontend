import { User } from './api/user';
export class UserCreation implements User {
    username?: string;
    realName?: string;
    email?: string;
    phoneNumber?: string;
    password?: string;

}