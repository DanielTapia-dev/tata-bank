import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/shared/interfaces/product';
import { ProductsService } from './services/products.service';
import { AlertService } from 'src/app/shared/services/alert.service';
import { ProductTableColumns } from './product.constant';
import { formatDate } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductsComponent implements OnInit {
  productHeaders: string[] = [];
  products: Product[] = [];
  showModal: boolean = false;
  filteredProducts: Product[] = [];
  showConfirmModal = false;
  selectedProduct!: Product;

  readonly tableColumns = ProductTableColumns;

  constructor(
    private productsService: ProductsService,
    private alertService: AlertService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadProducts();
  }

  get deleteMessage(): string {
    return this.selectedProduct?.name
      ? `¿Estás seguro de eliminar el producto ${this.selectedProduct.name}?`
      : '¿Estás seguro de eliminar este producto?';
  }

  loadProducts() {
    this.productsService.getAll().subscribe((resp) => {
      this.products = resp.data;
      this.filteredProducts = resp.data;
    });
  }

  deleteProduct(productId: string): void {
    this.productsService.delete(productId).subscribe({
      next: () => {
        this.alertService.success('Producto eliminado correctamente');
        this.loadProducts();
      },
      error: (error) => {
        const message =
          error?.error?.message || 'No se pudo eliminar el producto.';
        this.alertService.error('Error: ' + message);
      },
    });
  }

  closeModal(): void {
    this.showModal = false;
  }

  createProduct() {
    this.router.navigate(['products/create']);
  }

  editProduct(product: Product) {
    this.router.navigate(['products/edit', product.id]);
  }

  applyFilter(term: string): void {
    const lowerTerm = term.toLowerCase();

    this.filteredProducts = this.products.filter((item) =>
      Object.values(item).some((value) => {
        if (!value) return false;

        if (this.isDate(value)) {
          const formatted = formatDate(value, 'dd/MM/yyyy', 'en-US');
          return formatted.includes(term);
        }

        return value.toString().toLowerCase().includes(lowerTerm);
      })
    );
  }

  openDeleteModal(product: Product) {
    this.selectedProduct = product;
    this.showConfirmModal = true;
  }

  confirmDelete() {
    this.deleteProduct(this.selectedProduct.id);
    this.showConfirmModal = false;
  }

  cancelDelete() {
    this.showConfirmModal = false;
  }

  isDate(value: unknown): boolean {
    return (
      value instanceof Date ||
      (typeof value === 'string' && /^\d{4}-\d{2}-\d{2}/.test(value))
    );
  }
}
