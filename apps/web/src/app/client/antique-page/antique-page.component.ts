import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { AntiqueModel } from 'libs/models/src';
import { filter, firstValueFrom, map, Observable, switchMap, tap } from 'rxjs';
import { BaseDataService } from '../services/base-data.service';
import { CartService } from '../../shared/cart.service';
import { getAA } from '../helpers';


@Component({
  selector: 'snt-antique-page',
  templateUrl: './antique-page.component.html',
  styleUrls: ['./antique-page.component.scss']
})
export class AntiquePageComponent {
  constructor(private route: ActivatedRoute,
    private cart: CartService,
    private router: Router,
    private ds: BaseDataService, public dialog: MatDialog) {
  }

  antique!: any
  antique$: Observable<any> = this.route.params.pipe(
    map(params => params['slug']),
    tap(slug => {
      document.querySelector('.mat-drawer-content')?.scrollTo({ top: 0, behavior: 'smooth' })
      if (!slug) throw new Error("No slug provided")
    }),
    switchMap(slug => this.ds.find<AntiqueModel>('antiques', slug)),
    map(antique => ({ ...antique, url: document.location.href })),
    tap(antique => this.antique = antique)
  )

 
  similarITems: Observable<AntiqueModel[]> = this.antique$.pipe(
    switchMap(auction => getAA(this.ds, 'antiques', 1, 6)),
    map(res => res.result)
  )




  async openPaymentFormDialog() {
    if (!this.antique) return

    const isInCart = this.cart.isInCart(this.antique._id)
    if (isInCart === false) await this.cart.add(this.antique._id, location.href)
    this.router.navigateByUrl('/shopping/checkout')
  }

}
