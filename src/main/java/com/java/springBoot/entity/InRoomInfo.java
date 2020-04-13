package com.java.springBoot.entity;

import com.fasterxml.jackson.annotation.JsonFormat;

import java.util.Date;

public class InRoomInfo {
    private Integer id;

    private String customerName;

    private String gender;

    private String isVip;

    private String idcard;

    private String phone;

    private Float money;
    @JsonFormat(pattern = "yyyy/MM/dd HH:mm:ss" ,timezone = "GMT+8")
    private Date createDate;

    private Integer roomId;

    private String status;

    private String outRoomStatus;

    private Rooms rooms;

    public Rooms getRooms() {
        return rooms;
    }

    public void setRooms(Rooms rooms) {
        this.rooms = rooms;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getCustomerName() {
        return customerName;
    }

    public void setCustomerName(String customerName) {
        this.customerName = customerName == null ? null : customerName.trim();
    }

    public String getGender() {
        return gender;
    }

    public void setGender(String gender) {
        this.gender = gender == null ? null : gender.trim();
    }

    public String getIsVip() {
        return isVip;
    }

    public void setIsVip(String isVip) {
        this.isVip = isVip == null ? null : isVip.trim();
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

    public Float getMoney() {
        return money;
    }

    public void setMoney(Float money) {
        this.money = money;
    }

    public Date getCreateDate() {
        return createDate;
    }

    public void setCreateDate(Date createDate) {
        this.createDate = createDate;
    }

    public Integer getRoomId() {
        return roomId;
    }

    public void setRoomId(Integer roomId) {
        this.roomId = roomId;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status == null ? null : status.trim();
    }

    public String getOutRoomStatus() {
        return outRoomStatus;
    }

    public void setOutRoomStatus(String outRoomStatus) {
        this.outRoomStatus = outRoomStatus == null ? null : outRoomStatus.trim();
    }
}