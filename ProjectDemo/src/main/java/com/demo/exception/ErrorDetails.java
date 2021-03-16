package com.demo.exception;

import java.util.Date;
import java.util.HashMap;
import java.util.Map;

public class ErrorDetails {
	private String message;
	private String path;
	private Date createDate;
	private int status;
	private Map<String, String> fieldErrors = new HashMap<>();
	
	public ErrorDetails() {
		 
	}


	public ErrorDetails(String message, String path, Date createDate, int status ) {
		super();
		this.message = message;
		this.path = path;
		this.createDate = createDate;
		this.status = status;
		 
	}

	public String getMessage() {
		return message;
	}


	public void setMessage(String message) {
		this.message = message;
	}


	public String getPath() {
		return path;
	}


	public void setPath(String path) {
		this.path = path;
	}


	public Date getCreateDate() {
		return createDate;
	}


	public void setCreateDate(Date createDate) {
		this.createDate = createDate;
	}


	public int getStatus() {
		return status;
	}


	public void setStatus(int status) {
		this.status = status;
	}


	public Map<String, String> getFieldErrors() {
		return fieldErrors;
	}


	public void setFieldErrors(Map<String, String> fieldErrors) {
		this.fieldErrors = fieldErrors;
	}


	 
	
	
}
