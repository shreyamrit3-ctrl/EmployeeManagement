using EmployeeAPI.Models;

namespace EmployeeAPI.Interfaces;

public interface IEmployeeService
{
    Task<List<Employee>> GetAllEmployees();

    Task<Employee?> GetEmployeeById(int id);

    Task<Employee> AddEmployee(Employee employee);

    Task<Employee?> UpdateEmployee(int id, Employee employee);

    Task<bool> DeleteEmployee(int id);
}