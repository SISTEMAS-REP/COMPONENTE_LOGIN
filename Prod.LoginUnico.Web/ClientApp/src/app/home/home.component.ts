import { Component, OnInit, HostListener } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit {
  test: Date = new Date();
  isCollapsed = true;

  ngOnInit(): void {}
}
