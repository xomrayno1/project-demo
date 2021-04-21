package com.demo.request;

import javax.validation.constraints.NotBlank;

public class EnrolRequest {
	@NotBlank(message = "Your input is required")
	private String studentId;
	private String[] courses;
	
	 
	public Integer getStudentId() {
		return Integer.parseInt(this.studentId);
	}
	public void setStudentId(String studentId) {
		this.studentId = studentId;
	}
	public String[] getCourses() {
		return courses;
	}
	public void setCourses(String[] courses) {
		this.courses = courses;
	}
	 
	 
	
	
}
