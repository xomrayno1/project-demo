package com.demo.response;

import com.demo.model.Pagination;

public class ApiResponse<T> {
	private T data;
	private Pagination pagination;
	 
	
	
	
	
	
	public ApiResponse() {
		super();
	}
	public ApiResponse(T data, Pagination pagination ) {
		super();
		this.data = data;
		this.pagination = pagination;
		 
	}
	public T getData() {
		return data;
	}
	public void setData(T data) {
		this.data = data;
	}
	public Pagination getPagination() {
		return pagination;
	}
	public void setPagination(Pagination pagination) {
		this.pagination = pagination;
	}
 
	
	
	
}
