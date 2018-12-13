import { UserService } from './user.service';
import { HttpServiceBase } from '../http.service.base';
import { User } from '../../models/api/user';
import { CredentialStorage } from './credential.storage';

export class HttpUserService extends HttpServiceBase implements UserService {



    constructor(credentials?: CredentialStorage) {
        super(credentials);
    }

    async login(username: string, password: string) {
        const user: User = { username, password };
        const res = await fetch(this.baseUrl + "/login", {
            method: "POST",
            body: JSON.stringify(user),
            headers: { "Content-Type": 'application/json' }
        });

        if (res.status < 400) {
            const data: User = await res.json();
            this.credentials.storeCredentials(username, password, data.is_admin);
            return true;
        } else {
            return false;
        }
    }

    async getAllUsers() {
        return super.get<User[]>('/users');
    }

    create(data: User) {
        return super.post('/users', data);
    }

    update(username: string, password: string, isAdmin: boolean) {
        return super.patch(`/users/${username}`, { username, password, is_admin: isAdmin });
    }

    async deleteUser(username: string) {
        await super.delete<void>(`/users/${username}`);
    }

    isLoggedIn() {
        return this.credentials.hasCredentials();
    }

    isAdmin() {
        return this.credentials.isAdmin();
    }

    getUserName() {
        return this.credentials.getUserName();
    }

    logout() {
        this.credentials.removeCredentials();
    }

}

export default new HttpUserService();
