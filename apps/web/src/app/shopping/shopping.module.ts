import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ShoppingRoutingModule } from './shopping-routing.module';
import { AddToCardButtonComponent } from './add-to-card-button/add-to-card-button.component';
import { CartItemComponent } from './cart-item/cart-item.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { CartComponent } from './cart/cart.component';
import { BankCardComponent } from './bank-card/bank-card.component';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    CheckoutComponent, 
    AddToCardButtonComponent,
    CartItemComponent,
    CartComponent,
    BankCardComponent
  ],
  imports: [
    SharedModule,
    ShoppingRoutingModule
  ],
  exports: [
    AddToCardButtonComponent,
    CartItemComponent,
    CartComponent
  ]
})
export class ShoppingModule { }
