import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import SwiperCore, { FreeMode, Navigation, Thumbs } from 'swiper';

SwiperCore.use([FreeMode, Navigation, Thumbs]);

@Component({
  selector: 'snt-workspace-gallry-swiper',
  templateUrl: './gallry-swiper.component.html',
  styleUrls: ['./gallry-swiper.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class GallrySwiperComponent {
  @Input() items: string[] = []
  thumbsSwiper: any
}
