import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CryptoBalanceChartComponent } from './crypto-balance-chart.component';

describe('CryptoBalanceChartComponent', () => {
  let component: CryptoBalanceChartComponent;
  let fixture: ComponentFixture<CryptoBalanceChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CryptoBalanceChartComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CryptoBalanceChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
