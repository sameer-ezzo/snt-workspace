import { Component, Input } from '@angular/core';
import { AntiqueModel, EventModel } from '../services/base-data.service';

@Component({
  selector: 'snt-workspace-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent{
  @Input() item: {url:string} & (AntiqueModel | EventModel) | undefined;
}
