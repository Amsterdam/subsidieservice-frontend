import { MasterAccount } from '@/models/masterAccount';
import { IMasterAccountService } from './master-account.service';
import { HttpServiceBase } from '../http.service.base';
import { UserService } from '../user/user.service';

export class HttpAccountService  extends HttpServiceBase implements IMasterAccountService {

    constructor(userService?: UserService) {
        super(userService);
    }

    getAll() {
       return super.get<MasterAccount[]>('/master/accounts');
    }

    getById(id: string) {
        return super.get<MasterAccount>(`/master/accounts/${id}`);
    }

    create(account: MasterAccount) {
        return super.post('/master/accounts', account);
    }
}

export default new HttpAccountService();
