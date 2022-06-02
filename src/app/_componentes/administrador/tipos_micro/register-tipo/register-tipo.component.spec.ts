import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterTipoComponent } from './register-tipo.component';

describe('RegisterTipoComponent', () => {
  let component: RegisterTipoComponent;
  let fixture: ComponentFixture<RegisterTipoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegisterTipoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterTipoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
