import { MasterAccount } from './api/masterAccount';
import { Subsidy } from './api/subsidy';
import { Transaction } from './api/transaction';

export class FullEntity {

    masterAccount: string;

    masterIban: string;

    recipientName: string;

    recipientPhone: string;

    recipientIban: string;

    amount: number;

    counterPartyName: string;

    counterPartyIban: string;

    description: string;

    date: Date

    constructor(masterAccount: MasterAccount, subsidy: Subsidy, transaction: Transaction) {
        this.masterAccount = masterAccount.name || "";
        this.masterIban = masterAccount.iban || "";
        this.recipientName = subsidy.recipient ? subsidy.recipient.name || "" : "";
        this.recipientPhone = subsidy.recipient ? subsidy.recipient.phoneNumber || "" : "";
        this.recipientIban = subsidy.account ? subsidy.account.iban || "" : "";
        this.amount = transaction.amount || 0;
        this.counterPartyName = transaction.counterpartyName || "";
        this.counterPartyIban = transaction.counterpartyIban || "";
        this.description = transaction.description || "";
        this.date = transaction.timestamp || new Date();
    }

}