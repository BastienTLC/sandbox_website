import { Component, ViewChild, Input, OnInit} from '@angular/core';
import { ChartConfiguration, ChartData, ChartEvent, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import {VilleModel} from '../../ville.model'


@Component({
  selector: 'app-bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrls: [ './bar-chart.component.css' ],
})
export class BarChartComponent {
  @ViewChild(BaseChartDirective) chart: BaseChartDirective | undefined;
  @Input() ville: VilleModel | undefined;

  ngOnInit(){
    this.barChartData.labels = this.ville?.population_evolution.map(evolution => evolution.annee);
    if (this.ville){
      this.barChartData.datasets[0].data = this.ville?.population_evolution.map(evolution => evolution.population);
      this.barChartData.datasets[0].label = `${this.ville.rank} ${this.ville.ville}`;
    }
  }

  public barChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    // We use these empty structures as placeholders for dynamic theming.
    scales: {
      x: {},
      y: {
        min: 50
      }
    },
    plugins: {
      legend: {
        display: true,
      },
    }
  };
  public barChartType: ChartType = 'bar';


  public barChartData: ChartData<'bar'> = {

    datasets: [
      { data: [], label: '' },
    ]
  };

  // events
  public chartClicked({ event, active }: { event?: ChartEvent, active?: {}[] }): void {
    console.log(event, active);
  }

  public chartHovered({ event, active }: { event?: ChartEvent, active?: {}[] }): void {
    console.log(event, active);
  }

}
