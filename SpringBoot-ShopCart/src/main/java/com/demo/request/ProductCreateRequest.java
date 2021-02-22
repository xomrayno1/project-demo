package com.demo.request;

import java.math.BigDecimal;
import java.util.Date;

import javax.validation.constraints.DecimalMax;
import javax.validation.constraints.DecimalMin;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

import org.springframework.format.annotation.DateTimeFormat;

public class ProductCreateRequest {
	 
	//@NotBlank
	private Long[] ids; 
	@Size(min = 3 , max = 25,
			message = "The field name must be a string with a min length of 3 and  maximum length of 25")
	@NotBlank
	private String name;
	@DecimalMin(value = "0.0", message = "The field price must be a value with a min 0")
	@DecimalMax(value = "9999999.0", message = "The field price must be a value with a maximum 999999")
	private BigDecimal price;
	@DateTimeFormat(pattern = "yyyy-MM-dd")
	private Date createDate;
	@DateTimeFormat(pattern = "yyyy-MM-dd")
	private Date updateDate;
	
	 
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
	public Long[] getIds() {
		return ids;
	}
	public void setIds(Long[] ids) {
		this.ids = ids;
	}
	
	
	
	
	
}
