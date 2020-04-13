package com.java.springBoot.entity;

import com.fasterxml.jackson.annotation.JsonFormat;

import java.util.Date;

public class User {
    private Integer id;

    private String username;

    private String pwd;
    @JsonFormat(pattern = "yyyy/MM/dd HH:mm:ss" ,timezone = "GMT+8")
    private Date createDate;

    private String useStatus;

    private String isAdmin;

    private Integer roleId;

    //角色的一级权限名称
    private String firstANames;

    public String getFirstANames() {
        return firstANames;
    }

    public void setFirstANames(String firstANames) {
        this.firstANames = firstANames;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username == null ? null : username.trim();
    }

    public String getPwd() {
        return pwd;
    }

    public void setPwd(String pwd) {
        this.pwd = pwd == null ? null : pwd.trim();
    }

    public Date getCreateDate() {
        return createDate;
    }

    public void setCreateDate(Date createDate) {
        this.createDate = createDate;
    }

    public String getUseStatus() {
        return useStatus;
    }

    public void setUseStatus(String useStatus) {
        this.useStatus = useStatus == null ? null : useStatus.trim();
    }

    public String getIsAdmin() {
        return isAdmin;
    }

    public void setIsAdmin(String isAdmin) {
        this.isAdmin = isAdmin == null ? null : isAdmin.trim();
    }

    public Integer getRoleId() {
        return roleId;
    }

    public void setRoleId(Integer roleId) {
        this.roleId = roleId;
    }
}