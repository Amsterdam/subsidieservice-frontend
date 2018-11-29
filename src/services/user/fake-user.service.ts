import { UserService } from './user.service';
import { CreateUserModel } from '../../models/create-user-model';
import defaultCredentials, { CredentialStorage } from './credential.storage';
import credentialStorage from './credential.storage';

export class FakeUserService implements UserService {

    private validUsers: CreateUserModel[] = [{ username: "test", email: "test@test.test", password: "test123" }];

    private credentials: CredentialStorage;

    constructor(credentials?: CredentialStorage) {
        this.credentials = credentials || defaultCredentials;
    }

    async login(user: string, password: string) {
        if (await Promise.resolve(this.validUsers.some(u => user === u.username && password === u.password))) {
            this.credentials.storeCredentials(user, password);
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

    deleteUser(username: string) {
        this.validUsers = this.validUsers.filter(u => u.username !== username);
        return Promise.resolve();
    }

    isAdmin() {
        return Promise.resolve(this.isLoggedIn());
    }

    isLoggedIn() {
        return credentialStorage.getCredentials() != null;
    }

    getUserName() {
        this.credentials.getUserName();
    }

    logout() {
        this.credentials.removeCredentials();
    }
}

export default new FakeUserService();

