package com.java.springBoot.mapper;


import com.java.springBoot.entity.Authority;
import org.apache.ibatis.annotations.Param;

import java.util.List;

/**
 *   权限的Mapper代理对象
 */
public interface AuthorityMapper extends BaseMapper<Authority>{
    //根据角色id和parent查询权限数据
    List<Authority> selectAuthorityByRoleIdAndParent(@Param("roleId")Integer roleId, @Param("parent") Integer parent)throws Exception;
    /*
    * 根据角色id查询权限数据
    * */
    List<Authority> selectAuthoritiesByRoleId(Integer roleId) throws Exception;
}