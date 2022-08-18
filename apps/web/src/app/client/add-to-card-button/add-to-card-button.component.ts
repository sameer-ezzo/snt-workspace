import { Component, Input } from '@angular/core';
import { AntiqueModel, AuctionModel } from 'libs/models/src';
import { BehaviorSubject, filter, firstValueFrom, map, Observable, Subject, Subscription, takeUntil, tap } from 'rxjs';
import { CartService } from '../services/cart.service';
@Component({
  selector: 'snt-workspace-add-to-card-button',
  templateUrl: './add-to-card-button.component.html',
  styleUrls: ['./add-to-card-button.component.scss']
})
export class AddToCardButtonComponent {
  isInCart: boolean = false
  private inCartSub!: Subscription
  inCart = new BehaviorSubject<{ color: string, icon: string }>({ color: 'primary', icon: 'add_shopping_cart' })


  private _item!: any;
  @Input()
  public get item(): any {
    return this._item;
  }
  public set item(v: any) {
    this._item = v;
    this.inCartSub?.unsubscribe()
    this.inCartSub = this.cart.isInCart(this.item).subscribe(x => {
      this.isInCart = x
      this.inCart.next(x === false ? { color: 'primary', icon: 'add_shopping_cart' } : { color: 'warn', icon: 'remove_shopping_cart' })
    })
  }


  constructor(public cart: CartService) { }
  async toggle() {

    if (this.isInCart === true) await this.cart.remove(this.item._id)
    else await this.cart.add(this.item._id, this.item.url)

    this.item = { ...this.item }
  }


  ngOnDestroy(): void {
    this.inCartSub?.unsubscribe()
  }
}
