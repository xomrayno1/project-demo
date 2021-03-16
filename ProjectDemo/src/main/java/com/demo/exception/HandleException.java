package com.demo.exception;

import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.MethodArgumentNotValidException;
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
		return new ResponseEntity<ErrorDetails>(errorDetails,exception.getStatus());
	}
	
	
	@Override
	protected ResponseEntity<Object> handleMethodArgumentNotValid(MethodArgumentNotValidException ex,
			HttpHeaders headers, HttpStatus status, WebRequest request) {
		// TODO Auto-generated method stub
		 BindingResult result = ex.getBindingResult();
		 List<org.springframework.validation.FieldError> fieldErrors = result.getFieldErrors();
		 
		 ErrorDetails errorDetails = new ErrorDetails(
					"Validation failed"
					,request.getDescription(false)
					,new Date(),HttpStatus.BAD_REQUEST.value());
		 
		 if(!fieldErrors.isEmpty()) {
			 Map<String,String> field = new HashMap<>();
			 fieldErrors.forEach(item -> {
				 field.put(item.getField(), item.getDefaultMessage());
			 });
			 errorDetails.setFieldErrors(field);
		 }
		  
		 
		return new ResponseEntity<Object>(errorDetails, HttpStatus.BAD_REQUEST);
	}
}
