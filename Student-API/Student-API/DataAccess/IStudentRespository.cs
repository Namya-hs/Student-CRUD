using Student_API.Models;

namespace Student_API.DataAccess
{
    public interface IStudentRespository
    {
        List<Students> GetAllStudents();
        Task<Students> GetStudentByIdAsync(int id);
        Task<Students> CreateStudentAsync(Students student);
        Task<bool> UpdateStudentAsync(Students student);
        Task<bool> DeleteStudentAsync(int id);
    }
}
