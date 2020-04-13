layui.use(['jquery','layer','table','form','laydate'], function() {
    var $ = layui.jquery,   //jquery
        layer = layui.layer,  //弹出层
        table = layui.table,  //数据表格
        form = layui.form,  //表单
        laydate = layui.laydate;   //日期

    var queryJsonOrders = {};

    //初始化容器
    loadOrders();

    //日期时间范围
    laydate.render({
        elem: '#test3'  //日期容器id
        ,type: 'datetime'  //日期的格式类型
        ,format:'yyyy/MM/dd HH:mm:ss'
        ,range: true  //开启范围选择
    });

    //订单信息的方法级渲染
    function loadOrders() {
        table.render({
            elem: '#demo' //数据存放的容器，为table标签，其id="demo"
            , height: 412  //容器高度
            , url: 'orders/loadPageByPramas' //数据接口或者访问服务器端的数据路径
            , limit: 3   //自定义每一页的数据条数
            , limits: [2, 3, 5, 8, 10]
            ,where: queryJsonOrders
            , even: true  //逐行背景色深浅不一
            , page: true //开启分页
            , cols: [[ //表头  field: 'id'表示从实体对象的属性中取到数据放入容器里
                {type: 'checkbox'}
                , {field: 'id', title: 'ID', align: 'center', width: 80, sort: true}
                , {field: 'orderNum', title: '订单编号', align: 'center', width: 240, sort: true}
                , {
                    field: 'roomPic',
                    title: '客人名称',
                    width: 120,
                    align: 'center',
                    sort: true,
                    templet: '<div>{{d.inRoomInfo.customerName}}</div>'
                }
                , {
                    field: 'roomTypeName',
                    title: '身份证号',
                    width: 220,
                    align: 'center',
                    templet: '<div>{{d.inRoomInfo.idcard}}</div>'
                }
                , {field: 'roomPrice', title: 'vip', width: 80, align: 'center', sort: true, templet: '#isVipTpl'}
                , {
                    field: 'customerName',
                    title: '手机号',
                    width: 180,
                    align: 'center',
                    templet: '<div>{{d.inRoomInfo.phone}}</div>'
                }
                , {field: 'createDate', title: '下单时间', width: 220, align: 'center', sort: true}
                , {field: 'orderMoney', title: '总价', width: 120, align: 'center', sort: true}
                , {field: 'remark', title: '备注', width: 250, align: 'center', sort: true}
                , {
                    field: 'orderStatus',
                    title: '状态',
                    width: 120,
                    align: 'center',
                    sort: true,
                    templet: '#orderStatusTpl'
                }
                , {fixed: 'right', title: '操作', width: 120, align: 'center', toolbar: '#barDemo'}
            ]],
            done: function (res, curr, count) {  //执行每一次分页加载时数据渲染完后的函数回调
                //如果是直接赋值的方式，res即为：{data: [], count: 99} data为当前页数据、count为数据总长度
                //   console.log(res);  //就是控制器所响应回的Map集合中的数据，此时数据格式为JOSN
                //得到当前页码
                //    console.log(curr);
                //得到数据总量
                //    console.log(count);
            }
        });
    }
    //监听订单查询的form表单
    form.on('submit(demo1)', function(data){
        //构建查询的订单条件参数对象
        queryJsonOrders = {}; //每一次进到条件拼接前清空以前条件
        queryJsonOrders['orderNum'] = data.field.orderNum;
        queryJsonOrders['orderStatus'] = data.field.orderStatus;
        if(data.field.queryTimes!=''){
            var arrTime = data.field.queryTimes.split(" - ");
            queryJsonOrders['beginDate'] = arrTime[0];
            queryJsonOrders['endDate'] = arrTime[1];
        }
        //执行条件查询
        loadOrders();
        return false;  //阻止表单进行action提交
    });
    //刷新数据表格
    function flush(queryJsonOrders) {
        table.reload('demo', {
           // where: queryJsonOrders//设定异步数据接口的额外参数
            page: {
                curr: 1 //重新从第 1 页开始
            }
        });
    }
    //数据表格的工具条监听
    table.on('tool(test)', function(obj){
        var data = obj.data; //获得当前行数据
        var layEvent = obj.event; //获得 lay-event 对应的值（也可以是表头的 event 参数对应的值）

        if(layEvent === 'del'){  //删除
            layer.confirm('真的删除此订单么', function(index){
                //向服务端发送删除（修改订单信息状态）指令
                updFlag(obj);
                layer.close(index);
            });
        }else {   //支付  //提供订单编号，支付金额
            layer.confirm('确定要支付此订单么？', function (index) {
                //由系统另外开启一个浏览器对话框
                window.open('orders/toPay?orderNum='+data.orderNum+'&orderMoney='+data.orderMoney);
                layer.close(index);
            });
        }
    });
    //批量删除
    $("#batchBtn").click(function () {
        var checkStatus = table.checkStatus('demo'); //idTest 即为基础参数 id 对应的值
        var data = checkStatus.data; //获取选中行的数据
        //1.首判断是否有选中行数据
        if(data.length!=0){
            //2.验证选中的数据中有没有未支付的
            var delBatchIf = true;  //判断是否批量删除数据 是
            var ids = '';
            //通过循环找到每一个选中的数据的支付状态，只要有一个未支付，提示不能批量删除，结束循环
            for (var i=0;i<data.length;i++){
                if(data[i].orderStatus=='0'){
                    delBatchIf = false;  //判断是否批量删除数据 否
                    break; //结束循环
                }else {
                    ids += data[i].id + ",";
                }
            }
            if(delBatchIf){  //true（没有未支付） 可以批量删除
                layer.confirm('真的删除选中的订单么？', function(index){
                    ids = ids.substring(0,ids.length-1);  //34,28,32字符串
                    //批量修改订单的显示状态
                    updBatchFlag(ids);
                    layer.close(index);  //关闭询问框
                });
            }else {//false（有未支付） 不可以批量删除
                layer.msg('你选中要删除的订单有未支付的！！', {icon: 2,time:2000,anim: 6,shade:0.5});
            }
        }else {
            layer.msg('你还未选中要删除的订单！！', {icon: 3,time:2000,anim: 6,shade:0.5});
        }
    });
    //单个删除,及修改flag值为0
    function updFlag(obj) {
        $.ajax({
            type:"POST",  //请求方式，POST请求
            url:"orders/updByPrimaryKeySelective",   //访问服务器端的路径
            data:{"id":obj.data.id,"flag":0},  //传到服务器端参数JSON格式数据
            success:function (data) {  //请求执行正常函数回调
                if(data==='success'){  //模拟数据库删除操作成功
                    layer.msg('订单信息删除成功。。', {icon: 1,time:2000,anim: 4,shade:0.5});
                    obj.del(); //删除对应行（tr）的DOM结构，并更新缓存
                }else {
                    layer.msg('订单信息删除失败！！', {icon: 2,time:2000,anim: 3,shade:0.5});
                }
            },
            error:function () {  //请求执行异常时的函数回调
                layer.msg('服务器异常', {icon: 3,time:2000,anim: 6,shade:0.5});
            }
        });
    }
    //批量修改订单的显示状态
    function updBatchFlag(ids) {
        $.ajax({
            type:"POST",  //请求方式，POST请求
            url:"orders/updBatchByPrimaryKeySelective",   //访问服务器端的路径
            data:{"ids":ids,"flag":0},  //传到服务器端参数JSON格式数据
            success:function (data) {  //请求执行正常函数回调
                if(data==='success'){  //模拟数据库删除操作成功
                    layer.msg('订单数据批量删除成功。。', {icon: 1,time:2000,anim: 4,shade:0.5});
                    flush();  //刷新订单数据，全查询，从第1页开始
                }else {
                    layer.msg('订单数据批量删除失败！！', {icon: 2,time:2000,anim: 3,shade:0.5});
                }
            },
            error:function () {  //请求执行异常时的函数回调
                layer.msg('服务器异常', {icon: 3,time:2000,anim: 6,shade:0.5});
            }
        });
    }
});