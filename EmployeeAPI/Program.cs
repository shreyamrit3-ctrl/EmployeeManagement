using EmployeeAPI.Data;
using EmployeeAPI.Interfaces;
using EmployeeAPI.Repository;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();

builder.Services.AddEndpointsApiExplorer();

builder.Services.AddSwaggerGen();

// Database Connection
builder.Services.AddDbContext<EmployeeDbContext>(options =>
    options.UseSqlServer(
        builder.Configuration.GetConnectionString("EmployeeConnection")));

// Dependency Injection


builder.Services.AddScoped<IEmployeeService, EmployeeRepository>();

// CORS for Angular
builder.Services.AddCors(options =>
{
    options.AddPolicy("AngularPolicy", policy =>
    {
        policy.WithOrigins("http://localhost:4200")
              .AllowAnyHeader()
              .AllowAnyMethod();
    });
});

var app = builder.Build();

app.UseSwagger();

app.UseSwaggerUI();

app.UseCors("AngularPolicy");


app.MapControllers();

app.Run();