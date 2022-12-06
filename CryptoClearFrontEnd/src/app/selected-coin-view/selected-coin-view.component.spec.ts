import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectedCoinViewComponent } from './selected-coin-view.component';

describe('SelectedCoinViewComponent', () => {
  let component: SelectedCoinViewComponent;
  let fixture: ComponentFixture<SelectedCoinViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SelectedCoinViewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SelectedCoinViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
