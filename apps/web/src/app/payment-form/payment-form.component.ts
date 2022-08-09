import { Component } from '@angular/core';

@Component({
  selector: 'payment-form',
  templateUrl: './payment-form.component.html',
  styleUrls: ['./payment-form.component.scss']
})
export class PaymentFormComponent {
  model:any = {}
  processPayment(c: any) {
    console.log(c);

  }
}
