import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ClientLayoutPageComponent } from './admin-layout-page.component';


describe('ClientLayoutPageComponent', () => {
  let component: ClientLayoutPageComponent;
  let fixture: ComponentFixture<ClientLayoutPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClientLayoutPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClientLayoutPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
