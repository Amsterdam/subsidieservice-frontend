/**
 * Subsidy Service API
 * Manage and allocate subsidies for real-time expense management.   Throughout this documentation, *bank profile* will refer to a collection of bank accounts owned by the same entity, while *bank account* will refer to one specific account (i.e. having a single IBAN). Access to a bank profile from the subsidy service must be arranged with the service administrator. Similarly, a *subsidy* will refer to a specific allocation of funds into one account accessible by one citizen. A group of subsidies that are all for the same purpose should come from the same dedicated master-account.   Currently, profiles at the following banks are supported:   * Bunq    The bank information returned by `GET` calls is cached in the database. It is held as up to date as possible, but due to the caching it is not absolutely real-time. The information is updated as quickly as allowed by the bank APIs.   We are using the `deprecated` tag to mark endpoints that are planned but not yet implemented, these will return a 501. 
 *
 * OpenAPI spec version: 1.0
 * 
 *
 * NOTE: This class is auto generated by the swagger code generator program.
 * https://github.com/swagger-api/swagger-codegen.git
 * Do not edit the class manually.
 */
import { AccountBase } from './accountBase';


/**
 * A master-account-base serves as the source for a specific class of subsidy
 */
export interface MasterAccountBase extends AccountBase {
    /**
     * The database ID (for use with `GET`)
     */
    id?: string;

    initiative?: string;
}
