import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecomenadacionesCompetitividadComponent } from './recomenadaciones-competitividad.component';

describe('RecomenadacionesCompetitividadComponent', () => {
  let component: RecomenadacionesCompetitividadComponent;
  let fixture: ComponentFixture<RecomenadacionesCompetitividadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RecomenadacionesCompetitividadComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RecomenadacionesCompetitividadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
