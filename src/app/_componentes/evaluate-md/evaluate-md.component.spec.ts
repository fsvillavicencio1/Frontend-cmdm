import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EvaluateMdComponent } from './evaluate-md.component';

describe('EvaluateMdComponent', () => {
  let component: EvaluateMdComponent;
  let fixture: ComponentFixture<EvaluateMdComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EvaluateMdComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EvaluateMdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
