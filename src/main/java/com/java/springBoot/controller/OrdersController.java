package com.java.springBoot.controller;

import com.java.springBoot.entity.Orders;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

/**
 * description:
 * author:余焕
 * time:2020/2/23 14:29
 */
@Controller
@RequestMapping("/orders")
public class OrdersController extends BaseController<Orders> {

    @RequestMapping("/toPay")
    public String toPay(){
        return "alipay/ordersPay";
    }
    //订单支付完成后的路径回调（1.修改订单状态，2.生成消费记录）
    @RequestMapping("/myOrdersPay")
    public String myOrdersPay(String out_trade_no){
        try {
            Boolean flag = ordersService.afterOrdersPay(out_trade_no);
            if (flag){
               return "redirect:/model/toIndex" ;
            }else {
                return "payError";
            }
        } catch (Exception e) {
            e.printStackTrace();
            return "payError";
        }
    }

}
