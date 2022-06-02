import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MadurezDigitalComponent } from './madurez-digital.component';

describe('MadurezDigitalComponent', () => {
  let component: MadurezDigitalComponent;
  let fixture: ComponentFixture<MadurezDigitalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MadurezDigitalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MadurezDigitalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
