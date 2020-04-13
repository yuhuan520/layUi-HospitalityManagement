package com.java.springBoot.service;

import java.util.List;
import java.util.Map;

/**
 *   基础业务层接口
 * @param <T>  传入的实体对象泛型
 */
public interface BaseService<T> {

    /**
     *   根据主键删除单个数据
     * @param id  主键id
     * @return  删除结果
     */
    String removeByPrimaryKey(Integer id) throws Exception;

    /**
     *   添加数据
     * @param t  添加数据对象
     * @return  添加结果
     */
    String save(T t) throws Exception;

    /**
     *   动态添加数据
     * @param t  添加数据对象
     * @return  添加结果
     */
    String saveSelective(T t) throws Exception;

    /**
     *   根据主键查询单个数据
     * @param id  主键id
     * @return  单个数据结果
     */
    T findByPrimaryKey(Integer id) throws Exception;

    /**
     *   根据主键动态修改数据
     * @param t  要修改的对象数据
     * @return  修改结果
     */
    String updateByPrimaryKeySelective(T t) throws Exception;

    /**
     *   根据主键修改所有字段数据
     * @param t  要修改的对象数据
     * @return 修改结果
     */
    String updateByPrimaryKey(T t) throws Exception;

    /**
     *   根据条件分页加载数据
     * @param page  当前页
     * @param limit  每一页数据条数
     * @param t  查询的条件
     * @return  Layui的table方法渲染需要的分页数据集合
     */
    Map<String,Object> findPageByPramas(Integer page, Integer limit, T t) throws Exception;
    /*
    * 根据条件加载单条数据
     * */
    T findByPramas(T t) throws Exception;
    /*
    * 根据条件加载多条数据
    * */
    List<T> findManyByPramas(T t) throws Exception;
    /*
   * 根据多个id删除多条数据,假删除
   * */
    String updBatchByPrimaryKeySelective(Integer[] ids,T t) throws Exception;
    /*
    * 根据条件查询数据条数
    * */
    Integer getCountByPramas(T t) throws  Exception;
    /*
   * 查询所有数据
   * */
    List<T> findAll() throws  Exception;
}
