import { Citizen } from '@/models/api/citizen';
import fakeCitizensService from './fake-citizen.service';
import httpCitizenService from './http-citizen.service';

export interface CitizenService {

    getAll(initiative?:string): Promise<Citizen[]>;

    getById(id: string): Promise<Citizen>;

    create(citizen: Citizen): Promise<void>;

}

export default fakeCitizensService as CitizenService;
