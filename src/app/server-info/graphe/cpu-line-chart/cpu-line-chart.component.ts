/*A FAIRE ROUJOUTER LE FAITE DE PRENDRE EN COMPTE L'ADAPTION DU NOMBRE DE COEUR DU CPU FONCTIONNE SEULEMENT POUR 4 COEUR*/


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

      let coreLoads: number[][] = [];
      for (let core = 0; core < this.cores.length; core++) {
        coreLoads[core] = [];
        for (let cpu = 0; cpu < this.coresMeasureOneMinute.length; cpu++) {
          coreLoads[core].push(Math.round(this.coresMeasureOneMinute[cpu][core].load));
        }
      }
      //console.log(coreLoads);
      this.cores.forEach((core: Cpu, indexCore) => {
        this.lineChartData.datasets[indexCore] = {
          data: coreLoads[indexCore],
          label: `CPU ${indexCore}`,
          backgroundColor: `rgba(100, 159, 177, 0)`,
          yAxisID: 'y',
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
        data: [],
      },
      {
        data: [ ],

      },
      {
        data: [ ],

      },
      {
        data: [ ],
      }
    ],
    labels: [  ]
  };

  public lineChartOptions: ChartConfiguration['options'] = {
    animation: false,
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
            min:0,
            max:100,
            grid: {
              color: 'rgba(255,0,0,0.3)',
            },
            ticks: {
              color: 'black',
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
}
