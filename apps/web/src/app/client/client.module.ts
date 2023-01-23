import { NgModule } from '@angular/core';

import { ClientRoutingModule } from './client-routing.module';
import { SwiperModule } from 'swiper/angular';
import { AntiquePageComponent } from './antique-page/antique-page.component';
import { EventPageComponent } from './event-page/event-page.component';
import { HomeComponent } from './home/home.component';
import { ListPageComponent } from './list-page/list-page.component';
import { ListComponent } from './list/list.component';
import { RelatedItemsSliderComponent } from './related-items-slider/related-items-slider.component';
import { SharedModule } from '../shared/shared.module';
import { ClientLayoutPageComponent } from './client-layout-page/client-layout-page.component';

import { ShoppingModule } from '../shopping/shopping.module';


@NgModule({
  declarations: [
    ClientLayoutPageComponent,
    HomeComponent,
    ListPageComponent,
    ListComponent,
    AntiquePageComponent,
    EventPageComponent,
    RelatedItemsSliderComponent
  ],
  imports: [
    SharedModule,
    ClientRoutingModule,
    ShoppingModule
  ]
})
export class ClientModule { }
