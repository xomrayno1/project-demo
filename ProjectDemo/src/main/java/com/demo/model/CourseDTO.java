package com.demo.model;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

import com.fasterxml.jackson.annotation.JsonProperty;

//@JsonInclude(JsonInclude.Include.NON_EMPTY)
public class CourseDTO {
	
	private Long id;
		
	@NotBlank(message = "Your input is required")
	@Size(max = 15,min = 3 ,message = "Length must be between 3 and 15" )
	private String code;
	
	@NotBlank(message = "Your input is required")
	@Size(max = 32,min = 6 ,message = "Length must be between 6 and 32" )
	private String name;
	
	private String description;
	
	@JsonProperty("students")
	private String[] listStudent;
	
	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
	public String getCode() {
		return code;
	}
	public void setCode(String code) {
		this.code = code;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getDescription() {
		return description;
	}
	public void setDescription(String description) {
		this.description = description;
	}
	public String[] getListStudent() {
		return listStudent;
	}
	public void setListStudent(String[] listStudent) {
		this.listStudent = listStudent;
	}
	 
	
	
}
