$(function(){
    //页面一加载的时候就进行发送ajax请求 渲染页面

    var page = 1;//每一页
    var pageSize = 5;//每一页的条数
    render();
    
    // 获取id  当前元素的id
    var id;
    // 获取isDelete 获取当前元素的状态
    var isDelete;
    // 点击按钮显示模态框 利用事件委托给动态的元素添加一个点击事件
    $("tbody").on("click",".btn-sm",function(){
        //让模态框显示
        $("#userModal").modal('show');
        //获取当前点击的按钮的id 方式：通过给td父元素添加自定义属性data-id={{v.id}} 获取
        // 获取自定义属性的id
        id = $(this).parent().data("id");
        // console.log(id);
        //根据渲染时候的判断 判断当前的点击的按钮的类名是否是btn-success 
        // 是就是1 不是就是0 也就是说1就是启用 0就是禁用 状态和当前的相反
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
                // 总条数 / 每页显示的合数 就是总页数 向上取整是因为即使最后有一页只有一条数据也当做一页内容进行显示
                 //添加点击事件 将页面的页数和分页的页码相结合起来
                 onPageClicked:function(a,b,c,pages){
                     //修改当前页
                     page = pages;
                    //进行页面渲染
                     render();
                 }
             })
            }
          })
     }
})