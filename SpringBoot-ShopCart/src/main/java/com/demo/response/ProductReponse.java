package com.demo.response;

import java.math.BigDecimal;
import java.util.Date;

import com.demo.entity.Product;

public class ProductReponse {
	private long id;
	private String name;
	private BigDecimal price;
	private Long[] ids; 
	private Date createDate;
	private Date updateDate;
	
	
	
	
	public ProductReponse() {
		 
	}
	public ProductReponse(Product product) {
		this.id = product.getId();
		this.name = product.getName();
		this.price = product.getPrice();
		this.createDate = product.getCreateDate();
		this.updateDate = product.getUpdateDate();
		if(product.getCategories() != null) {
			this.ids = product.getCategories()
					.stream().map( item -> item.getId()).toArray(Long[]::new);
		}
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
	public BigDecimal getPrice() {
		return price;
	}
	public void setPrice(BigDecimal price) {
		this.price = price;
	}
	public Long[] getIds() {
		return ids;
	}
	public void setIds(Long[] ids) {
		this.ids = ids;
	}
	public Date getCreateDate() {
		return createDate;
	}
	public void setCreateDate(Date createDate) {
		this.createDate = createDate;
	}
	public Date getUpdateDate() {
		return updateDate;
	}
	public void setUpdateDate(Date updateDate) {
		this.updateDate = updateDate;
	}
	
	
}
