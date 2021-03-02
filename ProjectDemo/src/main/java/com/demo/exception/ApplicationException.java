package com.demo.exception;

import org.springframework.http.HttpStatus;

public class ApplicationException extends RuntimeException{
	private String msg;
	private HttpStatus status;
	
	public ApplicationException(String msg,HttpStatus status) {
		this.msg = msg;
		this.status = status;
	}

	public String getMsg() {
		return msg;
	}

	public void setMsg(String msg) {
		this.msg = msg;
	}

	public HttpStatus getStatus() {
		return status;
	}

	public void setStatus(HttpStatus status) {
		this.status = status;
	}
	
	
	
}
