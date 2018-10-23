import { Subsidy } from '@/models/subsidy';
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
                phone_number: "+31 20 123 45 67"
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
                        counterparty_name: "test",
                        counterparty_iban: "test",
                        description: "money transfer"
                    },
                    {
                        amount: 60,
                        counterparty_name: "tes2t",
                        counterparty_iban: "test2",
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
        return Promise.resolve(this.fakeData.find((subs) => subs.id === id) as Subsidy);
    }

    create(subsidy: Subsidy) {
        this.fakeData.push(subsidy);
        return Promise.resolve();
    }
}

export default new FakeSubsidiesService();

