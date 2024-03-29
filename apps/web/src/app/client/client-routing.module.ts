import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AntiquePageComponent } from './antique-page/antique-page.component';
import { ClientLayoutPageComponent } from './client-layout-page/client-layout-page.component';
import { EventPageComponent } from './event-page/event-page.component';
import { HomeComponent } from './home/home.component';
import { ListPageComponent } from './list-page/list-page.component';
import { AuctionPageComponent } from './auction-page/auction-page.component';

const routes: Routes = [
  {
    path: '', component: ClientLayoutPageComponent, children: [
      { path: '', redirectTo: 'antiques', pathMatch: 'full' },
      { path: 'antiques', component: ListPageComponent, data: { collection: 'antiques' } },
      { path: 'auctions', component: ListPageComponent, data: { collection: 'auctions' } },
      { path: 'antique/:slug', component: AntiquePageComponent },
      { path: 'auction/:slug', component: AuctionPageComponent },
      { path: 'event/:slug', component: EventPageComponent },
      { path: 'shopping', loadChildren: () => import('../shopping/shopping.module').then(m => m.ShoppingModule) }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClientRoutingModule { }
