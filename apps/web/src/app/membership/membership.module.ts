import { NgModule } from '@angular/core';

import { MembershipRoutingModule } from './membership-routing.module';
import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { MatCardModule } from '@angular/material/card';
import { SharedModule } from '../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MembershipLayoutComponent } from './membership-layout/membership-layout.component';
@NgModule({
  declarations: [
    LoginComponent,
    SignupComponent,
    ForgotPasswordComponent,
    MembershipLayoutComponent
  ],
  imports: [
    SharedModule,
    FormsModule, ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    MembershipRoutingModule
  ]
})
export class MembershipModule { }
