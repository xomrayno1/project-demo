package com.demo.controller;

import java.net.URI;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import com.demo.entity.Product;
import com.demo.exception.ApplicationException;
import com.demo.request.ProductCreateRequest;
import com.demo.response.APIResponse;
import com.demo.response.ProductReponse;
import com.demo.service.ProductService;
import com.demo.utils.BuildResponse;

@RestController
@RequestMapping("/api/v1/products")
public class ProductController {
	@Autowired
	ProductService productService;
	
	@GetMapping
	public ResponseEntity<APIResponse> getAll(){
		List<ProductReponse> list =	productService.findAll();
		if(list.isEmpty()) {
			return new ResponseEntity<APIResponse>(HttpStatus.NO_CONTENT);
		}
		return new ResponseEntity<APIResponse>(BuildResponse.buildReponseAPI(list),HttpStatus.OK);
	}
	@GetMapping("/{id}")
	public ResponseEntity<APIResponse> getById(@PathVariable("id")  long id){
		ProductReponse productReponse = productService.findById(id);
		if(productReponse == null) {
			throw new ApplicationException("Product not found exception with id :"+ id);
		}
		return new ResponseEntity<APIResponse>(BuildResponse.buildReponseAPI(productReponse),HttpStatus.OK);
	}
	@DeleteMapping("/{id}")
	public ResponseEntity<APIResponse> deleteById(@PathVariable("id")  long id){
		ProductReponse productReponse = productService.findById(id);
		if(productReponse == null) {
			throw new ApplicationException("Product not found exception with id :"+ id);
		}else {
			productService.deleteProduct(productReponse);
			return new ResponseEntity<APIResponse>( HttpStatus.NO_CONTENT);
		}	 
	}
	@PostMapping 
	public ResponseEntity<APIResponse> createProduct(@RequestBody @Validated ProductCreateRequest createRequest){
		ProductReponse productReponse = productService.createProduct(createRequest);
		URI location = ServletUriComponentsBuilder.fromCurrentRequestUri().path("/{id}")
												.buildAndExpand(productReponse.getId()).toUri();
		return ResponseEntity.created(location).body(BuildResponse.buildReponseAPI(productReponse));
	}
	

}
