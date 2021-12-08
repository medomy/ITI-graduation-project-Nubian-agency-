import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin-side-nav',
  templateUrl: './admin-side-nav.component.html',
  styleUrls: ['./admin-side-nav.component.css'],
})
export class AdminSideNavComponent implements OnInit {
  sidenavWidth = 4;
  ngStyle: string;
  constructor() {}

  ngOnInit(): void {}

  increase() {
    this.sidenavWidth = 15;
    console.log('increase sidenav width');
  }
  decrease() {
    this.sidenavWidth = 4;
    console.log('decrease sidenav width');
  }
  sidenavToggle() {
    this.ngStyle = 'this.sidenavWidth = 15';
    console.log('sidenav width incrases');
  }
}
