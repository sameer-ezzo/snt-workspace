import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { environment } from 'apps/web/src/environments/environment';
import { CartItem, ListResult } from 'libs/models/src';
import { filter, first, firstValueFrom, map, Observable, of, ReplaySubject, startWith, switchMap, tap } from 'rxjs';
import { AuthService } from '../membership/auth.service';



@Injectable({
    providedIn: 'root'
})
export class CartService {
    
    private _cartItems: CartItem[] = []
    
    
    
    private readonly _cart$ = new ReplaySubject<CartItem[]>(1)
    readonly cart$ = this._cart$.asObservable()
    
    public get cart(): CartItem[] {
        return this._cartItems;
    }
    public set cart(v: CartItem[]) {
        this._cart$.next(v)
        localStorage.setItem(this._getLocalStorageKey(), JSON.stringify(v))
    }
    private _getLocalStorageKey(): string {
        return `cart_${this.auth.user?.sub}`
    }

    private fetchUserCart = () =>
        this.auth.user$.pipe(
            filter(user => !!user),
            first(),
            switchMap(user => !user ? of([]) : this.http.get<ListResult<CartItem>>(`${environment.base}/cart/${user.sub}`).pipe(
                map(res => res.data),
                startWith(this._readLocalCart())
            ))
        )

    private _readLocalCart(): CartItem[] {
        try {
            const str = localStorage.getItem(this._getLocalStorageKey()) ?? '[]'
            return JSON.parse(str)
        } catch (error) {
            return []
        }
    }

    constructor(private http: HttpClient, private auth: AuthService,
        private snack: MatSnackBar) {
        this.fetchUserCart().subscribe(c => this.cart = c)
    }


    isInCart = (id: string) => this.cart.some(x => x.itemId === id)

    async add(itemId: string, url: string) {
        try {
            const post = { itemId, url, userId: this.auth.user?.sub }
            const result = await firstValueFrom(this.http.post<CartItem[]>(`${environment.base}/cart/add`, post))
            this.cart = result.slice()
        } catch (e: any) {
            const err = e.error
            this.snack.open(err.message ?? err, undefined, {
                horizontalPosition: 'center',
                verticalPosition: 'top'
            });
        }

    }
    async remove(itemId: string) {
        try {
            const post = { itemId, userId: this.auth.user?.sub }
            const result = await firstValueFrom(this.http.post<CartItem[]>(`${environment.base}/cart/remove`, post))
            this.cart = result.slice()
        } catch (e: any) {
            const err = e.error
            this.snack.open(err.message ?? err, undefined, {
                horizontalPosition: 'center',
                verticalPosition: 'top'
            });
        }
    }

}