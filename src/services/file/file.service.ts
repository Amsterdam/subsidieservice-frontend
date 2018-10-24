export interface FileService {
    /**
     * Downloads a file stored in memory as binary large object
     */
    download(blob: Blob, fileName: string): void;

    /**
     * Downloads a file as CSV from text in memory
     */
    downloadCsv(csvText: string, fileName: string): void;
}

export class Html5FileService implements FileService {
    download(blob: Blob, fileName: string) {
        const a = document.createElement('a');
        a.href = URL.createObjectURL(blob);
        a.setAttribute('download', fileName);
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
    }

    downloadCsv(csvText: string, fileName: string) {
        this.download(new Blob([csvText], { type: 'text/csv' }), fileName);
    }
}

export default new Html5FileService() as FileService;
