import { Payment } from '../../models/api/payment';
import { FakePaymentService } from './fake-payment.service';

export interface PaymentService {
    createPayment(payment: Payment): Promise<void>;
}

export default new FakePaymentService as PaymentService;