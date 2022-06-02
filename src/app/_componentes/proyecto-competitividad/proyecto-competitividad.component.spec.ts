import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProyectoCompetitividadComponent } from './proyecto-competitividad.component';

describe('ProyectoCompetitividadComponent', () => {
  let component: ProyectoCompetitividadComponent;
  let fixture: ComponentFixture<ProyectoCompetitividadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProyectoCompetitividadComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProyectoCompetitividadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
