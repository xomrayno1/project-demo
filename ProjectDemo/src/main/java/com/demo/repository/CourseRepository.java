package com.demo.repository;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.demo.entity.Course;
import com.demo.entity.Student;

@Repository
public interface CourseRepository  extends JpaRepository<Course, Long>{
	List<Course> findByStudents(Student student);
	
	Course findByIdAndStudents(long id, Student student);
	
	Course findByCode(String code);
	
	@Query(value = "SELECT course from Course course WHERE "
			+ " UPPER(course.name) LIKE UPPER(CONCAT('%',?1,'%')) OR "
			+ " UPPER(course.code) LIKE UPPER(CONCAT('%',?1,'%')) ", 
			 countQuery = " SELECT COUNT(course) from Course course WHERE "
			 		+ " UPPER(course.name) LIKE UPPER(CONCAT('%',?1,'%')) OR "
			 		+ " UPPER(course.code) LIKE UPPER(CONCAT('%',?1,'%'))")
	Page<Course> findBySearchName(String search, Pageable pageable);
}
