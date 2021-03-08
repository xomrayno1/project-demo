package com.demo.controller;

import static org.junit.Assert.assertEquals;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.AutoConfigureDataJpa;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.mock.web.MockHttpServletResponse;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;
import org.springframework.test.web.servlet.RequestBuilder;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.web.context.WebApplicationContext;

import com.demo.ProjectDemoApplication;
import com.demo.entity.Student;
import com.demo.service.CourseService;
import com.demo.service.StudentService;
import com.fasterxml.jackson.databind.ObjectMapper;

@RunWith(SpringRunner.class)
@WebMvcTest(value = StudentController.class)
@ContextConfiguration(classes = ProjectDemoApplication.class)
@AutoConfigureDataJpa
public class StudentControllerTest {

	MockMvc mockMvc;
	
	@Autowired
	WebApplicationContext context;
	
	@MockBean
	StudentService studentService;
	
	@MockBean
	CourseService courseService;
	
	@Before
	public void setUp() {
		mockMvc = MockMvcBuilders.webAppContextSetup(context).build();
	}
	
	@Test
	public void testCreateMethod() throws Exception {
		Student student = new Student(1,"Nguyen Tam","1755248","Dong Hoa - Phu Yen","xr5@gmail.com");
		ObjectMapper objectMapper = new ObjectMapper();
		String content = objectMapper.writeValueAsString(new Student("Nguyen Tam","1755248","Dong Hoa - Phu Yen","xr5@gmail.com"));
		
		Mockito.when(
				studentService.save(Mockito.any(Student.class))
				).thenReturn(student);
		RequestBuilder builder = MockMvcRequestBuilders.post("/api/v1/students")
									.accept(MediaType.APPLICATION_JSON)
									.content(content)
									.contentType(MediaType.APPLICATION_JSON);
		MvcResult mvcResult = mockMvc.perform(builder).andReturn();
		MockHttpServletResponse response =	mvcResult.getResponse();
		
		assertEquals(HttpStatus.CREATED.value(), response.getStatus());
		assertEquals("http://localhost/api/v1/students/1", response.getHeader(HttpHeaders.LOCATION));
		
	}
}
