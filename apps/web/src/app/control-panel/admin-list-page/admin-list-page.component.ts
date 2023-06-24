import { HttpClient } from '@angular/common/http'
import { Component, ViewChild } from '@angular/core'
import { MatPaginator } from '@angular/material/paginator'
import { MatSort } from '@angular/material/sort'
import { ActivatedRoute, Router } from '@angular/router'
import { catchError, debounceTime, firstValueFrom, map, merge, of, ReplaySubject, startWith, Subject, switchMap, tap, throwError } from 'rxjs'
import { DataService } from '../../shared/data.service'

@Component({
  selector: 'snt-admin-list-page',
  templateUrl: './admin-list-page.component.html',
  styleUrls: ['./admin-list-page.component.scss'],
})
export class AdminListPageComponent {
  @ViewChild(MatPaginator)
  paginator!: MatPaginator
  @ViewChild(MatSort)
  sort!: MatSort
  collection!: string
  collection$ = this.route.params.pipe(map(params => params['collection'] as string), tap(collection => this.collection = collection))
  columns$ = this.collection$.pipe(map(c => ListDescriptors[c]?.columns ?? []))
  displayedColumns$ = this.collection$.pipe(map(c => ListDescriptors[c]?.displayedColumns ?? []))

  data: any[] = []
  total: number = 0
  pageSize = 50

  isLoadingResults = true
  get limitReached(): boolean {
    return Math.ceil(this.total / this.pageSize) === ((this.paginator?.pageIndex ?? 0) + 1)
  }
  constructor(
    private router: Router,
    private dataService: DataService, private route: ActivatedRoute) { }

  private readonly updateViewData$ = new Subject<any>()

  ngAfterViewInit() {
    this.updateViewData$.pipe(debounceTime(500)).subscribe(async query => { await this._updateViewData(query) })
    this.sort?.sortChange?.subscribe(async s => await this._updateViewData({ order_by: s.active, order: s.direction }))
    this.paginator?.page?.subscribe(async p => await this._updateViewData({ page: p.pageIndex + 1 }))
    this.collection$.subscribe(async c => await this._updateViewData({}))
  }

  private async _updateViewData(query: any): Promise<void> {
    this.isLoadingResults = true
    try {

      const res = await firstValueFrom(this.collection$.pipe(
        switchMap(() => {
          return this.dataService.get<any>(this.collection!, {
            sort_by: this.sort?.active ?? 'name',
            order: this.sort?.direction ?? 'asc',
            page: this.paginator?.pageIndex + 1,
            per_page: this.pageSize,
            select: ListDescriptors[this.collection!].columns.join(','),
            ...query,
          })
        })
      ))

      this.total = res.total
      this.data = res.data

    } catch (err) {
      console.error(err)
    } finally {
      this.isLoadingResults = false
    }
  }



  exec(action: string, item: any) {
    console.log([`/admin/${this.collection}/${action}`, item.slug]);

    this.router.navigate([`/admin/${this.collection}/${action}`, item.slug])
  }
}



const aa_columns = ['_id', 'name', 'slug', 'shortDescription', 'price', 'image', 'category', 'tags']
const aa_displayedColumns = ['name', 'price', 'category', 'shortDescription', 'actions']
const ListDescriptors = {
  antiques: {
    columns: aa_columns,
    displayedColumns: aa_displayedColumns,
  },
  auctions: {
    columns: aa_columns,
    displayedColumns: aa_displayedColumns,
  },
  users: {
    columns: ['email'],
    displayedColumns: ['email', 'actions']
  }
} as any