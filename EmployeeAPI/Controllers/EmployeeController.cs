using EmployeeAPI.Interfaces;
using EmployeeAPI.Models;
using Microsoft.AspNetCore.Mvc;

namespace EmployeeAPI.Controllers;

[Route("api/[controller]")]
[ApiController]
public class EmployeeController : ControllerBase
{
    private readonly IEmployeeService _service;

    public EmployeeController(IEmployeeService service)
    {
        _service = service;
    }

    // GET: api/Employee
    [HttpGet]
    public async Task<IActionResult> GetAll()
    {
        var employees = await _service.GetAllEmployees();

        return Ok(employees);
    }

    // GET: api/Employee/1
    [HttpGet("{id}")]
    public async Task<IActionResult> GetById(int id)
    {
        var employee = await _service.GetEmployeeById(id);

        if (employee == null)
            return NotFound();

        return Ok(employee);
    }

    // POST: api/Employee
    [HttpPost]
    public async Task<IActionResult> Create(Employee employee)
    {
        var result = await _service.AddEmployee(employee);

        return CreatedAtAction(
            nameof(GetById),
            new { id = result.EmployeeId },
            result);
    }

    // PUT: api/Employee/1
    [HttpPut("{id}")]
    public async Task<IActionResult> Update(int id, Employee employee)
    {
        var result = await _service.UpdateEmployee(id, employee);

        if (result == null)
            return NotFound();

        return Ok(result);
    }

    // DELETE: api/Employee/1
    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(int id)
    {
        var result = await _service.DeleteEmployee(id);

        if (!result)
            return NotFound();

        return Ok("Employee deleted successfully");
    }
}