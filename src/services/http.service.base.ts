import defaultUserService, { UserService } from './user/user.service';

export abstract class HttpServiceBase {

    protected baseUrl: string = process.env.VUE_APP_API_URL;

    protected userService: UserService;

    constructor(userService?: UserService) {
        this.userService = userService || defaultUserService;
    }

    get<T>(url: string) {
        return fetch(this.baseUrl + url, {
            method: "GET",
            headers: {
                Authorization: `Basic ${this.userService.getCredentials()} `
            }
        })
            .then(res => res.json())
            .then(json => json as T);
    }

    post<T = void>(url: string, data: any) {
        return fetch(this.baseUrl + url, {
            method: "POST",
            headers: {
                Authorization: `Basic ${this.userService.getCredentials()} `
            },
            body: JSON.stringify(data)
        })
            .then(res => res.json())
            .then(json => json as T);
    }
}
