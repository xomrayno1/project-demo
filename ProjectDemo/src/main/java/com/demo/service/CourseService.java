package com.demo.service;

import java.util.List;

import com.demo.entity.Course;
import com.demo.entity.Student;

public interface CourseService {
	List<Course> getAll();
	
	Course save(Course course);
	
	void delete(Course course);
	
	Course findById(long id);
	
	List<Course> findByStudent(Student student);
	
	Course findByIdAndStudent(long id, Student student);
}
