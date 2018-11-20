import fakeUserService from './fake-user.service';
import httpUserService from './http-user.service';
import { CreateUserModel } from '../../models/create-user-model';
import { User } from '../../models/api/user';

export interface UserService {
    login(user: string, password: string): Promise<boolean>;

    create(data: CreateUserModel): Promise<void>;

    resetPassword(username: string, newPassword: string): Promise<void>;

    getAllUsers(): Promise<User[]>;

    delete(username: string): Promise<void>;

    isAdmin(): Promise<boolean>;

    getCredentials(): string | null;

    isLoggedIn(): boolean;

    getUserName(): string;

    logout(): void;
}

export default fakeUserService as UserService;
