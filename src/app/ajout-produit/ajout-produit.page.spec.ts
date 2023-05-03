import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AjoutProduitPage } from './ajout-produit.page';

describe('AjoutProduitPage', () => {
  let component: AjoutProduitPage;
  let fixture: ComponentFixture<AjoutProduitPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(AjoutProduitPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
