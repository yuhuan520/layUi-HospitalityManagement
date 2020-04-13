package com.java.springBoot.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

/**
 * description:
 * author:余焕
 * time:2020/2/18 20:50
 */
@Controller
@RequestMapping("/model")
public class ModelController {
    /*
    * 跳转去index.jsp页面
    * */
    @RequestMapping("/toIndex")
    public String toIndex(){
        return "index";
    }
    /*
    * 跳转到入住信息显示页面
    * */
    @RequestMapping("/toShowInRoomInfo")
    public String toShowInRoomInfo(){
        return "inroominfo/showInRoomInfo";
    }
   /*
   * 跳转到入住添加页面
   * */
   @RequestMapping("/toSaveInRoomInfo")
   public String toSaveInRoomInfo(){
       return "inroominfo/saveInRoomInfo";
   }

    /*
    * 跳转到订单管理页面
    * */
    @RequestMapping("/toShowOrders")
    public String toShowOrders(){
        return "orders/showOrders";
    }
    /*
     * 跳转到消费记录页面
     * */
    @RequestMapping("/toShowRoomSale")
    public String toShowRoomSale(){
        return "roomSale/showRoomSale";
    }
    /*
   * 跳转到会员信息查询页面
   * */
    @RequestMapping("/toShowVip")
    public String toShowVip(){
        return "vip/showVip";
    }
    /*
    * 跳转到会员添加页面
     * */
    @RequestMapping("/toSaveVip")
    public String toSaveVip(){
        return "vip/saveVip";
    }
    /*
   * 跳转到房屋显示页面
    * */
    @RequestMapping("/toShowRooms")
    public String toShowRooms(){
        return "rooms/showRooms";
    }

    /*
  * 跳转到登录页面
   * */
    @RequestMapping("/toLogin")
    public String toLogin(){
        return "login/login";
    }

    /*
    * 跳转到角色权限显示页面
    * */
    @RequestMapping("/toShowRole")
    public String toShowRole(){
        return "role/showRole";
    }
   /*
    * 跳转到用户显示页面
    * */
    @RequestMapping("/toShowUser")
    public String toShowUser(){
        return "user/showUser";
    }
    /*
   * 跳转到用户添加页面
   * */
    @RequestMapping("/toSaveUser")
    public String toSaveUser(){
        return "user/saveUser";
    }
    /*
    * 跳转到用户添加页面
    * */
    @RequestMapping("/toShowIdd")
    public String toShowIdd(){
        return "idd/showIdd";
    }
    /*
   * 跳转到房型信息管理页面
   * */
    @RequestMapping("/toShowRoomType")
    public String toShowRoomType(){
        return "roomType/showRoomType";
    }
}
