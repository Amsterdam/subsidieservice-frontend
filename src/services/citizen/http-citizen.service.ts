import { HttpServiceBase } from '../http.service.base';
import { CitizenService } from './citizen.service';
import { Citizen } from '../../models/citizen';
import { UserService } from '../user/user.service';

export class HttpCitizenService extends HttpServiceBase implements CitizenService {
    constructor(userService?: UserService) {
        super(userService);
    }

    getAll() {
        return super.get<Citizen[]>('citizens');
    }

    getById(id: string) {
        return super.get<Citizen>(`citizens/${id}`);
    }

    create(citizen: Citizen): Promise<void> {
     return super.post('citizens', citizen);
    }

}

export default new HttpCitizenService();
