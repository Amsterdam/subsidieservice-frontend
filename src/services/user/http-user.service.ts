import { UserService } from './user.service';
import { HttpServiceBase } from '../http.service.base';
import { CreateUserModel } from '@/models/create-user-model';

export class HttpUserService implements UserService {

    private readonly KEY_NAME = 'credentials';

    private readonly LOGIN_TEST_URL = `${process.env.VUE_APP_API_URL}/master-accounts`;

    async login(user: string, password: string) {
        const credentials = btoa(`${user}:${password}`);

        const res = await fetch(this.LOGIN_TEST_URL, {
            method: "GET",
            headers: {
                Authorization: `Basic ${credentials}`
            }
        });

        if (res.status < 400) {
            sessionStorage.setItem(this.KEY_NAME, credentials);
            return true;
        } else {
            return false;
        }
    }

    async isAdmin() {
        const res = await fetch(`${process.env.VUE_APP_API_URL}/is-admin`, {
            method: "GET",
            headers: {
                Authorization: `Basic ${this.getCredentials()}`
            }
        });

        return res.status === 200;
    }

    getAllUsers() {
        return Promise.reject(new Error("Not implemented yet!"));
    }

    create(data: CreateUserModel) {
        return Promise.reject(new Error("Not implemented yet!"));
    }

    resetPassword(email: string, newPassword: string) {
        return Promise.reject(new Error("Not implemented yet!"));
    }

    delete(email: string) {
        return Promise.reject(new Error("Not implemented yet!"));
    }

    getCredentials() {
        return sessionStorage.getItem(this.KEY_NAME);
    }

    isLoggedIn() {
        return this.getCredentials() != null;
    }

    getUserName() {
        const credentials = this.getCredentials();
        if (!credentials) {
            throw new Error("User not logged in");
        }

        const username = atob(credentials).split(":").shift() as string;
        return username;
    }

    logout() {
        sessionStorage.removeItem(this.KEY_NAME);
    }

}

export default new HttpUserService();
