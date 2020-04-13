package com.java.springBoot.controller;

import com.java.springBoot.entity.RoomSale;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.Map;

/**
 * description:
 * author:余焕
 * time:2020/2/20 22:49
 */
@Controller
@RequestMapping("/roomSale")
public class RoomSaleController extends BaseController<RoomSale>{
    /*
    * 获取数据分析的数据
    * */
    @RequestMapping("/loadSalePriceByRoomNum")
    public @ResponseBody Map<String,Object> loadSalePriceByRoomNum(){
        try {
            return roomSaleService.findSalePriceByroomNum();
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }
}
