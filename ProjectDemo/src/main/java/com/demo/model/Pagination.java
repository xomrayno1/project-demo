package com.demo.model;

public class Pagination {
	private long totalRows;
	private int page;
	private int limit ;
	
	
	
	public Pagination() {
		 
	}
	public Pagination(long totalRows, int page, int limit) {
		 
		this.totalRows = totalRows;
		this.page = page;
		this.limit = limit;
	}
	 
	public long getTotalRows() {
		return totalRows;
	}
	public void setTotalRows(long totalRows) {
		this.totalRows = totalRows;
	}
	public int getPage() {
		return page;
	}
	public void setPage(int page) {
		this.page = page;
	}
	public int getLimit() {
		return limit;
	}
	public void setLimit(int limit) {
		this.limit = limit;
	}

	
	
}
