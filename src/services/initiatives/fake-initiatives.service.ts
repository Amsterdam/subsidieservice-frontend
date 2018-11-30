import { InitiativesService } from './initiatives.service';
import { Initiative } from '../../models/api/initiative';

export class FakeInitiativesService implements InitiativesService {

    getInitiatives() {
        const initiatives: Initiative[] = [
            { name: "maas", _default: true },
            { name: "second-init" },
            { name: "third-init" },
            { name: "fourth-init" }
        ];
        return Promise.resolve(initiatives);
    }

}

export default new FakeInitiativesService();
