import { Component } from '@angular/core';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent {
  isExpand = false;

  onMouseEnter(){
    this.isExpand = true;
  }
  onMouseLeave(){
    this.isExpand = false;
  }
}
