import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnquiriesListComponent } from './enquiries-list.component';

describe('EnquiriesListComponent', () => {
  let component: EnquiriesListComponent;
  let fixture: ComponentFixture<EnquiriesListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EnquiriesListComponent]
    });
    fixture = TestBed.createComponent(EnquiriesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
