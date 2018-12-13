import fakeInitiativesService from './fake-initiatives.service';
import httpInitiativesService from './http-initiatives.service';
import { Initiative } from '../../models/api/initiative';

export interface InitiativesService {

    getInitiatives(): Promise<Initiative[]>;

}

export default httpInitiativesService as InitiativesService;
