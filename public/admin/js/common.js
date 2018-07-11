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

$(document).ajaxStart(function(){
    NProgress.done();
})