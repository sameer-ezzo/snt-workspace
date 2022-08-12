import { HttpClient } from '@angular/common/http'
import { Component, ViewChild } from '@angular/core'
import { MatPaginator } from '@angular/material/paginator'
import { MatSort } from '@angular/material/sort'
import { ActivatedRoute, Router } from '@angular/router'
import { catchError, debounceTime, firstValueFrom, map, merge, of, ReplaySubject, startWith, Subject, switchMap, tap, throwError } from 'rxjs'
import { DataService } from '../../shared/data.service'

@Component({
  selector: 'snt-workspace-admin-list-page',
  templateUrl: './admin-list-page.component.html',
  styleUrls: ['./admin-list-page.component.scss'],
})
export class AdminListPageComponent {
  @ViewChild(MatPaginator)
  paginator!: MatPaginator
  @ViewChild(MatSort)
  sort!: MatSort
  collection: string | undefined = undefined
  collection$ = this.route.params.pipe(map(params => params['collection']), tap(collection => this.collection = collection))
  columns: string[] = ['_id', 'name', 'slug', 'shortDescription', 'price', 'image', 'category', 'tags']
  displayedColumns: string[] = ['name', 'price', 'category', 'shortDescription', 'actions']

  data: any[] = []
  total: number = 0
  pageSize = 50

  isLoadingResults = true
  get limitReached(): boolean {
    return Math.ceil(this.total / this.pageSize) === ((this.paginator?.pageIndex ?? 0) + 1)
  }
  constructor(
    private router:Router,
    private dataService: DataService, private route: ActivatedRoute) { }

  private readonly updateViewData$ = new Subject<any>()

  ngAfterViewInit() {
    this.updateViewData$.pipe(debounceTime(500)).subscribe(async query => { await this._updateViewData(query) })
    this.sort?.sortChange?.subscribe(async s => await this._updateViewData({ order_by: s.active, order: s.direction }))
    this.paginator?.page?.subscribe(async p => await this._updateViewData({ page: p.pageIndex + 1 }))
    this.collection$.subscribe(async c => await this._updateViewData({ collection: c }))
  }

  private async _updateViewData(query: any): Promise<void> {
    this.isLoadingResults = true
    try {

      const res = await firstValueFrom(this.collection$.pipe(
        switchMap(() => {
          return this.dataService.post<any>(this.collection!, {
            sort_by: this.sort?.active ?? 'name',
            order: this.sort?.direction ?? 'asc',
            page: this.paginator?.pageIndex + 1,
            per_page: this.pageSize,
            select: this.columns.join(','),
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