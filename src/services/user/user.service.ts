import fakeUserService from './fake-user.service';
import httpUserService from './http-user.service';
import { User } from '../../models/api/user';

export interface UserService {
    login(user: string, password: string): Promise<boolean>;

    create(data: User): Promise<void>;

    update(username: string, newPassword: string, isAdmin: boolean): Promise<void>;

    getAllUsers(): Promise<User[]>;

    deleteUser(username: string): Promise<void>;

    isAdmin(): boolean;

    isLoggedIn(): boolean;

    logout(): void;
}

export default fakeUserService as UserService;
