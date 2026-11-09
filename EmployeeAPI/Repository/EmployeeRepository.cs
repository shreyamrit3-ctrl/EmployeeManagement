using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using EmployeeAPI.Data;
using EmployeeAPI.Interfaces;
using EmployeeAPI.Models;
using Microsoft.EntityFrameworkCore;

namespace EmployeeAPI.Repository
{
    public class EmployeeRepository : IEmployeeService
    {
        private readonly EmployeeDbContext _context;

    public EmployeeRepository(EmployeeDbContext context)
    {
        _context = context;
    }

    // 1. Get All
    public async Task<List<Employee>> GetAllEmployees()
    {
        return await _context.Employees.ToListAsync();
    }

    // 2. Get By ID
    public async Task<Employee?> GetEmployeeById(int id)
    {
        return await _context.Employees.FindAsync(id);
    }

    // 3. Insert
    public async Task<Employee> AddEmployee(Employee employee)
    {
        _context.Employees.Add(employee);

        await _context.SaveChangesAsync();

        return employee;
    }

    // 4. Update
    public async Task<Employee?> UpdateEmployee(int id, Employee employee)
    {
        var existing = await _context.Employees.FindAsync(id);

        if (existing == null)
            return null;

        existing.EmployeeName = employee.EmployeeName;
        existing.Email = employee.Email;
        existing.Department = employee.Department;
        existing.Salary = employee.Salary;

        await _context.SaveChangesAsync();

        return existing;
    }

    // 5. Delete
    public async Task<bool> DeleteEmployee(int id)
    {
        var employee = await _context.Employees.FindAsync(id);

        if (employee == null)
            return false;

        _context.Employees.Remove(employee);

        await _context.SaveChangesAsync();

        return true;
    }
}
}