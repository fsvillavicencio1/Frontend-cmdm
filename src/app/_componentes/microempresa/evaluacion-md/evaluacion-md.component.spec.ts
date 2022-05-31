import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EvaluacionMdComponent } from './evaluacion-md.component';

describe('EvaluacionMdComponent', () => {
  let component: EvaluacionMdComponent;
  let fixture: ComponentFixture<EvaluacionMdComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EvaluacionMdComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EvaluacionMdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
