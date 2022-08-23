import { Component } from '@angular/core';
import { MatMenuItem } from '@angular/material/menu';
import { Router } from '@angular/router';
import { CartItem } from '@snt-workspace/models';
import { AuthService } from '../../membership/auth.service';
import { CartService } from '../services/cart.service';
@Component({
  selector: 'snt-workspace-client-layout-page',
  templateUrl: './client-layout-page.component.html',
  styleUrls: ['./client-layout-page.component.scss']
})
export class ClientLayoutPageComponent {
  menuItemClicked = menuItemClickedHandler
  constructor(public cart: CartService,
    private router: Router,
    public auth: AuthService) { }

  async removeCartItem(itemId: string) {
    await this.cart.remove(itemId)
  }
  checkout() {
    this.router.navigateByUrl('/client/checkout')
  }
}



function menuItemClickedHandler(e: any) {
  e.preventDefault();
  e.stopPropagation();
}
