import { ExportRequestData } from '../../models/api/exportRequestData';
import inMemoryCsvService from './in-memory.csv.service';
import httpCsvService from './http-csv.service';

export interface CsvService {
    getCsvText(requestData: ExportRequestData): Promise<string>;

    getCsvBlob(requestData: ExportRequestData): Promise<Blob>;
}

const defaultService = process.env.VUE_APP_USE_STUBS === "true" ? inMemoryCsvService : httpCsvService;
export default defaultService as CsvService;
