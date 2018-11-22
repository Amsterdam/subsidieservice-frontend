import defaultUserService, { UserService } from './user/user.service';
import { ApiError } from '@/models/api/error';

export abstract class HttpServiceBase {

    baseUrl: string = process.env.VUE_APP_API_URL;

    protected userService: UserService;

    constructor(userService?: UserService) {
        this.userService = userService || defaultUserService;
    }

    async readBody<T>(response: Response) {
        const json = await response.json();
        if (response.status >= 400) {
            const error = json as ApiError;
            throw new Error(`${error.title}. ${error.detail}`);
        }

        return json as T;
    }

    async get<T>(url: string) {
        const res = await this.getRaw(url);
        return await this.readBody<T>(res);
    }

    getRaw(url: string) {
        return fetch(this.baseUrl + url, {
            method: "GET",
            headers: {
                Authorization: `Basic ${this.userService.getCredentials()}`
            }
        });
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
        return await this.readBody<T>(res);
    }


    prepareQueryUrl<T>(route: string, params: T) {
        let result = route;
        if (Object.values(params).some(value => !!value)) {
            result += "?";
            result += Object.keys(params).map(key => `${key}=${params[key as keyof T]}`).join("&");
        }

        return result;
    }
}
