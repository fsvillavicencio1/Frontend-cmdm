import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateTipoComponent } from './update-tipo.component';

describe('UpdateTipoComponent', () => {
  let component: UpdateTipoComponent;
  let fixture: ComponentFixture<UpdateTipoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateTipoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateTipoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
