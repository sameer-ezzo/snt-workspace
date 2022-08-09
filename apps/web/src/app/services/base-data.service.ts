import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AntiqueModel, AuctionModel, ListResult } from 'libs/models/src';
import { firstValueFrom } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class BaseDataService {

    constructor(private http: HttpClient) { }

    private readonly _pageSize: number = 30
    get<T extends AntiqueModel | AuctionModel>(collection: 'antiques' | 'events' = 'antiques', page: number = 1, pageSize: number | null = null):
        Promise<ListResult<T>> {
        return firstValueFrom(this.http.get<ListResult<T>>(`${environment.base}/${collection}/list`))
    }

    find<T extends AntiqueModel | AuctionModel>(collection: 'antiques' | 'events' = 'antiques', slug: string): Promise<T | undefined | null> {
        return firstValueFrom(this.http.get<T | undefined | null>(`${environment.base}/${collection}/${slug}`))

    }



}