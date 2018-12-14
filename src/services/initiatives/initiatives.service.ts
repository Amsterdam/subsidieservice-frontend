import fakeInitiativesService from './fake-initiatives.service';
import httpInitiativesService from './http-initiatives.service';
import { Initiative } from '../../models/api/initiative';

export interface InitiativesService {

    getInitiatives(): Promise<Initiative[]>;

}

const defaultService = process.env.VUE_APP_USE_STUBS === "true" ? fakeInitiativesService : httpInitiativesService;
export default defaultService as InitiativesService;
