import { InitiativesService } from './initiatives.service';

export class FakeInitiativesService implements InitiativesService {

    get defaultInitiative() {
        return process.env.VUE_APP_DEFAULT_INITIATIVE;
    }

    getInitiatives() {
        const initiatives = [this.defaultInitiative, "second-init", "third-init", "fourth-init"];
        return Promise.resolve(initiatives);
    }

}

export default new FakeInitiativesService();
