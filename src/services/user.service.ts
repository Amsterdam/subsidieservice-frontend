export class UserService {

    async login(user: string, password: string) {
        if (await Promise.resolve(user === "test" && password === "test")) {
            sessionStorage.setItem('credentials', btoa(`${user}:${password}`));
            return true;
        } else {
            return false;
        }
    }

    getCredentials() {
        return sessionStorage.getItem('credentials');
    }

    isLoggedIn() {
        return this.getCredentials() != null;
    }
}

export default new UserService();
