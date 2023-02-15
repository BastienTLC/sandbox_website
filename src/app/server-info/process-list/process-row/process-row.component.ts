import {Component, Inject, Input, OnInit} from '@angular/core';
import {Process} from "../../../interfaces/Process";
import {ServerDataService} from "../../server-data.service";
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";

export interface DialogData {
  mdp: string;
}

@Component({
  selector: 'app-process-row',
  templateUrl: './process-row.component.html',
  styleUrls: ['./process-row.component.css']
})
export class ProcessRowComponent implements OnInit{

  @Input() process!: Process;
  panelOpenState = false;
  isRun = true;
  passWd!: string;
  constructor(private serveurData: ServerDataService, public dialog: MatDialog) {
  }

  sendPauseSig(){

    this.openDialog();

    /*if (this.passWd){
      this.serveurData.pauseProcess(this.process.pid, this.passWd).subscribe();
      this.isRun = this.isRun === true ? false : true;
    }*/

    this.openDialog().afterClosed().subscribe((result: string) => {
      if (result) {
        this.serveurData.pauseProcess(this.process.pid, result).subscribe();
        this.isRun = !this.isRun;
      }
    });


  }

  sendRestartSig(){
    this.openDialog();

  }

  sendStopSig(){
    this.openDialog();

  }

  ngOnInit() {
  }

  openDialog(): any {
    const dialogRef = this.dialog.open(PassWordDialog, {
      data: {pass: this.passWd},
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.passWd = result;
    });

    return dialogRef;
  }
}

@Component({
  selector: 'pass-word-dialog',
  templateUrl: 'pass-word-dialog.html',
})
export class PassWordDialog{
  constructor(
      public dialogRef: MatDialogRef<PassWordDialog>,
      @Inject(MAT_DIALOG_DATA) public data: DialogData,
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}
