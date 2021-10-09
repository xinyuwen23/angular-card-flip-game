import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// angular-material
import { MatButtonModule } from '@angular/material/button';

const materialModules = [MatButtonModule];

@NgModule({
  declarations: [],
  imports: [CommonModule],
  exports: [...materialModules],
})
export class SharedModule {}
