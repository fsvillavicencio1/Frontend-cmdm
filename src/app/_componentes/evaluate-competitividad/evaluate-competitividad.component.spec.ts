import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EvaluateCompetitividadComponent } from './evaluate-competitividad.component';

describe('EvaluateCompetitividadComponent', () => {
  let component: EvaluateCompetitividadComponent;
  let fixture: ComponentFixture<EvaluateCompetitividadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EvaluateCompetitividadComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EvaluateCompetitividadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
