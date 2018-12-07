import { PaymentService } from './payment.service';
import { Payment } from '../../models/api/payment';
import fakeSubsidyService from '../subsidy/fake-subsidy.service';

export class FakePaymentService implements PaymentService {

    async createPayment(payment: Payment) {
        const subsidies = await fakeSubsidyService.getAll();
        subsidies.find(s => s.id === payment.from!.id)!.account!
            .transactions!.push({ amount: payment.amount, counterpartyName: payment.name });
    }
}

export default new FakePaymentService();
