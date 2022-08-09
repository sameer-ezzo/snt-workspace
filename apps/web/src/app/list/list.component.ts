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

  @Input() collection: 'antiques' | 'auctions' = 'antiques';
  items: any[] = [];
  total = 0
  page = 1
  pageSize = 50

  constructor(private ds: BaseDataService) { }

  latestFilledIndex = 0;
  viewColumns: any[] = new Array(3).fill([]).map(() => [])


  async ngOnChanges(changes: SimpleChanges): Promise<void> {
    if (changes['collection']) {
      this.page = 1
      await this._getPageItems()
    }
  }

  private async _getPageItems() {
    this.initializeViewColumns()
    let result = null
    try {
      result = await this.ds.get(this.collection, this.page, this.pageSize)
      this.total = result.total

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
  initializeViewColumns() {
    //reset viewColumns depending on viewport width
    this.latestFilledIndex = 0
    this.viewColumns = new Array(3).fill([]).map(() => [])
  }



  async changePage(p: number) {
    this.page = p
    await this._getPageItems()
    setTimeout(() => {
      window.scroll({ top: 0, left: 0, behavior: 'smooth' })
    }, 1000);

  }

}
