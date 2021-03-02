package com.demo.exception;

import java.util.Date;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

@ControllerAdvice
public class HandleException extends ResponseEntityExceptionHandler{

	@ExceptionHandler(ApplicationException.class)
	public ResponseEntity<ErrorDetails> handleApplicationException(ApplicationException exception
			,WebRequest request){
		ErrorDetails errorDetails = new ErrorDetails(exception.getMsg(),
				request.getDescription(false),new Date(),exception.getStatus().value());
		return new ResponseEntity<ErrorDetails>(errorDetails,HttpStatus.NOT_FOUND);
	}
	 
}
