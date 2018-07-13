$(function(){
    //页面一加载的时候就进行发送ajax请求 渲染页面

    var page = 1;//每一页
    var pageSize = 5;//每一页的条数
    render();
    
    // 获取id
    var id;
    // 获取isDelete
    var isDelete;
    // 点击按钮显示模态框
    $("tbody").on("click",".btn-sm",function(){
        //让模态框显示
        $("#userModal").modal('show');
        id = $(this).parent().data("id");
        // console.log(id);
        // 判断当前的点击的按钮的类名是否是btn-success 是就是1 不是就是0 也就是说1就是启用 0就是禁用
        isDelete = $(this).hasClass("btn-success") ? 1 : 0;
        // console.log(isDelete)
        
    });
    // 禁用模态框的确定按钮操作 btn_confirm
    $(".btn_confirm").click(function(){
        //发送ajax请求
        $.ajax({
            type:"post",
            url:"/user/updateUser",
            data:{
               id:id,
               isDelete:isDelete
            },
            success:function(info){
                // console.log(info);
                if(info.success){
                    //成功的时候就进行渲染页面 隐藏模态框
                    $("#userModal").modal('hide');
                    // 重新进行渲染页面
                    render();
                }
            }
        })
    });
    



    //动态渲染分装部分
    function render(){
        $.ajax({
            type:"get",
            url:"/user/queryUser",
            data:{
               page:page,
               pageSize:pageSize
            },
            success:function(info){
             console.log(info);
             //进行模板渲染调用数据 
             $('tbody').html(template("tpl", info));
     
             // 页面进行渲染了到了分页部分了
             // 分页插件方法的调用
             $("#paginator").bootstrapPaginator({
                 bootstrapMajorVersion: 3, //指定bootstrap的版本
                 size:'small',//设置分页控件的大小
                 currentPage: page, //设置当前页
                 totalPages:Math.ceil(info.total / info.size),//设置总页数,需要计算
                 onPageClicked:function(a,b,c,pages){
                     //修改当前页
                     page = pages;
                     render();
                 }
             })
            }
          })
     }
})