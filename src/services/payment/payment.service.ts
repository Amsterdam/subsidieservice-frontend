import { Payment } from '../../models/api/payment';
import fakePaymentService from './fake-payment.service';
import httpPaymentService from './http-payment.service';

export interface PaymentService {
    createPayment(payment: Payment): Promise<void>;
}

const defaultService = process.env.VUE_APP_USE_STUBS === "true" ? fakePaymentService : httpPaymentService;
export default defaultService as PaymentService;
