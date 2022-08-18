import { Component } from '@angular/core';
import { CartItem } from '@snt-workspace/models';
import { AuthService } from '../../membership/auth.service';
import { CartService } from '../services/cart.service';
@Component({
  selector: 'snt-workspace-client-layout-page',
  templateUrl: './client-layout-page.component.html',
  styleUrls: ['./client-layout-page.component.scss']
})
export class ClientLayoutPageComponent {
  constructor(public cart: CartService, public auth: AuthService) { }

  async removeCartItem(itemId: string) {
    await this.cart.remove(itemId)

  }
}
