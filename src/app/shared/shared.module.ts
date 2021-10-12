import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// angular-material
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatTableModule } from '@angular/material/table';
import { MatButtonToggleModule } from '@angular/material/button-toggle';

import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

const materialModules = [
  MatButtonModule,
  MatDialogModule,
  MatFormFieldModule,
  MatInputModule,
  MatMenuModule,
  MatTableModule,
  MatButtonToggleModule,
];

@NgModule({
  declarations: [],
  imports: [CommonModule],
  exports: [...materialModules, HttpClientModule, FormsModule],
})
export class SharedModule {}
