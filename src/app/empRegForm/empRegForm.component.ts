import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EmployeeService } from '../Services/employee.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DialogService } from '../Services/dialog.service';

@Component({
  selector: 'app-emp-reg-form',
  templateUrl: './empRegForm.component.html',
  styleUrls: ['./empRegForm.component.css']
})
export class EmpRegFormComponent implements OnInit {
  isLoading = false; 
  isEditMode = false;
  firebaseKey = '';

  empData = {
    name: '', id: '', designation: '',
    yearExp: null, business: '', nationality: '',
    email: '', contact: '', gender: '',
    img: 'assets/user.png'
  };

  reactiveForm: FormGroup;

  constructor(private empService: EmployeeService, private router: Router, private dialogService: DialogService) {}

  ngOnInit() {
    this.reactiveForm = new FormGroup({
      empname:     new FormControl(null, Validators.required),
      empId:       new FormControl(null, Validators.required),
      designation: new FormControl(null, Validators.required),
      experience:  new FormControl(null, Validators.required),
      business:    new FormControl(null, Validators.required),
      nationality: new FormControl(null, Validators.required),
      email:       new FormControl(null, [Validators.required, Validators.email]),
      contact:     new FormControl(null, Validators.required),
      gender:      new FormControl('', Validators.required),
    });

    // ─── Live preview ───
    this.reactiveForm.valueChanges.subscribe(val => {
      this.empData.name        = val.empname;
      this.empData.id          = val.empId;
      this.empData.designation = val.designation;
      this.empData.yearExp     = val.experience;
      this.empData.business    = val.business;
      this.empData.nationality = val.nationality;
      this.empData.email       = val.email;
      this.empData.contact     = val.contact;
      this.empData.gender      = val.gender;
    });

    // ─── Edit mode: prefill form ───
    const dataToEdit = this.empService.getEmployeeForEdit();
    if (dataToEdit) {
      this.isEditMode  = true;
      this.firebaseKey = dataToEdit.firebaseKey;

      this.reactiveForm.patchValue({
        empname:     dataToEdit.name,
        empId:       dataToEdit.id,
        designation: dataToEdit.designation,
        experience:  dataToEdit.yearExp,
        business:    dataToEdit.business,
        nationality: dataToEdit.nationality,
        email:       dataToEdit.email,
        contact:     dataToEdit.contact,
        gender:      dataToEdit.gender
      });
    }
    console.log(this.reactiveForm);
  }

  onSubmit() {
    if (this.reactiveForm.invalid) {
      this.dialogService.error('Please fill in all required fields.');
      return;
    }
    
    const val = this.reactiveForm.value;

    const employeeToSave = {
      name:        val.empname,
      id:          val.empId,
      designation: val.designation,
      yearExp:     val.experience,
      business:    val.business,
      nationality: val.nationality,
      email:       val.email,
      contact:     val.contact,
      gender:      val.gender,
      img:         'assets/user.png'
    };

    this.isLoading = true; //start the loader

    if (this.isEditMode) {
      // ─── UPDATE in Firebase ───
      this.empService.updateEmployee(this.firebaseKey, employeeToSave).subscribe({
        next: () => {
          this.isLoading = false; //stop the loader
          this.dialogService.success(`${employeeToSave.name} updated successfully!`);
          this.router.navigate(['/Employee']);
        },
        error: (err) => {
          this.isLoading = false;   // ← STOP loader even on error
          console.error('Update error:', err);
          this.dialogService.error('Something went wrong. Please try again.');
        }
      });

    } else {
      // ─── ADD to Firebase ───
      this.empService.addEmployee(employeeToSave).subscribe({
        next: () => {
          this.isLoading = false;   // ← STOP loader
          this.dialogService.success(`${employeeToSave.name} registered successfully!`);
          this.router.navigate(['/Employee']);
        },
        error: (err) => {
          this.isLoading = false;   // ← STOP loader even on error
          console.error('Add error:', err);
          this.dialogService.error('Something went wrong. Please try again.');
        }
      });
    }
  }
}