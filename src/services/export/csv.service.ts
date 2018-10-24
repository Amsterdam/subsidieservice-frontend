
/** A simple map/dictionary that provides a column header name for properties of object */
type HeaderNamesMap = { [property: string ]: string };

export interface CsvService {
    getCsvText<T>(data: T[], customHeaders?: HeaderNamesMap): string;

    getCsvTextAsync<T>(data: AsyncIterableIterator<T>, customHeaders?: HeaderNamesMap): Promise<string>;
}

/**
 * Home-grown CSV file creator with download as file option
 */
export class CustomCsvService implements CsvService {

    readonly SEPARATOR_SYMBOL = ";";

    getCsvText<T>(data: T[], customHeaders?: HeaderNamesMap) {
        if (!data || !data.length) { return ""; }
        let csvContent = this.prepareHeaders(data[0], customHeaders);

        for (const item of data) {
            csvContent += Object.values(item).join(this.SEPARATOR_SYMBOL) + "\n";
        }

        return csvContent;
    }

    async getCsvTextAsync<T>(data: AsyncIterableIterator<T>, customHeaders?: HeaderNamesMap) {
        let csvContent = "";
        let headersAdded = false;

        for await (const item of data) {
            if (!headersAdded) {
                csvContent += this.prepareHeaders(item, customHeaders);
                headersAdded = true;
            }

            csvContent += Object.values(item).join(this.SEPARATOR_SYMBOL) + "\n";
        }

        return csvContent;
    }

    private prepareHeaders<T>(item: T, customHeaders?: HeaderNamesMap) {
        return (customHeaders ?
            Object.keys(item).map(key => /*@ts-ignore */ customHeaders[key]) :
            Object.keys(item)
        ).join(this.SEPARATOR_SYMBOL) + "\n";
    }
}

export default new CustomCsvService() as CsvService;
