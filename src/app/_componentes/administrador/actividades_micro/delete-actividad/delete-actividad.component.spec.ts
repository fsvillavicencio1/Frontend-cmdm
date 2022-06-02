import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteActividadComponent } from './delete-actividad.component';

describe('DeleteActividadComponent', () => {
  let component: DeleteActividadComponent;
  let fixture: ComponentFixture<DeleteActividadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeleteActividadComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteActividadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
