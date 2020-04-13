package com.java.springBoot.service;

import com.java.springBoot.entity.RoomSale;

import java.util.Map;

/**
 * description:
 * author:余焕
 * time:2020/2/20 22:59
 */
public interface RoomSaleService extends BaseService<RoomSale> {
    //根据房间编号分组查询每一个房间的出租金额
    Map<String,Object> findSalePriceByroomNum() throws Exception;
}
