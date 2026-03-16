import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../Services/employee.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  empDetails: any = null;

  constructor(private empService: EmployeeService) {}

  ngOnInit() {
    // Retrieve the employee that was saved in the service
    this.empDetails = this.empService.getEmployeeForProfile();
    console.log('Selected Employee Data:', this.empDetails); //to check if data is coming or not
  }
}