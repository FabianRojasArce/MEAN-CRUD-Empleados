import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Employee } from '../employee';
import { EmployeeService } from '../employee.service';
 
@Component({
 selector: 'app-add-employee',
 template: `
   <h2 class="m-6 text-center text-3xl font-bold tracking-tight text-gray-900 dark:text-slate-200">Add a New Employee</h2>
   <app-employee-form (formSubmitted)="addEmployee($event)"></app-employee-form>
 `
})
export class AddEmployeeComponent {
 constructor(
   private router: Router,
   private employeeService: EmployeeService
 ) { }
 
 addEmployee(employee: Employee) {
   this.employeeService.createEmployee(employee)
     .subscribe({
       next: () => {
         this.router.navigate(['/employees']);
       },
       error: (error) => {
         alert("Failed to create employee");
         console.error(error);
       }
     });
 }
}