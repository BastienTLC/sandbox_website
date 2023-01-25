import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {ChartData, ChartEvent, ChartType} from "chart.js";
import {BaseChartDirective} from "ng2-charts";

@Component({
  selector: 'app-doughnut-chart',
  templateUrl: './doughnut-chart.component.html',
  styleUrls: ['./doughnut-chart.component.css']
})
export class DoughnutChartComponent implements OnInit{
  @ViewChild(BaseChartDirective) chart: BaseChartDirective | undefined;
  @Input() UsedValue: any | undefined;
  @Input() FreeValue: any | undefined;

  ngOnInit(){
    this.doughnutChartData.datasets[0].data[0]=this.UsedValue;
    this.doughnutChartData.datasets[0].data[1]=this.FreeValue;
  }

  public doughnutChartLabels: string[] = [ 'Download Sales', 'In-Store Sales', 'Mail-Order Sales' ];
  public doughnutChartData: ChartData<'doughnut'> = {
    labels: this.doughnutChartLabels,
    datasets: [
      { data: [0, 100 ] }
    ]
  };
  public doughnutChartType: ChartType = 'doughnut';

  constructor() { }

  public chartClicked({ event, active }: { event: ChartEvent, active: {}[] }): void {
    console.log(event, active);
  }

  public chartHovered({ event, active }: { event: ChartEvent, active: {}[] }): void {
    console.log(event, active);
  }
}