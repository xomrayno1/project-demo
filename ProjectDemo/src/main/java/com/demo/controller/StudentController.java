package com.demo.controller;

import java.net.URI;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import com.demo.entity.Course;
import com.demo.entity.Student;
import com.demo.exception.ApplicationException;
import com.demo.exception.ResourceNotFoundException;
import com.demo.model.Pagination;
import com.demo.response.ApiResponse;
import com.demo.service.CourseService;
import com.demo.service.StudentService;

@RestController
@RequestMapping("/api/v1/students")
@CrossOrigin("http://localhost:3001")
public class StudentController {
	
	@Autowired
	private StudentService studentService;
	@Autowired
	private CourseService courseService;
	
	@GetMapping
	public ResponseEntity<ApiResponse> getAll(@RequestParam(name = "limit") int limit, 
									@RequestParam(name = "page") int page){
		Pageable pageable = 	PageRequest.of(page - 1, limit);
		Page<Student> students = studentService.getAll(pageable);
		if(!students.isEmpty()) {
			ApiResponse apiResponse = new ApiResponse<List<Student>>(students.getContent()
					,new Pagination(students.getTotalElements(),page,limit)
					);
			return new ResponseEntity<ApiResponse>(apiResponse,HttpStatus.OK);
		}
		return new ResponseEntity<ApiResponse>(HttpStatus.NO_CONTENT);
	}
	@GetMapping("/{id}")
	public ResponseEntity<Student> getId(@PathVariable("id") long id){
		Student student = studentService.findById(id);
		if(student == null) {
			throw new ApplicationException("Student not found exception with id : "+ 
					id,HttpStatus.NOT_FOUND);
		}
		return new ResponseEntity<Student>(student,HttpStatus.OK);
	}
	@PostMapping
	public ResponseEntity<Student> create(@RequestBody Student student){
		if(student.getCodeStudent() != null) {
			boolean check = studentService.isExist(student.getCodeStudent());
			if(check) {
				throw new ApplicationException("Invalid code",HttpStatus.CONFLICT);
			}
		}
		student = studentService.save(student);
		URI uri = ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}")
				.buildAndExpand(student.getId()).toUri();
		return ResponseEntity.created(uri).body(student);
	}
	@PutMapping
	public ResponseEntity<Student> update(@RequestBody Student requestStudent){
		Student student = studentService.findById(requestStudent.getId());
		if(student == null) {
			throw new ApplicationException("Student not found exception with id : "+ 
								requestStudent.getId(),HttpStatus.NOT_FOUND);
		}else {
			if(requestStudent.getAddress() != null) {
				student.setAddress(requestStudent.getAddress());
			}
			if(requestStudent.getCodeStudent() != null) {
				student.setCodeStudent(requestStudent.getCodeStudent());
			}
			if(requestStudent.getEmail() != null) {
				student.setEmail(requestStudent.getEmail());
			}
			if(requestStudent.getName() != null) {
				student.setName(requestStudent.getName());
			}
			student = studentService.save(student);
			return new ResponseEntity<Student>(student,HttpStatus.OK);		
		}
	}
	@DeleteMapping("/{id}")
	public ResponseEntity<Void> deleteById(@PathVariable("id") long id){
		Student student = studentService.findById(id);
		if(student == null) {
			throw new ResourceNotFoundException("Student not found exception with id : "+ id);
		}
		studentService.delete(student);
		return new ResponseEntity<Void>(HttpStatus.NO_CONTENT);
	}
	
	/// get courses from student
	@GetMapping("/{studentId}/courses")
	public ResponseEntity<List<Course>> getCourseByStudentId(@PathVariable("studentId") long studentId){
		Student student = studentService.findById(studentId);
		if(student == null) {
			throw new ApplicationException("Student not found exception with id : "+ 
					studentId,HttpStatus.NOT_FOUND);
		}
		List<Course> courses = courseService.findByStudent(student);
		if(courses.isEmpty()) {
			return new ResponseEntity<List<Course>>(HttpStatus.NO_CONTENT);
		}
		return new ResponseEntity<List<Course>>(courses,HttpStatus.OK);
	}
	@GetMapping("/{studentId}/courses/{courseId}")
	public ResponseEntity<Course> getCourseByStudentIdCourseId(@PathVariable("studentId") long studentId,
			@PathVariable("courseId") long courseId){
		Student student = studentService.findById(studentId);
		if(student == null) {
			throw new ResourceNotFoundException("Student not found exception with id : "+ studentId);
		}
		Course courses = courseService.findByIdAndStudent(courseId, student);
		if(courses == null) {
			throw new ApplicationException("Not found exception with courseId : "+ courseId +
					" studentId"+ studentId,HttpStatus.NOT_FOUND);
		}
		
		return new ResponseEntity<Course>(courses,HttpStatus.OK);
	}
	
}
