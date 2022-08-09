import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AntiquePageComponent } from './antique-page/antique-page.component';
import { EventPageComponent } from './event-page/event-page.component';
import { HomeComponent } from './home/home.component';
import { ListPageComponent } from './list-page/list-page.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'antiques', component: ListPageComponent, data: { collection: 'antiques' } },
  { path: 'auctions', component: ListPageComponent, data: { collection: 'auctions' } },
  { path: 'antique/:slug', component: AntiquePageComponent },
  { path: 'event/:slug', component: EventPageComponent },
  { path: '**', redirectTo: 'home' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
