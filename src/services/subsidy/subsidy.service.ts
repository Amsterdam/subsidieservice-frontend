import fakeSubsidiesService from './fake-subsidy.service';
import httpSubsidyService from './http-subsidy.service';
import { Transaction } from '@/models/api/transaction';
import { SubsidyBase } from '@/models/api/subsidyBase';
import { Subsidy } from '@/models/api/subsidy';

export interface SubsidiesService {
    getAll(): Promise<SubsidyBase[]>;

    getById(id: string): Promise<Subsidy>;

    getTransactionsForId(id: string): Promise<Transaction[]>;

    create(subsidy: SubsidyBase): Promise<void>;
}

const defaultService = process.env.VUE_APP_USE_STUBS === "true" ? fakeSubsidiesService : httpSubsidyService;
export default defaultService as SubsidiesService;
