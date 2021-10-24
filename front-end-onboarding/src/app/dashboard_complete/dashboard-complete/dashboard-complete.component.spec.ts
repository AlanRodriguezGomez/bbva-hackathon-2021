import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardCompleteComponent } from './dashboard-complete.component';

describe('DashboardCompleteComponent', () => {
  let component: DashboardCompleteComponent;
  let fixture: ComponentFixture<DashboardCompleteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DashboardCompleteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardCompleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
