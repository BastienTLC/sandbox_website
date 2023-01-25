import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';


import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ListVilleComponent } from './list-ville/list-ville.component';
import { HttpClientModule } from '@angular/common/http';
import { MatCardModule } from "@angular/material/card";
import { CardComponent } from './list-ville/card/card.component';
import { NgChartsModule } from 'ng2-charts';
import { BarChartComponent } from './list-ville/card/bar-chart/bar-chart.component';
import { LineChartComponent } from './list-ville/line-chart/line-chart.component';
import { AppRoutingModule } from "./app-routing.module";
import { ServerInfoComponent } from './server-info/server-info.component';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatMenuModule } from '@angular/material/menu';
import {MatProgressBarModule} from "@angular/material/progress-bar";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import { DoughnutChartComponent } from './server-info/graphe/doughnut-chart/doughnut-chart.component';
import { PieChartComponent } from './server-info/graphe/pie-chart/pie-chart.component';



@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    ListVilleComponent,
    CardComponent,
    BarChartComponent,
    LineChartComponent,
    ServerInfoComponent,
    DoughnutChartComponent,
    PieChartComponent,
  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        LayoutModule,
        MatToolbarModule,
        MatButtonModule,
        MatSidenavModule,
        MatIconModule,
        MatListModule,
        BrowserAnimationsModule,
        HttpClientModule,
        MatCardModule,
        NgChartsModule,
        MatGridListModule,
        MatMenuModule,
        MatProgressBarModule,
        MatProgressSpinnerModule,

    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
