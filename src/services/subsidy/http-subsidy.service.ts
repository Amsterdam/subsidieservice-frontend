import { UserService } from '../user/user.service';
import { SubsidiesService } from './subsidy.service';
import { HttpServiceBase } from '../http.service.base';
import { Subsidy } from '@/models/api/subsidy';

export class HttpSubsidiesService extends HttpServiceBase implements SubsidiesService {

    constructor(userService?: UserService) {
        super(userService);
    }

    getAll() {
        return super.get<Subsidy[]>('/subsidies');
    }

    getById(id: string) {
        return super.get<Subsidy>(`/subsidies/${id}`);
    }

    getTransactionsForId(id: string) {
        return this.getById(id).then(subsidy => subsidy!.account!.transactions || []);
    }

    create(subsidy: Subsidy) {
        return super.post('/subsidies', subsidy);
    }
}


export default new HttpSubsidiesService();
