import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, firstValueFrom, interval, merge, Observable, of, ReplaySubject, Subject, Subscription } from 'rxjs';
import { map, filter, switchMap, tap, shareReplay } from 'rxjs/operators';
import { environment } from '../../environments/environment';
type Token = { access: string, refresh: string }
export type User = { alg: "HS256", typ: "JWT", "sub": string, email: string, name: string, iat: number, roles?: string[], claims?: any }


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user: User | null = null
  readonly refresh$ = new ReplaySubject<Token>(1)
  signOut() {
    this.refresh$.next({ access: '', refresh: '' })
  }

  readonly user$: Observable<User | null> = this.refresh$.pipe(
    tap(token => this._updateLocalStorage(token)),
    // filter((token: Token) => token && token['access'].length > 0 && token['refresh'].length > 0),
    switchMap(token => {
      const user = this._parseJwt(token.access)
      const now = Date.now()
      const iat = user?.iat ?? now
      if (iat + (5 * 24 * 60 * 60 * 1000) < now) return of(user)
      return this.sendRefreshCMD(token['refresh']).pipe(map(token => this._parseJwt(token.access)))
    }),
    tap(user => this.user = user),
    shareReplay(1)
  )

  private _readLocalStorage(): Token {
    return {
      access: (localStorage.getItem('access_token') ?? '').trim(),
      refresh: (localStorage.getItem('refresh_token') ?? '').trim()
    } as Token
  }
  private _updateLocalStorage(token: Token | null) {
    const { access, refresh } = (token ?? {})
    if (access) localStorage.setItem('access_token', access)
    else localStorage.removeItem('access_token')
    if (refresh) localStorage.setItem('refresh_token', refresh)
    else localStorage.removeItem('refresh_token')
  }



  private _intervalSub: Subscription | undefined
  constructor(private http: HttpClient) {
    this.refresh()

    this.user$.subscribe(user => {
      console.log('user: ', user)

    })
  }

  private sendRefreshCMD(refresh_token: string): Observable<Token> {
    if (!refresh_token || refresh_token.trim().length === 0) return of({ access: '', refresh: '' })
    return this.http.post<{ access: string, refresh: string }>(`${environment.base}/auth/refresh`, { refresh_token })
      .pipe(catchError(err => {
        this._handleRefreshError(err)
        throw err
      }))
  }


  private _handleRefreshError(err: any) {
    console.error(err)
  }


  private _parseJwt(token: string): User | null {
    if (!token) return null
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(window.atob(base64).split('').map((c) => {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
  };

  refresh(token: Token = this._readLocalStorage()) {
    console.log('refresh: ', token)

    this._intervalSub?.unsubscribe()
    this._intervalSub = interval(5 * 60 * 1000).subscribe(() => this.refresh())
    this.refresh$.next(token)
  }


  async login(email: string, password: string): Promise<any> {
    return await firstValueFrom(this.http.post(`${environment.base}/auth`, { type: 'password', payload: { email, password } }))

  }
  async externalLogin(service: string, credentials: any): Promise<any> {
    const res = await firstValueFrom(this.http.post(`${environment.base}/auth/externalLogin`, { service, credentials }))
  }


  async signup(payload: { email: string, password: string }): Promise<any> {

    return await firstValueFrom(this.http.post(`${environment.base}/auth/signup`, { payload }))
  }
}
