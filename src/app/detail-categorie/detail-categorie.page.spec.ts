import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DetailCategoriePage } from './detail-categorie.page';

describe('DetailCategoriePage', () => {
  let component: DetailCategoriePage;
  let fixture: ComponentFixture<DetailCategoriePage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(DetailCategoriePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
