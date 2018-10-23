import defaultFileService, { FileService } from '../file/file.service';

export interface CsvService {
    getCsvText(data: any[]): string;

    downloadCsv(data: any[], filename: string): void;
}

/**
 * Home-grown CSV file creator with download as file option
 */
export class BlobCsvService implements CsvService {
    fileService: FileService;

    readonly SEPARATOR_SYMBOL = ";";

    constructor(fileService?: FileService) {
        this.fileService = fileService || defaultFileService;
    }

    getCsvText(data: object[]) {
        if (!data || !data.length) { return ""; }

        let csvContent = Object.keys(data[0]).join(this.SEPARATOR_SYMBOL) + "\n";

        for (const item of data) {
            csvContent += Object.values(item).join(this.SEPARATOR_SYMBOL) + "\n";
        }

        return csvContent;
    }

    downloadCsv(data: any[], filename: string) {
        const text = this.getCsvText(data);
        const blob = new Blob([text], { type: 'text/csv' });
        this.fileService.download(blob, filename);
    }
}

export default new BlobCsvService() as CsvService;
