package com.demo.service;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;

import com.demo.entity.Product;
import com.demo.request.ProductCreateRequest;
import com.demo.response.ProductReponse;

public interface ProductService {
	
	ProductReponse createProduct(ProductCreateRequest product);
	Product updateProduct(Product product);
	void deleteProduct(ProductReponse productReponse);
	List<ProductReponse> findAll();
	ProductReponse findById(long id);
	Product getOne(long id);
	Page<Product> findAll(Pageable pageable, Sort sort);

}
