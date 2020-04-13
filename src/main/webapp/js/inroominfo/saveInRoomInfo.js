layui.use(['jquery','layer','table','form','laydate'], function() {
    var $ = layui.jquery,   //jquery
        layer = layui.layer,  //弹出层
        table = layui.table,  //数据表格
        form = layui.form,  //表单
        laydate = layui.laydate;   //日期

    //初始化可入住（空闲）的房间数据
    loadRoomsByRoomStatus("0");

    //日期时间选择器,显示入住时间
    laydate.render({
        elem: '#create_date'  //日期插件加入的容器
        ,type: 'datetime'  //日期类型
        ,format:'yyyy/MM/dd HH:mm:ss'  //显示日期的格式
        ,min:0
        ,value:new Date()  //值为当前时间
    });

    //根据房间的状态加载多个房间数据
    function loadRoomsByRoomStatus(roomsStatus){
         $.ajax({
           url:"rooms/loadManyByPramas",
           type:"POST",
           data:{
               "roomsStatus":roomsStatus
           },
           success:function (data) {
               var roomStr = '<option value="" selected>--请选择房间--</option>';
               $.each(data,function (i,rooms) {
                   roomStr += '<option value="'+rooms.id+'">'+rooms.roomNum+'-'+rooms.roomType.roomTypeName+'-'+rooms.roomType.roomPrice+'</option>'
               });
               //填充到页面中的下拉框
               $("#selRoomNumId").html(roomStr);
               form.render("select");  //渲染下拉框
           },
             error:function (data) {
                 layer.msg('服务器异常', {icon: 3,time:2000,anim: 6,shade:0.5});
             }
       });
    }
    //监听单选框
    form.on('radio(isVip)',function (data) {
        if(data.value=='1'){//是会员
            //除了会员卡号让其输入外，其他的均不可输入
            vipTrue();
        }else {//非会员
            //除了会员卡号不能输入外，其他的均可输入
            vipFalse();
            //清空表单
            $("form").eq(0).find("input:text").val("");
        }
    });
    //输入会员卡号并根据会员卡号查询会员数据,失去焦点事件
    $("#vip_num").blur(function () {
        var vipNum =$(this).val();
        if(vipNum.length==16){
            layer.tips('会员卡号正确。。', this, {tips: [2,'green'],time:2000});
            loadVipByVipNum(vipNum);
        }else {
            layer.tips('会员卡号为16位！！', this, {tips: [2,'#fc1505'],time:2000});
        }
    });
    //监听提交
    form.on('submit(demo1)',function (data) {
        //构建要被添加的入住信息数据
        var saveJsonInRoomInfo =data.field;
        saveJsonInRoomInfo['status']=1;
        saveJsonInRoomInfo['outRoomStatus'] = '0';
        saveInRoomInfo(saveJsonInRoomInfo);
        return false;
    });
    /*
    * 根据会员卡号查询会员数据
    * */
    function loadVipByVipNum(vipNum) {
        $.ajax({
            url:"vip/loadByPramas",
            type:"POST",
            data:{
                "vipNum":vipNum
            },
            success:function (data) {
               form.val('example',{
                   "customerName":data.customerName
                   ,"gender": data.gender
                   ,"idcard": data.idcard
                   ,"phone": data.phone
               })
            },
            error:function (data) {
                layer.msg('服务器异常', {icon: 3,time:2000,anim: 6,shade:0.5});
            }
        });
    }
    /*
    * 添加入住信息
    * */
    function saveInRoomInfo(saveJsonInRoomInfo) {
        $.ajax({
            type:"POST",  //请求方式，POST请求
            url:"inRoomInfo/save",   //访问服务器端的路径
            data:saveJsonInRoomInfo,  //传到服务器端参数JSON格式数据
            success:function (data) {  //请求执行正常函数回调
                if(data="success"){
                    layer.msg('入住信息添加成功。。', {icon: 1,time:2000,anim: 4,shade:0.5});
                    //用定时器完成系统的路径跳转
                    setTimeout('window.location = "model/toShowInRoomInfo"',2000);
                }else {
                    layer.msg('入住信息添加失败！！', {icon: 2,time:2000,anim: 3,shade:0.5});
                }
            },
            error:function () {  //请求执行异常时的函数回调
                layer.msg('服务器异常', {icon: 3,time:2000,anim: 6,shade:0.5});
            }
        });
    }
    //会员时输入框的修改
    function vipTrue() {
        $("#vip_num").removeAttr("disabled");
        $("#customerName").attr("disabled","disabled");
        $("#idcard").attr("disabled","disabled");
        $("#phone").attr("disabled","disabled");
        $("input[name=gender]").attr("disabled","disabled");
    }

    //非会员时输入框的修改
    function vipFalse() {
        $("#vip_num").attr("disabled","disabled");
        $("#customerName").removeAttr("disabled");
        $("#idcard").removeAttr("disabled");
        $("#phone").removeAttr("disabled");
        $("input[name=gender]").removeAttr("disabled")
    }
});