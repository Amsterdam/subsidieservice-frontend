import { MasterAccount } from '@/models/masterAccount';
import fakeMasterAccountService from './fake-master-account.service';


export interface IMasterAccountService {
    getAll(): Promise<MasterAccount[]>;

    getById(id: string): Promise<MasterAccount>;

    create(account: MasterAccount): Promise<void>;
}

// Default implementation
export default fakeMasterAccountService as IMasterAccountService;