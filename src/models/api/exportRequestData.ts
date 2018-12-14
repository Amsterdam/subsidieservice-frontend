export interface ExportRequestData {

    /** The start date - no results should be before this date */
    from?: Date;

    /** The end date - no results should be after this date */
    to?: Date;

    initiative: string;
}