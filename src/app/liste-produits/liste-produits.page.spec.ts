import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ListeProduitsPage } from './liste-produit.page';

describe('ListeProduitPage', () => {
  let component: ListeProduitsPage;
  let fixture: ComponentFixture<ListeProduitsPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(ListeProduitsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
