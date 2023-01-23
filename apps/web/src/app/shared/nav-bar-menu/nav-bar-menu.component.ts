import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../membership/auth.service';

@Component({
  selector: 'snt-workspace-nav-bar-menu',
  templateUrl: './nav-bar-menu.component.html',
  styleUrls: ['./nav-bar-menu.component.scss']
})
export class NavBarMenuComponent {
  constructor(private router: Router,
    public auth: AuthService) { }


  logIn = () => this.router.navigate(['account', 'login'], { queryParams: { redirect: this.router.url } })
  signOut = () => this.auth.signOut()

}
