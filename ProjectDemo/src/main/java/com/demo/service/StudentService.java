package com.demo.service;


import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import com.demo.entity.Course;
import com.demo.entity.Student;

public interface StudentService {
	Page<Student> getAll(Pageable pageable);
	
	List<Student> getAll();
	
	Student save(Student student);
	
	void delete(Student student);
	
	Student findById(long id);
	
	boolean isExist(String code);
	
	List<Student> findByCourse(Course course);
}
