import { Citizen } from '@/models/api/citizen';
import fakeCitizensService from './fake-citizen.service';
import httpCitizenService from './http-citizen.service';

export interface CitizenService {

    getAll(): Promise<Citizen[]>;

    getById(id: string): Promise<Citizen>;

    create(citizen: Citizen): Promise<void>;

}

const defaultService = process.env.VUE_APP_USE_STUBS === "true" ? fakeCitizensService : httpCitizenService;
export default defaultService as CitizenService;
