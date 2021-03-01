package com.demo.service;

import java.util.List;

import com.demo.entity.Course;

public interface CourseService {
	List<Course> getAll();
	
	Course save(Course course);
	
	void delete(Course course);
	
	Course findById(long id);
}
