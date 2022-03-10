import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MiEmpresaComponent } from './mi-empresa.component';

describe('MiEmpresaComponent', () => {
  let component: MiEmpresaComponent;
  let fixture: ComponentFixture<MiEmpresaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MiEmpresaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MiEmpresaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
