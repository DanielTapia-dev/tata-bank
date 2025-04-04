import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProductFormComponent } from './product-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ProductsService } from '../services/products.service';
import { of } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

describe('ProductFormComponent', () => {
  let component: ProductFormComponent;
  let fixture: ComponentFixture<ProductFormComponent>;
  let mockProductService: any;

  beforeEach(async () => {
    mockProductService = {
      getById: jest.fn().mockReturnValue(
        of(
          {
            id: 'test-id1',
            name: 'Test Product 1',
            description: 'Test description 1',
            logo: 'http://test.com/logo.png',
            date_release: '2025-04-01',
            date_revision: '2026-04-01',
          },
          {
            id: 'test-id2',
            name: 'Test Product 2',
            description: 'Test description 2',
            logo: 'http://test.com/logo.png',
            date_release: '2025-04-01',
            date_revision: '2026-04-01',
          }
        )
      ),
      verifyId: jest.fn().mockReturnValue(of(false)),
      create: jest.fn().mockReturnValue(of(undefined)),
      update: jest.fn().mockReturnValue(of(undefined)),
      delete: jest.fn(),
      getAll: jest.fn().mockReturnValue(of({ data: [] })),
    };

    await TestBed.configureTestingModule({
      declarations: [ProductFormComponent],
      imports: [
        ReactiveFormsModule,
        RouterTestingModule,
        HttpClientTestingModule,
      ],
      providers: [
        { provide: ProductsService, useValue: mockProductService },
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: { paramMap: { get: () => 'test-id' } },
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ProductFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should load product in edit mode', () => {
    expect(component.isEditMode).toBe(true);
    expect(component.form.value.id).toBe('test-id2');
    expect(component.form.value.name).toBe('Test Product 2');
  });

  it('should update the revision date when the release date changes', () => {
    const releaseDate = '2025-04-01';
    component.form.get('date_release')?.setValue(releaseDate);

    component.form.get('date_release')?.updateValueAndValidity();

    expect(component.form.get('date_revision')?.value).toBe('2026-04-01');
  });

  it('should call create when form is valid and is not in edit mode', () => {
    component.isEditMode = false;
    component.form.setValue({
      id: 'new-id',
      name: 'New Product',
      description: 'New description',
      logo: 'http://test.com/logo.png',
      date_release: '2025-04-05',
      date_revision: '2026-04-05',
    });

    component.submitForm();

    expect(mockProductService.create).toHaveBeenCalledWith(
      component.form.getRawValue()
    );
  });

  it('should not submit form if it is invalid', () => {
    component.form.get('id')?.setValue('');
    component.submitForm();

    expect(mockProductService.create).not.toHaveBeenCalled();
    expect(mockProductService.update).not.toHaveBeenCalled();
  });

  it('should navigate back when goBack is called', () => {
    const navigateSpy = jest.spyOn(component['router'], 'navigate');

    component.goBack();

    // Ensure navigation is called
    expect(navigateSpy).toHaveBeenCalledWith(['/products']);
  });
});
