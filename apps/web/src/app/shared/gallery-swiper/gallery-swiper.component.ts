import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import SwiperCore, { FreeMode, Navigation, Thumbs } from 'swiper';

SwiperCore.use([FreeMode, Navigation, Thumbs]);

@Component({
  selector: 'snt-workspace-gallery-swiper',
  templateUrl: './gallery-swiper.component.html',
  styleUrls: ['./gallery-swiper.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class GallerySwiperComponent {
  @Input() items: string[] = []
  thumbsSwiper: any
}
