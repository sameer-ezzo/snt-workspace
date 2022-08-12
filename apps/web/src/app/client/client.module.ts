import { NgModule } from '@angular/core';

import { ClientRoutingModule } from './client-routing.module';
import { SwiperModule } from 'swiper/angular';
import { PaymentFormComponent } from './payment-form/payment-form.component';
import { AntiquePageComponent } from './antique-page/antique-page.component';
import { CardComponent } from './card/card.component';
import { EventPageComponent } from './event-page/event-page.component';
import { GallrySwiperComponent } from './gallry-swiper/gallry-swiper.component';
import { HomeComponent } from './home/home.component';
import { ListPageComponent } from './list-page/list-page.component';
import { ListComponent } from './list/list.component';
import { PaginatorComponent } from './paginator/paginator.component';
import { RelatedItemsSliderComponent } from './related-items-slider/related-items-slider.component';
import { NgPaymentCardModule } from 'ng-payment-card';
import { SharedModule } from '../shared/shared.module';
import { ClientLayoutPageComponent } from './client-layout-page/client-layout-page.component';


@NgModule({
  declarations: [
    ClientLayoutPageComponent,
    HomeComponent,
    ListPageComponent,
    ListComponent,
    CardComponent,
    AntiquePageComponent,
    EventPageComponent,
    GallrySwiperComponent,
    RelatedItemsSliderComponent,
    PaginatorComponent,
    PaymentFormComponent
  ],
  imports: [
    SharedModule,
    ClientRoutingModule,
    SwiperModule,
    NgPaymentCardModule
  ]
})
export class ClientModule { }
