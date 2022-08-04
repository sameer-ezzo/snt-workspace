import { Injectable } from '@angular/core';
import { AntiqueModel, BaseDataService } from './base-data.service';

@Injectable({
    providedIn: 'root'
})
export class AntiquesService {
    constructor(private ds: BaseDataService) { }
    get(page: number = 1, pageSize = null): Promise<any> {
        return this.ds.get('antiques', page, pageSize);
    }

    getBySlug(slug: string): Promise<AntiqueModel> {
        return this.ds.find<AntiqueModel>('antiques', slug)
    }
}