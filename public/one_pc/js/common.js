$(function(){
   
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