import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AntiqueFormComponent } from './antique-form.component';

describe('EditPageComponent', () => {
  let component: AntiqueFormComponent;
  let fixture: ComponentFixture<AntiqueFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AntiqueFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AntiqueFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
