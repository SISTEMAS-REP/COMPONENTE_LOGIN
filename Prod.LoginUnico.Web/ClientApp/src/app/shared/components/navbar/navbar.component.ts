import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: [],
})
export class NavbarComponent implements OnInit {
  isCollapsed = true;

  constructor() {}

  ngOnInit(): void {}
}
