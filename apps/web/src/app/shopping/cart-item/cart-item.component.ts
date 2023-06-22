import { Component, Input } from '@angular/core';
import { CartItem } from '@snt-workspace/models';
import { CartService } from '../../shopping/cart.service';

@Component({
  selector: 'snt-workspace-cart-item',
  templateUrl: './cart-item.component.html',
  styleUrls: ['./cart-item.component.scss']
})
export class CartItemComponent {
  @Input() item!: CartItem

  constructor(public cart: CartService) { }

  async removeCartItem(itemId: string) {
    await this.cart.remove(itemId)
  }
}
