import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { environment } from '../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  async login(username: string, password: string): Promise<any> {
    return new Promise((resolve, reject) => {
      resolve(true)
    })
    const res = await firstValueFrom(this.http.post(`${environment.base}/auth/login`, { username, password }))
  }
  async externalLogin(service: string, credentials: any): Promise<any> {
    const res = await firstValueFrom(this.http.post(`${environment.base}/auth/externalLogin`, { service, credentials }))
  }
}
