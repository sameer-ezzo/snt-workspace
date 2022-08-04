import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RelatedItemsSliderComponent } from './related-items-slider.component';

describe('RelatedItemsSliderComponent', () => {
  let component: RelatedItemsSliderComponent;
  let fixture: ComponentFixture<RelatedItemsSliderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RelatedItemsSliderComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(RelatedItemsSliderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
