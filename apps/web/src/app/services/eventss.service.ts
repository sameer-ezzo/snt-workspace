import { Injectable } from '@angular/core';
import { BaseDataService } from './base-data.service';

@Injectable({
    providedIn: 'root'
})
export class AntiquesService {
    constructor(private ds: BaseDataService) { }
    get(page: number = 1): Promise<any> {
        return this.ds.get('events', page);
    }
}