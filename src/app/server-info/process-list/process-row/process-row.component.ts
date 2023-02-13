import {Component, Input, OnInit} from '@angular/core';
import {Process} from "../../../interfaces/Process";

@Component({
  selector: 'app-process-row',
  templateUrl: './process-row.component.html',
  styleUrls: ['./process-row.component.css']
})
export class ProcessRowComponent implements OnInit{

  @Input() process!: Process;
  panelOpenState = false;

  ngOnInit() {
  }


}
