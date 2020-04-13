package com.java.springBoot.controller;

import com.java.springBoot.service.AuthorityService;
import com.java.springBoot.service.BaseService;
import com.java.springBoot.service.OrdersService;
import com.java.springBoot.service.RoomSaleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 *   基础控制器层  要进行数据交互
 * @param <T>  传入的实体对象泛型
 */
public class BaseController<T> {

    //依赖基础的业务层对象
    @Autowired
    protected BaseService<T> baseService;
    //依赖注入OrdersService对象
    @Autowired
    protected OrdersService ordersService;
    //依赖注入AuthorityService对象
    @Autowired
    protected AuthorityService authorityService;
    //依赖注入RoomSaleService对象
    @Autowired
    protected RoomSaleService roomSaleService;
    /**
     *   根据主键删除单个数据
     * @param id  主键id
     * @return  删除结果
     */
    @RequestMapping("/delByPrimaryKey")
    public @ResponseBody String delByPrimaryKey(Integer id){
        try {
            return baseService.removeByPrimaryKey(id);
        } catch (Exception e) {
            e.printStackTrace();
            return "error";
        }
    }

    /**
     *   添加数据
     * @param t  添加数据对象
     * @return  添加结果
     */
    @RequestMapping("/save")
    public @ResponseBody String save(T t){
        try {
            return baseService.save(t);
        } catch (Exception e) {
            e.printStackTrace();
            return "error";
        }
    }

    /**
     *   动态添加数据
     * @param t  添加数据对象
     * @return  添加结果
     */
    @RequestMapping("/saveSelective")
    public @ResponseBody String saveSelective(T t) {
        try {
            return baseService.saveSelective(t);
        } catch (Exception e) {
            e.printStackTrace();
            return "error";
        }
    }

    /**
     *   根据主键查询单个数据
     * @param id  主键id
     * @return  单个数据结果
     */
    @RequestMapping("/loadByPrimaryKey")
    public @ResponseBody T loadByPrimaryKey(Integer id) {
        try {
            return baseService.findByPrimaryKey(id);
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }

    /**
     *   根据主键动态修改数据
     * @param t  要修改的对象数据
     * @return  修改结果
     */
    @RequestMapping("/updByPrimaryKeySelective")
    public @ResponseBody String updByPrimaryKeySelective(T t) {
        try {
            return baseService.updateByPrimaryKeySelective(t);
        } catch (Exception e) {
            e.printStackTrace();
            return "error";
        }
    }

    /**
     *   根据主键修改所有字段数据
     * @param t  要修改的对象数据
     * @return 修改结果
     */
    @RequestMapping("/updateByPrimaryKey")
    public @ResponseBody String updateByPrimaryKey(T t){
        try {
            return baseService.updateByPrimaryKey(t);
        } catch (Exception e) {
            e.printStackTrace();
            return "error";
        }
    }

    /**
     *   根据条件分页加载数据
     * @param page  当前页
     * @param limit  每一页数据条数
     * @param t  查询的条件
     * @return  Layui的table方法渲染需要的分页数据集合
     */
    @RequestMapping("/loadPageByPramas")
    public @ResponseBody Map<String,Object> loadPageByPramas(Integer page,Integer limit,T t){
        Map<String,Object> map = new HashMap<String, Object>();
        try {
            map = baseService.findPageByPramas(page,limit,t);
            map.put("code",0);
        } catch (Exception e) {
            e.printStackTrace();
            map.put("code",200);
            map.put("msg","数据加载异常。。");
        }
        return map;
    }
    /*
    * 根据条件加载数据
    * */
    @RequestMapping("/loadByPramas")
    public @ResponseBody T loadByPramas(T t){
        try {
            return baseService.findByPramas(t);
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }
    /*
    * 根据条件加载多条数据
    * */
    @RequestMapping("/loadManyByPramas")
    public @ResponseBody List<T> loadManyByPramas(T t){
        try {
            return baseService.findManyByPramas(t);
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }
    /*
    * 根据多个id删除多条数据,假删除
    * */
    @RequestMapping("/updBatchByPrimaryKeySelective")
    public @ResponseBody String updBatchByPrimaryKeySelective(Integer[] ids,T t){
        try {
            return baseService.updBatchByPrimaryKeySelective(ids,t);
        } catch (Exception e) {
            e.printStackTrace();
            return "error";
        }
    }
    /*
    * 根据条件查询数据条数
    * */
    @RequestMapping("/getCountByPramas")
    public @ResponseBody Integer getCountByPramas(T t){
        try {
            return baseService.getCountByPramas(t);
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }
    /*
    * 查询所有数据
    * */
    @RequestMapping("/loadAll")
    public @ResponseBody List<T> loadAll(){
        try {
            return baseService.findAll();
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }
}
