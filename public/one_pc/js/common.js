$(function(){
   //进度条 在每一个页面都存在只要存在ajax请求 主要在发送ajax请求的时候就会出现进度条
   //引入了nprogress.js文件后，就有了一个全局对象NProgress对象
    //开启进度条
    // NProgress.start();
    //关闭进度条
    // NProgress.done();  
    // 在发送ajax之前开启  在发送ajax之后关闭
    // 注意：ajax发送请求相当于整个页面是相对于文档而言的
    $(document).ajaxStart(function(){
        NProgress.start();
    })
    $(document).ajaxStop(function(){
        setTimeout(function(){
            NProgress.done();
        },1000);
    })



    //二级菜单效果 点击 用户管理员的时候 二级菜单显示 再点击的时候就收上去
    $('.second').prev().on('click',function(){
        // console.log(111);
        // console.log(this)
        // console.log($(this).next())
        $(this).next().slideToggle();
    })

    //左侧影藏
    // 点击右边的最左边的小图标实现左侧栏向左收
    $('.icon_menu').on("click",function(){
        // console.log(111);
        $('body').toggleClass('active');
        $('.comm_lt').toggleClass("active");
    })


    //退出登录
    $('.icon_logout').on("click",function(){
        // console.log(111);
        $('#myModal').modal('show');
    })
    //点击确定的时候发送ajax请求 告诉服务器我要退出登录
    $('#logout').click(function(){
        // console.log(111);
        $.ajax({
            type:"get",
            url:"/employee/employeeLogout",
            success:function(info){
              location.href = "login.html";
            }
        })
    })
})