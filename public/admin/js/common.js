//引入了nprogress.js文件后，就有了一个全局对象NProgress对象
//开启进度条
// NProgress.start();
//关闭进度条
// NProgress.done();

//进度条出现的时候： 在ajax发送请求之前    ajax发送请求之后
// 所以在ajax 发送之前调用 NProgress.start();  在ajax发生之后 调用 NProgress.done();
// $.ajax 的事件 和 ajax的回调函数：error
/* 
ajax有6个全局事件
  ajaxStart()  ajax请求开始的时候触发
  ajaxSend()   ajax发送的时候触发
  ajaxSuceess() 成功的时候触发
  ajaxError()   失败的时候触发
  ajaxComplete() 完成的时候触发
  ajaxStop()  结束的时候触发
*/
// ajax 发送请求是对于整个页面的所以是需要给document的注册事件
$(document).ajaxStart(function(){
    NProgress.start();
})

$(document).ajaxStop(function(){
    NProgress.done();
})


//二级菜单的显示与隐藏
//点击a连接 让二级菜单显示与隐藏
$('.second').prev().click(function(){
    // $(.second).next().toggle(); 会同时触发所有含有.second 类名的样式 后期添加代码的时候不能复用
    $(this).next().slideToggle();
})

//左侧边的显示与隐藏
// 给左边的小图标 添加类注册点击事件
$('.icon_menu').on('click',function(){
    $('.lt_aside').toggleClass('active');
    $('body').toggleClass('active');
})

// 退出的功能
// $('.glyphicon-log-out').click(function(){
//     console.log(111);
// })

$('.icon_logout').on('click',function(){
    $("#logoutModal").modal('show');
})

// 给模态框的确定按钮注册一个点击事件 退出登录
$('.btn_logout').on('click',function(){
    //先发送ajax请求 告诉服务器我要对出登录 
    //服务器给你响应并且告诉你响应成功了 再跳转到login页面
   $.ajax({
       type:"get",
       url:"/employee/employeeLogout",
    //此时的提交时没有参数的
    success:function(info){
        // console.log(info.success)
        //如果执行成功就条状到index.html页面
        if(info.success){
            location.href = "index.html"
        }

    }
   })
// //此时的提交时没有参数的 所以请求也可以这么的去写
//    $.get('/employee/employeeLogout',function(info){
//        console.log(info);
//    })

})