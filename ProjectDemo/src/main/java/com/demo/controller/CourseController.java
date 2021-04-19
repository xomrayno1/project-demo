package com.demo.controller;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
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

import com.demo.entity.Course;
import com.demo.entity.Student;
import com.demo.exception.ApplicationException;
import com.demo.model.CourseDTO;
import com.demo.model.Pagination;
import com.demo.response.APIResponse;
import com.demo.service.CourseService;
import com.demo.service.StudentService;
import com.demo.utils.Constant;

@RestController
@RequestMapping(Constant.API_COURSE)
@CrossOrigin(Constant.CROSS_ORIGIN)
public class CourseController {

	@Autowired
	private StudentService studentService;
	@Autowired
	private CourseService courseService;
	@Autowired
	private ModelMapper modelMapper;
	
	
	@GetMapping
	public ResponseEntity<APIResponse> getAll(@RequestParam(name = "limit") int limit, 
									@RequestParam(name = "page") int page,
									@RequestParam(name = "search") String name){
		Pageable pageable = 	PageRequest.of(page - 1, limit);
		Page<Course> courses = courseService.findBySearchName(name, pageable);
		if(!courses.isEmpty()) {
			// convert todto
			List<CourseDTO> list = courses.getContent().stream()
												.map(this::convertToDto).collect(Collectors.toList());
			
			APIResponse apiResponse = new APIResponse(list
					,new Pagination(courses.getTotalElements(),page,limit)
					);
			
			return new ResponseEntity<APIResponse>(apiResponse,HttpStatus.OK);
		}
		return new ResponseEntity<APIResponse>(HttpStatus.NO_CONTENT);
	}
	@GetMapping("/{id}")
	public ResponseEntity<Object> getId(@PathVariable("id") long id){
		Course course = courseService.findById(id);
		if(course == null) {
			throw new ApplicationException("Course not found exception with id : "+id
					 ,HttpStatus.NOT_FOUND);
		}
		CourseDTO courseDTO = convertToDto(course);
		return new ResponseEntity<Object>(courseDTO,HttpStatus.OK);
	}
 
	@PostMapping
	public ResponseEntity<Object> create(@RequestBody @Valid CourseDTO requestCourseDTO){
		if(requestCourseDTO.getCode() != null) {
			boolean check = courseService.isExist(requestCourseDTO.getCode());
			if(check) {
				throw new ApplicationException("Code is exists",HttpStatus.CONFLICT);
			}
		}
		try {
			
			Course	course = convertToEntity(requestCourseDTO);
			course = courseService.save(course);
//			CourseDTO	courseDTO = convertToDto(course);
//			URI uri = ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}").buildAndExpand(course.getId())
//					.toUri();
//			return ResponseEntity.created(uri).body(courseDTO);
			Map<String, String>  dataSuccess = new HashMap<>();
			dataSuccess.put("message", "Create success");
			return new ResponseEntity<Object>(dataSuccess, HttpStatus.CREATED);
		} catch (Exception e) {
			// TODO: handle exception
			throw new ApplicationException("Create failed",HttpStatus.CONFLICT);
		}
	}
	@PutMapping
	public ResponseEntity<Object> update(@RequestBody @Valid CourseDTO requestCourse){
		if(requestCourse.getId() == null){
			throw new ApplicationException("Course not found exception ",HttpStatus.NOT_FOUND);
		}else {
			Course course = courseService.findById(requestCourse.getId());
			if(course == null) {
				throw new ApplicationException("Course not found exception with id : "+
							requestCourse.getId(),HttpStatus.NOT_FOUND);
			}else {
				boolean check = courseService.isExist(requestCourse.getCode());
				if(check && !requestCourse.getCode().equals(course.getCode())) {
					throw new ApplicationException("Code is exist",HttpStatus.CONFLICT);	 
				}
				if(requestCourse.getName() != null) {
					course.setName(requestCourse.getName());
				}
				if(requestCourse.getCode() != null) {
					course.setCode(requestCourse.getCode());
				}
				if(requestCourse.getDescription() != null) {
					course.setDescription(requestCourse.getDescription());
				}
				if(requestCourse.getListStudent() != null) {
					List<Student> students = new ArrayList<Student>();
					for(Long item : requestCourse.getListStudent()) {
						Student student = studentService.findById(item);
						students.add(student);
					}
					course.setStudents(students);
				}
				try {
					course = courseService.save(course);
//					CourseDTO courseDTO = convertToDto(course);
//					return new ResponseEntity<Object>(courseDTO,HttpStatus.OK);
					Map<String, String>  dataSuccess = new HashMap<>();
					dataSuccess.put("message", "Update success");
					return new ResponseEntity<Object>(dataSuccess, HttpStatus.OK);
				} catch (Exception e) {
					throw new ApplicationException("Update faield",HttpStatus.INTERNAL_SERVER_ERROR);	 
				} 
			}
		}
		 
	}
	@DeleteMapping("/{id}")
	public ResponseEntity<Object> deleteById(@PathVariable("id") long id){
		Course course = courseService.findById(id);
		if(course == null) {
			throw new ApplicationException("Course not found exception with id : "+id
					 ,HttpStatus.NOT_FOUND);
		}
		courseService.delete(course);
//		return new ResponseEntity<Void>(HttpStatus.NO_CONTENT);
		Map<String, String>  dataSuccess = new HashMap<>();
		dataSuccess.put("message", "Delete success");
		return new ResponseEntity<Object>(dataSuccess, HttpStatus.OK);
	}
 
	
	public CourseDTO convertToDto(Course course) {
		CourseDTO courseDTO = modelMapper.map(course, CourseDTO.class);
		if(course.getStudents() != null) {
			 
			Long[] students =  course.getStudents().stream()
												.map(item -> item.getId())
												.collect(Collectors.toList())
												.toArray(new Long[course.getStudents().size()]);
			courseDTO.setListStudent(students);
		}
		return courseDTO;
	}
	public Course convertToEntity(CourseDTO courseDTO) {
		Course course = modelMapper.map(courseDTO, Course.class);
		if(courseDTO.getListStudent() != null) {
			List<Student> students = new ArrayList<Student>();
			for(Long item : courseDTO.getListStudent()) {
				Student student = studentService.findById(item);
				students.add(student);
			}
			course.setStudents(students);
		}
		return course;
	}
 
}
