import { Component, Input } from '@angular/core';
import { AntiqueModel, AuctionModel } from 'libs/models/src';
@Component({
  selector: 'snt-workspace-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent{
  @Input() item: {url:string} & (AntiqueModel | AuctionModel) | undefined;
}
