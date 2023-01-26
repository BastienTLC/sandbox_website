import {Component, ViewChild, Input, SimpleChanges} from '@angular/core';
import {Chart, ChartConfiguration, ChartEvent, ChartType, elements} from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import {VilleModel} from "../../../list-ville/ville.model";
import {Cpu, CpuInfo, RootObject} from '../../../interfaces/RootObject';
import _default from "chart.js/dist/core/core.interaction";
import index = _default.modes.index;


@Component({
  selector: 'app-cpu-line-chart',
  templateUrl: './cpu-line-chart.component.html',
  styleUrls: ['./cpu-line-chart.component.css']
})
export class CpuLineChartComponent{

  private newLabel? = 'New label';
  @Input() cores : Cpu[] | undefined;

  coresMeasureOneMinute : Cpu[][] | undefined ;


  ngOnChanges(changes: SimpleChanges) {
    if (this.cores) {
      if (!this.coresMeasureOneMinute) {
        this.coresMeasureOneMinute = [this.cores];
      } else {
        if (this.coresMeasureOneMinute.length < 60) {
          this.coresMeasureOneMinute.push(this.cores);
          this.lineChartData.labels?.push(``)
        } else {
          this.coresMeasureOneMinute.shift();
          this.coresMeasureOneMinute.push(this.cores)
        }
      }
      //console.log(this.coresMeasureOneMinute);

      let coreLoads: number[][] = [];
      for (let core = 0; core < this.cores.length; core++) {
        coreLoads[core] = [];
        for (let cpu = 0; cpu < this.coresMeasureOneMinute.length; cpu++) {
          coreLoads[core].push(this.coresMeasureOneMinute[cpu][core].load);
        }
      }
      console.log(coreLoads);
      this.cores.forEach((core: Cpu, indexCore) => {
        this.lineChartData.datasets[indexCore] = {
          data: coreLoads[indexCore],
          label: `CPU ${indexCore}`,
          backgroundColor: `rgba(100, 159, 177, 0.2)`,
          borderColor: `rgba(100, 159, 177, 1)`,
          pointBackgroundColor: `rgba(100, 159, 177, 1)`,
          pointBorderColor: 'black',
          pointHoverBackgroundColor: 'black',
          pointHoverBorderColor: 'black',
          fill: 'origin',
        }
      })
      this.chart?.update();
    }
  }

  constructor() {
  }

  public lineChartData: ChartConfiguration['data'] = {
    datasets: [
      {
        data: [ 65, 59, 80, 81, 56, 55, 40 ],
        label: 'Series A',
        backgroundColor: 'rgba(148,159,177,0.2)',
        borderColor: 'rgba(148,159,177,1)',
        pointBackgroundColor: 'rgba(148,159,177,1)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgba(148,159,177,0.8)',
        fill: 'origin',
      },
      {
        data: [ 28, 48, 40, 19, 86, 27, 90 ],
        label: 'Series B',
        backgroundColor: 'rgba(77,83,96,0.2)',
        borderColor: 'rgba(77,83,96,1)',
        pointBackgroundColor: 'rgba(77,83,96,1)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgba(77,83,96,1)',
        fill: 'origin',
      },
      {
        data: [ 180, 480, 770, 90, 1000, 270, 400 ],
        label: 'Series C',
        yAxisID: 'y1',
        backgroundColor: 'rgba(255,0,0,0.3)',
        borderColor: 'red',
        pointBackgroundColor: 'rgba(148,159,177,1)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgba(148,159,177,0.8)',
        fill: 'origin',
      },
      {
        data: [ 180, 480, 770, 90, 1000, 270, 400 ],
        label: 'Series C',
        yAxisID: 'y1',
        backgroundColor: 'rgba(255,0,0,0.3)',
        borderColor: 'red',
        pointBackgroundColor: 'rgba(148,159,177,1)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgba(148,159,177,0.8)',
        fill: 'origin',
      }
    ],
    labels: [  ]
  };

  public lineChartOptions: ChartConfiguration['options'] = {
    elements: {
      line: {
        tension: 0.5
      }
    },
    scales: {
      // We use this empty structure as a placeholder for dynamic theming.
      y:
          {
            position: 'left',
          },
      y1: {
        position: 'right',
        grid: {
          color: 'rgba(255,0,0,0.3)',
        },
        ticks: {
          color: 'red'
        }
      }
    },

    plugins: {
      legend: { display: true },
    }
  };

  public lineChartType: ChartType = 'line';

  @ViewChild(BaseChartDirective) chart?: BaseChartDirective;

  private static generateNumber(i: number): number {
    return Math.floor((Math.random() * (i < 2 ? 100 : 1000)) + 1);
  }

  public randomize(): void {
    for (let i = 0; i < this.lineChartData.datasets.length; i++) {
      for (let j = 0; j < this.lineChartData.datasets[i].data.length; j++) {
        this.lineChartData.datasets[i].data[j] = CpuLineChartComponent.generateNumber(i);
      }
    }
    this.chart?.update();
  }

  // events
  public chartClicked({ event, active }: { event?: ChartEvent, active?: {}[] }): void {
    console.log(event, active);
  }

  public chartHovered({ event, active }: { event?: ChartEvent, active?: {}[] }): void {
    console.log(event, active);
  }

  public hideOne(): void {
    const isHidden = this.chart?.isDatasetHidden(1);
    this.chart?.hideDataset(1, !isHidden);
  }

  public pushOne(): void {
    this.lineChartData.datasets.forEach((x, i) => {
      const num = CpuLineChartComponent.generateNumber(i);
      x.data.push(num);
    });
    this.lineChartData?.labels?.push(`Label ${ this.lineChartData.labels.length }`);

    this.chart?.update();
  }

  public changeColor(): void {
    this.lineChartData.datasets[2].borderColor = 'green';
    this.lineChartData.datasets[2].backgroundColor = `rgba(0, 255, 0, 0.3)`;

    this.chart?.update();
  }

  public changeLabel(): void {
    const tmp = this.newLabel;
    this.newLabel = this.lineChartData.datasets[2].label;
    this.lineChartData.datasets[2].label = tmp;

    this.chart?.update();
  }
}
