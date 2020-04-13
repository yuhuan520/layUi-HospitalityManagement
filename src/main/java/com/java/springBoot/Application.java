package com.java.springBoot;

import org.mybatis.spring.annotation.MapperScan;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

/**
 * description:
 * author:余焕
 * time:2020/2/18 18:16
 */
@SpringBootApplication(scanBasePackages = "com.java.springBoot.*")
@MapperScan(basePackages = "com.java.springBoot.mapper")
public class Application {
    public static void main(String[] args) {
        SpringApplication.run(Application.class,args);
    }
}
