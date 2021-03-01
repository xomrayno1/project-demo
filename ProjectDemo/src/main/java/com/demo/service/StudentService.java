package com.demo.service;

import java.util.List;

import com.demo.entity.Student;

public interface StudentService {
	
	List<Student> getAll();
	
	Student save(Student student);
	
	void delete(Student student);
	
	Student findById(long id);

}
