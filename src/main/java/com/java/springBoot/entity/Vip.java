package com.java.springBoot.entity;

import java.util.Date;

public class Vip {
    private Integer id;

    private String vipNum;

    private String customerName;

    private Float vipRate;

    private String idcard;

    private String phone;

    private Date createDate;

    private String gender;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getVipNum() {
        return vipNum;
    }

    public void setVipNum(String vipNum) {
        this.vipNum = vipNum == null ? null : vipNum.trim();
    }

    public String getCustomerName() {
        return customerName;
    }

    public void setCustomerName(String customerName) {
        this.customerName = customerName == null ? null : customerName.trim();
    }

    public Float getVipRate() {
        return vipRate;
    }

    public void setVipRate(Float vipRate) {
        this.vipRate = vipRate;
    }

    public String getIdcard() {
        return idcard;
    }

    public void setIdcard(String idcard) {
        this.idcard = idcard == null ? null : idcard.trim();
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone == null ? null : phone.trim();
    }

    public Date getCreateDate() {
        return createDate;
    }

    public void setCreateDate(Date createDate) {
        this.createDate = createDate;
    }

    public String getGender() {
        return gender;
    }

    public void setGender(String gender) {
        this.gender = gender == null ? null : gender.trim();
    }
}