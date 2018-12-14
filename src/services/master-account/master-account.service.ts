import { MasterAccount } from '@/models/api/masterAccount';
import fakeMasterAccountService from './fake-master-account.service';
import httpMasterAccountService from './http-master-account.service';


export interface MasterAccountService {
    getAll(initiative?: string): Promise<MasterAccount[]>;

    getById(id: string): Promise<MasterAccount>;

    create(account: MasterAccount): Promise<void>;
}


// Default implementation
const defaultService = process.env.VUE_APP_USE_STUBS === "true" ? fakeMasterAccountService : httpMasterAccountService;
export default defaultService as MasterAccountService;
