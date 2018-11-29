import { HttpServiceBase } from '../http.service.base';
import { CsvService } from './csv.service';
import { ExportRequestData } from '@/models/api/exportRequestData';

export class HttpCsvService extends HttpServiceBase implements CsvService {

    constructor() {
        super();
    }

    async getCsvText(requestData: ExportRequestData) {
        const response = await this.getCsv(requestData);
        return await response.text();
    }

    async getCsvBlob(requestData: ExportRequestData) {
        const response = await this.getCsv(requestData);
        return await response.blob();
    }

    private async getCsv(requestData: ExportRequestData) {
        const { from, to } = requestData;
        const formatted = {
            from: from ? from.toISOString().split('T').shift() : undefined,
            to: to ? to.toISOString().split('T').shift() : undefined
        };
        const csvUrl = super.prepareQueryUrl("/subsidies/transactions", formatted);
        return await super.getRaw(csvUrl);
    }
}

export default new HttpCsvService();
