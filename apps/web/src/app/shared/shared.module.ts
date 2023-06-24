import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { materialModules } from './material-modules.module';
import { ReactiveToolbarDirective } from './reactive-toolbar.directive';
import { AddressComponent } from './address/address.component';
import { AddressListComponent } from './address-list/address-list.component';
import { NavBarMenuComponent } from './nav-bar-menu/nav-bar-menu.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { GallerySwiperComponent } from './gallery-swiper/gallery-swiper.component';
import { PaginatorComponent } from './paginator/paginator.component';
import { SwiperModule } from 'swiper/angular';
import { CardComponent } from './card/card.component';
import { RouterModule } from '@angular/router';
import { LazyLoadImageDirective } from './lazy-load.directive';
import { AntiqueAuctionDetailsViewComponent } from './antique-auction-details-view/antique-auction-details-view.component';
import { AddToCardButtonComponent } from './add-to-card-button/add-to-card-button.component';



const declarations = [
  GallerySwiperComponent, PaginatorComponent,
  ReactiveToolbarDirective, LazyLoadImageDirective,
  CardComponent,
  AddToCardButtonComponent,
  AntiqueAuctionDetailsViewComponent,
  NavBarMenuComponent, AddressComponent, AddressListComponent]
const imports = [
  CommonModule,
  RouterModule,
  SwiperModule,
  FormsModule, 
  ReactiveFormsModule,
  materialModules
]
const providers = [
  ReactiveToolbarDirective,
  LazyLoadImageDirective,
  { provide: 'API_BASE', useValue: null }
]

@NgModule({
  declarations: [...declarations],
  imports: [...imports],
  providers: [...providers],
  exports: [...declarations, ...imports]
})
export class SharedModule {
  static forRoot(options: { api_base: string }) {
    return {
      ngModule: SharedModule,
      providers: [
        ...providers,
        { provide: 'API_BASE', useValue: options.api_base }
      ]
    }
  }
}
