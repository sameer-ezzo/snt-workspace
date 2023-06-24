import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { AntiqueModel, AuctionModel } from 'libs/models/src';
import { filter, firstValueFrom, map, Observable, switchMap, tap } from 'rxjs';
import { BaseDataService } from '../services/base-data.service';
import { CartService } from '../../shopping/cart.service';


@Component({
  selector: 'snt-workspace-auction-page',
  templateUrl:'./auction-page.component.html',
  styleUrls: ['./auction-page.component.scss']
})
export class AuctionPageComponent {
  constructor(private route: ActivatedRoute,
    private cart: CartService,
    private router: Router,
    private ds: BaseDataService, public dialog: MatDialog) {
  }

  auction!: any
  auction$: Observable<any> = this.route.params.pipe(
    map(params => params['slug']),
    tap(slug => {
      document.querySelector('.mat-drawer-content')?.scrollTo({ top: 0, behavior: 'smooth' })
      if (!slug) throw new Error("No slug provided")
    }),
    switchMap(slug => this.ds.find<AuctionModel>('auctions', slug)),
    map(auction => ({ ...auction, url: document.location.href })),
    tap(auction => this.auction = auction)
  )

  similarITems: Observable<AuctionModel[]> = this.auction$.pipe(
    switchMap(auction => this.ds.get<AuctionModel>('auctions', { per_page: 6, page: 1 })),
    map(res => res?.data?.map(x => { return { ...x, url: `/client/auction/${x.slug}` } }))
  )





  async openPaymentFormDialog() {
    if (!this.auction) return

    const isInCart = this.cart.isInCart(this.auction._id)
    if (isInCart === false) await this.cart.add(this.auction._id, location.href)
    this.router.navigateByUrl('/shopping/checkout')
  }

}
