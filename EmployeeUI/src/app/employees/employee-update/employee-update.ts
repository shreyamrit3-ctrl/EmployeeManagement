import { Component, OnInit } from '@angular/core';

import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule
} from '@angular/forms';

import { ActivatedRoute, Router } from '@angular/router';

import { EmployeeService } from '../../services/employee';

@Component({
  selector: 'app-employee-update',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './employee-update.html',
  styleUrl: './employee-update.css'
})
export class EmployeeUpdate implements OnInit {

  employeeForm: FormGroup;

  employeeId: number = 0;

  constructor(
    private fb: FormBuilder,
    private employeeService: EmployeeService,
    private route: ActivatedRoute,
    private router: Router
  ) {

    this.employeeForm = this.fb.nonNullable.group({

      employeeName: ['', Validators.required],

      email: ['', [Validators.required, Validators.email]],

      department: ['', Validators.required],

      salary: [0, [Validators.required, Validators.min(1)]]

    });

  }

  ngOnInit(): void {

    this.employeeId = Number(
      this.route.snapshot.paramMap.get('id')
    );

    this.loadEmployee();

  }

  loadEmployee(): void {

    this.employeeService.getEmployeeById(this.employeeId).subscribe({

      next: (data) => {

        this.employeeForm.patchValue({

          employeeName: data.employeeName,

          email: data.email,

          department: data.department,

          salary: data.salary

        });

      },

      error: (err) => {

        console.log(err);

        alert('Employee not found');

      }

    });

  }

  onSubmit(): void {

    if (this.employeeForm.invalid) {

      this.employeeForm.markAllAsTouched();

      return;

    }

    this.employeeService
      .updateEmployee(this.employeeId, this.employeeForm.getRawValue())
      .subscribe({

        next: () => {

          alert('Employee Updated Successfully');

          this.router.navigate(['/employees']);

        },

        error: (err) => {

          console.log(err);

          alert('Employee Update Failed');

        }

      });

  }

}