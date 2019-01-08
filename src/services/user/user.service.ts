import fakeUserService from './fake-user.service';
import httpUserService from './http-user.service';
import { User } from '../../models/api/user';

export interface UserService {
    login(user: string, password: string): Promise<boolean>;

    create(data: User): Promise<void>;

    update(user: Partial<User>): Promise<void>;

    getAllUsers(): Promise<User[]>;

    deleteUser(id: string): Promise<void>;

    isAdmin(): boolean;

    isLoggedIn(): boolean;

    logout(): void;
}

const defaultService = process.env.VUE_APP_USE_STUBS === "true" ? fakeUserService : httpUserService;
export default defaultService as UserService;
