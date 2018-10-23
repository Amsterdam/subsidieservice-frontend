export interface FileService {
    /**
     * Downloads a file stored in memory as binary large object
     */
    download(blob: Blob, fileName: string): void;
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
}

export default new Html5FileService() as FileService;
