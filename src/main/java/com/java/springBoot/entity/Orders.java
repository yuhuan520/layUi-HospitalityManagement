package com.java.springBoot.entity;

import com.fasterxml.jackson.annotation.JsonFormat;

import java.util.Date;

public class Orders {
    private Integer id;

    private String orderNum;

    private Double orderMoney;

    private String remark;

    private String orderStatus;

    private Integer iriId;
    @JsonFormat(pattern = "yyyy/MM/dd HH:mm:ss" ,timezone = "GMT+8")
    private Date createDate;

    private String flag;

    private String orderOther;

    private String orderPrice;

    private InRoomInfo inRoomInfo;

    //进行订单日期范围查询的属性（不映射到数据库）
    //开始时间
    private Date beginDate;
    //结束时间
    private Date endDate;

    public Date getBeginDate() {
        return beginDate;
    }

    public void setBeginDate(Date beginDate) {
        this.beginDate = beginDate;
    }

    public Date getEndDate() {
        return endDate;
    }

    public void setEndDate(Date endDate) {
        this.endDate = endDate;
    }

    public InRoomInfo getInRoomInfo() {
        return inRoomInfo;
    }

    public void setInRoomInfo(InRoomInfo inRoomInfo) {
        this.inRoomInfo = inRoomInfo;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getOrderNum() {
        return orderNum;
    }

    public void setOrderNum(String orderNum) {
        this.orderNum = orderNum == null ? null : orderNum.trim();
    }

    public Double getOrderMoney() {
        return orderMoney;
    }

    public void setOrderMoney(Double orderMoney) {
        this.orderMoney = orderMoney;
    }

    public String getRemark() {
        return remark;
    }

    public void setRemark(String remark) {
        this.remark = remark == null ? null : remark.trim();
    }

    public String getOrderStatus() {
        return orderStatus;
    }

    public void setOrderStatus(String orderStatus) {
        this.orderStatus = orderStatus == null ? null : orderStatus.trim();
    }

    public Integer getIriId() {
        return iriId;
    }

    public void setIriId(Integer iriId) {
        this.iriId = iriId;
    }

    public Date getCreateDate() {
        return createDate;
    }

    public void setCreateDate(Date createDate) {
        this.createDate = createDate;
    }

    public String getFlag() {
        return flag;
    }

    public void setFlag(String flag) {
        this.flag = flag == null ? null : flag.trim();
    }

    public String getOrderOther() {
        return orderOther;
    }

    public void setOrderOther(String orderOther) {
        this.orderOther = orderOther == null ? null : orderOther.trim();
    }

    public String getOrderPrice() {
        return orderPrice;
    }

    public void setOrderPrice(String orderPrice) {
        this.orderPrice = orderPrice == null ? null : orderPrice.trim();
    }
}