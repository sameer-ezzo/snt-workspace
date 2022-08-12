import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'apps/web/src/environments/environment';
import { AntiqueModel, AuctionModel, ListResult } from 'libs/models/src';
import { firstValueFrom } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class BaseDataService {

    constructor(private http: HttpClient) { }

    private readonly _pageSize: number = 30
    get<T extends AntiqueModel | AuctionModel>(collection: 'antiques' | 'auctions' = 'antiques', page: number = 1, pageSize: number | null = null):
        Promise<ListResult<T>> {
        return firstValueFrom(this.http.get<ListResult<T>>(`${environment.base}/${collection}/list?page=${page}${pageSize ? `&pageSize=${pageSize}` : ''}`))
    }

    find<T extends AntiqueModel | AuctionModel>(collection: 'antiques' | 'auctions' = 'antiques', slug: string): Promise<T | undefined | null> {
        return firstValueFrom(this.http.get<T | undefined | null>(`${environment.base}/${collection}/details/${slug}`))

    }



}