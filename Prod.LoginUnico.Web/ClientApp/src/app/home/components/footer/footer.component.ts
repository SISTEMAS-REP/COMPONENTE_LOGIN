import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: [],
})
export class FooterComponent implements OnInit {
  test: Date = new Date();

  constructor() {}

  ngOnInit(): void {}
}