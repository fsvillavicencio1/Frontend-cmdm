import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResultadosDigitalizacionComponent } from './resultados-digitalizacion.component';

describe('ResultadosDigitalizacionComponent', () => {
  let component: ResultadosDigitalizacionComponent;
  let fixture: ComponentFixture<ResultadosDigitalizacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ResultadosDigitalizacionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ResultadosDigitalizacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
