import { MasterAccount } from '@/models/api/masterAccount';
import { MasterAccountService } from './master-account.service';
import { HttpServiceBase } from '../http.service.base';
import { CredentialStorage } from '../user/credential.storage';

export class HttpAccountService extends HttpServiceBase implements MasterAccountService {

    constructor(credentialStorage?: CredentialStorage) {
        super(credentialStorage);
    }

    getAll(initiative?: string) {
        const query = initiative ? `?initiative=${initiative}` : "";
        return super.get<MasterAccount[]>('/master-accounts' + query);
    }

    getById(id: string) {
        return super.get<MasterAccount>(`/master-accounts/${id}`);
    }

    create(account: MasterAccount) {
        return super.post('/master-accounts', account);
    }
}

export default new HttpAccountService();
