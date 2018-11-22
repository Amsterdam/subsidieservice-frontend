import { HttpServiceBase } from '../http.service.base';
import { CsvService } from './csv.service';
import { ExportRequestData } from '@/models/api/exportRequestData';

export class HttpCsvService extends HttpServiceBase implements CsvService {

    constructor() {
        super();
    }

    async getCsvText(requestData: ExportRequestData) {
        const csvUrl = super.prepareQueryUrl("/csv", requestData);
        const response = await super.getRaw(csvUrl);
        return await response.text();
    }

    async getCsvBlob(requestData: ExportRequestData) {
        const csvUrl = super.prepareQueryUrl("/csv", requestData);
        const response = await super.getRaw(csvUrl);
        return await response.blob();
    }
}
