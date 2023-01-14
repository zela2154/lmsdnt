import { Component, OnInit } from '@angular/core';
import {
  ChartComponent,
  ApexAxisChartSeries,
  ApexChart,
  ApexTitleSubtitle,
  ApexPlotOptions,
  ApexFill,
  ApexXAxis,
  ApexLegend,
  ApexTooltip,
} from "ng-apexcharts";

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
 /* series: ApexAxisChartSeries
  chart: ApexChart
  title: ApexTitleSubtitle*/
  constructor() {
  
   }

  ngOnInit(): void {
    // this.InitializeChartOptions()
  }

  /*private InitializeChartOptions(): void {
    this.title = {
      text: "Property Language"
    }
    this.series = [
      {
        name: "DNT",
        data : [12,10,11]
      }
    ]
    this.chart = {
      type: "bar",
      width: 450
    }
  }*/
}
