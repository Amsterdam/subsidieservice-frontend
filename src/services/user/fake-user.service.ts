import { UserService } from './user.service';
export class FakeUserService implements UserService {

    private KEY_NAME = 'credentials';

    async login(user: string, password: string) {
        if (await Promise.resolve(user === "kalin" && password === "test123")) {
            sessionStorage.setItem(this.KEY_NAME, btoa(`${user}:${password}`));
            return true;
        } else {
            return false;
        }
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

