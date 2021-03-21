package com.demo.service.impl;


import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.demo.entity.Course;
import com.demo.entity.Student;
import com.demo.repository.StudentRepository;
import com.demo.service.StudentService;

@Service
public class StudentServiceImpl  implements StudentService{
	
	@Autowired
	private StudentRepository studentRepo;

	public StudentServiceImpl(StudentRepository studentRepo) {
		super();
		this.studentRepo = studentRepo;
	}

	@Override
	public List<Student> getAll() {
		// TODO Auto-generated method stub
		return studentRepo.findAll();
	}

	@Override
	public Student save(Student student) {
		// TODO Auto-generated method stub
		return studentRepo.save(student);
	}

	@Override
	public void delete(Student student) {
		// TODO Auto-generated method stub
		studentRepo.delete(student);
	}

	@Override
	public Student findById(long id) {
		// TODO Auto-generated method stub
		return studentRepo.findById(id).orElse(null);
	}

	@Override
	public Page<Student> getAll(Pageable pageable) {
		// TODO Auto-generated method stub
		return studentRepo.findAll(pageable);
	}

	 

	@Override
	public List<Student> findByCourse(Course course) {
		// TODO Auto-generated method stub
		return studentRepo.findByCourses(course);
	}

	@Override
	public boolean isCodeExist(String code) {
		// TODO Auto-generated method stub
		return studentRepo.findByCodeStudent(code) != null ? true : false ;
	}

	@Override
	public boolean isEmailExist(String email) {
		// TODO Auto-generated method stub
		return studentRepo.findByEmail(email) != null ? true : false ;
	}

	@Override
	public Page<Student> findBySearchName(String search, Pageable pageable) {
		// TODO Auto-generated method stub
		return studentRepo.findBySearchName(search, pageable);
	}

}
