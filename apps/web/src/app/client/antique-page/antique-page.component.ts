import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { AntiqueModel } from 'libs/models/src';
import { firstValueFrom, map, Observable, switchMap, tap } from 'rxjs';
import { BaseDataService } from '../services/base-data.service';
import { CartService } from '../services/cart.service';


@Component({
  selector: 'snt-workspace-antique-page',
  templateUrl: './antique-page.component.html',
  styleUrls: ['./antique-page.component.scss']
})
export class AntiquePageComponent {
  constructor(private route: ActivatedRoute,
    private cart: CartService,
    private router: Router,
    private ds: BaseDataService, public dialog: MatDialog) { }
  antique!: any
  antique$: Observable<any> = this.route.params.pipe(
    map(params => params['slug']),
    tap(slug => { if (!slug) throw new Error("No slug provided") }),
    switchMap(slug => this.ds.find<AntiqueModel>('antiques', slug)),
    map(antique => ({ ...antique, url: document.location.href })),
    tap(antique => this.antique = antique)
  )

  similarITems: Observable<AntiqueModel[]> = this.antique$.pipe(
    switchMap(antique => this.ds.get<AntiqueModel>('antiques', { per_page: 6, page: 1 })),
    map(res => res?.data?.map(x => { return { ...x, url: `/client/antiques/${x.slug}` } }))
  )





  async openPaymentFormDialog() {
    if (!this.antique) return

    const isInCart = await firstValueFrom(this.cart.isInCart(this.antique._id))
    if (isInCart === false) await this.cart.add(this.antique._id, location.href)
    this.router.navigateByUrl('/client/checkout')
  }

}
