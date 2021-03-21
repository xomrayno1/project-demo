package com.demo.controller;

import java.net.URI;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import javax.validation.Valid;

import org.modelmapper.ModelMapper;
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
import com.demo.model.StudentDTO;
import com.demo.response.APIResponse;
import com.demo.service.CourseService;
import com.demo.service.StudentService;
import com.demo.utils.Constant;

@RestController
@RequestMapping(Constant.API_STUDENT)
@CrossOrigin(Constant.CROSS_ORIGIN)
public class StudentController {
	
	@Autowired
	private StudentService studentService;
	@Autowired
	private CourseService courseService;
	@Autowired
	ModelMapper modelMapper;
	
	@GetMapping
	public ResponseEntity<APIResponse> getAll(@RequestParam(name = "limit") int limit, 
									@RequestParam(name = "page") int page,
									@RequestParam(name="search") String search 
									){
		Pageable pageable = PageRequest.of(page - 1, limit);
		Page<Student> students = studentService.findBySearchName(search, pageable);
		
		if(!students.isEmpty()) {
			//conver to dto
			List<StudentDTO> list =	students.getContent()
										.stream().map(this::converToDto)
										.collect(Collectors.toList());
			
 			APIResponse apiResponse = new APIResponse(list
 					,new Pagination(students.getTotalElements(),page,limit)
 					);
 			return  new ResponseEntity<APIResponse>(apiResponse,HttpStatus.OK);
		}
		return new ResponseEntity<APIResponse>(HttpStatus.NO_CONTENT);
	}
	@GetMapping("/{id}")
	public ResponseEntity<StudentDTO> getId(@PathVariable("id") long id){
		Student student = studentService.findById(id);
		if(student == null) {
			throw new ApplicationException("Student not found exception with id : "+ 
					id,HttpStatus.NOT_FOUND);
		}
		StudentDTO studentDTO = converToDto(student);
		return new ResponseEntity<StudentDTO>(studentDTO,HttpStatus.OK);
	}
	@PostMapping
	public ResponseEntity<StudentDTO> create(@RequestBody @Valid StudentDTO requestStudentDTO){
		if(requestStudentDTO.getCodeStudent() != null) {
			boolean isCode = studentService.isCodeExist(requestStudentDTO.getCodeStudent());
			if(isCode) {
				throw new ApplicationException("Invalid code",HttpStatus.CONFLICT); // check code invalid
			}
		}
		if(requestStudentDTO.getEmail() != null) { //check email invalid
			boolean isEmail = studentService.isEmailExist(requestStudentDTO.getEmail());
			if(isEmail) {
				throw new ApplicationException("Invalid Email",HttpStatus.CONFLICT);
			}
		}
		try {
			Student student = convertToEntity(requestStudentDTO);
			student = studentService.save(student);
			StudentDTO studentDTO = converToDto(student);
			URI uri = ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}")
					.buildAndExpand(student.getId()).toUri();
			return ResponseEntity.created(uri).body(studentDTO);
		} catch (Exception e) {
			// TODO: handle exception
			throw new ApplicationException("Create Failed",HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
	@PutMapping
	public ResponseEntity<StudentDTO> update(@RequestBody @Valid  StudentDTO requestStudentDTO){
		if(requestStudentDTO.getId() == null) {
			throw new ApplicationException("Student not found exception  ",HttpStatus.NOT_FOUND);
		}else {
			Student student = studentService.findById(requestStudentDTO.getId());
			if(student == null) {
				throw new ApplicationException("Student not found exception with id : "+ 
						requestStudentDTO.getId(),HttpStatus.NOT_FOUND);
			} 
			boolean isCode = studentService.isCodeExist(requestStudentDTO.getCodeStudent());
			if(isCode && !student.getCodeStudent().equals(requestStudentDTO.getCodeStudent())) {
				throw new ApplicationException("Invalid code",HttpStatus.CONFLICT); // check code invalid
			}
			boolean isEmail = studentService.isEmailExist(requestStudentDTO.getEmail());
			if(isEmail && !student.getEmail().equals(requestStudentDTO.getEmail())) {
				throw new ApplicationException("Invalid email",HttpStatus.CONFLICT); //check email invalid
			}
			if(requestStudentDTO.getAddress() != null) {
				student.setAddress(requestStudentDTO.getAddress());
			}
			if(requestStudentDTO.getCodeStudent() != null) {
				student.setCodeStudent(requestStudentDTO.getCodeStudent());
			}
			if(requestStudentDTO.getEmail() != null) {
				student.setEmail(requestStudentDTO.getEmail());
			}
			if(requestStudentDTO.getName() != null) {
				student.setName(requestStudentDTO.getName());
			}
			if(requestStudentDTO.getListCourse() != null) {
				List<Course> courses = new ArrayList<Course>();
				for(Long item : requestStudentDTO.getListCourse()) {
					Course course = courseService.findById(item);
					courses.add(course);
				}
				student.setCourses(courses);
			}
			try {
				student = studentService.save(student);
				StudentDTO studentDTO = converToDto(student);
				return new ResponseEntity<StudentDTO>(studentDTO,HttpStatus.OK);	
			} catch (Exception e) {
				throw new ApplicationException("Update Failed",HttpStatus.INTERNAL_SERVER_ERROR);
			}
			 
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
//	@GetMapping("/{studentId}/courses")
//	public ResponseEntity<List<Course>> getCourseByStudentId(@PathVariable("studentId") long studentId){
//		Student student = studentService.findById(studentId);
//		if(student == null) {
//			throw new ApplicationException("Student not found exception with id : "+ 
//					studentId,HttpStatus.NOT_FOUND);
//		}
//		List<Course> courses = courseService.findByStudent(student);
//		if(courses.isEmpty()) {
//			return new ResponseEntity<List<Course>>(HttpStatus.NO_CONTENT);
//		}
//		return new ResponseEntity<List<Course>>(courses,HttpStatus.OK);
//	}
//	@GetMapping("/{studentId}/courses/{courseId}")
//	public ResponseEntity<Course> getCourseByStudentIdCourseId(@PathVariable("studentId") long studentId,
//			@PathVariable("courseId") long courseId){
//		Student student = studentService.findById(studentId);
//		if(student == null) {
//			throw new ResourceNotFoundException("Student not found exception with id : "+ studentId);
//		}
//		Course courses = courseService.findByIdAndStudent(courseId, student);
//		if(courses == null) {
//			throw new ApplicationException("Not found exception with courseId : "+ courseId +
//					" studentId"+ studentId,HttpStatus.NOT_FOUND);
//		}
//		
//		return new ResponseEntity<Course>(courses,HttpStatus.OK);
//	}
	
	//conver to dto
	private StudentDTO converToDto(Student student) {
		StudentDTO studentDTO = modelMapper.map(student, StudentDTO.class);
		if(student.getCourses() != null) {
			List<Long> list = new ArrayList<Long>();
			student.getCourses().stream().
					map(item -> list.add(item.getId()))
					.collect(Collectors.toList());
			studentDTO.setListCourse(list);
		}
		return studentDTO;
	}
	private Student convertToEntity(StudentDTO studentDTO) {
		Student student = modelMapper.map(studentDTO, Student.class);
		if(studentDTO.getListCourse() != null) {
			List<Course> courses = new ArrayList<Course>();
			for(Long item : studentDTO.getListCourse()) {
				Course course = courseService.findById(item);
				courses.add(course);
			}
			student.setCourses(courses);
		}
		return student;
	}
 
}
