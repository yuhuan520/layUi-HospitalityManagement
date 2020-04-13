package com.java.springBoot.service;

import com.java.springBoot.entity.Authority;
import com.java.springBoot.entity.User;

import java.util.List;
import java.util.Map;

/**
 * description:
 * author:余焕
 * time:2020/2/20 22:59
 */
public interface AuthorityService extends BaseService<Authority> {
    //根据用户登陆之后查询其拥有的权限菜单
    List<Map<String,Object>> findAuthoritiesByLogin(User user)throws Exception;
    /*
  * 根据角色id查询权限数据
  * */
    List<Authority> findAuthoritiesByRoleId(Integer roleId) throws Exception;
}
