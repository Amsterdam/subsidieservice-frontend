import fakeInitiativesService from './fake-initiatives.service';

export interface InitiativesService {

    readonly defaultInitiative: string;

    getInitiatives(): Promise<string[]>;

}

export default fakeInitiativesService as InitiativesService;
