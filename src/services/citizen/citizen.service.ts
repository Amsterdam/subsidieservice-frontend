import { Citizen } from '@/models/citizen';
import fakeCitizensService from './fake-citizen.service';

export interface CitizenService {

    getAll(): Promise<Citizen[]>;

    getById(id: string): Promise<Citizen>;

    create(citizen: Citizen): Promise<void>;

}

export default fakeCitizensService as CitizenService;
