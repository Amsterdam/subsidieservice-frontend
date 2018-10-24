import defaultUserService, { UserService } from './user/user.service';
import { ApiError } from '@/models/api/error';

export abstract class HttpServiceBase {

    protected baseUrl: string = process.env.VUE_APP_API_URL;

    protected userService: UserService;

    constructor(userService?: UserService) {
        this.userService = userService || defaultUserService;
    }

    async getData<T>(response: Response) {
        const json = await response.json();
        if (response.status >= 400) {
            const error = json as ApiError;
            throw new Error(`${error.title}. ${error.detail}`);
        }

        return json as T;
    }

    async get<T>(url: string) {
        const res = await fetch(this.baseUrl + url, {
            method: "GET",
            headers: {
                Authorization: `Basic ${this.userService.getCredentials()}`
            }
        });
        return await this.getData<T>(res);
    }

    async post<T = void>(url: string, data: any) {
        const res = await fetch(this.baseUrl + url, {
            method: "POST",
            headers: {
                "Authorization": `Basic ${this.userService.getCredentials()}`,
                "Content-Type": 'application/json'
            },
            body: JSON.stringify(data)
        });
        return await this.getData<T>(res);
    }
}
