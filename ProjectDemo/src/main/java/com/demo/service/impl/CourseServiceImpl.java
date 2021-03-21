package com.demo.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.demo.entity.Course;
import com.demo.entity.Student;
import com.demo.repository.CourseRepository;
import com.demo.service.CourseService;

@Service
public class CourseServiceImpl implements CourseService{
	
	@Autowired
	private CourseRepository courseRepo;

	@Override
	public List<Course> getAll() {
		// TODO Auto-generated method stub
		return courseRepo.findAll();
	}

	@Override
	public Course save(Course course) {
		// TODO Auto-generated method stub
		return courseRepo.save(course);
	}

	@Override
	public void delete(Course course) {
		// TODO Auto-generated method stub
		courseRepo.delete(course);
	}

	@Override
	public Course findById(long id) {
		// TODO Auto-generated method stub
		return courseRepo.findById(id).orElse(null);
	}

	@Override
	public List<Course> findByStudent(Student student) {
		// TODO Auto-generated method stub
		return courseRepo.findByStudents(student);
	}

	@Override
	public Course findByIdAndStudent(long id, Student student) {
		// TODO Auto-generated method stub
		return courseRepo.findByIdAndStudents(id, student);
	}

	@Override
	public Page<Course> getAll(Pageable pageable) {
		// TODO Auto-generated method stub
		return courseRepo.findAll(pageable);
	}

	@Override
	public boolean isExist(String code) {
		// TODO Auto-generated method stub
		return courseRepo.findByCode(code) != null ? true : false;
	}

	@Override
	public Page<Course> findBySearchName(String search, Pageable pageable) {
		// TODO Auto-generated method stub
		return courseRepo.findBySearchName(search, pageable);
	}

}
