package com.demo.controller;

import java.net.URI;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
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
@RequestMapping("/api/v1/courses")
public class CourseController {

	@Autowired
	private StudentService studentService;
	@Autowired
	private CourseService courseService;
	
	
	@GetMapping
	public ResponseEntity<ApiResponse> getAll(@RequestParam(name = "limit") int limit, 
									@RequestParam(name = "page") int page){
		Pageable pageable = 	PageRequest.of(page - 1, limit);
		Page<Course> courses = courseService.getAll(pageable);
		if(!courses.isEmpty()) {
			ApiResponse apiResponse = new ApiResponse<List<Course>>(courses.getContent()
					,new Pagination(courses.getTotalElements(),page,limit)
					);
			return new ResponseEntity<ApiResponse>(apiResponse,HttpStatus.OK);
		}
		return new ResponseEntity<ApiResponse>(HttpStatus.NO_CONTENT);
	}
	@GetMapping("/{id}")
	public ResponseEntity<Course> getId(@PathVariable("id") long id){
		Course course = courseService.findById(id);
		if(course == null) {
			throw new ApplicationException("Course not found exception with id : "+id
					 ,HttpStatus.NOT_FOUND);
		}
		return new ResponseEntity<Course>(course,HttpStatus.OK);
	}
	@PostMapping
	public ResponseEntity<Course> create(@RequestBody Course course){
		if(course.getCode() != null) {
			boolean check = courseService.isExist(course.getCode());
			if(check) {
				throw new ApplicationException("Invalid code",HttpStatus.CONFLICT);
			}
		}	
		course = courseService.save(course);
		URI uri = ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}")
				.buildAndExpand(course.getId()).toUri();
		return ResponseEntity.created(uri).body(course);
	}
	@PutMapping
	public ResponseEntity<Course> update(@RequestBody Course requestCourse){
		Course course = courseService.findById(requestCourse.getId());
		if(course == null) {
			throw new ApplicationException("Course not found exception with id : "+
						requestCourse.getId(),HttpStatus.NOT_FOUND);
		}else {
			if(requestCourse.getName() != null) {
				course.setName(requestCourse.getName());
			}
			if(requestCourse.getCode() != null) {
				course.setCode(requestCourse.getCode());
			}
			if(requestCourse.getDescription() != null) {
				course.setDescription(requestCourse.getDescription());
			}
			return new ResponseEntity<Course>(course,HttpStatus.OK);		
		}
	}
	@DeleteMapping("/{id}")
	public ResponseEntity<Void> deleteById(@PathVariable("id") long id){
		Course course = courseService.findById(id);
		if(course == null) {
			throw new ApplicationException("Course not found exception with id : "+id
					 ,HttpStatus.NOT_FOUND);
		}
		courseService.delete(course);
		return new ResponseEntity<Void>(HttpStatus.NO_CONTENT);
	}
	
	/// get student by course
	@GetMapping("/{courseId}/students")
	public ResponseEntity<List<Student>> getStudentByCourseId(@PathVariable("courseId") long courseId){
		Course course = courseService.findById(courseId);
		if(course == null) {
			throw new ApplicationException("Course not found exception with id : "+courseId
					 ,HttpStatus.NOT_FOUND);
		}
		List<Student> students = studentService.findByCourse(course);
		if(students.isEmpty()) {
			return new ResponseEntity<List<Student>>(HttpStatus.NO_CONTENT);
		}
		return new ResponseEntity<List<Student>>(students,HttpStatus.OK);
	}
 
}
