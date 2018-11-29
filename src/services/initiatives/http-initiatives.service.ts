import { HttpServiceBase } from '../http.service.base';
import { InitiativesService } from './initiatives.service';

export class HttpInitiativesService extends HttpServiceBase implements InitiativesService {
    defaultInitiative = process.env.VUE_APP_DEFAULT_INITIATIVE;

    getInitiatives(): Promise<string[]> {
        return this.get<string[]>('/initiatives');
    }
}

export default new HttpInitiativesService();
