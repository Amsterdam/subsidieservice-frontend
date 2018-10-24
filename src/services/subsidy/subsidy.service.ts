import { Subsidy } from '@/models/api/subsidy';
import fakeSubsidiesService from './fake-subsidy.service';
import httpSubsidyService from './http-subsidy.service';
import { Transaction } from '../../models/api/transaction';

export interface SubsidiesService {
    getAll(): Promise<Subsidy[]>;

    getById(id: string): Promise<Subsidy>;

    getTransactionsForId(id: string): Promise<Transaction[]>;

    create(subsidy: Subsidy): Promise<void>;
}

export default httpSubsidyService as SubsidiesService;
