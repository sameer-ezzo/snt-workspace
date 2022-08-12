import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { materialModules } from './material-modules.module';
import { ReactiveToolbarDirective } from './reactive-toolbar.directive';
import { LazyLoadDirective } from './lazy-load.directive';
import { AddressComponent } from './address/address.component';
import { AddressListComponent } from './address-list/address-list.component';
import { NavBarMenuComponent } from './nav-bar-menu/nav-bar-menu.component';


const declarations = [ReactiveToolbarDirective, LazyLoadDirective, NavBarMenuComponent, AddressComponent, AddressListComponent]
const imports = [
  CommonModule,
  materialModules
]
const providers = [ReactiveToolbarDirective, LazyLoadDirective]

@NgModule({
  declarations: [...declarations],
  imports: [...imports],
  providers: [...providers],
  exports: [...declarations, ...imports]
})
export class SharedModule {
  static forRoot(options: { api_base: string }) {
    return {
      ngModule: SharedModule,
      providers: [{ provide: 'API_BASE', useValue: options.api_base }]
    }
  }
}
