import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminLayoutPageComponent } from './admin-layout-page/admin-layout-page.component';
import { AdminListPageComponent } from './admin-list-page/admin-list-page.component';
import { OrdersPageComponent } from './orders-page/orders-page.component';
import { PaymentsPageComponent } from './payments-page/payments-page.component';
import { UsersPageComponent } from './users-page/users-page.component';
import { EditPageComponent } from './edit-page/edit-page.component';
import { DetailsPageComponent } from './details-page/details-page.component';

const routes: Routes = [
  {
    path: '', component: AdminLayoutPageComponent, children: [
      {path:'', redirectTo:'antiques/list', pathMatch:'full'},
      { path: ':collection/list', component: AdminListPageComponent },
      { path: ':collection/edit/:slug', component: EditPageComponent },
      { path: ':collection/create', component: EditPageComponent },
      { path: ':collection/details/:slug', component: DetailsPageComponent },

      {path: ':collection/delete/:slug', redirectTo: ':collection/list', pathMatch: 'full' },
      
      { path: 'users/list', component: UsersPageComponent },
      { path: 'orders/list', component: OrdersPageComponent },
      { path: 'payments/list', component: PaymentsPageComponent }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ControlPanelRoutingModule { }
