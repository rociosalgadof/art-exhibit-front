import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApiNavbarComponent } from './api.navbar.component';

describe('ApiNavbarComponent', () => {
  let component: ApiNavbarComponent;
  let fixture: ComponentFixture<ApiNavbarComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ApiNavbarComponent]
    });
    fixture = TestBed.createComponent(ApiNavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
