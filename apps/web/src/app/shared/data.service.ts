import { HttpClient } from "@angular/common/http"
import { Inject, Injectable } from "@angular/core"
import { ListResult } from "libs/models/src"
import { firstValueFrom } from "rxjs"

@Injectable({
    providedIn: 'root'
})
export class DataService {
    constructor(
        @Inject('API_BASE')  private readonly base: string,
        private http: HttpClient) { }
    get<T>(collection: string,
        query: { sort_by?: string, order?: 'asc' | 'desc' | '', page?: number, per_page?: number } & Record<string, any>,
        select: string[] = []): Promise<ListResult<T>> {
        return firstValueFrom(this.http.post<ListResult<T>>(`${this.base}/${collection}`, query))
    }

    find<T>(path: string, id?: string): Promise<T> {
        return firstValueFrom(this.http.get<T>(`${this.base}/${path}/${id}`))
    }

    post<T>(path: string, data: any): Promise<T> {
        return firstValueFrom(this.http.post<T>(`${this.base}/${path}`, data))
    }

    put<T>(path: string, data: any): Promise<T> {
        return firstValueFrom(this.http.put<T>(`${this.base}/${path}`, data))
    }

    delete<T>(path: string, id?: string): Promise<T> {
        return firstValueFrom(this.http.delete<T>(`${this.base}/${path}/${id ?? ''}`))
    }
}