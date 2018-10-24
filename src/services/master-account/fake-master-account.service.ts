import { MasterAccount } from '@/models/api/masterAccount';
import { IMasterAccountService } from './master-account.service';

export class FakeMasterAccountService implements IMasterAccountService {

    private fakeData: MasterAccount[] = [
        {
            id: "1",
            name: "test",
            balance: 100
        },
        {
            id: "2",
            name: "test2",
            balance: 200
        },
        {
            id: "3",
            name: "test3",
            balance: 300
        },
        {
            id: "4",
            name: "test4",
            balance: 400
        }
    ];

    getAll() {
        return Promise.resolve(this.fakeData);
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
