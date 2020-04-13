package com.java.springBoot.service.impl;


import com.java.springBoot.entity.Authority;
import com.java.springBoot.entity.Roles;
import com.java.springBoot.service.RoleService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Map;

/**
 * description:
 * author:余焕
 * time:2020/2/18 20:47
 */
@Service
@Transactional(readOnly = false)
public class RoleServiceImpl extends BaseServiceImpl<Roles> implements RoleService {
    @Override
    public Map<String, Object> findPageByPramas(Integer page, Integer limit, Roles roles) throws Exception {
        Map<String, Object> map = super.findPageByPramas(page, limit, roles);
        List<Roles> list = (List<Roles>) map.get("data");
        for (int i = 0; i<list.size() ; i++) {
            Roles r = list.get(i);
            //一级权限信息
            List<Authority> firstAuths = authorityMapper.selectAuthorityByRoleIdAndParent(r.getId(), 0);
            StringBuffer firstAuthName =new StringBuffer();
            for (int j = 0; j <firstAuths.size() ; j++) {
               firstAuthName.append(firstAuths.get(j).getAuthorityName()+",");
            }
            r.setFirstANames(firstAuthName.toString().substring(0,firstAuthName.length()-1));
        }
        return map;
    }
}
