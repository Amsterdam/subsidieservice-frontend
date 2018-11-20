import { Payment } from '../../models/api/payment';
import fakePaymentService from './fake-payment.service';

export interface PaymentService {
    createPayment(payment: Payment): Promise<void>;
}

export default fakePaymentService as PaymentService;
