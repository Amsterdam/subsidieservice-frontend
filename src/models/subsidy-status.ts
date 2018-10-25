
export enum SubsidyStatus {
    /** The citizen does not yet have a profile at a supported bank, and so has not received the subsidy */
    PENDING_ACCOUNT = "PENDING_ACCOUNT",

    /** The citizen does have an available bank profile, but has not yet accepted the request to access the subsidy account */
    PENDING_ACCEPT = "PENDING_ACCEPT",

    /** The citizen has access to the subsidy */
    OPEN = "OPEN",

    /** The citizen has canceled their access to the subsidy account and can no longer access the funds */
    SHARE_CLOSED = "SHARE_CLOSED",

    /**  The subsidy has been ended via the subsidy service and the associated bank account is closed */
    CLOSED = "CLOSED",

    /** Lists all subsidies regardless of status. */
    ALL = "ALL"
}