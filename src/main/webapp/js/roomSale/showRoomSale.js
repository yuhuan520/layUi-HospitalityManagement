layui.use(['jquery','layer','table','form','laydate'], function() {
    var $ = layui.jquery,   //jquery
        layer = layui.layer,  //弹出层
        table = layui.table,  //数据表格
        form = layui.form,  //表单
        laydate = layui.laydate;   //日期


    var queryJsonRoomSale = {};

    //初始化容器
    loadRoomSale();
    //日期时间范围
    laydate.render({
        elem: '#test3'  //日期容器id
        ,type: 'datetime'  //日期的格式类型
        ,format:'yyyy/MM/dd HH:mm:ss'
        ,range: true  //开启范围选择
    });

    //订单信息的方法级渲染
    function loadRoomSale() {
        table.render({
            elem: '#demo' //数据存放的容器，为table标签，其id="demo"
            , height: 412  //容器高度
            , url: 'roomSale/loadPageByPramas' //数据接口或者访问服务器端的数据路径
            , limit: 3   //自定义每一页的数据条数
            ,where:queryJsonRoomSale
            , limits: [2, 3, 5, 8, 10]
            , even: true  //逐行背景色深浅不一
            , page: true //开启分页
            , cols: [[ //表头  field: 'id'表示从实体对象的属性中取到数据放入容器里
                {type: 'checkbox'}
                , {field: 'id', title: 'ID', align: 'center', width: 80, sort: true}
                , {field: 'roomNum', title: '房间编号', align: 'center', width: 120, sort: true}
                , {field: 'customerName', title: '客人姓名', width: 140, align: 'center', sort: true}
                , {field: 'startDate', title: '入住时间', width: 220, align: 'center'}
                , {field: 'endDate', title: '退房时间', width: 220, align: 'center', sort: true}
                , {field: 'roomPrice', title: '单价', width: 120, align: 'center'}
                , {field: 'days', title: '天数', width: 100, align: 'center', sort: true}
                , {field: 'rentPrice', title: '住宿金额', width: 140, align: 'center', sort: true}
                , {field: 'otherPrice', title: '其他消费', width: 140, align: 'center', sort: true}
                , {field: 'salePrice', title: '支付金额', width: 140, align: 'center', sort: true}
                , {field: 'discountPrice', title: '优惠金额', width: 140, align: 'center', sort: true}
                , {fixed: 'right', title: '操作', width: 120, align: 'center', toolbar: '#barDemo'}
            ]],
            done: function (res, curr, count) {  //执行每一次分页加载时数据渲染完后的函数回调

            }
        });
    }
    //监听消费记录的form表单
    form.on('submit(demo1)', function(data){
        //构建查询的订单条件参数对象
        queryJsonRoomSale = {};
        queryJsonRoomSale['roomNum'] = data.field.roomNum;
        if(data.field.queryTimes!=''){
            var arrTime = data.field.queryTimes.split(" - ");
            queryJsonRoomSale['beginDate'] = arrTime[0];
            queryJsonRoomSale['outDate'] = arrTime[1];
        }
        //执行条件查询
        loadRoomSale();
        return false;  //阻止表单进行action提交
    });
});