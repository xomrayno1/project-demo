package com.demo.entity;

import java.math.BigDecimal;
import java.util.Date;
import java.util.List;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;

@Entity
public class Orders {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long id;
	private BigDecimal totalPrice;
	private int quantity;
	private Date createDate;
	private Date updateDate;
	
	@OneToMany(mappedBy = "orders")
	private List<CartItem> cartItems;

	public long getId() {
		return id;
	}

	public void setId(long id) {
		this.id = id;
	}

	public BigDecimal getTotalPrice() {
		if(cartItems != null) {
			cartItems.forEach(item -> {
				this.totalPrice =this.totalPrice.add(item.getTotalPrice());
			});
		}
		return new BigDecimal(0);
	}

//	public void setTotalPrice(BigDecimal totalPrice) {
//		this.totalPrice = totalPrice;
//	}

	public int getQuantity() {
		if(cartItems != null) {
			cartItems.forEach(item -> {
				this.quantity += item.getQuantity();
			});
		}
		return 0;
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

	public List<CartItem> getCartItems() {
		return cartItems;
	}

	public void setCartItems(List<CartItem> cartItems) {
		this.cartItems = cartItems;
	} 
	
}
