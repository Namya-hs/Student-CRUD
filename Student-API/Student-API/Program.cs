
using Microsoft.EntityFrameworkCore;
using Student_API.DataAccess;
using Student_API.Database;

namespace Student_API
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);

            //Database
            builder.Services.AddDbContext<StudentContext>(options =>
            {
                options.UseNpgsql(builder.Configuration.GetConnectionString("DefaultConnection"));
            });

            // Add services to the container.
            builder.Services.AddControllers();
            builder.Services.AddDbContext<StudentContext>();
            builder.Services.AddScoped<IStudentRespository,StudentRepository>();
            
            // Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
            builder.Services.AddEndpointsApiExplorer();
            builder.Services.AddSwaggerGen();

            // Enable CORS
            builder.Services.AddCors(options =>
            {
                options.AddPolicy("AllowAngularApp",
                    policy =>
                    {
                        policy.WithOrigins("http://localhost:4200") // Adjust if frontend is hosted elsewhere
                              .AllowAnyHeader()
                              .AllowAnyMethod();
                    });
            });

            var app = builder.Build();

            app.UseCors("AllowAngularApp");
            // Configure the HTTP request pipeline.
            if (app.Environment.IsDevelopment())
            {
                app.UseSwagger();
                app.UseSwaggerUI();
            }

            app.UseHttpsRedirection();

            app.UseAuthorization();


            app.MapControllers();

            app.Run();
        }
    }
}
