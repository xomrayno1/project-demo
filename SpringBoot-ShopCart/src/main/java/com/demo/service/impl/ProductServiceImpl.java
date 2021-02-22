package com.demo.service.impl;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import com.demo.entity.Category;
import com.demo.entity.Product;
import com.demo.repository.CategoryRepository;
import com.demo.repository.ProductRepository;
import com.demo.request.ProductCreateRequest;
import com.demo.response.ProductReponse;
import com.demo.service.ProductService;

@Service
public class ProductServiceImpl implements ProductService{
	@Autowired
	ProductRepository productRepo;
	@Autowired
	CategoryRepository categoryRepo;
	
	@Override
	public ProductReponse createProduct(ProductCreateRequest createRequest) {
		// TODO Auto-generated method stub
		Product product = new Product();
		if(createRequest.getName() != null) {
			product.setName(createRequest.getName());
		}
		if(createRequest.getPrice() != null) {
			product.setPrice(createRequest.getPrice());
		}
		if(createRequest.getIds() != null) {
			List<Category> list = new ArrayList<>();
			for(Long item : createRequest.getIds()) {
				list.add(categoryRepo.getOne(item));
			}
			product.setCategories(list);
		}
		product.setCreateDate(new Date());
		product.setUpdateDate(new Date());
		product = productRepo.save(product);
		return new ProductReponse(product);
	}

	@Override
	public Product updateProduct(Product product) {
		// TODO Auto-generated method stub
		product.setUpdateDate(new Date());
		return productRepo.save(product);
	}

	@Override
	public void deleteProduct(ProductReponse productReponse) {
		// TODO Auto-generated method stub
		Product product = productRepo.findById(productReponse.getId()).orElse(null);
		if(product != null) {
			productRepo.delete(product);
		}
	}

	@Override
	public List<ProductReponse> findAll() {
		// TODO Auto-generated method stub
		List<ProductReponse> list = new ArrayList<ProductReponse>();
		productRepo.findAll().forEach(item -> {
			list.add(new ProductReponse(item));
		});
		return  list;
	}

	@Override
	public ProductReponse findById(long id) {
		// TODO Auto-generated method stub
		Product product = productRepo.findById(id).orElse(null);
		if(product != null) {
			return new ProductReponse(product);
		}
		return null;
	}

	@Override
	public Product getOne(long id) {
		// TODO Auto-generated method stub
		return productRepo.getOne(id);
	}

	@Override
	public Page<Product> findAll(Pageable pageable, Sort sort) {
		// TODO Auto-generated method stub
		return productRepo.findAll(pageable);
	}	

}
