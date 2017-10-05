import { Component, OnInit, Inject } from '@angular/core';
import { MD_DIALOG_DATA, MdDialogRef } from '@angular/material';

@Component({
  selector: 'app-exception',
  templateUrl: './exception.component.html',
  styleUrls: ['./exception.component.scss']
})
export class ExceptionComponent implements OnInit {

  constructor(
    @Inject(MD_DIALOG_DATA) public data: { 
      statusText: string,
      message: string,
      buttonLabel: string
    }, 
    public dialogRef: MdDialogRef<ExceptionComponent>,
  ) { }

  ngOnInit() {
  }

  close() {
    this.dialogRef.close();
  }
}
