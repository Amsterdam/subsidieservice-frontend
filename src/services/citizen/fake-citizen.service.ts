import { Citizen } from '@/models/api/citizen';
import { CitizenService } from './citizen.service';


export class FakeCitizenService implements CitizenService {

    private fakeData: Citizen[] = [
        {
            id: "1",
            name: "test",
            email: "test-guy@test.com",
            phone_number: "+31 20 123 45 67"
        },
        {
            id: "2",
            name: "test2",
            email: "test-guy2@test.com",
            phone_number: "+31 20 123 45 67"
        },
        {
            id: "3",
            name: "test3",
            email: "test-guy3@test.com",
            phone_number: "+31 20 123 45 67"
        },
        {
            id: "4",
            name: "test4",
            email: "test-guy4@test.com",
            phone_number: "+31 20 123 45 67"
        },
        {
            id: "5",
            name: "test5",
            email: "test-guy5@test.com",
            phone_number: "+31 20 123 45 67"
        },
    ];

    getAll() {
        return Promise.resolve(this.fakeData);
    }

    getById(id: string) {
        return Promise.resolve(this.fakeData.find((acc) => acc.id === id) as Citizen);
    }

    create(citizen: Citizen) {
        this.fakeData.push(citizen);
        return Promise.resolve();
    }
}

export default new FakeCitizenService();

