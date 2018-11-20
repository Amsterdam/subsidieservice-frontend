import fakeUserService from './fake-user.service';
import httpUserService from './http-user.service';

export interface UserService {
    login(user: string, password: string): Promise<boolean>;

    getCredentials(): string | null;

    isLoggedIn(): boolean;

    getUserName(): string;

    logout(): void;
}

export default fakeUserService as UserService;
