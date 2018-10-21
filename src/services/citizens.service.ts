import { Citizen } from '@/models/citizen';


export class CitizenService {

    private fakeData: Citizen[] = [
        {
            id: "1",
            name: "test",
            email: "test-guy@test.com",
            phoneNumber: "+31 20 123 45 67"
        },
        {
            id: "2",
            name: "test2",
            email: "test-guy2@test.com",
            phoneNumber: "+31 20 123 45 67"
        },
        {
            id: "3",
            name: "test3",
            email: "test-guy3@test.com",
            phoneNumber: "+31 20 123 45 67"
        },
        {
            id: "4",
            name: "test4",
            email: "test-guy4@test.com",
            phoneNumber: "+31 20 123 45 67"
        },
        {
            id: "5",
            name: "test5",
            email: "test-guy5@test.com",
            phoneNumber: "+31 20 123 45 67"
        },
    ];

    getAll() {
        return Promise.resolve(this.fakeData);
    }

    getById(id: string) {
        return Promise.resolve(this.fakeData.find((acc) => acc.id === id));
    }

    create(account: Citizen) {
        this.fakeData.push(account);
        return Promise.resolve();
    }
}

export default new CitizenService();
