import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DetailProduitPage } from './detail-produit.page';

describe('DetailProduitPage', () => {
  let component: DetailProduitPage;
  let fixture: ComponentFixture<DetailProduitPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(DetailProduitPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
