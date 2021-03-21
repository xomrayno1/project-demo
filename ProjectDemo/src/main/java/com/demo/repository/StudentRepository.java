package com.demo.repository;


import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;

import com.demo.entity.Course;
import com.demo.entity.Student;

@Repository
public interface StudentRepository extends PagingAndSortingRepository<Student, Long>{
	@Override
	List<Student> findAll();
	
	Student findByCodeStudent(String codeStudent);
	
	Student findByEmail(String email);
	
	List<Student> findByCourses(Course course);
	
	@Query(value = "SELECT student from Student student WHERE "
			+ " UPPER(student.name) LIKE UPPER(CONCAT('%',?1,'%')) OR "
			+ " UPPER(student.codeStudent) LIKE UPPER(CONCAT('%',?1,'%')) ", 
			 countQuery = " SELECT COUNT(student) from Student student WHERE "
			 		+ " UPPER(student.name) LIKE UPPER(CONCAT('%',?1,'%')) OR "
			 		+ " UPPER(student.codeStudent) LIKE UPPER(CONCAT('%',?1,'%'))")
	Page<Student> findBySearchName(String search, Pageable pageable);
	
 
}
