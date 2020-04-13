layui.use(['jquery','layer','table','form','laydate'], function() {
    var $ = layui.jquery,   //jquery
        layer = layui.layer,  //弹出层
        table = layui.table,  //数据表格
        form = layui.form,  //表单
        laydate = layui.laydate;   //日期

    var yzmIf=false;

    if($("#loginMsg").val()=='loginMsg'){
        layer.msg('你还未登陆，请先登陆！！', {icon: 3,time:2000,anim: 6,shade:0.5});
    }
    //随机验证码的验证
    $("#yzm").blur(function () {
        //此时将用户输入的验证获取到并转为小写
        var verifyCodeIpt = $(this).val().toLowerCase();
        $.ajax({
            type:"POST",  //请求方式，POST请求
            url:"user/checkVerifyCode",   //访问服务器端的路径
            data:{"verifyCodeIpt":verifyCodeIpt},
            success:function (data) {  //请求执行正常函数回调
                if(data=='success'){
                    yzmIf = true;
                    layer.tips('验证码输入正确。。', $("#yzm"), {tips: [2,'green'],time:2000,});
                }else {
                    yzmIf = false;
                    layer.tips('验证码输入错误！！', $("#yzm"), {tips: [2,'#fc1505'],time:2000,});
                }
            },
            error:function () {  //请求执行异常时的函数回调
                layer.msg('服务器异常', {icon: 3,time:2000,anim: 6,shade:0.5});
            }
        });
    });
    //监听登录按钮
    form.on('submit(login)',function (data) {
        if(yzmIf){
            login(data.field);//执行登录
        }else {
            layer.msg('验证码输入错误！！', {icon: 2,time:2000,anim: 6,shade:0.5});
        }
        return false;//阻止跳转
    });

    //执行登陆操作
    function login(JsonUser) {
        $.ajax({
            type:"POST",  //请求方式，POST请求
            url:"user/login",   //访问服务器端的路径
            data:JsonUser,  //传到服务器端参数JSON格式数据
            success:function (data) {  //请求执行正常函数回调
                if(data=='success'){
                    layer.msg('恭喜你，登陆成功', {icon: 1,time:2000,anim: 4,shade:0.5});
                    //用定时器完成系统的路径跳转到酒店管理平台首页
                    setTimeout('window.location = "/authority/toIndex"',2000);
                }else {
                    layer.msg('很遗憾，登陆失败', {icon: 2,time:2000,anim: 3,shade:0.5});
                }
            },
            error:function () {  //请求执行异常时的函数回调
                layer.msg('服务器异常', {icon: 3,time:2000,anim: 6,shade:0.5});
            }
        });
    }
});
