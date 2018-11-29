import { UserService } from './user.service';
import { HttpServiceBase } from '../http.service.base';
import { CreateUserModel } from '@/models/create-user-model';
import { User } from '../../models/api/user';
import { CredentialStorage } from './credential.storage';

export class HttpUserService extends HttpServiceBase implements UserService {

    private readonly LOGIN_TEST_URL = `${process.env.VUE_APP_API_URL}/master-accounts`;


    constructor(credentials?: CredentialStorage) {
        super(credentials);
    }

    async login(user: string, password: string) {
        const credentials = btoa(`${user}:${password}`);

        const res = await fetch(this.LOGIN_TEST_URL, {
            method: "GET",
            headers: {
                Authorization: `Basic ${credentials}`
            }
        });

        if (res.status < 400) {
            this.credentials.storeCredentials(user, password);
            return true;
        } else {
            return false;
        }
    }

    async isAdmin() {
        const res = await fetch(`${process.env.VUE_APP_API_URL}/is-admin`, {
            method: "GET",
            headers: {
                Authorization: `Basic ${this.credentials.getCredentials()}`
            }
        });

        return res.status === 200;
    }

    async getAllUsers() {
        return super.get<User[]>('/users');
    }

    create(data: CreateUserModel) {
        return super.post('/users', data);
    }

    resetPassword(username: string, password: string) {
        return super.patch(`/users/${username}`, { username, password });
    }

    async deleteUser(username: string) {
        await super.delete<void>(`/users/${username}`);
    }

    isLoggedIn() {
        return this.credentials.hasCredentials();
    }

    getUserName() {
        return this.credentials.getUserName();
    }

    logout() {
        this.credentials.removeCredentials();
    }

}

export default new HttpUserService();
