import { Component, Input } from '@angular/core';
import { CartService } from '../cart.service';
@Component({
  selector: 'snt-add-to-card-button',
  templateUrl: './add-to-card-button.component.html',
  styleUrls: ['./add-to-card-button.component.scss']
})
export class AddToCardButtonComponent {
  isInCart = true

  private _item!: any;
  @Input()
  public get item(): any {
    return this._item;
  }
  public set item(v: any) {
    this._item = v;
    this.isInCart = this.cart.isInCart(this.item?._id)
  }


  constructor(public cart: CartService) { }
  async toggle() {
    await this.cart.add(this.item._id, this.item.url)
    this.isInCart = this.cart.isInCart(this.item?._id)
  }
}
