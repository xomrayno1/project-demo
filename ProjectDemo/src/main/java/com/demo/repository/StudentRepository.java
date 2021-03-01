package com.demo.repository;


import java.util.List;

import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;

import com.demo.entity.Student;

@Repository
public interface StudentRepository extends PagingAndSortingRepository<Student, Long>{
	@Override
	List<Student> findAll();
	
	Student findByCodeStudent(String codeStudent);
}
