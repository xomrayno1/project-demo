package com.demo.entity;

import java.util.List;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;

@Entity
public class Course   extends BaseEntity{
	@Id
	@GeneratedValue(strategy =  GenerationType.IDENTITY)
	private Long id;
	 
	private String code;
	 
	private String name;
	private String description;
	@ManyToMany
	@JoinTable(name = "student_course",
					joinColumns = @JoinColumn(name="course_id"),
					inverseJoinColumns = @JoinColumn(name="student_id"))

	private List<Student> students;
	

	public Course() {
		 
	}
	public Course(String code, String name, String description ) {
		  
		this.code = code;
		this.name = name;
		this.description = description;
		 
	}
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
