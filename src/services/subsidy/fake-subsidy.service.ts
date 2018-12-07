import { Subsidy } from '@/models/api/subsidy';
import { SubsidiesService } from './subsidy.service';
import { SubsidyStatus } from '../../models/subsidy-status';

export class FakeSubsidiesService implements SubsidiesService {

    private fakeData: Subsidy[] = [
        {
            id: "1",
            name: "test",
            master: {
                id: "1",
                name: "test",
                balance: 100
            },
            recipient: {
                id: "4",
                name: "test4",
                email: "test-guy4@test.com",
                phoneNumber: "+31 20 123 45 67"
            },
            frequency: "",
            amount: 300,
            account: {
                balance: 150,
                name: "account1",
                iban: "NL12 3456 7890 1234",
                transactions: [
                    {
                        amount: 30,
                        counterpartyName: "test",
                        counterpartyIban: "test",
                        description: "money transfer",
                        timestamp: new Date('2018-11-25')
                    },
                    {
                        amount: 60,
                        counterpartyName: "tes2t",
                        counterpartyIban: "test2",
                        description: "money transfer"
                    }
                ]
            },
            status: SubsidyStatus.CLOSED
        },
        {
            id: "2",
            name: "test",
            master: {
                id: "1",
                name: "test",
                balance: 100
            },
            recipient: {
                id: "4",
                name: "test4",
                email: "test-guy4@test.com",
                phoneNumber: "+31 20 123 45 67"
            },
            frequency: "",
            amount: 300,
            account: {
                balance: 220,
                name: "account1",
                iban: "NL12 3456 7890 1234",
                transactions: [
                    {
                        amount: 30,
                        counterpartyName: "test",
                        counterpartyIban: "test",
                        description: "money transfer",
                        timestamp: new Date('2018-12-01')
                    },
                    {
                        amount: 60,
                        counterpartyName: "tes2t",
                        counterpartyIban: "test2",
                        description: "money transfer",
                        timestamp: new Date('2018-12-05')
                    }
                ]
            },
            status: SubsidyStatus.OPEN
        },
        {
            id: "3",
            name: "test",
            master: {
                id: "2",
                name: "test2",
                balance: 100
            },
            recipient: {
                id: "4",
                name: "test4",
                email: "test-guy4@test.com",
                phoneNumber: "+31 20 123 45 67"
            },
            frequency: "",
            amount: 300,
            account: {
                balance: 350,
                name: "account2",
                iban: "NL12 3456 7890 1234",
                transactions: [
                    {
                        amount: 30,
                        counterpartyName: "test",
                        counterpartyIban: "test",
                        description: "money transfer",
                        timestamp: new Date('2018-12-03')
                    },
                    {
                        amount: 60,
                        counterpartyName: "tes2t",
                        counterpartyIban: "test2",
                        description: "money transfer",
                        timestamp: new Date('2018-11-21')
                    }
                ]
            },
            status: SubsidyStatus.PENDING_ACCEPT
        }
    ];
    getAll(initiative?: string) {
        return Promise.resolve(this.fakeData);
    }

    getById(id: string) {
        return Promise.resolve(this.fakeData.find((subs) => subs.id === id) as Subsidy);
    }

    getTransactionsForId(id: string) {
        return this.getById(id).then(subsidy => subsidy.account ? subsidy.account.transactions || [] : []);
    }

    create(subsidy: Subsidy) {
        this.fakeData.push(subsidy);
        return Promise.resolve();
    }
}

export default new FakeSubsidiesService();

