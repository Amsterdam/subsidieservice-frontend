import { Subsidy } from '@/models/api/subsidy';
import { SubsidiesService } from './subsidy.service';

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
                balance: 100,
                name: "account1",
                iban: "NL12 3456 7890 1234",
                transactions: [
                    {
                        amount: 30,
                        counterpartyName: "test",
                        counterpartyIban: "test",
                        description: "money transfer"
                    },
                    {
                        amount: 60,
                        counterpartyName: "tes2t",
                        counterpartyIban: "test2",
                        description: "money transfer"
                    }
                ]
            }
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
                balance: 100,
                name: "account1",
                iban: "NL12 3456 7890 1234",
                transactions: [
                    {
                        amount: 30,
                        counterpartyName: "test",
                        counterpartyIban: "test",
                        description: "money transfer"
                    },
                    {
                        amount: 60,
                        counterpartyName: "tes2t",
                        counterpartyIban: "test2",
                        description: "money transfer"
                    }
                ]
            }
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
                balance: 100,
                name: "account2",
                iban: "NL12 3456 7890 1234",
                transactions: [
                    {
                        amount: 30,
                        counterpartyName: "test",
                        counterpartyIban: "test",
                        description: "money transfer"
                    },
                    {
                        amount: 60,
                        counterpartyName: "tes2t",
                        counterpartyIban: "test2",
                        description: "money transfer"
                    }
                ]
            }
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

