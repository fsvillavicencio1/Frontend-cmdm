import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompeDigitalComponent } from './compe-digital.component';

describe('CompeDigitalComponent', () => {
  let component: CompeDigitalComponent;
  let fixture: ComponentFixture<CompeDigitalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CompeDigitalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CompeDigitalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
