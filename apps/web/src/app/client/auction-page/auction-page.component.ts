import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { AntiqueModel, AuctionModel } from 'libs/models/src';
import { filter, firstValueFrom, map, Observable, switchMap, tap } from 'rxjs';
import { BaseDataService } from '../services/base-data.service';
import { CartService } from '../../shared/cart.service';
import { getAA } from '../helpers'

@Component({
  selector: 'snt-auction-page',
  templateUrl: './auction-page.component.html',
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
    switchMap(slug => this.ds.get<AuctionModel>('auctions', {
      page: 1,
      per_page: 1,
      // select: '_id,name,slug,image,shortDescription,category',
      slug,
      lookup: {
        from: 'antiques',
        lf: 'antique.aid', ff: '_id', as: 'item',
        first: true
      }
    }
    )),
    map(res => res.data.shift() as any),
    map(auction => ({
      ...auction,
      antique: auction.item,
      item: undefined, url: document.location.href
    })),
    tap(auction => this.auction = auction)
  )

  similarITems: Observable<AuctionModel[]> = this.auction$.pipe(
    switchMap(auction => getAA(this.ds, 'auctions', 1, 6)),
    map(res => res.result)
  )





  async openPaymentFormDialog() {
    if (!this.auction) return

    const isInCart = this.cart.isInCart(this.auction._id)
    if (isInCart === false) await this.cart.add(this.auction._id, location.href)
    this.router.navigateByUrl('/shopping/checkout')
  }

}
