import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'apps/web/src/environments/environment';
import { AntiqueModel, AuctionModel, ListResult } from 'libs/models/src';
import { Observable, firstValueFrom } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class BaseDataService {

    constructor(private http: HttpClient) { }

    private readonly _pageSize: number = 12
    get$<T extends AntiqueModel | AuctionModel>(collection: 'antiques' | 'auctions' = 'antiques',
        query: { page: number, per_page: number } & Record<string, any> = { page: 1, per_page: this._pageSize })
        : Observable<ListResult<T>> {

        const q = { ...query }
        if (!q.page) q['page'] = 1
        if (!q.per_page) q['per_page'] = this._pageSize

        return this.http.post<ListResult<T>>(`${environment.base}/api/${collection}`, query)
    }


    get<T extends AntiqueModel | AuctionModel>(collection: 'antiques' | 'auctions' = 'antiques',
        query: { page: number, per_page: number } & Record<string, any> = { page: 1, per_page: this._pageSize })
        : Promise<ListResult<T>> {
        return firstValueFrom(this.get$<T>(collection, query))
    }

    async find<T extends AntiqueModel | AuctionModel>(collection: 'antiques' | 'auctions' = 'antiques', slug: string): Promise<T | undefined> {
        const res = await this.get<T>(collection, {
            slug, per_page: 1, page: 1
        })
        if (res.total === 0) return undefined
        return res.data[0]
    }
    createItem(collection:any, item:any){
        return this.http.post(`${environment.base}/api/${collection}`,item)
    }
}