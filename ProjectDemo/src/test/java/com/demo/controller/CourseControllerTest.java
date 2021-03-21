package com.demo.controller;

import org.junit.runner.RunWith;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

import com.demo.ProjectDemoApplication;

@RunWith(SpringRunner.class)
@SpringBootTest(classes = ProjectDemoApplication.class,
webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
public class CourseControllerTest {
//	@LocalServerPort
//	private int port;
//
//	TestRestTemplate restTemplate = new TestRestTemplate();
//
//	HttpHeaders headers = new HttpHeaders();
//	
//	@Test
//	public void testGetAll() {
//		HttpEntity<String> entity = new HttpEntity<String>(null, headers);
//		ResponseEntity<String> response = 	
//				restTemplate.exchange(createURLWithPort("/api/v1/courses?limit=10&page=1"), HttpMethod.GET,
//				entity, String.class);
//		assertTrue(response.getBody().length() > 0 );
//		assertTrue(response.getStatusCode().value() == 200);
//	}
//	
//	@Test
//	public void testGetById() throws JSONException {
//
//		HttpEntity<String> entity = new HttpEntity<String>(null, headers);
//
//		ResponseEntity<String> response = restTemplate.exchange(
//				createURLWithPort("/api/v1/courses/1"),
//				HttpMethod.GET, entity, String.class);
//
//		String expected = "{id:1,name:JavaAdvance,description:Javanângcao,code:JAD}";
//
//		JSONAssert.assertEquals(expected, response.getBody(), false);
//	}
//	
//	@Test
//	public void testCreate() throws JSONException {
//		Course course = new Course("JB","JavaBasic","JavaBasic");
//		HttpEntity<Course> entity =  new HttpEntity<Course>(course,headers);
//		ResponseEntity<String> response = restTemplate.exchange(createURLWithPort("/api/v1/courses"),HttpMethod.POST,
//							entity, String.class);
//		String actual = response.getHeaders().get(HttpHeaders.LOCATION).get(0);
//		assertTrue(actual.contains("/api/v1/courses"));
//		String expected = "{id:2,name:JavaBasic,code:JB,description:JavaBasic}" ;
//		JSONAssert.assertEquals(expected, response.getBody(),false);
//		assertEquals(201, response.getStatusCodeValue());
//	}
//	
//	@Test
//	public void testUpdate() throws JSONException {
//		Course course = new Course("JBNC","JavaAdvanced","JavaNangCao");
//		course.setId(1);
//		HttpEntity<Course> entity = new HttpEntity<Course>(course,headers);
//		ResponseEntity<String> response	 = 
//				restTemplate.exchange(createURLWithPort("/api/v1/courses")
//						, HttpMethod.PUT,
//				entity,String.class);
//		assertTrue(response.getStatusCode().value()== 200);
//		String expected = "{id:1,code:JBNC,name:JavaAdvanced,description:JavaNangCao}";
//		JSONAssert.assertEquals(expected, response.getBody(), false);
//	}
//	@Test
//	public void testDelete() {
//		HttpEntity<String> httpEntity =  new HttpEntity<String>(null,headers);
//		ResponseEntity<String> response = 
//				restTemplate.exchange(createURLWithPort("/api/v1/courses/1"),
//						HttpMethod.DELETE, httpEntity,String.class);
//		assertTrue(response.getStatusCode() == HttpStatus.NO_CONTENT);
//	}
//
//	private String createURLWithPort(String uri) {
//		return "http://localhost:" + port + uri;
//	}
}
