import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewPublicacionComponent } from './view-publicacion.component';

describe('ViewPublicacionComponent', () => {
  let component: ViewPublicacionComponent;
  let fixture: ComponentFixture<ViewPublicacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewPublicacionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewPublicacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
