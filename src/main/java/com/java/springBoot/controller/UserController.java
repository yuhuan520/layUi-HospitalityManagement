package com.java.springBoot.controller;

import com.java.springBoot.entity.User;
import com.java.springBoot.utils.MD5;
import com.java.springBoot.utils.VerifyCodeUtils;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.io.IOException;

/**
 * description:
 * author:余焕
 * time:2020/2/20 22:49
 */
@Controller
@RequestMapping("/user")
public class UserController extends BaseController<User>{
    //获取用户登陆时的验证码
    @RequestMapping("/getVerifyCode")
    public void getVerifyCode(HttpSession session, HttpServletResponse response) throws Exception {
        //获取5位数的验证码
        String verifyCode = VerifyCodeUtils.generateVerifyCode(5);
        //将验证码存入session中,并转换为小写
        session.setAttribute("verifyCode",verifyCode.toLowerCase());
        //将产生的验证码转为图片显示（响应）到页面中   3DcfG
        VerifyCodeUtils.outputImage(250,35,response.getOutputStream(),verifyCode);
    }
    //验证验证码是否正确
    @RequestMapping("/checkVerifyCode")
    public @ResponseBody String checkVerifyCode(HttpSession session, String verifyCodeIpt){
        String verifyCode= (String) session.getAttribute("verifyCode");
        if (verifyCodeIpt.equals(verifyCode)){
            return "success";
        }else {
            return "fail";
        }
    }
    //执行登录操作
    @RequestMapping("/login")
    public @ResponseBody String login(HttpSession session,User user){
        //查询登录前密码MD5加密
        user.setPwd(MD5.md5crypt(user.getPwd()));
        try {
            User loginUser = baseService.findByPramas(user);
            if (loginUser!=null){//登录成功
                session.setAttribute("loginUser",loginUser);
                return "success";
            }else {//登陆失败
                return "fail";
            }
        } catch (Exception e) {
            e.printStackTrace();
            return "error";
        }
    }
    //用户退出
    @RequestMapping("/exitUser")
    public @ResponseBody String exitUser(HttpSession session){
        try {
            session.removeAttribute("loginUser");
            return "success";
        } catch (Exception e) {
            e.printStackTrace();
            return "error";
        }
    }
    //重写父类方法,需要加密密码
    @Override
    public String save(User user) {
        user.setPwd(MD5.md5crypt(user.getPwd()));//对密码进行MD5加密
        return super.save(user);
    }
}
