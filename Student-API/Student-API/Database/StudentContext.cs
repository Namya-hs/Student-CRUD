using Microsoft.EntityFrameworkCore;
using Student_API.Models;

namespace Student_API.Database
{
    public class StudentContext : DbContext
    {
        public StudentContext(DbContextOptions<StudentContext> options) : base(options)
        {
            
        }

        public DbSet<Students> Students { get; set; }
    }
}
