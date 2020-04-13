package com.java.springBoot.controller;

import com.java.springBoot.entity.Rooms;
import com.java.springBoot.utils.FileUploadUtil;
import com.java.springBoot.utils.QiNiuUtil;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Map;

/**
 * description:
 * author:余焕
 * time:2020/2/20 22:49
 */
@Controller
@RequestMapping("/rooms")
public class RoomsController extends BaseController<Rooms>{

    @RequestMapping("/uploadRoomPic")
    public @ResponseBody Map<String,Object> uploadRoomPic(MultipartFile myFile){

        try {
            return QiNiuUtil.fileUpload(myFile);
        } catch (IOException e) {
            e.printStackTrace();
            return null;
        }
    }
}
