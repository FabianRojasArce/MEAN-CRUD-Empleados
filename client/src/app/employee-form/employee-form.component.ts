import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';
import { Employee } from '../employee';
 
@Component({
 selector: 'app-employee-form',
 template: `
 <div class="m-32 md:col-span-2 md:mt-0 ">
      <form class="employee-form" autocomplete="off" [formGroup]="employeeForm" (ngSubmit)="submitForm()">
        <div class="overflow-hidden shadow sm:rounded-md">
          <div class="bg-gray-50 dark:bg-gray-600  px-4 py-5 sm:p-6">
            <div class="grid grid-cols-6 gap-6">
              <div class="col-span-6 sm:col-span-3">
                <label for="name" class="block text-sm font-medium text-gray-700 dark:text-slate-200">Name</label>
                <input type="text" formControlName="name" placeholder="Name" required class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm">
                

                
                <div *ngIf="!validForm" class="text-red-600 dark:text-red-500">
                  <div *ngIf="name.errors?.['required']">
                    Name is required.
                  </div>
                  <div *ngIf="name.errors?.['minlength']">
                    Name must be at least 3 characters long.
                  </div>
                </div>
              </div>

              <div class="col-span-6 sm:col-span-3">
                <label for="position" class="block text-sm font-medium text-gray-700 dark:text-slate-200">Position</label>
                <input type="text" formControlName="position" placeholder="Position" required class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm">
                
                <div *ngIf="!validForm && (position.errors?.['required'] || position.errors?.['minlength'])" class="text-red-600 dark:text-red-500">
                  <div *ngIf="position.errors?.['required']">
                    Position is required.
                  </div>
                  <div *ngIf="position.errors?.['minlength']">
                    Position must be at least 3 characters long.
                  </div>
                </div>
              </div>


              <div class="flex-col-reverse text-gray-700 dark:text-slate-200">
                  <label  class="block text-sm font-medium">Level</label>
                  <label class="inline-flex items-center">
                    <input class="form-radio" type="radio" formControlName="level" name="level" id="level-junior" value="junior" required>
                    <span class="ml-2" for="level-junior">Junior</span>
                  </label>

                  <label class="inline-flex items-center">
                    <input class="form-radio" type="radio" formControlName="level" name="level" id="level-mid" value="mid" required>
                    <span class="ml-2" for="level-mid">Mid</span>
                  </label>
                  
                  <label class="inline-flex items-center">
                    <input class="form-radio" type="radio" formControlName="level" name="level" id="level-senior" value="senior" required>
                    <span class="ml-2" for="level-senior">Senior</span>
                  </label>

                  <div *ngIf="!validForm && (level.errors?.['required'])" class="text-red-600 flex-nowrap dark:text-red-500">
                    <div *ngIf="level.errors?.['required']">
                      level is required.
                    </div>
                    <div *ngIf="level.errors?.['minlength']">
                      level must be at least 3 characters long.
                    </div>
                  </div>
              </div>
              
            </div>
          </div>
          <div class="bg-gray-50 dark:bg-gray-500 text-right sm:px-6">
            <button class="self-end m-3 bg-sky-400 text-white dark:bg-sky-800 px-3 py-2 rounded-md text-sm font-medium hover:cursor-pointer" type="submit">Add</button>
          </div>
        </div>
      </form>
    </div>
 `,
 styles: [
   `.employee-form {
     max-width: 560px;
     margin-left: auto;
     margin-right: auto;
   }`
 ]
})
export class EmployeeFormComponent implements OnInit {
 @Input()
 initialState: BehaviorSubject<Employee> = new BehaviorSubject({});
 
 @Output()
 formValuesChanged = new EventEmitter<Employee>();
 
 @Output()
 formSubmitted = new EventEmitter<Employee>();
 
 employeeForm: FormGroup = new FormGroup({});
 
 constructor(private fb: FormBuilder) { }
 
 get name() { return this.employeeForm.get('name')!; }
 get position() { return this.employeeForm.get('position')!; }
 get level() { return this.employeeForm.get('level')!; }
 validForm = true
 
 ngOnInit() {
   this.initialState.subscribe(employee => {
     this.employeeForm = this.fb.group({
       name: [ employee.name, [Validators.required, Validators.minLength(3)] ],
       position: [ employee.position, [ Validators.required, Validators.minLength(5) ] ],
       level: [ employee.level, [Validators.required] ]
     });
   });
 
   this.employeeForm.valueChanges.subscribe((val) => { this.formValuesChanged.emit(val); });
 }
 
 submitForm() {
  if (this.employeeForm.status === 'VALID') {
    this.formSubmitted.emit(this.employeeForm.value);
    this.validForm = true
  }else{
    this.validForm = false
  }
 }
}