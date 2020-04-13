package com.java.springBoot.service.impl;


import com.java.springBoot.entity.Authority;
import com.java.springBoot.entity.User;
import com.java.springBoot.service.AuthorityService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * description:
 * author:余焕
 * time:2020/2/18 20:47
 */
@Service
@Transactional(readOnly = false)
public class AuthorityServiceImpl extends BaseServiceImpl<Authority> implements AuthorityService{
    //根据用户登陆之后查询其拥有的权限菜单
    @Override
    public List<Map<String, Object>> findAuthoritiesByLogin(User user) throws Exception {
        List<Map<String, Object>> mapList = new ArrayList<>();
        //查询角色的一级权限
        List<Authority> authList = authorityMapper.selectAuthorityByRoleIdAndParent(user.getRoleId(), 0);
        for (int i = 0; i <authList.size(); i++) {
            Map<String,Object> map = new HashMap<>();
            Authority firstAuth = authList.get(i);
            //一级权限id
            map.put("firstAId",firstAuth.getId());
            //一级权限名字
            map.put("firstAName",firstAuth.getAuthorityName());
            //根据一级权限查询出二级权限数据
            List<Authority> secAuthorities = authorityMapper.selectAuthorityByRoleIdAndParent(user.getRoleId(), firstAuth.getId());
            map.put("secAuthorities",secAuthorities);
            mapList.add(map);
        }
        return mapList;
    }
    /*
    * 根据角色id查询权限数据
    * */
    @Override
    public List<Authority> findAuthoritiesByRoleId(Integer roleId) throws Exception {
        return authorityMapper.selectAuthoritiesByRoleId(roleId);
    }
}
