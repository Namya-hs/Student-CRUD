using Microsoft.EntityFrameworkCore;
using Student_API.Database;
using Student_API.Models;

namespace Student_API.DataAccess
{
    public class StudentRepository : IStudentRespository
    {
        private readonly  StudentContext _context;
        public StudentRepository(StudentContext context)
        {
            _context = context;
        }

        public List<Students> GetAllStudents()
        {
            return _context.Students.ToList();
        }

        public async Task<Students> GetStudentByIdAsync(int id)
        {
            return await _context.Students.FindAsync(id);
        }

        public async Task<Students> CreateStudentAsync(Students student)
        {
            _context.Students.Add(student);
            await _context.SaveChangesAsync();
            return student;
        }

        public async Task<bool> UpdateStudentAsync(Students student)
        {
            if (!_context.Students.Any(s => s.StudentID == student.StudentID))
            {
                return false;
            }

            _context.Entry(student).State = EntityState.Modified;
            await _context.SaveChangesAsync();
            return true;
        }

        public async Task<bool> DeleteStudentAsync(int id)
        {
            var student = await _context.Students.FindAsync(id);
            if (student == null)
            {
                return false;
            }

            _context.Students.Remove(student);
            await _context.SaveChangesAsync();
            return true;
        }
    }
}
