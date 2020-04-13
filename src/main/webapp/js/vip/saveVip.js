layui.use(['jquery','layer','table','form','laydate'], function() {
    var $ = layui.jquery,   //jquery
        layer = layui.layer,  //弹出层
        table = layui.table,  //数据表格
        form = layui.form,  //表单
        laydate = layui.laydate;   //日期

        //做手机号和身份证号验证的判断变量
        var idcardIf = false;
        var phoneIf = false;

    //手机号验证
    $("#phone").blur(function () {
       var phone=$(this).val();
       var reg = /^1[3456789]\d{9}$/;
        if(reg.test(phone)){//手机号格式正确
            $.ajax({
                type:"POST",  //请求方式，POST请求
                url:"vip/getCountByPramas",   //访问服务器端的路径
                async:false,  //允许ajax外部的变量获得去数据
                data:{"phone":phone},  //传到服务器端参数JSON格式数据
                success:function (data) {  //请求执行正常函数回调
                    if(data>0){
                        phoneIf = false;
                        layer.tips('手机号已使用！！', $("#phone"), {tips: [2,'#fc1505'],time:2000,});
                    }else {
                        phoneIf = true;
                        layer.tips('手机号可用。。', $("#phone"), {tips: [2,'green'],time:2000,});
                    }
                },
                error:function () {  //请求执行异常时的函数回调
                    layer.msg('服务器异常', {icon: 3,time:2000,anim: 6,shade:0.5});
                }
            });
        }else {//手机号格式错误
            layer.tips('手机号格式不正确！！', $("#phone"), {tips: [2,'#fc1505'],time:2000,});
        }
    });
    //身份证号验证
    $("#idcard").blur(function () {
        var idcard=$(this).val();
        var reg = /(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
        if(reg.test(idcard)){//身份证号号格式正确
            $.ajax({
                type:"POST",  //请求方式，POST请求
                url:"vip/getCountByPramas",   //访问服务器端的路径
                async:false,  //允许ajax外部的变量获得去数据
                data:{"idcard":idcard},  //传到服务器端参数JSON格式数据
                success:function (data) {  //请求执行正常函数回调
                    if(data>0){
                        idcardIf = false;
                        layer.tips('身份证号已使用！！', $("#idcard"), {tips: [2,'#fc1505'],time:2000,});
                    }else {
                        idcardIf = true;
                        layer.tips('身份证号可用。。', $("#idcard"), {tips: [2,'green'],time:2000,});
                    }
                },
                error:function () {  //请求执行异常时的函数回调
                    layer.msg('服务器异常', {icon: 3,time:2000,anim: 6,shade:0.5});
                }
            });
        }else {//手机号格式错误
            layer.tips('身份证号格式不正确！！', $("#idcard"), {tips: [2,'#fc1505'],time:2000,});
        }
    });
    //根据会员类型(下拉框)自动生成会员卡号
    form.on('select(vipRate)',function (data) {
        var nowDate = new Date();
        //添加当时时间去表单去
        $("#createDate").val(getNowDate(nowDate));
        var vipNum=dateReplace(getNowDate(nowDate));//会员部分卡号
        if(data.value==0.8){
            vipNum+="01";
        }else {
            vipNum+="02";
        }
        $("#vipNum").val(vipNum);
    });
    //监听会员的添加提交
    form.on('submit(demo2)', function(data){
        //将之前的身份证号和手机号唯一性验证的结果进行判断
        if(idcardIf&&phoneIf){
            //执行添加
            saveVip(data.field);
            layer.closeAll();  //关闭弹框
        }else if(!idcardIf&&phoneIf){
            layer.msg('身份证号已被使用！！', {icon: 2,time:2000,anim: 6,shade:0.5});
        }else if(idcardIf&&!phoneIf){
            layer.msg('手机号已被使用！！', {icon: 2,time:2000,anim: 6,shade:0.5});
        }else {
            layer.msg('身份证号手机号均被使用！！', {icon: 2,time:2000,anim: 6,shade:0.5});
        }
        return false;  //阻止表单进行action提交
    });
    //添加会员数据
    function saveVip(saveJsonVip) {
        $.ajax({
            type:"POST",  //请求方式，POST请求
            url:"vip/save",   //访问服务器端的路径
            data:saveJsonVip,  //传到服务器端参数JSON格式数据
            success:function (data) {  //请求执行正常函数回调
                if(data=="success"){
                    layer.msg('会员信息添加成功。。', {icon: 1,time:2000,anim: 4,shade:0.5});
                    //用定时器完成系统的路径跳转
                    setTimeout('window.location = "model/toShowVip"',2000);
                }else {
                    layer.msg('会员信息添加失败！！', {icon: 2,time:2000,anim: 5,shade:0.5});
                }
            },
            error:function () {  //请求执行异常时的函数回调
                layer.msg('服务器异常', {icon: 3,time:2000,anim: 6,shade:0.5});
            }
        });
    }
    //获取当前时间字符串     Date()   ---->  yyyy/MM/dd HH:mm:ss 格式的字符串
    function getNowDate(date) {
        var sign1 = "/";
        var sign2 = ":";
        var year = date.getFullYear(); // 年
        var month = date.getMonth() + 1; // 月
        var day  = date.getDate(); // 日
        var hour = date.getHours(); // 时
        var minutes = date.getMinutes(); // 分
        var seconds = date.getSeconds(); //秒
        if (month >= 1 && month <= 9) {
            month = "0" + month;
        }
        if (day >= 0 && day <= 9) {
            day = "0" + day;
        }
        if (hour >= 0 && hour <= 9) {
            hour = "0" + hour;
        }
        if (minutes >= 0 && minutes <= 9) {
            minutes = "0" + minutes;
        }
        if (seconds >= 0 && seconds <= 9) {
            seconds = "0" + seconds;
        }
        var currentdate = year + sign1 + month + sign1 + day + " " + hour + sign2 + minutes + sign2 + seconds ;
        return currentdate;
    }

    //把 2019/01/01 12:12:12  -->  20190101121212
    function dateReplace(date) {
        date = date.replace("/","");
        date = date.replace("/","");
        date = date.replace(" ","");
        date = date.replace(":","");
        date = date.replace(":","");
        return date;
    }
});