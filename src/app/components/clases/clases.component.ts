import { Component, OnInit } from '@angular/core';
@Component({
  selector: 'app-clases',
  templateUrl: './clases.component.html',
  styleUrls: ['./clases.component.scss']
})
export class ClasesComponent implements OnInit {

  itemsAlumn=[1,2,3]

  filterItem= '';
  constructor() { }

  ngOnInit(): void {
  }


}
