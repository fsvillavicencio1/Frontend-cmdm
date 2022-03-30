import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdatePublicacionComponent } from './update-publicacion.component';

describe('UpdatePublicacionComponent', () => {
  let component: UpdatePublicacionComponent;
  let fixture: ComponentFixture<UpdatePublicacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdatePublicacionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdatePublicacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
