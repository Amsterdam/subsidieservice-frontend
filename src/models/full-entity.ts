import { MasterAccount } from './api/masterAccount';
import { Subsidy } from './api/subsidy';
import { Transaction } from './api/transaction';

export class FullEntity {

    masterAccount!: string;

    recipientName!: string;

    recipientPhone!: string;

    recipientIban!: string;

    amount!: number;

    masterIban!: string;

    description!: string;

    date!: Date

    constructor(masterAccount: MasterAccount, subsidy: Subsidy, transaction: Transaction) {
        this.masterAccount = masterAccount.name || "";
        this.recipientName = subsidy.recipient ? subsidy.recipient.name || "" : "";
        this.recipientPhone = subsidy.recipient ? subsidy.recipient.phone_number || "" : "";
        this.recipientIban = subsidy.account ? subsidy.account.iban || "" : "";
        this.amount = transaction.amount || 0;
        this.masterIban = masterAccount.iban || "";
        this.description = transaction.description || "";
        this.date = transaction.timestamp || new Date();
    }

}