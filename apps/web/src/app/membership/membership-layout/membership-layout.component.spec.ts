import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MembershipLayoutComponent } from './membership-layout.component';

describe('MembershipLayoutComponent', () => {
  let component: MembershipLayoutComponent;
  let fixture: ComponentFixture<MembershipLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MembershipLayoutComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MembershipLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
