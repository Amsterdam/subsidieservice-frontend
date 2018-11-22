import { MasterAccount } from '../../models/api/masterAccount';
import { Subsidy } from '../../models/api/subsidy';
import { FullEntity } from '../../models/full-entity';
import defaultSubsidyService, { SubsidiesService } from '../subsidy/subsidy.service';


/** A map/dictionary of subsidies grouped by the id of their master accounts */
type GroupedSubsidies = { [masterId: string]: Subsidy[] };

export class DataExportService {

    private subsidyService: SubsidiesService;

    constructor(subsidyService?: SubsidiesService) {
        this.subsidyService = subsidyService || defaultSubsidyService;
    }

    async * combineData(accounts: MasterAccount[], subsidies: Subsidy[]) {
        const groupedSubsidies = this.groupByMasterId(subsidies);

        for (const master of accounts) {
            const subsidesGrp = groupedSubsidies[master.id!] || [];

            for (const subsidy of subsidesGrp) {
                const transactions = await this.subsidyService.getTransactionsForId(subsidy.id!);

                for (const transaction of transactions) {
                    yield new FullEntity(master, subsidy, transaction);
                }
            }
        }
    }

    private groupByMasterId(subsidies: Subsidy[]) {
        return subsidies.reduce((resultMap, subsidy) => {
            const master = subsidy.master!.id!;
            if (!resultMap[master]) {
                resultMap[master] = [];
            }

            resultMap[master].push(subsidy);
            return resultMap;
        }, {} as GroupedSubsidies);
    }

}


export default new DataExportService();
