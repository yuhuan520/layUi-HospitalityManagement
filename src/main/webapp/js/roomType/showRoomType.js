layui.use(['jquery','layer','laypage','form','element'], function() {
    var $ = layui.jquery,   //jquery
        layer = layui.layer,  //弹出层
        laypage = layui.laypage,  //分页插件
        form = layui.form,  //表单
        element = layui.element;   //面板模块

    var limit = 3;  //每一页显示的数据条数

    var page = 1;   //当前页

    var count = 0;  //总的数据条数

    var delRoomTypeIf = false;  //判断是否删除客房类型的全局变量

    var roomTypeNameIf = false;  //验证客房类型名称的唯一性
    //首次进行数据的初始化
    loadPageRoomType();
    loadLaypage();//初始化房型分页数据

    //完整功能
    function loadLaypage(){
        laypage.render({  //首次不执行
            elem: 'test1'  //分页容器
            ,count: count  //总的数据条数
            //分页展示的内容
            ,layout: ['count', 'prev', 'page', 'next', 'limit', 'refresh', 'skip']
            ,limit:limit  //每一页的数据条数
            ,limits:[2,3,5,8,10,15,20]  //供选则的每一页数据条数
            ,jump: function(obj,first){  //分页时的函数回调
                if(!first){  //首次不执行
                    limit = obj.limit;   //将每一页的数据条数赋值给全局变量的每一页数据条数
                    page = obj.curr;   //将分页的页码赋值给全局变量当前页
                    loadPageRoomType();
                }

            }
        });
    }
    //监听面板折叠
    element.on('collapse(test)', function(data){
        if(data.show){
            //获取房间类型id
            var roomTypeId = $(this).attr("roomTypeId");
            //根据客房类型查询客房数据
            loadRoomsByRoomTypeId(roomTypeId);
        }
    });
    //添加
    $("#saveRoomTypeBtn").click(function () {
        $("form").eq(0).find("input").val("");  //将添加的表单清空
        //弹框显示
        layer.open({
            type: 1,
            title: "房间类型的添加界面",
            area: ['400px', '320px'],
            anim: 3,
            shade: 0.6,
            content: $("#saveRoomTypeDiv"),
        });
        //监听提交添加
        form.on('submit(demo3)', function(data){
            saveRoomType(data.field);
            layer.closeAll();  //关闭所有弹框
            return false;  //阻止表单的action提交
        });
    });

    //自定义表单验证
    form.verify({
        roomTypeName: function (value, item) { //value：表单的值、item：表单的DOM对象
            if (value.length < 3 || value.length > 8) {
                return '客房类型名称必须为3-8位';
            }
            checkroomTypeName(value);  //验证客房类型名称的唯一性
            if(!roomTypeNameIf){
                return '此客房类型名称已被占用';
            }
        },
        roomPrice: function (value, item) { //value：表单的值、item：表单的DOM对象
            if(value<100||value>1000){
                return '房间价格在100-1000之间';
            }
        }
    });
    //完成删除和修改
    $("#collapseDiv").on("click",'button',function () {
        var event = $(this).attr("event");  //获取具体的操作
        var roomType = $(this).val();  //得到类型数据：删除时为id  修改时为对象数据字符串
        if(event==='del'){//删除操作
            //删除之前判断类型是否存在客房数据
            checkRoomsByroomTypeId(roomType);
            if(delRoomTypeIf){
                //询问是否删除
                layer.confirm("真的删除此客房类型吗？",function (index) {
                    //执行删除
                    delRoomTypeById(roomType);
                    layer.close(index);
                })
            }else {
                layer.msg("此类型有客房数据，不能删除！",{icon: 7,time: 2000,anim:6,shade:0.5})
            }
        }else {//修改操作
            //做修改功能
            var arrRoomType = roomType.split(",");
            //数据回显
            //1.弹出之前将基本的入住信息数据回显到退房操作界面
            form.val("updRoomTypeFromFilter", { //formTest 即 class="layui-form" 所在元素属性 lay-filter="" 对应的值
                "id": arrRoomType[0] // "name": "value"
                ,"roomTypeName": arrRoomType[1]
                ,"roomPrice": arrRoomType[2]
            });
            //2.弹框显示
            layer.open({
                type: 1,
                title: "房间类型的修改界面",
                area: ['400px', '320px'],
                anim: 2,
                shade: 0.6,
                content: $("#updRoomTypeDiv"),
            });
            //监听提交修改
            form.on('submit(demo4)', function(data){
                //执行房间类型修改操作
                updRoomType(data.field);
                layer.closeAll();  //关闭所有弹框
                return false;  //阻止表单的action提交
            });
        }
    });
    //加载第1页的房型数据，要得到总的数据条数（重要）
    function loadPageRoomType() {
        $.ajax({
            type:"post",
            url:"roomType/loadPageByPramas",
            async: false,
            data:{"page":page,"limit":limit},
            success:function (data) {
                count = data.count;  //将数据总的条数赋值给全局变量
                var roomTypeStr = '';
                $.each(data.data,function (i,roomType) {
                    roomTypeStr += '<div class="layui-colla-item" style="margin-top: 10px;">';
                    roomTypeStr += '<button type="button" class="layui-btn layui-btn-sm layui-btn-danger" event="del" value="'+roomType.id+'" style="float: right;">删除</button>';
                    roomTypeStr += '<button type="button" class="layui-btn layui-btn-sm layui-btn-warm" event="upd" value="'+roomType.id+','+roomType.roomTypeName+','+roomType.roomPrice+'" style="float: right;">修改</button>';
                    roomTypeStr += '<h2 class="layui-colla-title" roomTypeId="'+roomType.id+'">'+roomType.roomTypeName+'--'+roomType.roomPrice+'元/天'+'</h2>';
                    roomTypeStr += '<div class="layui-colla-content">';
                    roomTypeStr += '<p id="p'+roomType.id+'"></p>';
                    roomTypeStr += '</div>';
                    roomTypeStr += '</div>';
                });
                $("#collapseDiv").html(roomTypeStr);
                //将面板渲染
                element.render('collapse');
            },
            error:function (data) {
                layer.msg("服务器异常",{icon: 3,time: 2000,anim:4,shade:0.5})
            }
        });
    }

    //根据客房类型查询客房数据
    function loadRoomsByRoomTypeId(roomTypeId){
        $.ajax({
            type:"post",
            url:"rooms/loadManyByPramas",
            data:{"roomTypeId":roomTypeId},
            success:function (data) {
                var roomStr = '<ul class="site-doc-icon site-doc-anim">';
                $.each(data,function (i,item) {
                    //添加客房li标签的背景色
                    if(item.roomStatus=='0'){
                        roomStr += '<li style="background-color: #009688;">';
                    }else if(item.roomStatus=='1'){
                        roomStr += '<li style="background-color: red;">';
                    }else {
                        roomStr += '<li style="background-color: blueviolet;">';
                    }
                    roomStr += '<img class="layui-anim" id="demo1" src="'+item.roomPic+'" width="135px" height="135px"/>';
                    roomStr += '<div class="code">';
                    roomStr += '<span style="display: block;color: #0C0C0C;">'+item.roomNum+'-'+item.roomType.roomTypeName+'-'+item.roomType.roomPrice+'元/天</span>';
                    roomStr += '</div>';
                    roomStr += '</li>';
                });
                roomStr += '</ul>';
                //将ul中的客房数据标签填充到对应的p标签中
                $("#p"+roomTypeId).html(roomStr);
            },
            error:function (data) {
                layer.msg("服务器异常",{icon: 3,time: 2000,anim:4,shade:0.5})
            }
        });
    }
    //查询此房屋类型下是否有房间信息
    function checkRoomsByroomTypeId(roomTypeId){
        $.ajax({
            type:"post",
            url:"rooms/getCountByPramas",
            async: false,
            data:{"roomTypeId":roomTypeId},
            success:function (data) {
                if(data>0){  //存在客房，不能删除
                    delRoomTypeIf = false;
                }else {  //不存在客房，可以删除
                    delRoomTypeIf = true;
                }
            },
            error:function (data) {
                layer.msg("服务器异常",{icon: 3,time: 2000,anim:4,shade:0.5})
            }
        });
    }
    //验证客房类型名称的唯一性
    function checkroomTypeName(roomTypeName){
        $.ajax({
            type:"post",
            url:"roomType/getCountByPramas",
            async: false,
            data:{"roomTypeName":roomTypeName},
            success:function (data) {
                if(data>0){  //存在客房类型名称，不能添加
                    roomTypeNameIf = false;
                }else {  //不存在客房类型名称，可以添加
                    roomTypeNameIf = true;
                }
            },
            error:function (data) {
                layer.msg("服务器异常",{icon: 3,time: 2000,anim:4,shade:0.5})
            }
        });
    }
    //根据类型id删除客房类型数据
    function delRoomTypeById(roomTypeId) {
        $.ajax({
            type:"post",
            url:"roomType/delByPrimaryKey",
            data:{"id":roomTypeId},
            success:function (data) {
                if(data=='success'){
                    layer.msg("客房类型删除成功",{icon: 1,time: 2000,anim:4,shade:0.5});
                    loadPageRoomType(); //加载当前页的房型数据
                    loadLaypage(); //加载分页
                }else {
                    layer.msg("客房类型删除失败",{icon: 2,time: 2000,anim:5,shade:0.5})
                }
            },
            error:function (data) {
                layer.msg("服务器异常",{icon: 3,time: 2000,anim:4,shade:0.5})
            }
        });
    }
    //添加房间类型
    function saveRoomType(saveJsonRoomType) {
        $.ajax({
            type:"post",
            url:"roomType/save",
            data:saveJsonRoomType,
            success:function (data) {
                if(data=='success'){
                    layer.msg("客房类型添加成功",{icon: 1,time: 2000,anim:4,shade:0.5})
                    page = 1;//将当前页重新为1
                    loadPageRoomType(); //加载第1页的房型数据
                    loadLaypage(); //加载分页
                }else {
                    layer.msg("客房类型添加失败",{icon: 2,time: 2000,anim:5,shade:0.5})
                }
            },
            error:function (data) {
                layer.msg("服务器异常",{icon: 3,time: 2000,anim:4,shade:0.5})
            }
        });
    }

    //修改
    function updRoomType(updJsonRoomType) {
        $.ajax({
            type:"post",
            url:"roomType/updByPrimaryKeySelective",
            data:updJsonRoomType,
            success:function (data) {
                if(data=='success'){
                    layer.msg("客房类型修改成功",{icon: 1,time: 2000,anim:4,shade:0.5})
                    loadPageRoomType() //加载当前页的房型数据，因为数据总的条数没有变化，则不需要重新加载分页
                }else {
                    layer.msg("客房类型修改失败",{icon: 2,time: 2000,anim:5,shade:0.5})
                }
            },
            error:function (data) {
                layer.msg("服务器异常",{icon: 3,time: 2000,anim:4,shade:0.5})
            }
        });
    }
});