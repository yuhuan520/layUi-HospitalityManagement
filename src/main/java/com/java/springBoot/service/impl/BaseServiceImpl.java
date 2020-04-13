package com.java.springBoot.service.impl;


import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import com.java.springBoot.mapper.*;
import com.java.springBoot.service.BaseService;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 *   基础业务层实现类
 * @param <T>  传入的实体对象泛型
 */
public class BaseServiceImpl<T> implements BaseService<T> {

    //依赖基础Mapper代理对象
    @Autowired
    protected BaseMapper<T> baseMapper;
    //依赖注入入InRoomInfoMapper代理对象
    @Autowired
    protected InRoomInfoMapper inRoomInfoMapper;
    //依赖注入入RoomsMapper代理对象
    @Autowired
    protected RoomsMapper roomsMapper;
    //依赖注入入RoomSaleMapper代理对象
    @Autowired
    protected RoomSaleMapper roomSaleMapper;
    //依赖注入入AuthorityMapper代理对象
    @Autowired
    protected AuthorityMapper authorityMapper;
    /**
     *   根据主键删除单个数据
     * @param id  主键id
     * @return  删除结果
     */
    @Override
    public String removeByPrimaryKey(Integer id) throws Exception{
        if(baseMapper.deleteByPrimaryKey(id)>0){
            return "success";
        }else {
            return "fail";
        }
    }

    /**
     *   添加数据
     * @param t  添加数据对象
     * @return  添加结果
     */
    @Override
    public String save(T t) throws Exception{
        if(baseMapper.insert(t)>0){
            return "success";
        }else {
            return "fail";
        }
    }

    /**
     *   动态添加数据
     * @param t  添加数据对象
     * @return  添加结果
     */
    @Override
    public String saveSelective(T t) throws Exception{
        if(baseMapper.insertSelective(t)>0){
            return "success";
        }else {
            return "fail";
        }
    }

    /**
     *   根据主键查询单个数据
     * @param id  主键id
     * @return  单个数据结果
     */
    @Override
    public T findByPrimaryKey(Integer id) throws Exception{
        return baseMapper.selectByPrimaryKey(id);
    }

    /**
     *   根据主键动态修改数据
     * @param t  要修改的对象数据
     * @return  修改结果
     */
    @Override
    public String updateByPrimaryKeySelective(T t) throws Exception{
        if(baseMapper.updateByPrimaryKeySelective(t)>0){
            return "success";
        }else {
            return "fail";
        }
    }

    /**
     *   根据主键修改所有字段数据
     * @param t  要修改的对象数据
     * @return 修改结果
     */
    @Override
    public String updateByPrimaryKey(T t) throws Exception{
        if(baseMapper.updateByPrimaryKey(t)>0){
            return "success";
        }else {
            return "fail";
        }
    }

    /**
     *   根据条件分页加载数据
     * @param page  当前页
     * @param limit  每一页数据条数
     * @param t  查询的条件
     * @return  Layui的table方法渲染需要的分页数据集合
     */
    @Override
    public Map<String, Object> findPageByPramas(Integer page, Integer limit, T t) throws Exception {
        //1.新建map集合
        Map<String,Object> map = new HashMap<String, Object>();
        //2.进行分页
        PageHelper.startPage(page,limit);
        //3.查询分页数据
        PageInfo<T> pageInfo = new PageInfo<T>(baseMapper.selectPageByPramas(t));
        //4.设置总共的数据条数
        map.put("count",pageInfo.getTotal());
        //5.设置分页的集合对象数据
        map.put("data",pageInfo.getList());
        return map;
    }
    /*
    * 根据条件加载数据
    * */
    @Override
    public T findByPramas(T t) throws Exception {
        return baseMapper.selectByParams(t);
    }
    /*
   * 根据条件加载多条数据
   * */
    @Override
    public List<T> findManyByPramas(T t) throws Exception {
        return baseMapper.selectManyByPramas(t);
    }
    /*
    * 根据多个id删除多条数据,假删除
     * */
    @Override
    public String updBatchByPrimaryKeySelective(Integer[] ids, T t) throws Exception {
        if(baseMapper.updBatchByPrimaryKeySelective(ids,t)>0){
            return "success";
        }else {
            return "fail";
        }
    }
    /*
    * 根据条件查询数据条数
    * */
    @Override
    public Integer getCountByPramas(T t) throws Exception {
        return baseMapper.getCountByPramas(t);
    }
    /*
    * 查询所有数据
    * */
    @Override
    public List<T> findAll() throws Exception {
        return baseMapper.selectAll();
    }
}
