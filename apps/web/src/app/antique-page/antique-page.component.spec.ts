import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AntiquePageComponent } from './antique-page.component';

describe('AntiquePageComponent', () => {
  let component: AntiquePageComponent;
  let fixture: ComponentFixture<AntiquePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AntiquePageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AntiquePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
