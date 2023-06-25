import { animate, style, transition, trigger } from '@angular/animations';
import { AfterViewInit, Component, Input, SimpleChanges } from '@angular/core';
import { BaseDataService } from '../services/base-data.service';
import { BehaviorSubject, debounceTime, fromEvent } from 'rxjs';
import { ScrollEvent } from './scroll.directive';
import { DataService } from '../../shared/data.service';
import { getAA, mapAAItem } from '../helpers';

@Component({
  selector: 'snt-list',
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
  pageSize = 12
  readonly loading$ = new BehaviorSubject(false);
  public set loading(v: boolean) {
    if (this.loading$.value !== v) this.loading$.next(v)
  }

  constructor(private ds: BaseDataService) { }


  latestFilledIndex = 0;
  viewColumns: any[] = new Array(3).fill([]).map(() => [])


  async ngOnChanges(changes: SimpleChanges): Promise<void> {
    if (changes['collection']) {
      this.page = 1
      await this._getPageItems()
      console.log(this.items);
      
    }
  }

  // this.initializeViewColumns()
  private async _getPageItems() {
    this.loading = true
    try {
      const { result, total } = await getAA(this.ds, this.collection, this.page)
      this.total = total
      console.log(result);
      
      let i = 0
      for (i = 0; i < result.length; i++) {
        const item = result[i] as any

        const idx = (this.latestFilledIndex + i) % this.viewColumns.length
        this.viewColumns[idx].push(item)
      }
      this.latestFilledIndex = i
    } catch (error) {
      console.error(error);
    }
    finally {
      this.loading = false
    }
  }

  initializeViewColumns() {
    //reset viewColumns depending on viewport width
    this.latestFilledIndex = 0
    this.viewColumns = new Array(3).fill([]).map(() => [])
  }

  private async changePage(p: number) {
    if (p === this.page) return
    console.log('Change Page To: ', p);

    this.page = p
    await this._getPageItems()
  }

  lastScrollHeight = 0
  onPageDown(e: ScrollEvent) {
    if (e.top <= this.lastScrollHeight) return
    this.changePage(this.page + 1)
    this.lastScrollHeight = e.height
  }
}


