import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuctionPageComponent } from './auction-page.component';

describe('AntiquePageComponent', () => {
  let component: AuctionPageComponent;
  let fixture: ComponentFixture<AuctionPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AuctionPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AuctionPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
