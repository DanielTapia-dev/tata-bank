import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductFormComponent } from './product-form/product-form.component';
import { ProductsComponent } from './products.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { ProductsRoutingModule } from './products-routing.module';

@NgModule({
  declarations: [ProductsComponent, ProductFormComponent],
  imports: [CommonModule, SharedModule, ProductsRoutingModule],
  exports: [ProductsComponent],
})
export class ProductsModule {}
