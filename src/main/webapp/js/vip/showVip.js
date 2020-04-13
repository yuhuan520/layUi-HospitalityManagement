layui.use(['jquery','layer','table','form','laydate'], function() {
    var $ = layui.jquery,   //jquery
        layer = layui.layer,  //弹出层
        table = layui.table,  //数据表格
        form = layui.form,  //表单
        laydate = layui.laydate;   //日期

    var queryJsonVip = {};

    var phoneIf = true;

    //初始化容器
    loadVip();

    function loadVip() {
        table.render({
            elem: '#demo' //数据存放的容器，为table标签，其id="demo"
            ,height: 412  //容器高度
            ,url: 'vip/loadPageByPramas' //数据接口或者访问服务器端的数据路径
            ,limit:3   //自定义每一页的数据条数
            ,limits:[2,3,5,8,10]
            ,where:queryJsonVip  //将条件加到此处
            ,even:true  //逐行背景色深浅不一
            ,page: true //开启分页
            ,cols: [[ //表头  field: 'id'表示从实体对象的属性中取到数据放入容器里
                {type:'checkbox'}
                ,{field: 'id', title: 'ID', align:'center', width:120, sort: true}
                ,{field: 'vipNum', title: '会员卡号', align:'center',width:220, sort: true}
                //edit: 'text'为可以直接单击编辑此列中的单元格
                ,{field: 'customerName', title: '客人姓名', width:180, align:'center',sort: true,edit: 'text'}
                ,{field: 'vipRate', title: '会员类型', width:240,align:'center',templet:'#vipRateTpl'}
                ,{field: 'gender', title: '性别', width: 140,align:'center',sort: true,templet:'#genderTpl'}
                ,{field: 'idcard', title: '身份证号', width: 240,align:'center'}
                ,{field: 'phone', title: '手机号', width: 180, align:'center',sort: true}
                ,{field: 'createDate', title: '创建时间', width: 240, align:'center',sort: true}
                ,{fixed: 'right',title: '操作', width:180, align:'center', toolbar: '#barDemo'}
            ]],
            done:function (res, curr, count) {  //执行每一次分页加载时数据渲染完后的函数回调

            }
        });
    }

    //监听消费记录的form表单
    form.on('submit(demo1)', function(data){
        queryJsonVip = data.field;  //每一次进来拼接条件时清空以前条件
        //执行条件查询
        loadVip();
        return false;  //阻止表单进行action提交
    });

    //监听工具条
    table.on('tool(test)', function(obj) { //注：tool 是工具条事件名，test 是 table 原始容器的属性 lay-filter="对应的值"
        var data = obj.data; //获得当前行数据
        var layEvent = obj.event; //获得 lay-event 对应的值（也可以是表头的 event 参数对应的值）
        var tr = obj.tr; //获得当前行 tr 的 DOM 对象（如果有的话）
        if (layEvent === 'query') { //查看
            layer.msg("点击了查看id:" + data.id + "的会员信息");
        } else if (layEvent === 'upd') { //修改
            //回显手机号和会员类型
            $("#vip_id").val(data.id);
            $("#phone").val(data.phone);
            var vipRateStr="";
            if(data.vipRate==0.9){
                vipRateStr="<option value='0.9' selected>普通会员</option><option value='0.8'>超级会员</option>"
            }else {
                vipRateStr="<option value='0.8' selected>超级会员</option><option value='0.9'>普通会员</option>"
            }
            $("#vipRate").html(vipRateStr);
            form.render("select");//下拉框渲染
            //2.弹出修改界面
            layer.open({
                type: 1,  //弹框类型
                title: "修改会员信息界面", //弹框标题
                area: ['400px', '300px'],  //弹框的宽高度
                anim: 4,  //弹框弹出时的动画效果
                shade: 0.5,  //背景的透明度
                content: $("#updVipDiv")  //弹出的内容
            });
            //开始修改
            //监听订单查询的form表单
            form.on('submit(demo3)', function(data){
                if(phoneIf){
                    //执行修改
                    updVip(data.field,obj);
                    layer.closeAll();  //关闭弹框
                }else {
                    layer.msg('手机号有误！！', {icon: 2,time:2000,anim: 6,shade:0.5});
                }
                //执行ajax修改
                return false;  //阻止表单进行action提交
            });
        }
    });
    //验证手机号格式与是否已经被使用
    $("#phone").change(function () {
         var phone=$(this).val();
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
    });
    //修改会员的姓名
    table.on('edit(test)', function(obj){ //注：edit是固定事件名，test是table原始容器的属性 lay-filter="对应的值"
        var updJsonVip = {};
        updJsonVip['id'] = obj.data.id; //被修改的数据id
        updJsonVip[obj.field] = obj.value;//修改后的数据
        //执行修改
        updVip(updJsonVip,"customerName");
    });
    /*修改操作自定义函数*/
    function updVip(updJsonVip,obj){
        $.ajax({
            type:"POST",  //请求方式，POST请求
            url:"vip/updByPrimaryKeySelective",   //访问服务器端的路径
            async:false,  //允许ajax外部的变量获得去数据
            data:updJsonVip,  //传到服务器端参数JSON格式数据
            success:function (data) {  //请求执行正常函数回调
                if(data==="success"){
                    layer.msg('会员数据修改成功。。', {icon: 1,time:2000,anim: 4,shade:0.5});
                    if(obj!='customerName'){  //不修改会员姓名
                        //同步更新缓存对应的值
                        obj.update({
                            vipRate: updJsonVip.vipRate
                            ,phone: updJsonVip.phone
                        });
                    }
                }else {
                    layer.msg('会员数据修改失败！！', {icon: 2,time:2000,anim: 5,shade:0.5});
                }
            },
            error:function () {  //请求执行异常时的函数回调
                layer.msg('服务器异常', {icon: 3,time:2000,anim: 6,shade:0.5});
            }
        });
    }
});