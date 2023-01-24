import {Component, ViewChild, Input} from '@angular/core';
import {Chart, ChartConfiguration, ChartEvent, ChartType, elements} from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import {VilleModel} from "../ville.model";
import _default from "chart.js/dist/core/core.interaction";
import index = _default.modes.index;


@Component({
    selector: 'app-line-chart',
    templateUrl: './line-chart.component.html',
    styleUrls: [ './line-chart.component.css' ]
})
export class LineChartComponent {
    private newLabel? = 'New label';
    @Input() listville: any | undefined;

    constructor() {
    }

    ngOnChanges(){

        if (this.listville){
            let maxPop = this.listville[0].population;

            this.listville.forEach((element: VilleModel, index: number) =>{
                let ratioColor = (255*element.population/maxPop);
                console.log(`${element.ville} ${ratioColor}`)
                console.log(element, index);
                this.lineChartData.datasets.push({
                    data: element.population_evolution.map(evolution => evolution.population),
                    label: element.ville,
                    backgroundColor: `rgba(${ratioColor},159,177,0.2)`,
                    borderColor: `rgba(${ratioColor},159,177,1)`,
                    pointBackgroundColor: `rgba(${ratioColor},159,177,1)`,
                    pointBorderColor: 'black',
                    pointHoverBackgroundColor: 'black',
                    pointHoverBorderColor: 'black',
                    fill: 'origin',
                })
                this.lineChartData.labels = element.population_evolution.map(evolution => evolution.annee);
                this.chart?.update();
            });
        }



    }

    public lineChartData: ChartConfiguration['data'] = {
        datasets: [],
        labels: []
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
                    grid: {
                        color: 'rgba(255,0,0,0.3)',
                    },
                    ticks: {
                        color: 'black'
                    }
                },
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
                this.lineChartData.datasets[i].data[j] = LineChartComponent.generateNumber(i);
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
            const num = LineChartComponent.generateNumber(i);
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
