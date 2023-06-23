import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


const routes: Routes = [
  { path: '', redirectTo: 'client', pathMatch: 'full' },
  { path: 'client', loadChildren: () => import('./client/client.module').then(m => m.ClientModule) },
  { path: 'account', loadChildren: () => import('./membership/membership.module').then(m => m.MembershipModule) },
  { path: 'admin', loadChildren: () => import('./control-panel/control-panel.module').then(m => m.ControlPanelModule) },
  { path: '**', redirectTo: 'home' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
