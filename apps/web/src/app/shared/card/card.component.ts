import { Component, Input, ViewEncapsulation } from '@angular/core';
import { AntiqueModel, AuctionModel } from 'libs/models/src';
@Component({
  selector: 'snt-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class CardComponent{
  @Input() item: {url:string} & (AntiqueModel | AuctionModel) | undefined;
}
