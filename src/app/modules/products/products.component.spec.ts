import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProductsComponent } from './products.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Router } from '@angular/router';
import { ProductsService } from './services/products.service';
import { AlertService } from 'src/app/shared/services/alert.service';
import { of, throwError } from 'rxjs';
import { Product } from 'src/app/shared/interfaces/product';

describe('ProductsComponent', () => {
  let component: ProductsComponent;
  let fixture: ComponentFixture<ProductsComponent>;
  let productsService: jest.Mocked<ProductsService>;
  let alertService: jest.Mocked<AlertService>;
  let router: jest.Mocked<Router>;

  const mockProducts: Product[] = [
    {
      id: 'uno',
      name: 'Test Name',
      description: 'Product test description',
      logo: 'https://cdn-icons-png.flaticon.com/512/9187/9187604.png',
      date_release: new Date(),
      date_revision: new Date(),
    },
  ];

  beforeEach(async () => {
    const mockProductsService = {
      getAll: jest.fn().mockReturnValue(of({ data: mockProducts })),
      delete: jest.fn().mockReturnValue(of(undefined)),
    } as unknown as jest.Mocked<ProductsService>;

    const mockAlertService = {
      success: jest.fn(),
      error: jest.fn(),
    } as unknown as jest.Mocked<AlertService>;

    const mockRouter = {
      navigate: jest.fn(),
    } as unknown as jest.Mocked<Router>;

    await TestBed.configureTestingModule({
      declarations: [ProductsComponent],
      imports: [HttpClientTestingModule],
      providers: [
        { provide: ProductsService, useValue: mockProductsService },
        { provide: AlertService, useValue: mockAlertService },
        { provide: Router, useValue: mockRouter },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ProductsComponent);
    component = fixture.componentInstance;
    productsService = TestBed.inject(
      ProductsService
    ) as jest.Mocked<ProductsService>;
    alertService = TestBed.inject(AlertService) as jest.Mocked<AlertService>;
    router = TestBed.inject(Router) as jest.Mocked<Router>;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load products on init', () => {
    const mockProducts: Product[] = [
      {
        id: 'uno',
        name: 'Test Name',
        description: 'Product test description',
        logo: 'https://cdn-icons-png.flaticon.com/512/9187/9187604.png',
        date_release: new Date(),
        date_revision: new Date(),
      },
    ];
    productsService.getAll.mockReturnValue(of({ data: mockProducts }));

    component.loadProducts();

    expect(productsService.getAll).toHaveBeenCalled();
    expect(component.products).toEqual(mockProducts);
    expect(component.filteredProducts).toEqual(mockProducts);
  });

  it('should delete product and reload list on success', () => {
    productsService.delete.mockReturnValue(of(undefined));
    productsService.getAll.mockReturnValue(of({ data: [] }));

    component.deleteProduct('uno');

    expect(productsService.delete).toHaveBeenCalledWith('uno');
    expect(alertService.success).toHaveBeenCalledWith(
      'Producto eliminado correctamente'
    );
  });

  it('should show error on failed delete', () => {
    const error = { error: { message: 'Error de backend' } };
    productsService.delete.mockReturnValue(throwError(() => error));

    component.deleteProduct('uno');

    expect(alertService.error).toHaveBeenCalledWith('Error: Error de backend');
  });

  it('should return delete message with product name', () => {
    component.selectedProduct = {
      id: 'uno',
      name: 'Test Name',
      description: 'Product test description',
      logo: 'https://cdn-icons-png.flaticon.com/512/9187/9187604.png',
      date_release: new Date(),
      date_revision: new Date(),
    };
    expect(component.deleteMessage).toBe(
      '¿Estás seguro de eliminar el producto Test Name?'
    );
  });

  it('should filter products with matching name', () => {
    component.products = [
      {
        id: 'uno',
        name: 'Test Name 1',
        description: 'Product test description',
        logo: 'https://cdn-icons-png.flaticon.com/512/9187/9187604.png',
        date_release: new Date(),
        date_revision: new Date(),
      },
      {
        id: 'dos',
        name: 'Test Name 2',
        description: 'Product test description',
        logo: 'https://cdn-icons-png.flaticon.com/512/9187/9187604.png',
        date_release: new Date(),
        date_revision: new Date(),
      },
    ];

    component.applyFilter('Test Name 1');

    expect(component.filteredProducts.length).toBe(1);
    expect(component.filteredProducts[0].description).toBe(
      'Product test description'
    );
  });
});
