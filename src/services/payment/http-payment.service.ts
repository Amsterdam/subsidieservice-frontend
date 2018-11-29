import { PaymentService } from './payment.service';
import { HttpServiceBase } from '../http.service.base';
import { Payment } from '../../models/api/payment';


export class HttpPaymentService extends HttpServiceBase implements PaymentService {
    createPayment(payment: Payment) {
        return super.post('/subsidies/payments', payment);
    }
}

export default new HttpPaymentService();
