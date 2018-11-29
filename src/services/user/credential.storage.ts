export class CredentialStorage {
    private KEY_NAME = 'credentials';

    getCredentials() {
        return sessionStorage.getItem(this.KEY_NAME);
    }

    hasCredentials() {
        return this.getCredentials() != null;
    }

    storeCredentials(user: string, password: string) {
        sessionStorage.setItem(this.KEY_NAME, btoa(`${user}:${password}`));
    }

    getUserName(): string {
        const credentials = this.getCredentials();
        if (!credentials) {
            throw new Error("User not logged in");
        }

        const username = atob(credentials).split(":").shift() as string;
        return username;
    }

    removeCredentials() {
        sessionStorage.removeItem(this.KEY_NAME);
    }
}

export default new CredentialStorage();
