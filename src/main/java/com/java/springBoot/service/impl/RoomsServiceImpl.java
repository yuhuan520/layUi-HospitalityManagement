package com.java.springBoot.service.impl;


import com.java.springBoot.entity.Rooms;
import com.java.springBoot.service.RoomsService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * description:
 * author:余焕
 * time:2020/2/18 20:47
 */
@Service
@Transactional(readOnly = false)
public class RoomsServiceImpl extends BaseServiceImpl<Rooms> implements RoomsService {
}
