package com.demo.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.demo.entity.Course;
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

}
