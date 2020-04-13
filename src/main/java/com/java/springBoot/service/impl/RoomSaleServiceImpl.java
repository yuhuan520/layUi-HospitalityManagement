package com.java.springBoot.service.impl;


import com.java.springBoot.entity.RoomSale;
import com.java.springBoot.service.RoomSaleService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * description:
 * author:余焕
 * time:2020/2/18 20:47
 */
@Service
@Transactional(readOnly = false)
public class RoomSaleServiceImpl extends BaseServiceImpl<RoomSale> implements RoomSaleService {
    //根据房间编号分组查询每一个房间的出租金额
    @Override
    public Map<String, Object> findSalePriceByroomNum() throws Exception {
        Map<String,Object> dataMap = new HashMap<>();
        dataMap.put("legend","消费金额");//存放分析类型
        //获取房间号与金额
        List<Map<String, Object>> mapList = roomSaleMapper.selectSalePriceByroomNum();
        //定义list集合存放房间号
        List<String> xAxis = new ArrayList<>();
        //定义map集合存放图标
        Map<String,Object> series = new HashMap<>();
        //往series中存放图表类型和名称
        series.put("type","line");
        series.put("name","消费金额");
        //定义list集合存放金额
        List<Double> data = new ArrayList<>();
        for( Map<String,Object> map:mapList){
            xAxis.add(map.get("room_num").toString());//存放房间号
            data.add((Double) map.get("saleprice"));
        }
        series.put("data",data);
        dataMap.put("xAxis",xAxis);
        dataMap.put("series",series);
        return dataMap;
    }
}
