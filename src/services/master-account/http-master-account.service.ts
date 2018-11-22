import { MasterAccount } from '@/models/api/masterAccount';
import { MasterAccountService } from './master-account.service';
import { HttpServiceBase } from '../http.service.base';
import { UserService } from '../user/user.service';

export class HttpAccountService extends HttpServiceBase implements MasterAccountService {

    constructor(userService?: UserService) {
        super(userService);
    }

    getAll(initiative?: string) {
        return super.get<MasterAccount[]>('/master-accounts');
    }

    getById(id: string) {
        return super.get<MasterAccount>(`/master-accounts/${id}`);
    }

    create(account: MasterAccount) {
        return super.post('/master-accounts', account);
    }
}

export default new HttpAccountService();
