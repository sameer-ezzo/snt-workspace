import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'apps/web/src/environments/environment';
import { interval, Observable } from 'rxjs';
import { catchError, filter, map, startWith, switchMap, tap } from 'rxjs/operators';



@Injectable({
    providedIn: 'root'
})
export class UserService {

    
}