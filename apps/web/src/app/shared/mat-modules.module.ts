import { NgModule } from '@angular/core';

import { MatCardModule } from '@angular/material/card';
import { MatSidenavModule } from '@angular/material/sidenav'
import { MatDialogModule } from '@angular/material/dialog';
import { MatNativeDateModule, NativeDateModule } from '@angular/material/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatSliderModule } from '@angular/material/slider';
import { MatRadioModule } from '@angular/material/radio';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatListModule } from '@angular/material/list';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatStepperModule } from '@angular/material/stepper';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatMenuModule } from '@angular/material/menu';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatSelectModule } from '@angular/material/select';
import { MatTabsModule } from '@angular/material/tabs';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatChipsModule } from '@angular/material/chips';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatBadgeModule } from '@angular/material/badge';

let modulesArray = [
  MatSnackBarModule, MatSidenavModule, MatSlideToggleModule,
  MatDialogModule, MatToolbarModule, MatButtonToggleModule,
  MatSliderModule, MatRadioModule, MatProgressSpinnerModule,
  MatNativeDateModule, NativeDateModule, MatListModule,
  MatInputModule, MatFormFieldModule, MatButtonModule,
  MatSelectModule, MatProgressBarModule, MatTabsModule,
  MatIconModule, MatStepperModule, MatDatepickerModule,
  MatTooltipModule, MatExpansionModule, MatMenuModule,
  MatCheckboxModule, MatCardModule, MatChipsModule,
  MatBadgeModule,MatAutocompleteModule
];
@NgModule({
  imports: [...modulesArray],
  exports: [...modulesArray],
})
export class MatModulesModule { }