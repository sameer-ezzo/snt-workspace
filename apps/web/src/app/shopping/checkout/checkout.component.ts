import { Location } from '@angular/common';
import { Component, ViewEncapsulation } from '@angular/core';
import { filter, Subject, takeUntil } from 'rxjs';
import { CartService } from '../../shared/cart.service';

@Component({
  selector: 'snt-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class CheckoutComponent {

  card = {
    name: '',
    number: '',
    cvc: '',
    expiry: ''
  }
  destroyed = new Subject<void>()
  constructor(
    private location: Location,
    public cartService: CartService) {

    this.cartService.cart$.pipe(filter(c => c.length === 0),
      takeUntil(this.destroyed))
      .subscribe(c => {
        this.location.back();
      })
  }

  ngOnDestroy() {
    this.destroyed.next();
    this.destroyed.complete();
  }
}