package com.demo.entity;

import java.util.List;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToMany;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

import com.fasterxml.jackson.annotation.JsonInclude;

@Entity
@JsonInclude(JsonInclude.Include.NON_NULL)
public class Course   extends BaseEntity{
	@Id
	@GeneratedValue(strategy =  GenerationType.IDENTITY)
	private long id;
	@NotBlank(message = "Your input is required")
	@Size(max = 15,min = 3 ,message = "Length must be between 3 and 15" )
	private String code;
	@NotBlank(message = "Your input is required")
	@Size(max = 32,min = 6 ,message = "Length must be between 6 and 32" )
	private String name;
	private String description;
	@ManyToMany(mappedBy = "courses")
	private List<Student> students;
	
	
	
	
	
	public Course() {
		super();
	}
	public Course(String code, String name, String description ) {
		super();
		this.code = code;
		this.name = name;
		this.description = description;
		 
	}
	public long getId() {
		return id;
	}
	public void setId(long id) {
		this.id = id;
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
	public List<Student> getStudents() {
		return students;
	}
	public void setStudents(List<Student> students) {
		this.students = students;
	}
	public String getCode() {
		return code;
	}
	public void setCode(String code) {
		this.code = code;
	}
	
	
	
}
