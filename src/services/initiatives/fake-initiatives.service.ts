import { InitiativesService } from './initiatives.service';
import { Initiative } from '../../models/api/initiative';

export class FakeInitiativesService implements InitiativesService {

    getInitiatives() {
        const initiatives: Initiative[] = [
            {  id: "1", name: "maas", default: true },
            {  id: "2", name: "second-init" },
            {  id: "3", name: "third-init" },
            {  id: "4", name: "fourth-init" }
        ];
        return Promise.resolve(initiatives);
    }

}

export default new FakeInitiativesService();
