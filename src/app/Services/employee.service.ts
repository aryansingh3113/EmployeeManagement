// import { inject, Injectable } from '@angular/core';
// import {HttpClient} from '@angular/common/http';
// import { Employee } from '../Models/Employee';

// @Injectable({
//   providedIn: 'root'
// })
// export class EmployeeService {

//   http : HttpClient = inject(HttpClient);
//   // Initial Data
//   private employees = [
//     { name: "Rohan", id: 24, img: "assets/user.png", email: "rohan@gmail.com", gender: "Male", nationality: "Indian", contact: 1234567895, designation: "Consultant", yearExp: 3, business: "Consultancy Service" },
//     { name: "Naman", id: 25, img: "assets/user2.jpg", email: "naman@gmail.com", gender: "Male", nationality: "Indian", contact: 5987654321, designation: "Software Engineer", yearExp: 10, business: "IT Services" },
//     { name: "Shweta", id: 26, img: "assets/user3.png", email: "shweta12@gmail.com", gender: "Female", nationality: "Indian", contact: 5464783512, designation: "UI Developer", yearExp: 6, business: "IT Services" },
//     { name: "Surbhi", id: 27, img: "assets/user4.png", email: "surbhi12@gmail.com", gender: "Female", nationality: "Indian", contact: 8465112, designation: "UI Developer", yearExp: 1, business: "IT Services" }
//   ];

//   private selectedEmp: any = null;

//   // createEmployee(data : Employee){
//   //   this.http.post<{name : string}>('https://employee-38e87-default-rtdb.firebaseio.com/employees.json', data)
//   //   .subscribe({next: (response) => {
//   //     console.log(response);
//   //   }})
//   // }

//   getEmployees() {
//     return this.employees;
//   }

//   // This is what adds the new form data to the list
//   addEmployee(newEmp: any) {
//     this.employees.push(newEmp);
//   }

//   setEmployeeForProfile(emp: any) { //row stored hai isme ab
//     this.selectedEmp = emp;
//   }

//   getEmployeeForProfile() {
//     return this.selectedEmp;  //row ko fetch kr ra h
//   }
  
//   //Delete row from the table
// // Add this method to your EmployeeService class
//   deleteEmployee(id: number) {
//     this.employees = this.employees.filter(emp => emp.id !== id); //agr value true hoti hai, then it is kept and if value is false then it is discarded
// }

// //FOR EDIT FUNCTIONALITY
// private editEmp: any = null;

// setEmployeeForEdit(emp: any) {
//   this.editEmp = emp;
// }

// getEmployeeForEdit() {
//   const temp = this.editEmp;
//   this.editEmp = null; // Clear it after fetching so the form is empty for "New" registrations
//   return temp;
// }
// }
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  private dbUrl = 'https://employee-38e87-default-rtdb.firebaseio.com/employees';

  private selectedEmp: any = null;
  private editEmp:     any = null;

  constructor(
    private http:   HttpClient,
    private afAuth: AngularFireAuth   // ← inject Firebase Auth
  ) {}

  // ─── Get token from Firebase ───
  // ─── Get token from Firebase ───
private getToken(): Observable<string> {
  return new Observable(observer => {
    this.afAuth.authState.subscribe(user => {
      if (user) {
        user.getIdToken().then(token => {
          observer.next(token);
          observer.complete();
        });
      } else {
        // ← No user found, try onAuthStateChanged as fallback
        this.afAuth.onAuthStateChanged(firebaseUser => {
          if (firebaseUser) {
            firebaseUser.getIdToken().then(token => {
              observer.next(token);
              observer.complete();
            });
          } else {
            observer.next('');
            observer.complete();
          }
        });
      }
    });
  });
}

  // ─── GET all employees ───
  getEmployees(): Observable<any[]> {
    return this.getToken().pipe(
      switchMap(token =>
        this.http.get<{ [key: string]: any }>(
          `${this.dbUrl}.json?auth=${token}`   // ← attach token
        ).pipe(
          map(data => {
            if (!data) return [];
            return Object.keys(data).map(key => ({
              firebaseKey: key,
              ...data[key]
            }));
          })
        )
      )
    );
  }

  // ─── ADD employee ───
  addEmployee(emp: any): Observable<any> {
    return this.getToken().pipe(
      switchMap(token =>
        this.http.post(
          `${this.dbUrl}.json?auth=${token}`,  // ← attach token
          emp
        )
      )
    );
  }

  // ─── UPDATE employee ───
  updateEmployee(firebaseKey: string, emp: any): Observable<any> {
    return this.getToken().pipe(
      switchMap(token =>
        this.http.put(
          `${this.dbUrl}/${firebaseKey}.json?auth=${token}`,  // ← attach token
          emp
        )
      )
    );
  }

  // ─── DELETE employee ───
  deleteEmployee(firebaseKey: string): Observable<any> {
    return this.getToken().pipe(
      switchMap(token =>
        this.http.delete(
          `${this.dbUrl}/${firebaseKey}.json?auth=${token}`   // ← attach token
        )
      )
    );
  }

  // ─── Profile helpers ───
  setEmployeeForProfile(emp: any) { this.selectedEmp = emp; }
  getEmployeeForProfile()         { return this.selectedEmp; }

  // ─── Edit helpers ───
  setEmployeeForEdit(emp: any) { this.editEmp = emp; }
  getEmployeeForEdit() {
    const temp    = this.editEmp;
    this.editEmp  = null;
    return temp;
  }
}