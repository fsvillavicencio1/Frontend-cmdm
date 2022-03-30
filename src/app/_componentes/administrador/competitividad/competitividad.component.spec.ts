import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompetitividadComponent } from './competitividad.component';

describe('CompetitividadComponent', () => {
  let component: CompetitividadComponent;
  let fixture: ComponentFixture<CompetitividadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CompetitividadComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CompetitividadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
