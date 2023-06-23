import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from '../cart.service';

@Component({
  selector: 'cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

  constructor(public cart: CartService, private router: Router) { }

  ngOnInit(): void {
  }
  checkout() {
    this.router.navigateByUrl('/client/checkout')
  }
}
