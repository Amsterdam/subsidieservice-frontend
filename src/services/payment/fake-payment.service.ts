import { PaymentService } from './payment.service';
import { Payment } from '../../models/api/payment';
import fakeSubsidyService from '../subsidy/fake-subsidy.service';

export class FakePaymentService implements PaymentService {

    async createPayment(payment: Payment) {
        const subsidies = await fakeSubsidyService.getAll();
        subsidies.find(s => s.id === payment.to!.id)!.account!
            .transactions!.push({
                amount: payment.amount,
                counterparty_name: payment.name,
                description: payment.comment,
                timestamp: new Date()
            });
    }
}

export default new FakePaymentService();
