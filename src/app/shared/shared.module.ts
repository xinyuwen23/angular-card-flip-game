import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// angular-material
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { HttpClientModule } from '@angular/common/http';

const materialModules = [
  MatButtonModule,
  MatDialogModule,
  MatFormFieldModule,
  MatInputModule,
  MatMenuModule,
];

@NgModule({
  declarations: [],
  imports: [CommonModule],
  exports: [...materialModules,HttpClientModule,],
})
export class SharedModule {}
