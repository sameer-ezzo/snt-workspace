import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { ListPageComponent } from './list-page/list-page.component';
import { ListComponent } from './list/list.component';
import { CardComponent } from './card/card.component';
import { AntiquePageComponent } from './antique-page/antique-page.component';
import { EventPageComponent } from './event-page/event-page.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { materialModules } from './material-modules.module';
import { ReactiveToolbarDirective } from './reactive-toolbar.directive';
import { LazyLoadDirective } from './lazy-load.directive';
import { SwiperModule } from 'swiper/angular';
import { GallrySwiperComponent } from './gallry-swiper/gallry-swiper.component';
import { RelatedItemsSliderComponent } from './related-items-slider/related-items-slider.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ListPageComponent,
    ListComponent,
    CardComponent,
    AntiquePageComponent,
    EventPageComponent,
    ReactiveToolbarDirective,
    LazyLoadDirective,
    GallrySwiperComponent,
    RelatedItemsSliderComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    materialModules,
    SwiperModule,
    BrowserAnimationsModule,
  ],
  providers: [ReactiveToolbarDirective, LazyLoadDirective],
  bootstrap: [AppComponent],
})
export class AppModule {}
