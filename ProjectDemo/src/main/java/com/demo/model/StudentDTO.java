package com.demo.model;

import java.util.List;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

import com.demo.response.CourseResponse;
import com.fasterxml.jackson.annotation.JsonProperty;
//@JsonInclude(JsonInclude.Include.NON_EMPTY)
public class StudentDTO {
	
	private Long id;
	
	@NotBlank(message = "Your input is required")
	@Size(max = 32,min = 6 ,message = "Length must be between 6 and 32" )
	private String name;
	
	@JsonProperty("code")
	@NotBlank(message = "Your input is required")
	@Size(max = 12,min = 6 ,message = "Length must be between 6 and 12" )
	private String codeStudent;
	
	@NotBlank(message = "Your input is required")
	private String address;
	
	@NotBlank(message = "Your input is required")
	@Email(message = "Please provide a properly formatted email address")
	private String email;
	
	@JsonProperty("courses")
	private List<CourseResponse> listCourse;
	
	
	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getCodeStudent() {
		return codeStudent;
	}
	public void setCodeStudent(String codeStudent) {
		this.codeStudent = codeStudent;
	}
	public String getAddress() {
		return address;
	}
	public void setAddress(String address) {
		this.address = address;
	}
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	public List<CourseResponse> getListCourse() {
		return listCourse;
	}
	public void setListCourse(List<CourseResponse> listCourse) {
		this.listCourse = listCourse;
	}
	 
	
	
	
	
}
