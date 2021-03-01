package com.demo.exception;

public class ApplicationException extends RuntimeException{
	private String msg;
	
	public ApplicationException(String msg) {
		this.msg = msg;
	}

	public String getMsg() {
		return msg;
	}

	public void setMsg(String msg) {
		this.msg = msg;
	}
	
	
	
}
