package com.demo.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.demo.entity.Student;
import com.demo.repository.StudentRepository;
import com.demo.service.StudentService;

@Service
public class StudentServiceImpl  implements StudentService{
	@Autowired
	StudentRepository studentRepo;

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

}
