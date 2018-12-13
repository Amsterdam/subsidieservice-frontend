import { MasterAccount } from '@/models/api/masterAccount';
import fakeMasterAccountService from './fake-master-account.service';
import httpMasterAccountService from './http-master-account.service';


export interface MasterAccountService {
    getAll(initiative?: string): Promise<MasterAccount[]>;

    getById(id: string): Promise<MasterAccount>;

    create(account: MasterAccount): Promise<void>;
}

// Default implementation
export default httpMasterAccountService as MasterAccountService;
