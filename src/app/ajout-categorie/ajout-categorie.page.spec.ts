import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AjoutCategoriePage } from './ajout-categorie.page';

describe('AjoutCategoriePage', () => {
  let component: AjoutCategoriePage;
  let fixture: ComponentFixture<AjoutCategoriePage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(AjoutCategoriePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
