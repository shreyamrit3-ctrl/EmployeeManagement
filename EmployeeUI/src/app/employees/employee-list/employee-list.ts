
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';

import {
  NgFor,
  NgIf,
  DecimalPipe
} from '@angular/common';

import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

import { Employee } from '../../models/employee';
import { EmployeeService } from '../../services/employee';

@Component({
  selector: 'app-employee-list',
  standalone: true,
  imports: [
    NgFor,
    NgIf,
    DecimalPipe,
    FormsModule,
    RouterLink
  ],
  templateUrl: './employee-list.html',
  styleUrl: './employee-list.css'
})
export class EmployeeList implements OnInit {

  employees: Employee[] = [];

  searchText: string = '';

  constructor(
    private employeeService: EmployeeService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.getEmployees();
  }

  // GET ALL EMPLOYEES
  getEmployees(): void {

    this.employeeService.getEmployees().subscribe({

      next: (data) => {
        this.employees = data;
        this.cdr.detectChanges();
      },

      error: (err) => {
        console.log(err);
      }

    });

  }

  // SEARCH EMPLOYEES
  get filteredEmployees(): Employee[] {

    const search = this.searchText.toLowerCase().trim();

    if (!search) {
      return this.employees;
    }

    return this.employees.filter(emp =>

      emp.employeeId?.toString().includes(search) ||

      emp.employeeName.toLowerCase().includes(search) ||

      emp.email.toLowerCase().includes(search) ||

      emp.department.toLowerCase().includes(search)

    );

  }

  // DELETE EMPLOYEE
  deleteEmployee(id: number): void {

    if (confirm('Are you sure you want to delete this employee?')) {

      this.employeeService.deleteEmployee(id).subscribe({

        next: (response) => {

          alert(response);

          this.getEmployees();

        },

        error: (err) => {

          console.log('Status:', err.status);
          console.log('Error:', err.error);
          console.log('Full Error:', err);

          alert('Employee Delete Failed');

        }

      });

    }

  }

}
