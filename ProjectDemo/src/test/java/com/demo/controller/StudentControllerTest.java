package com.demo.controller;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertTrue;

import org.json.JSONException;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.skyscreamer.jsonassert.JSONAssert;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.boot.web.server.LocalServerPort;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.test.context.junit4.SpringRunner;

import com.demo.ProjectDemoApplication;
import com.demo.entity.Student;

@RunWith(SpringRunner.class)
@SpringBootTest(classes = ProjectDemoApplication.class,
webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
public class StudentControllerTest {
//	
//	@LocalServerPort
//	private int port;
//	
//	TestRestTemplate restTemplate = new TestRestTemplate();
//	
//	HttpHeaders headers = new HttpHeaders();
//	
//	@Test
//	public void testGetAll() {
//		HttpEntity<String> entity = new HttpEntity<String>(null,headers);
//		ResponseEntity<String> response = 
//				restTemplate.exchange(createUrlWithPortUri("/api/v1/students?page=1&limit=10"),
//							HttpMethod.GET, entity, String.class);
//		assertTrue(response.getBody().length() > 0 );
//		
//	}
//	@Test
//	public void testGetById() throws JSONException {
//		HttpEntity<String> entity = new HttpEntity<String>(null,headers);
//		ResponseEntity<String> response = 
//				restTemplate.exchange(createUrlWithPortUri("/api/v1/students/1"),
//							HttpMethod.GET, entity, String.class);
//		// ('2021-03-01','2021-03-01','NguyenA', '1755241', 'PhuHoa', 'xomrayno1@gmail.com');
//		//Student student = new Student("NguyenA", "1755241", "PhuHoa", "xomrayno1@gmail.com");
//		String expected = "{id:1,name:NguyenA,address:PhuHoa,email:xomrayno1@gmail.com}";
//		JSONAssert.assertEquals(expected,  response.getBody(), false);
//	}
//	
//	@Test
//	public void testCreate() {
//		Student student = new Student("NguyenD", "1755244", "TayHoa", "xomrayno5@gmail.com");
//		HttpEntity<Student> entity = new HttpEntity<Student>(student, headers);
//		ResponseEntity<String> response = restTemplate.exchange(
//				createUrlWithPortUri("/api/v1/students"),HttpMethod.POST,
//				entity,String.class
//				);
//		assertTrue(response.getStatusCode() == HttpStatus.CREATED);
//		String actual = 	response.getHeaders().get(HttpHeaders.LOCATION).toString();
//		assertTrue(actual.contains("/api/v1/students"));
//		
//	}
//	@Test
//	public void testUpdate() throws JSONException {
//		Student student = new Student("NguyenD", "17552442131", "TayHoa", "xomrayno5@gmail.com");
//		student.setId(2);
//		HttpEntity<Student> entity = new HttpEntity<Student>(student, headers);
//		ResponseEntity<String> response = restTemplate.exchange(
//				createUrlWithPortUri("/api/v1/students"),HttpMethod.PUT,
//				entity,String.class
//				);
//		String expected = "{id:2,name:NguyenD,address:TayHoa,email:xomrayno5@gmail.com}";
//	//	assertTrue(response.getStatusCode() == HttpStatus.OK);
//		assertEquals(response.getStatusCodeValue(), 200);
//		JSONAssert.assertEquals(expected,response.getBody(),false);
//	}
//	@Test
//	public void testDelete() {
//		HttpEntity<String> entity = new HttpEntity<String>(null,headers);
//		ResponseEntity<String> response = 
//				restTemplate.exchange(createUrlWithPortUri("/api/v1/students/1"),
//							HttpMethod.DELETE, entity, String.class);
//		assertTrue(HttpStatus.NO_CONTENT == response.getStatusCode());
//	}
//	
//	public String createUrlWithPortUri(String uri) {
//		return "http://localhost:"+ port +  uri;
//	}
}
