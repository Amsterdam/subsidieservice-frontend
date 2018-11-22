import { MasterAccount } from '@/models/api/masterAccount';
import { MasterAccountService } from './master-account.service';

export class FakeMasterAccountService implements MasterAccountService {

    private fakeData: MasterAccount[] = [
        {
            id: "1",
            name: "test",
            balance: 100,
            iban: 'NL98 7654 3210 1234',
            initiative: "first-init",
        },
        {
            id: "2",
            name: "test2",
            balance: 200,
            iban: 'NL98 7654 3210 2341',
            initiative: "first-init",
        },
        {
            id: "3",
            name: "test3",
            balance: 300,
            iban: 'NL98 7654 3210 3421',
            initiative: "second-init",
        },
        {
            id: "4",
            name: "test4",
            balance: 400,
            iban: 'NL98 7654 3210 4321',
            initiative: "second-init"
        }
    ];

    getAll(initiative?: string) {
        return Promise.resolve(this.fakeData.filter(i => i.initiative == initiative));
    }

    getById(id: string) {
        return Promise.resolve(this.fakeData.find((acc) => acc.id === id) as MasterAccount);
    }

    create(account: MasterAccount) {
        this.fakeData.push(account);
        return Promise.resolve();
    }
}

export default new FakeMasterAccountService();
