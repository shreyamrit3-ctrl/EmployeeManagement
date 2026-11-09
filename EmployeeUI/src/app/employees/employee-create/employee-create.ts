import { Component } from '@angular/core';

import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule
} from '@angular/forms';

import { Router } from '@angular/router';

import { EmployeeService } from '../../services/employee';

@Component({
  selector: 'app-employee-create',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './employee-create.html',
  styleUrl: './employee-create.css'
})
export class EmployeeCreate {

  employeeForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private employeeService: EmployeeService,
    private router: Router
  ) {

    this.employeeForm = this.fb.nonNullable.group({

      employeeName: ['', Validators.required],

      email: ['', [Validators.required, Validators.email]],

      department: ['', Validators.required],

      salary: [0, [Validators.required, Validators.min(1)]]

    });

  }

  onSubmit(): void {

    if (this.employeeForm.invalid) {
      this.employeeForm.markAllAsTouched();
      return;
    }

    this.employeeService
      .createEmployee(this.employeeForm.getRawValue())
      .subscribe({

        next: () => {
          alert('Employee Created Successfully');
          this.router.navigate(['/employees']);
        },

        error: (error) => {
          console.error(error);
          alert('Employee creation failed');
        }

      });

  }
}