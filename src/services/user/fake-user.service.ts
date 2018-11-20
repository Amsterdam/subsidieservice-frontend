import { UserService } from './user.service';
import { CreateUserModel } from '../../models/create-user-model';
export class FakeUserService implements UserService {

    private KEY_NAME = 'credentials';

    private validUsers: CreateUserModel[] = [{ username: "test", email: "test@test.test", password: "test123" }];

    async login(user: string, password: string) {
        if (await Promise.resolve(this.validUsers.some(u => user === u.username && password === u.password))) {
            sessionStorage.setItem(this.KEY_NAME, btoa(`${user}:${password}`));
            return true;
        } else {
            return false;
        }
    }

    getAllUsers() {
        return Promise.resolve(this.validUsers);
    }

    create(data: CreateUserModel) {
        this.validUsers.push(data);
        return Promise.resolve();
    }

    resetPassword(username: string, newPassword: string) {
        const user = this.validUsers.find(u => u.username === username);
        if (user) {
            user.password = newPassword;
        }

        return Promise.resolve();
    }

    delete(username: string) {
        this.validUsers = this.validUsers.filter(u => u.username !== username);
        return Promise.resolve();
    }

    isAdmin() {
        return Promise.resolve(this.isLoggedIn());
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

export default new FakeUserService();

