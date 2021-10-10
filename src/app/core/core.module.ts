import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComponentsModule } from './components/components.module';
import { LoginComponent } from './components/login/login.component';

@NgModule({
  declarations: [],
  imports: [CommonModule],
  exports: [ComponentsModule],
})
export class CoreModule {}
