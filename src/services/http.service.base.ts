import { ApiError } from '@/models/api/error';
import defaultCredentialStorage, { CredentialStorage } from './user/credential.storage';

export abstract class HttpServiceBase {

    baseUrl: string = process.env.VUE_APP_API_URL;

    protected credentials: CredentialStorage;

    constructor(credentials?: CredentialStorage) {
        this.credentials = credentials || defaultCredentialStorage;
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
                Authorization: `Basic ${this.credentials.getCredentials()}`
            }
        });
    }


    post<T = void>(url: string, data: any) {
        return this.do<T>('POST', url, data);
    }

    put<T = void>(url: string, data: any) {
        return this.do<T>('PUT', url, data);
    }

    patch<T = void>(url: string, data: any) {
        return this.do<T>('PATCH', url, data);
    }

    async delete<T>(url: string) {
        const res = await fetch(this.baseUrl + url, {
            method: "DELETE",
            headers: {
                Authorization: `Basic ${this.credentials.getCredentials()}`
            }
        });
        return await this.readBody<T>(res);
    }

    prepareQueryUrl<T>(route: string, params: T) {
        let url = route;
        const keys = Object.keys(params).filter(key => !!params[key as keyof T]);

        if (keys.length) {
            url += "?";
            url += keys.map(key => `${key}=${params[key as keyof T]}`).join("&");
        }

        return url;
    }

    private async do<T>(method: string, url: string, data: any) {
        const res = await fetch(this.baseUrl + url, {
            method,
            headers: {
                "Authorization": `Basic ${this.credentials.getCredentials()}`,
                "Content-Type": 'application/json'
            },
            body: JSON.stringify(data)
        });
        return await this.readBody<T>(res);
    }
}
