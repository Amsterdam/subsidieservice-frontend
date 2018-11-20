import { PaymentService } from './payment.service';
import { Payment } from '../../models/api/payment';

export class FakePaymentService implements PaymentService {

    createPayment(payment: Payment) {
        console.log({ message: 'created new payment', payment });
        return Promise.resolve();
    }
}

export default new FakePaymentService();