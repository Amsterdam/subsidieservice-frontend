import { UserService } from './user.service';
import defaultCredentials, { CredentialStorage } from './credential.storage';
import credentialStorage from './credential.storage';
import { User } from '../../models/api/user';

export class FakeUserService implements UserService {

    private validUsers: User[] = [{ username: "test", email: "test@test.test", password: "test123", isAdmin: true }];

    private credentials: CredentialStorage;

    constructor(credentials?: CredentialStorage) {
        this.credentials = credentials || defaultCredentials;
    }

    login(user: string, password: string) {
        const foundUser = this.validUsers.find(u => user === u.username && password === u.password);

        if (foundUser) {
            this.credentials.storeCredentials(user, password, foundUser.isAdmin);
            return Promise.resolve(true);
        } else {
            return Promise.resolve(false);
        }
    }

    getAllUsers() {
        return Promise.resolve(this.validUsers);
    }

    create(data: User) {
        this.validUsers.push(data);
        return Promise.resolve();
    }

    update(username: string, newPassword: string, isAdmin?: boolean) {
        const user = this.validUsers.find(u => u.username === username);
        if (user && newPassword) {
            user.password = newPassword;
        }
        if (user && isAdmin !== undefined) {
            user.isAdmin = isAdmin;
        }

        return Promise.resolve();
    }

    deleteUser(username: string) {
        this.validUsers = this.validUsers.filter(u => u.username !== username);
        return Promise.resolve();
    }

    isAdmin() {
        return this.credentials.isAdmin();
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

