package com.demo.exception;

import java.util.Date;

import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

@ControllerAdvice
public class HandleException  extends ResponseEntityExceptionHandler{
	
	
	@ExceptionHandler(ApplicationException.class)
	public ResponseEntity<ErrorDetail> handleApplicationException(ApplicationException exception,
			WebRequest request){
		ErrorDetail errorDetail =
					new ErrorDetail(new Date(), exception.getMsg(),request.getDescription(false));
		return new ResponseEntity<ErrorDetail>(errorDetail,HttpStatus.NOT_FOUND);
	}
	
	@Override
	protected ResponseEntity<Object> handleMethodArgumentNotValid(MethodArgumentNotValidException ex,
			HttpHeaders headers, HttpStatus status, WebRequest request) {
		// TODO Auto-generated method stub
		ErrorDetail errorDetail =
				new ErrorDetail(new Date(), "Validation failed",ex.getBindingResult().toString());
		return new ResponseEntity<Object>(errorDetail,HttpStatus.BAD_REQUEST);
	}

}
