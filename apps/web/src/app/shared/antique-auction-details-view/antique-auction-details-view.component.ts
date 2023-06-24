import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { AntiqueModel, AuctionModel } from 'libs/models/src';
import { CartService } from '../cart.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';


@Component({
  selector: 'snt-aa-details',
  templateUrl: './antique-auction-details-view.component.html',
  styleUrls: ['./antique-auction-details-view.component.scss']
})
export class AntiqueAuctionDetailsViewComponent {
  dateOfManufacture: string | Date | null = null;
  constructor(private route: ActivatedRoute,
    private sanitizer: DomSanitizer,
    private cart: CartService,
    private router: Router,
    public dialog: MatDialog) {
  }

  currency: string | null = null
  price: number | null = null
  map!: SafeResourceUrl;

  images: string[] = []

  @Input() view: 'antique' | 'auction' = 'antique'
  private _model!: AntiqueModel | AuctionModel;
  @Input()
  public get model(): AntiqueModel | AuctionModel {
    return this._model;
  }
  public set model(value: AntiqueModel | AuctionModel) {
    this._model = value;
    if('map' in value && value.map){
      const url = value.map
      this.map = this.sanitizer.bypassSecurityTrustResourceUrl(url);
    }
    const { currency, price } = value as AntiqueModel
    this.currency = currency
    this.price = price
    this.images = 'images' in value ? value.images : value.antique.images
    this.dateOfManufacture = 'dateOfManufacture' in value ? value.dateOfManufacture : value.antique.dateOfManufacture
  }

  async openPaymentFormDialog() {
    if (!this.model) return
    const isInCart = this.cart.isInCart(this.model._id)
    if (isInCart === false) await this.cart.add(this.model._id, location.href)
    this.router.navigateByUrl('/shopping/checkout')
  }

}
