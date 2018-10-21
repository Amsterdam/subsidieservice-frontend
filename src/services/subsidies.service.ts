import { Subsidy } from '@/models/subsidy';

export class SubsidiesService {

    private fakeData: Subsidy[] = [
        {
            id: "1",
            name: "test",
            // master: "",
            // recipient: "",
            frequency: "",
            account: {
                balance: 100,
                name: "account1",
                iban: "098789230873ryfgdbc",
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
    getAll() {
        return Promise.resolve(this.fakeData);
    }

    getById(id: string) {
        return Promise.resolve(this.fakeData.find((subs) => subs.id === id));
    }

    create(subsidy: Subsidy) {
        this.fakeData.push(subsidy);
        return Promise.resolve();
    }
}

export default new SubsidiesService();

