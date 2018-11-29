import { CsvService } from './csv.service';
import { FullEntity } from '@/models/full-entity';
import { ExportRequestData } from '../../models/api/exportRequestData';

import defaultMasterAcountService, { MasterAccountService } from '../master-account/master-account.service';
import defaultSubsidiesService, { SubsidiesService } from '../subsidy/subsidy.service';
import defaultDataExportService, { DataExportService } from './data-export.service';


/**
 * Home-grown CSV file creator with download as file option
 */
export class InMemoryCsvService implements CsvService {

    readonly SEPARATOR_SYMBOL = ";";

    readonly columnHeaders: { [property in keyof FullEntity]: string } = {
        masterAccount: "Master Account",
        masterIban: "Master IBAN",
        recipientName: "Recipient Name",
        recipientPhone: "Recipient Phone",
        recipientIban: "Recipient IBAN",
        amount: "Amount",
        description: "Description",
        date: "Date",
        counterPartyName: "Counterparty Name",
        counterPartyIban: "Counterparty IBAN"
    };

    private masterAccountService: MasterAccountService;
    private subsidiesService: SubsidiesService;
    private dataExportService: DataExportService;

    constructor(
        masterAccountService?: MasterAccountService,
        subsidiesService?: SubsidiesService,
        dataExportService?: DataExportService
    ) {
        this.masterAccountService = masterAccountService || defaultMasterAcountService;
        this.subsidiesService = subsidiesService || defaultSubsidiesService;
        this.dataExportService = dataExportService || defaultDataExportService;
    }

    async getCsvText(requestData: ExportRequestData) {
        const data = this.dataExportService.combineData(
            await this.masterAccountService.getAll(),
            await this.subsidiesService.getAll());

        let csvContent = "";
        let headersAdded = false;

        for await (const item of data) {
            if (!headersAdded) {
                csvContent += this.prepareHeaders(item);
                headersAdded = true;
            }
            if (requestData.from && item.date < requestData.from) {
                continue;
            }
            if (requestData.to && item.date > requestData.to) {
                continue;
            }
            csvContent += Object.values(item).join(this.SEPARATOR_SYMBOL) + "\n";
        }

        return csvContent;
    }

    async getCsvBlob(requestData: ExportRequestData) {
        const csvText = await this.getCsvText(requestData);
        return new Blob([csvText], { type: 'text/csv' });
    }

    private prepareHeaders<T>(item: T) {
        return (this.columnHeaders ?
            Object.keys(item).map(key => this.columnHeaders[(key as keyof FullEntity)]) :
            Object.keys(item)
        ).join(this.SEPARATOR_SYMBOL) + "\n";
    }
}

export default new InMemoryCsvService();
