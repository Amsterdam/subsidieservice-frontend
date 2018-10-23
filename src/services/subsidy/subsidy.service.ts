import { Subsidy } from '@/models/subsidy';
import fakeSubsidiesService from './fake-subsidy.service';
import httpSubsidyService from './http-subsidy.service';

export interface SubsidiesService {
    getAll(): Promise<Subsidy[]>;

    getById(id: string): Promise<Subsidy>;

    create(subsidy: Subsidy): Promise<void>;
}

export default httpSubsidyService as SubsidiesService;
