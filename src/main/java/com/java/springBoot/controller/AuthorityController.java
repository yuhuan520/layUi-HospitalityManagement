package com.java.springBoot.controller;

import com.java.springBoot.entity.Authority;
import com.java.springBoot.entity.User;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpSession;
import java.util.List;
import java.util.Map;

/**
 * description:
 * author:余焕
 * time:2020/2/20 22:49
 */
@Controller
@RequestMapping("/authority")
public class AuthorityController extends BaseController<Authority>{
    /*
    * 登录成功后跳转页面
    * */
    @RequestMapping("/toIndex")
    public String toIndex(HttpSession session , Model model){
        try {
            User loginUser = (User) session.getAttribute("loginUser");
            /*User loginUser = new User();
            loginUser.setRoleId(1);*/
            List<Map<String, Object>> mapList = authorityService.findAuthoritiesByLogin(loginUser);
            model.addAttribute("mapList",mapList);
        } catch (Exception e) {
            e.printStackTrace();
        }
        return "index";
    }
    /*
    * 通过角色id查询权限信息
    * */
    @RequestMapping("/loadAuthoritiesByRoleId")
    public @ResponseBody List<Authority> loadAuthoritiesByRoleId(Integer roleId){
        try {
            return authorityService.findAuthoritiesByRoleId(roleId);
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }
}
