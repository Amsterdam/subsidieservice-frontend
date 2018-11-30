import { HttpServiceBase } from '../http.service.base';
import { InitiativesService } from './initiatives.service';
import { Initiative } from '../../models/api/initiative';

export class HttpInitiativesService extends HttpServiceBase implements InitiativesService {
    getInitiatives(): Promise<Initiative[]> {
        return this.get<Initiative[]>('/initiatives');
    }
}

export default new HttpInitiativesService();
