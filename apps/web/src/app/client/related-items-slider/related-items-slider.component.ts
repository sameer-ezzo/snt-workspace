import {
  ChangeDetectionStrategy,
  Component,
  Input,
  ViewEncapsulation,
} from '@angular/core';
import { ReplaySubject } from 'rxjs';
import SwiperCore, { FreeMode, Navigation, Thumbs } from 'swiper';

SwiperCore.use([FreeMode, Navigation, Thumbs]);

@Component({
  selector: 'snt-related-items-slider',
  templateUrl: './related-items-slider.component.html',
  styleUrls: ['./related-items-slider.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RelatedItemsSliderComponent {

  items$ = new ReplaySubject(1)

  private _items: any[] = [];
  @Input()
  public get items(): any[] {
    return this._items;
  }
  public set items(v: any[]) {
    this._items = v;
    this.items$.next(v);
  }



}
