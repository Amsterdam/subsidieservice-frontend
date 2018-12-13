import { Payment } from '../../models/api/payment';
import fakePaymentService from './fake-payment.service';
import httpPaymentService from './http-payment.service';

export interface PaymentService {
    createPayment(payment: Payment): Promise<void>;
}

export default httpPaymentService as PaymentService;
