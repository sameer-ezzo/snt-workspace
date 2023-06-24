import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AntiqueAuctionDetailsViewComponent } from './antique-auction-details-view.component';

describe('AntiqueAuctionDetailsViewComponent', () => {
  let component: AntiqueAuctionDetailsViewComponent;
  let fixture: ComponentFixture<AntiqueAuctionDetailsViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AntiqueAuctionDetailsViewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AntiqueAuctionDetailsViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
