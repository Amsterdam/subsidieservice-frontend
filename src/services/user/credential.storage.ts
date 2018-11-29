export class CredentialStorage {
    private CREDENTIALS_KEY = 'credentials';
    private ISADMIN_KEY = 'isadmin';

    getCredentials() {
        return sessionStorage.getItem(this.CREDENTIALS_KEY);
    }

    hasCredentials() {
        return this.getCredentials() != null;
    }

    storeCredentials(user: string, password: string, isAdmin = false) {
        sessionStorage.setItem(this.CREDENTIALS_KEY, btoa(`${user}:${password}`));
        sessionStorage.setItem(this.ISADMIN_KEY, isAdmin.toString());
    }

    getUserName(): string {
        const credentials = this.getCredentials();
        if (!credentials) {
            throw new Error("User not logged in");
        }

        const username = atob(credentials).split(":").shift() as string;
        return username;
    }

    isAdmin(): boolean {
        const isAdmin = sessionStorage.getItem(this.ISADMIN_KEY);
        return isAdmin ? Boolean(isAdmin) : false;
    }

    removeCredentials() {
        sessionStorage.removeItem(this.CREDENTIALS_KEY);
    }
}

export default new CredentialStorage();
