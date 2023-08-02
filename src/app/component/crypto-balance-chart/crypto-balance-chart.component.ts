import { Component } from '@angular/core';
import { ChartDataset, ChartOptions, ChartType } from 'chart.js';
import { HttpClient } from '@angular/common/http';

interface WalletData {
  user: string;
  balance: number;
}

@Component({
  selector: 'app-crypto-balance-chart',
  templateUrl: './crypto-balance-chart.component.html',
  styleUrls: ['./crypto-balance-chart.component.css'],
})
export class CryptoBalanceChartComponent {
  public lineChartData: ChartDataset[] = [
    { data: [], label: 'Crypto Wallet Balances' },
  ];
  public lineChartOptions: ChartOptions = {
    responsive: true,
  };
  public lineChartLegend = true;
  public lineChartType: ChartType = 'line';
  public lineChartPlugins = [];
  public lineChartLabels = []; // Uncomment this line

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.fetchChartData();
  }

  fetchChartData(): void {
    this.http.get<WalletData[]>('/api/wallets').subscribe((data) => {
      const chartBalances: number[] = data.map((item) => item.balance);

      this.lineChartData[0].data = chartBalances;
    });
  }
}
