import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BaseComponent } from './base.component';
import { RouterModule } from '@angular/router';
import { HeaderModule } from '../layout/header/header.module';
import { BaseRoutingModule } from './base-routing.module';
import { SharedModule } from '../shared/shared.module';
import { ProductsModule } from './products/products.module';

@NgModule({
  declarations: [BaseComponent],
  imports: [
    CommonModule,
    RouterModule,
    BaseRoutingModule,
    HeaderModule,
    ProductsModule,
    SharedModule,
  ],
})
export class BaseModule {}
