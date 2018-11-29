import { HttpServiceBase } from '../http.service.base';
import { CitizenService } from './citizen.service';
import { Citizen } from '../../models/api/citizen';
import { CredentialStorage } from '../user/credential.storage';

export class HttpCitizenService extends HttpServiceBase implements CitizenService {
    constructor(credentialStorage?: CredentialStorage) {
        super(credentialStorage);
    }

    getAll(initiative?: string) {
        return super.get<Citizen[]>('/citizens');
    }

    getById(id: string) {
        return super.get<Citizen>(`/citizens/${id}`);
    }

    create(citizen: Citizen): Promise<void> {
        return super.post('/citizens', citizen);
    }

}

export default new HttpCitizenService();
