import { Routes } from '@angular/router';
import { EmployeeList } from './employees/employee-list/employee-list';
import { EmployeeCreate } from './employees/employee-create/employee-create';
import { EmployeeUpdate } from './employees/employee-update/employee-update';

export const routes: Routes = [

  {
    path: '',
    redirectTo: 'employees',
    pathMatch: 'full'
  },

  {
    path: 'employees',
    component: EmployeeList
  },

  {
    path: 'create',
    component: EmployeeCreate
  },

  {
    path: 'update/:id',
    component: EmployeeUpdate
  }

];