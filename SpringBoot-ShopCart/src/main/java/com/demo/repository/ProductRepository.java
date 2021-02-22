package com.demo.repository;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.demo.entity.Product;

@Repository
public interface ProductRepository  extends  JpaRepository<Product, Long>{

	@Override
	List<Product> findAll();
	
	Page<Product> findByNameContainingAllIgnoreCase(String name,Pageable pageable);
	
	//Page<Product> findByNameOrIdContainingAllIgnoreCase(String name, long id);
	
	//Page<Product> findByNameOrIdContainingAllIgnoreCase(String name, long id, Pageable pageable);
} 
