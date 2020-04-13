package com.java.springBoot.service.impl;


import com.java.springBoot.entity.InRoomInfo;
import com.java.springBoot.entity.Orders;
import com.java.springBoot.entity.RoomSale;
import com.java.springBoot.entity.Rooms;
import com.java.springBoot.service.OrdersService;
import com.java.springBoot.utils.DateUtils;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * description:
 * author:余焕
 * time:2020/2/18 20:47
 */
@Service
@Transactional(readOnly = false)
public class OrdersServiceImpl extends BaseServiceImpl<Orders> implements OrdersService {
    @Override
    public String save(Orders orders) throws Exception {
        //1,完成订单添加
        Integer insOrdersCount = baseMapper.insert(orders);
        //2,完成入住信息修改out_room_status从0改为1
        InRoomInfo ini = new InRoomInfo();
        ini.setId(orders.getIriId());
        ini.setOutRoomStatus("1");
        Integer updINICount = inRoomInfoMapper.updateByPrimaryKeySelective(ini);
        //3.完成房间状态的修改将room_status=1以入住改为2打扫
        //根据入住id查询room_id
        Integer roomId = inRoomInfoMapper.selectByPrimaryKey(orders.getIriId()).getRoomId();
        Rooms rooms = new Rooms();
        rooms.setId(roomId);
        rooms.setRoomStatus("2");
        Integer updRoomsCount = roomsMapper.updateByPrimaryKeySelective(rooms);
        if (insOrdersCount>0&&updINICount>0&&updRoomsCount>0){
            return "success";
        }else {
            return "fail";
        }
    }
    //支付成功之后的操作（1.修改订单状态，2.生成消费记录）
    @Override
    public Boolean afterOrdersPay(String out_trade_no) throws Exception {
        Orders payOrders = new Orders();
        payOrders.setOrderNum(out_trade_no);
        Orders orders = baseMapper.selectByParams(payOrders);
        orders.setOrderStatus("1");
        //1,修改订单状态由0改为1
        Integer updOrdersCount = baseMapper.updateByPrimaryKeySelective(orders);
        //创建订单消费对象,开始添加消费记录数据
        String[] orderOther = orders.getOrderOther().split(",");
        String[] orderPrice = orders.getOrderPrice().split(",");
        RoomSale roomSale = new RoomSale();
        roomSale.setRoomNum(orderOther[0]);
        roomSale.setCustomerName(orderOther[1]);
        roomSale.setStartDate(DateUtils.stringToDate(orderOther[2]));
        roomSale.setEndDate(DateUtils.stringToDate(orderOther[3]));
        roomSale.setDays(Integer.parseInt(orderOther[4]));
        roomSale.setRoomPrice(Double.valueOf(orderPrice[0]));
        roomSale.setOtherPrice(Double.valueOf(orderPrice[1]));
        roomSale.setRentPrice(Double.valueOf(orderPrice[2]));
        //订单实际费用
        roomSale.setSalePrice(orders.getOrderMoney());
        //优惠金额(单价*天数-住宿费(不包含其他费用))
        Double discountPrice=Double.valueOf(orderPrice[0])*Integer.parseInt(orderOther[4])-Double.valueOf(orderPrice[2]);
        roomSale.setDiscountPrice(discountPrice);
        //完成添加消费记录
        Integer insRoomSaleCount = roomSaleMapper.insert(roomSale);
        return updOrdersCount>0&&insRoomSaleCount>0;
    }
}
