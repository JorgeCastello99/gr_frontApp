import { UserService } from './../../services/user/user.service';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { ChartDataSets, ChartType, RadialChartOptions } from 'chart.js';
import { Label } from 'ng2-charts';

@Component({
  selector: 'app-studentprofile',
  templateUrl: './studentprofile.component.html',
  styleUrls: ['./studentprofile.component.scss']
})
export class StudentprofileComponent implements OnInit {

  public radarChartOptions: RadialChartOptions = {
    responsive: true,
    legend: { display: false},
    scale: {
      ticks: {
          min: 0,
          max: 100,
          display: false
      },
      gridLines: { color: 'rgba(255,255,255)' }
  }

  };

  lineChartColors = [
    { // grey
      backgroundColor: 'rgba(255,255,255,0.2)',
      borderColor: 'rgba(0,0,0,1)', //este para cambiar por un morado
      pointBackgroundColor: 'rgba(0,0,0)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    }
  ];
  public radarChartLabels: Label[] = ['Designing', 'Coding', 'Cycling', 'Running'];

  public radarChartData: ChartDataSets[] = [
    { data: [81, 26, 55, 60]}
  ];
  public radarChartType: ChartType = 'radar';
  idUser: any
  constructor(private activatedRoute: ActivatedRoute, private userService: UserService) { }

  ngOnInit(): void {
    this.idUser = this.activatedRoute.snapshot.paramMap.get('id');
    this.userService.getUser(this.idUser).subscribe(data => {
    }, error => {
      console.log(error)
    })
  }

}
