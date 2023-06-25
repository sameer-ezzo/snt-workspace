import { NgModule } from '@angular/core';
import { ControlPanelRoutingModule } from './control-panel-routing.module';
import { AdminLayoutPageComponent } from './admin-layout-page/admin-layout-page.component';
import { SharedModule } from '../shared/shared.module';

import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { AdminListPageComponent } from './admin-list-page/admin-list-page.component';
import { DetailsPageComponent } from './details-page/details-page.component';
import { EditPageComponent } from './edit-page/edit-page.component';
import { UsersPageComponent } from './users-page/users-page.component';
import { PaymentsPageComponent } from './payments-page/payments-page.component';
import { OrdersPageComponent } from './orders-page/orders-page.component';
import { UploadInputComponent } from './upload-input/upload-input.component';

@NgModule({
  declarations: [
    AdminLayoutPageComponent, AdminListPageComponent, DetailsPageComponent,
    EditPageComponent, UsersPageComponent, PaymentsPageComponent,
    OrdersPageComponent, UploadInputComponent
  ],
  imports: [
    MatTableModule,
    MatPaginatorModule,
    MatProgressSpinnerModule,
    SharedModule,
    ControlPanelRoutingModule
  ]
})
export class ControlPanelModule { }
