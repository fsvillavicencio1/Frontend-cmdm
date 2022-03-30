import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterActividadComponent } from './register-actividad.component';

describe('RegisterActividadComponent', () => {
  let component: RegisterActividadComponent;
  let fixture: ComponentFixture<RegisterActividadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegisterActividadComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterActividadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
