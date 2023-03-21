import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatDividerModule } from '@angular/material/divider';
import { MatTabsModule } from '@angular/material/tabs';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatRadioModule } from '@angular/material/radio';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatDialogModule } from '@angular/material/dialog';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatMenuModule } from '@angular/material/menu';
import { MatCarouselModule } from 'ng-mat-carousel';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { GlinzMultiSelectComponent } from './glinz-multi-select/glinz-multi-select.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatListModule } from '@angular/material/list';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatBadgeModule } from '@angular/material/badge';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { TokenExpiredDialogComponent } from './components/token-expired-dialog/token-expired-dialog.component';
import { TagInputModule } from 'ngx-chips';
import { MatChipsModule } from '@angular/material/chips';
import { HighlightDirective } from './directives/highlight.directive';

const module = [
  CommonModule,
  MatIconModule,
  FormsModule,
  ReactiveFormsModule,
  MatCardModule,
  MatInputModule,
  MatDividerModule,
  MatTabsModule,
  MatFormFieldModule,
  MatSelectModule,
  MatTableModule,
  MatButtonModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatCheckboxModule,
  MatRadioModule,
  MatProgressSpinnerModule,
  MatDialogModule,
  MatPaginatorModule,
  MatMenuModule,
  MatCarouselModule.forRoot(),
  MatSidenavModule,
  MatToolbarModule,
  MatExpansionModule,
  MatListModule,
  MatSnackBarModule,
  MatBadgeModule,
  MatButtonToggleModule,
  TagInputModule,
  MatChipsModule
];

@NgModule({
  declarations: [
    GlinzMultiSelectComponent,
    TokenExpiredDialogComponent,
    HighlightDirective
  ],
  imports: [module],
  exports: [module, HighlightDirective],
})
export class SharedModule {}
