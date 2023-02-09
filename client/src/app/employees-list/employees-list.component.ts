import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Employee } from '../employee';
import { EmployeeService } from '../employee.service';
 
@Component({
 selector: 'app-employees-list',
 template: `

  <div class="m-5 flex justify-between align-middle">
    <h2 class="m-6 text-center text-3xl font-bold tracking-tight text-gray-900 dark:text-slate-200">Employees List</h2>
    <a [routerLink]="['new']" class="self-end m-3 bg-sky-400 text-white dark:bg-sky-800  px-3 py-2 rounded-md text-sm font-medium">Add a New Employee</a>
  </div>
 
   <div class="overflow-hidden rounded-lg border border-gray-200 dark:border-gray-500 shadow-md m-5">
     <table class="w-full border-collapse bg-white dark:bg-gray-300 text-left text-md text-gray-500 dark:text-slate-800">
         <thead class="bg-gray-50 dark:bg-gray-600">
             <tr>
                 <th class="px-6 py-4 font-medium text-gray-900 dark:text-slate-200">Name</th>
                 <th class="px-6 py-4 font-medium text-gray-900 dark:text-slate-200">Position</th>
                 <th class="px-6 py-4 font-medium text-gray-900 dark:text-slate-200">Level</th>
                 <th class="px-6 py-4 font-medium text-gray-900 text-center dark:text-slate-200">Action</th>
             </tr>
         </thead>
   
         <tbody class="divide-y divide-gray-100 border-t border-gray-100 dark:border-gray-500">
             <tr *ngFor="let employee of employees$ | async" class="hover:bg-gray-50 dark:hover:bg-gray-400">
                 <td class="px-6 py-4">{{employee.name}}</td>
                 <td class="px-6 py-4">{{employee.position}}</td>
                 <td class="px-6 py-4">{{employee.level}}</td>
                 <td class="px-6 py-4">
                     <div class="flex justify-center gap-4">
                      <a [routerLink]="['edit/', employee._id]">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke-width="1.5"
                          stroke="currentColor"
                          class="h-6 w-6"
                          x-tooltip="tooltip"
                        >
                        <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125"
                          />
                        </svg>
                      </a>
                      <a  (click)="deleteEmployee(employee._id || '')">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke-width="1.5"
                          stroke="currentColor"
                          class="h-6 w-6"
                          x-tooltip="tooltip"
                        >
                        <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                          />
                        </svg>
                      </a>
                    </div>
                 </td>
             </tr>
         </tbody>
     </table>
   </div>
 
 `
})
export class EmployeesListComponent implements OnInit {
 employees$: Observable<Employee[]> = new Observable();
 
 constructor(private employeesService: EmployeeService) { }
 
 ngOnInit(): void {
   this.fetchEmployees();
 }
 
 deleteEmployee(id: string): void {
   this.employeesService.deleteEmployee(id).subscribe({
     next: () => this.fetchEmployees()
   });
 }
 
 private fetchEmployees(): void {
   this.employees$ = this.employeesService.getEmployees();
 }
}