layui.use(['jquery','layer','table','form','upload'], function() {
    var $ = layui.jquery,   //jquery
        layer = layui.layer,  //弹出层
        table = layui.table,  //数据表格
        form = layui.form,  //表单
        upload = layui.upload;   //文件上传组件

    //初始化客房数据
    loadAllRooms();

    //初始化客房类型数据
    loadAllRoomType();

    var roomNumIf = false;  //验证房间号的唯一性判断变量

    //加载所有的客房及其客房类型数据
    function loadAllRooms() {
        $.ajax({
            type:"POST",  //请求方式，POST请求
            url:"rooms/loadAll",   //访问服务器端的路径
            success:function (data) {  //请求执行正常函数回调
                var roomStatus0 = '';
                var roomStatus1 = '';
                var roomStatus2 = '';
                $.each(data,function (i,item) {
                    //根据客房状态分别显示不同状态的客房信息
                    if(item.roomStatus=='0'){  //空闲的
                        roomStatus0 += '<li style="background-color: #009688;">';
                        roomStatus0 += '<img class="layui-anim" id="demo1" src="'+item.roomPic+'" width="135px" height="135px"/>';
                        roomStatus0 += '<div class="code">';
                        roomStatus0 += '<span style="display: block;color: #0C0C0C;">'+item.roomNum+'-'+item.roomType.roomTypeName+'-'+item.roomType.roomPrice+'元/天</span>';
                        roomStatus0 += '<button type="button" value="del" roomid="'+item.id+'" class="layui-btn layui-btn-danger layui-btn-xs">删除</button>';
                        roomStatus0 += '</div>';
                        roomStatus0 += '</li>';
                    }else if(item.roomStatus=='1'){ //已入住
                        roomStatus1 += '<li style="background-color: red;">';
                        roomStatus1 += '<img class="layui-anim" id="demo1" src="'+item.roomPic+'" width="135px" height="135px"/>';
                        roomStatus1 += '<div class="code">';
                        roomStatus1 += '<span style="display: block;color: #0C0C0C;">'+item.roomNum+'-'+item.roomType.roomTypeName+'-'+item.roomType.roomPrice+'元/天</span>';
                        roomStatus1 += '</div>';
                        roomStatus1 += '</li>';
                    }else {   //打扫
                        roomStatus2 += '<li style="background-color: blueviolet;">';
                        roomStatus2 += '<img class="layui-anim" id="demo1" src="'+item.roomPic+'" width="135px" height="135px"/>';
                        roomStatus2 += '<div class="code">';
                        roomStatus2 += '<span style="display: block;color: #0C0C0C;">'+item.roomNum+'-'+item.roomType.roomTypeName+'-'+item.roomType.roomPrice+'元/天</span>';
                        roomStatus2 += '<button type="button" value="del" roomid="'+item.id+'" class="layui-btn layui-btn-danger layui-btn-xs">删除</button>';
                        roomStatus2 += '<button type="button" value="upd" roomid="'+item.id+'" class="layui-btn layui-btn-xs layui-btn-normal">空闲</button>';
                        roomStatus2 += '</div>';
                        roomStatus2 += '</li>';
                    }
                })
                //将数据标签填充到ul列表容器中
                $("ul").eq(0).html(roomStatus0);
                $("ul").eq(1).html(roomStatus1);
                $("ul").eq(2).html(roomStatus2);
            },
            error:function () {  //请求执行异常时的函数回调
                layer.msg('服务器异常', {icon: 3,time:2000,anim: 6,shade:0.5});
            }
        });
    }

    //加载所有的客房类型
    function loadAllRoomType(){
        $.ajax({
            type:"POST",  //请求方式，POST请求
            url:"roomType/loadAll",   //访问服务器端的路径
            success:function (data) {  //请求执行正常函数回调
                var roomTypeStr = '<option value="" selected>--请选则客房类型--</option>';
                $.each(data,function (i,item) {
                    roomTypeStr += '<option value="'+item.id+'">'+item.roomTypeName+'-'+item.roomPrice+'</option>';
                });
                //填充到下拉框
                $("#selRoomType").html(roomTypeStr);
                form.render("select");  //渲染下拉框
            },
            error:function () {  //请求执行异常时的函数回调
                layer.msg('服务器异常', {icon: 3,time:2000,anim: 6,shade:0.5});
            }
        });
    }

    //添加客房信息
    $("#saveRoomsUI").click(function () {
        //清空上一次输入的房间号
        $("#roomNum").val("");
        //1.弹出添加界面
        layer.open({
            type:1,  //弹框类型
            title:"客房信息添加界面", //弹框标题
            area:['400px','500px'],  //弹框的宽高度
            anim: 4,  //弹框弹出时的动画效果
            shade:0.5,  //背景的透明度
            content:$("#saveRoomsDiv")  //弹出的内容
        });
    });

    //自定义表单验证
     form.verify({
         roomNum: function (value, item) { //value：表单的值、item：表单的DOM对象
             if (value.length != 4) {
                 return '房间号必须为4位';
             }
             checkRoomNum(value);  //验证房间号的唯一性
             if(!roomNumIf){
                 return '此房间号已被占用';
             }
         }
     });
    //监听会员的添加提交
    form.on('submit(demo3)', function(data){
        var saveJsonRooms = data.field;
        saveJsonRooms['flag'] = 1;
        saveJsonRooms['roomStatus'] = '0';
        saveRooms(saveJsonRooms);  //执行房间数据添加
        layer.closeAll(); //关闭所有弹框
        return false;
    });

     //验证房间号的唯一性
     function checkRoomNum(roomNum) {
         $.ajax({
             type:"POST",  //请求方式，POST请求
             url:"rooms/getCountByPramas",   //访问服务器端的路径
             async:false,  //允许ajax外部的变量获得去数据
             data:{'roomNum':roomNum},
             success:function (data) {  //请求执行正常函数回调
                 if(data>0){
                     roomNumIf = false;
                 }else {
                     roomNumIf = true;
                 }
             },
             error:function () {  //请求执行异常时的函数回调
                 layer.msg('服务器异常', {icon: 3,time:2000,anim: 6,shade:0.5});
             }
         });
     }

     //添加房间数据
    function saveRooms(saveJsonRooms) {
        $.ajax({
            type:"POST",  //请求方式，POST请求
            url:"rooms/save",   //访问服务器端的路径
            data:saveJsonRooms,
            success:function (data) {  //请求执行正常函数回调
                if(data=='success'){
                    layer.msg('房间信息添加成功。。', {icon: 1,time:2000,anim: 4,shade:0.5});
                    loadAllRooms() //重新加载客房信息
                }else {
                    layer.msg('房间信息添加失败！！', {icon: 2,time:2000,anim: 5,shade:0.5});
                }
            },
            error:function () {  //请求执行异常时的函数回调
                layer.msg('服务器异常', {icon: 3,time:2000,anim: 6,shade:0.5});
            }
        });
    }

    /***********文件上传************/
    //普通图片上传
    var uploadInst = upload.render({
        elem: '#test1' //绑定文件上传的容器
        ,url: 'rooms/uploadRoomPic' //改成您自己的上传接口
        ,field:'myFile'  //服务器端接收文件的名字
        ,before: function(obj){  //文件上传之前的函数回调
            //预读本地文件示例，不支持ie8
            obj.preview(function(index, file, result){  //将图片回显到img标签中
                $('#demo1').attr('src', result); //图片链接（base64）
            });
        }
        ,done: function(res){  //执行上传后的函数回调
            //如果上传失败
            if(res.code == 0){
                layer.msg('上传成功');
                $("#roomPicId").val(res.newFileName);  //将上传后的新的文件名替换到隐藏域，做客房信息添加的表单提交
            }else {
                layer.msg('上传失败');
            }
            //上传成功
        }
        ,error: function(){  //异常时的函数回调
            //演示失败状态，并实现重传
            var demoText = $('#demoText');
            demoText.html('<span style="color: #FF5722;">上传失败</span> <a class="layui-btn layui-btn-xs demo-reload">重试</a>');
            demoText.find('.demo-reload').on('click', function(){
                uploadInst.upload();
            });
        }
    });
    //完成房间的删除和改成空闲状态
    $("ul").on("click","button",function () {
        var event = $(this).val();
        var roomid = $(this).attr("roomid");
        if(event=='del'){
            layer.confirm('真的删除此房间么？', function(index) {
                //完成删除，实际上修改房间的是否显示
                updRoomsFlag(roomid);
                layer.close(index);
            });
        }else {
            layer.confirm('真的将此房间改为空闲么？', function(index) {
                //完成删除，实际上修改房间的是否显示
                updRoomStatus(roomid);
                layer.close(index);
            });
        }
    });

    //删除房间-->修改房间是否显示flag
    function updRoomsFlag(roomid) {
        $.ajax({
            type:"POST",  //请求方式，POST请求
            url:"rooms/updByPrimaryKeySelective",   //访问服务器端的路径
            data:{"id":roomid,"flag":0},
            success:function (data) {  //请求执行正常函数回调
                if(data=='success'){
                    layer.msg('房间删除成功。。', {icon: 1,time:2000,anim: 4,shade:0.5});
                    loadAllRooms() //重新加载客房信息
                }else {
                    layer.msg('房间删除失败！！', {icon: 2,time:2000,anim: 5,shade:0.5});
                }
            },
            error:function () {  //请求执行异常时的函数回调
                layer.msg('服务器异常', {icon: 3,time:2000,anim: 6,shade:0.5});
            }
        });
    }
    //修改房间的入住状态  有打扫（2）----->空闲（0）
    function updRoomStatus(roomid) {
        $.ajax({
            type:"POST",  //请求方式，POST请求
            url:"rooms/updByPrimaryKeySelective",   //访问服务器端的路径
            data:{"id":roomid,"roomStatus":0},
            success:function (data) {  //请求执行正常函数回调
                if(data=='success'){
                    layer.msg('房间已改为空闲状态。。', {icon: 1,time:2000,anim: 4,shade:0.5});
                    loadAllRooms() //重新加载客房信息
                }else {
                    layer.msg('房间改为空闲状态失败！！', {icon: 2,time:2000,anim: 5,shade:0.5});
                }
            },
            error:function () {  //请求执行异常时的函数回调
                layer.msg('服务器异常', {icon: 3,time:2000,anim: 6,shade:0.5});
            }
        });
    }
});