package com.demo.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.demo.entity.Course;
import com.demo.entity.Student;

@Repository
public interface CourseRepository  extends JpaRepository<Course, Long>{
	List<Course> findByStudents(Student student);
	Course findByIdAndStudents(long id, Student student);
	Course findByCode(String code);
}
