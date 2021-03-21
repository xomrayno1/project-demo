package com.demo.entity;

import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;

@Entity
public class Student extends BaseEntity{
	@Id
	@GeneratedValue(strategy =  GenerationType.IDENTITY)
	private Long id;
	 
	private String name;

	@Column(unique = true)
	private String codeStudent;
	
	private String address;
	
	@Column(unique = true)
	private String email;
	
	@ManyToMany
	@JoinTable(name = "student_course", 
						joinColumns = @JoinColumn(name="student_id"),
						inverseJoinColumns = @JoinColumn(name="course_id")
				)
	private List<Course> courses;
	 
	
	public Student() {
		 
	}
	public Student( String name, String codeStudent, String address, String email ) {
		 
		 
		this.name = name;
		this.codeStudent = codeStudent;
		this.address = address;
		this.email = email;
		 
	}
	public Student(Long id, String name, String codeStudent, String address, String email ) {
		 
		this.id = id;
		this.name = name;
		this.codeStudent = codeStudent;
		this.address = address;
		this.email = email;
		 
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
	public List<Course> getCourses() {
		return courses;
	}
	public void setCourses(List<Course> courses) {
		this.courses = courses;
	}
	
	
	
}
