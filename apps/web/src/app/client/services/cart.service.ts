import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'apps/web/src/environments/environment';
import { AntiqueModel, CartItem, ListResult } from 'libs/models/src';
import { filter, firstValueFrom, map, Observable, switchMap, tap } from 'rxjs';
import { AuthService } from '../../membership/auth.service';



@Injectable({
    providedIn: 'root'
})
export class CartService {


    readonly cart$: Observable<CartItem[]> = this.auth.user$.pipe(
        filter(user => user !== null),
        switchMap(user => this.http.get<ListResult<CartItem>>(`${environment.base}/cart/${user!.sub}`).pipe(map(res => res.data))),
    )

    constructor(private http: HttpClient, private auth: AuthService) { }


    isInCart(item: CartItem | any): Observable<boolean> {
        return this.cart$.pipe(map(cart => cart.some(x => x.itemId === item._id)))
    }

    async add(itemId: string, url: string) {
        try {
            const post = { itemId, url, userId: this.auth.user?.sub }
            const cart = await firstValueFrom(this.http.post(`${environment.base}/cart/add`, post))
            this._updateCart(cart)
        } catch (error) {

        }

    }
    async remove(itemId: string) {
        try {
            const post = { itemId, userId: this.auth.user?.sub }
            const cart = await firstValueFrom(this.http.post(`${environment.base}/cart/remove`, post))
            this._updateCart(cart)
        } catch (error) {

        }
    }
    private _updateCart(cart: Object) {
        this.auth.refresh()
    }
}