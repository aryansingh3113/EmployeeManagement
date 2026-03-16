import { Component , Input} from '@angular/core';

@Component({
  selector: 'app-child',
  templateUrl: './child.component.html',
  styleUrls: ['./child.component.css']
})
export class ChildComponent {
  @Input() name : string = ""
  @Input() age : number | null = null
  isActive = false;

  toggle() {
    this.isActive = !this.isActive;
  }

}
