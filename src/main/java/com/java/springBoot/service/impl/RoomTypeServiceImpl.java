package com.java.springBoot.service.impl;


import com.java.springBoot.entity.RoomType;
import com.java.springBoot.service.RoomTypeService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * description:
 * author:余焕
 * time:2020/2/18 20:47
 */
@Service
@Transactional(readOnly = false)
public class RoomTypeServiceImpl extends BaseServiceImpl<RoomType> implements RoomTypeService {
}
