import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-decision',
  templateUrl: './decision.component.html',
  styleUrls: ['./decision.component.css']
})
export class DecisionComponent implements OnInit {

  title="";
  message:any="¿Desea guardar la información?";

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private sanitizer:DomSanitizer) {
    if(data.title&&data.title.trim()!=""){
      this.title=data.title;
    }
    if(data.message&&data.message.trim()!=""){
      this.message=this.sanitizer.bypassSecurityTrustHtml(data.message);
    }
  }

  ngOnInit(): void {
  }

}
