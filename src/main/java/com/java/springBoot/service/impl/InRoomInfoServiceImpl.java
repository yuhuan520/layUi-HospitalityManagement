package com.java.springBoot.service.impl;

import com.java.springBoot.entity.InRoomInfo;
import com.java.springBoot.entity.Rooms;
import com.java.springBoot.service.InRoomInfoService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * description:
 * author:余焕
 * time:2020/2/18 20:47
 */
@Service
@Transactional(readOnly = false)
public class InRoomInfoServiceImpl extends BaseServiceImpl<InRoomInfo> implements InRoomInfoService  {
    @Override
    public String save(InRoomInfo inRoomInfo) throws Exception {
        //1,添加入住信息
        Integer insINICount = baseMapper.insert(inRoomInfo);
        //2,修改房屋状态room_status由0改为1
        Rooms rooms = new Rooms();
        rooms.setId(inRoomInfo.getRoomId());
        rooms.setRoomStatus("1");
        Integer updRoomsCount = roomsMapper.updateByPrimaryKeySelective(rooms);
        if (insINICount>0&&updRoomsCount>0){
            return "success";
        }else {
            return "fail";
        }
    }
}
