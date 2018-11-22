import { InitiativesService } from './initiatives.service';

export class FakeInitiativesService implements InitiativesService {

    get defaultInitiative() {
        return "first-init";
    }

    getInitiatives() {
        const initiatives = ["first-init", "second-init", "third-init", "fourth-init"];
        return Promise.resolve(initiatives);
    }

}

export default new FakeInitiativesService();
