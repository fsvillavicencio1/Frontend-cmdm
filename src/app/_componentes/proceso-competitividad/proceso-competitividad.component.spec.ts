import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProcesoCompetitividadComponent } from './proceso-competitividad.component';

describe('ProcesoCompetitividadComponent', () => {
  let component: ProcesoCompetitividadComponent;
  let fixture: ComponentFixture<ProcesoCompetitividadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProcesoCompetitividadComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProcesoCompetitividadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
