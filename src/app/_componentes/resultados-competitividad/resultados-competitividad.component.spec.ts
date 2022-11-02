import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResultadosCompetitividadComponent } from './resultados-competitividad.component';

describe('ResultadosCompetitividadComponent', () => {
  let component: ResultadosCompetitividadComponent;
  let fixture: ComponentFixture<ResultadosCompetitividadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ResultadosCompetitividadComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ResultadosCompetitividadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
