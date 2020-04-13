package com.java.springBoot.mapper;


import com.java.springBoot.entity.RoomSale;
import org.apache.ibatis.annotations.Select;

import java.util.List;
import java.util.Map;

/**
 *   房间消费记录Mapper代理对象
 */
public interface RoomSaleMapper extends BaseMapper<RoomSale>{
    //根据房间编号分组查询每一个房间的出租金额
    @Select("SELECT room_num,SUM(sale_price) AS saleprice FROM roomsale GROUP BY room_num")
    List<Map<String,Object>> selectSalePriceByroomNum() throws Exception;
}