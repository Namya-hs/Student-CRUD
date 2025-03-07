using Microsoft.AspNetCore.Mvc;
using Student_API.DataAccess;
using Student_API.Models;

namespace Student_API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class StudentController : Controller
    {
        private readonly IStudentRespository _studentRespository;

        public StudentController(IStudentRespository studentRespository)
        {
            _studentRespository = studentRespository;
        }

        #region GET
        [HttpGet]
        public IActionResult GetAllStudents()
        {
            return Ok(_studentRespository.GetAllStudents());
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Students>> GetStudent(int id)
        {
            var student = await _studentRespository.GetStudentByIdAsync(id);
            if (student == null)
            {
                return NotFound(new { message = "Student not found." });
            }
            return Ok(student);
        }

        #endregion

        #region POST

        [HttpPost]
        public async Task<ActionResult<Students>> CreateStudent(Students student)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var createdStudent = await _studentRespository.CreateStudentAsync(student);
            return CreatedAtAction(nameof(GetStudent), new { id = createdStudent.StudentID }, createdStudent);
        }
        #endregion

        #region PUT

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateStudent(int id, Students student)
        {
            if (id != student.StudentID)
            {
                return BadRequest(new { message = "Student ID mismatch." });
            }

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var updated = await _studentRespository.UpdateStudentAsync(student);
            if (!updated)
            {
                return NotFound(new { message = "Student not found." });
            }

            return NoContent();
        }
        #endregion

        #region DELETE

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteStudent(int id)
        {
            var deleted = await _studentRespository.DeleteStudentAsync(id);
            if (!deleted)
            {
                return NotFound(new { message = "Student not found." });
            }

            return Ok();
        }
        #endregion
    }
}
