import { ExportRequestData } from '../../models/api/exportRequestData';
import inMemoryCsvService from './in-memory.csv.service';
import httpCsvService from './http-csv.service';

export interface CsvService {
    getCsvText(requestData: ExportRequestData): Promise<string>;

    getCsvBlob(requestData: ExportRequestData): Promise<Blob>;
}

export default inMemoryCsvService as CsvService;
