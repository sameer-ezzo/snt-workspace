import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { AntiqueModel } from 'libs/models/src';
import { firstValueFrom, map, Observable, switchMap, tap } from 'rxjs';
import { PaymentFormComponent } from '../payment-form/payment-form.component';
import { BaseDataService } from '../services/base-data.service';


@Component({
  selector: 'snt-workspace-antique-page',
  templateUrl: './antique-page.component.html',
  styleUrls: ['./antique-page.component.scss']
})
export class AntiquePageComponent {
  constructor(private route: ActivatedRoute, private ds: BaseDataService, public dialog: MatDialog) { }
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
    const result = await firstValueFrom(this.dialog.open(PaymentFormComponent, {
      width: '95%', maxWidth: '900px',
      data: { antique: this.antique }
    }).afterClosed())
    alert(result)
  }

}
