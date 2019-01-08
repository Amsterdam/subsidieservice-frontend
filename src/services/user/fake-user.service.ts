import { UserService } from './user.service';
import defaultCredentials, { CredentialStorage } from './credential.storage';
import credentialStorage from './credential.storage';
import { User } from '../../models/api/user';

export class FakeUserService implements UserService {

    private validUsers: User[] = [{ username: "test", email: "test@test.test", password: "test123", is_admin: true }];

    private credentials: CredentialStorage;

    constructor(credentials?: CredentialStorage) {
        this.credentials = credentials || defaultCredentials;
    }

    login(user: string, password: string) {
        const foundUser = this.validUsers.find(u => user === u.username && password === u.password);

        if (foundUser) {
            this.credentials.storeCredentials(user, password, foundUser.is_admin);
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

    update(user: User) {
        const existingUser = this.validUsers.find(u => u.id === user.id);
        if (existingUser && user.password) {
            existingUser.password = user.password;
        }
        if (existingUser && user.is_admin !== undefined) {
            existingUser.is_admin = user.is_admin;
        }

        return Promise.resolve();
    }

    deleteUser(id: string) {
        this.validUsers = this.validUsers.filter(u => u.id !== id);
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

