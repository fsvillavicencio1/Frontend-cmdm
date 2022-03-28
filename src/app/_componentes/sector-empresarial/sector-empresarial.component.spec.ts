import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SectorEmpresarialComponent } from './sector-empresarial.component';

describe('SectorEmpresarialComponent', () => {
  let component: SectorEmpresarialComponent;
  let fixture: ComponentFixture<SectorEmpresarialComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SectorEmpresarialComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SectorEmpresarialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
