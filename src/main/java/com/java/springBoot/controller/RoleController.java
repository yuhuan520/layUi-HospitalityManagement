package com.java.springBoot.controller;

import com.java.springBoot.entity.Roles;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

/**
 * description:
 * author:余焕
 * time:2020/2/20 22:49
 */
@Controller
@RequestMapping("/role")
public class RoleController extends BaseController<Roles>{
}
