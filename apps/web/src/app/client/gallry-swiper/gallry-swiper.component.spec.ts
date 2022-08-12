import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GallrySwiperComponent } from './gallry-swiper.component';

describe('GallrySwiperComponent', () => {
  let component: GallrySwiperComponent;
  let fixture: ComponentFixture<GallrySwiperComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GallrySwiperComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GallrySwiperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
