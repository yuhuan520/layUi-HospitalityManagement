package com.java.springBoot.service;

import com.java.springBoot.entity.Orders;
/**
 * description:
 * author:余焕
 * time:2020/2/20 22:59
 */
public interface OrdersService extends BaseService<Orders> {
    //支付成功之后的操作（1.修改订单状态，2.生成消费记录）
    Boolean afterOrdersPay(String out_trade_no) throws Exception;
}
