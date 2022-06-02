import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteTipoComponent } from './delete-tipo.component';

describe('DeleteTipoComponent', () => {
  let component: DeleteTipoComponent;
  let fixture: ComponentFixture<DeleteTipoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeleteTipoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteTipoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
