package com.demo.utils;

import com.demo.response.APIResponse;

public class BuildResponse {
	
	public static APIResponse buildReponseAPI(Object object) {
		APIResponse response = new APIResponse<Object>(object,"Ok",200);
		return response;
	}

}
