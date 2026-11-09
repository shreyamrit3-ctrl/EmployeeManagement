namespace EmployeeAPI.Models;

public  class Employee
{
    public int EmployeeId { get; set; }

    public string EmployeeName { get; set; } = null!;

    public string Email { get; set; } = null!;

    public string Department { get; set; } = null!;

    public decimal Salary { get; set; }
}