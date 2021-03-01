package com.demo.exception;

import java.util.Date;

public class ErrorDetails {
	private String message;
	private String description;
	private Date createDate;
	
	
	
	
	public ErrorDetails() {
		 
	}
	public ErrorDetails(String message, String description, Date createDate) {
		 
		this.message = message;
		this.description = description;
		this.createDate = createDate;
	}
	public String getMessage() {
		return message;
	}
	public void setMessage(String message) {
		this.message = message;
	}
	public String getDescription() {
		return description;
	}
	public void setDescription(String description) {
		this.description = description;
	}
	public Date getCreateDate() {
		return createDate;
	}
	public void setCreateDate(Date createDate) {
		this.createDate = createDate;
	}
	

	
	
}
