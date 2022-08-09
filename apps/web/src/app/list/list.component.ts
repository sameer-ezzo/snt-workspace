import { animate, style, transition, trigger } from '@angular/animations';
import { Component, Input, SimpleChanges } from '@angular/core';
import { BaseDataService } from '../services/base-data.service';

@Component({
  selector: 'snt-workspace-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
  animations: [
    trigger('slideInOut', [
      transition(':enter', [
        style({ transform: 'translateY(-100%)' }),
        animate('200ms ease-in', style({ transform: 'translateY(0%)' }))
      ]),
      transition(':leave', [
        animate('200ms ease-in', style({ transform: 'translateY(-100%)' }))
      ])
    ])
  ]
})
export class ListComponent {

  @Input() collection: 'antiques' | 'events' = 'antiques';
  items: any[] = [];

  constructor(private ds: BaseDataService) { }

  latestFilledIndex = 0;
  viewColumns: any[] = new Array(3).fill([]).map(() => [])


  async ngOnChanges(changes: SimpleChanges): Promise<void> {
    if (changes['collection']) {
      let result = null
      try {
        result = await this.ds.get(this.collection, 1)
        
        const items = (result.data ?? []).map(item => { return { ...item, url: `/${this.collection === 'antiques' ? 'antique' : 'event'}/${item.slug}` } })
        let i = 0
        for (i = 0; i < items.length; i++) {
          const item = items[i] as any
          const idx = (this.latestFilledIndex + i) % this.viewColumns.length
          this.viewColumns[idx].push(item)
        }
        this.latestFilledIndex = i
      } catch (error) {
        console.error(error);
      }
    }
  }

}
