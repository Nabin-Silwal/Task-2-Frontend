import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Chart } from 'chart.js';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-historical-data-chart',
  templateUrl: './historical-data-chart.component.html',
  styleUrls: ['./historical-data-chart.component.css'],
})
export class HistoricalDataChartComponent implements OnInit {
  @ViewChild('chartCanvas')
  chartCanvas!: ElementRef;
  chartData: any;

  constructor(private userService: UserService) {}

  ngOnInit() {
    this.getHistoricalData();
  }

  getHistoricalData() {
    this.userService.getHistoricalData().subscribe(
      (response) => {
        this.chartData = response;
        console.log('Chart Data:', this.chartData);
        this.renderChart();
      },
      (error) => {
        console.error('Error fetching historical data:', error);
      }
    );
  }

  renderChart() {
    const chartCanvas = this.chartCanvas.nativeElement.getContext('2d');

    const labels = this.chartData.map((data: { month: any }) => data.month);
    const data = this.chartData.map((data: { balance: any }) => data.balance);

    new Chart(chartCanvas, {
      type: 'line',
      data: {
        labels: labels,
        datasets: [
          {
            label: 'Historical Data',
            borderColor: 'rgb(75, 192, 192)',
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            data: data,
            fill: true,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          x: {
            type: 'category',
            grid: {
              display: false,
            },
          },
          y: {
            beginAtZero: true,
          },
        },
      },
    });
  }
}
