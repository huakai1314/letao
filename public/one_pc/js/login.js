$(function(){
  //先进行表单验证 在验证之后进行发送ajax请求
      //表单校验的功能
        //1. 用户名不能为空
        //2. 用户密码不能为空
        //3. 用户密码的长度是6-12位

        //如何使用表单校验插件：
        //1. 引包
        //2. 调用bootstrapValidator
        //1.表单校验， bootstrapValidator这个插件对表单有要求
       // bootstrapValidator会在表单提交的时候做表单校验,如果校验失败了，阻止表单提交，显示错误信息
       //使用表单校验插件
       //使用表单校验插件
$("form").bootstrapValidator({
    //1. 指定校验时的图标显示，默认是bootstrap风格
    feedbackIcons: {
      valid: 'glyphicon glyphicon-ok',
      invalid: 'glyphicon glyphicon-remove',
      validating: 'glyphicon glyphicon-refresh'
    },
  
    //3. 指定校验字段
    fields: {
      //校验用户名，对应name表单的name属性
      username: {
        validators: {
          //不能为空
          notEmpty: {
            message: '用户名不能为空'
          },
          //长度校验
          stringLength: {
            min: 3,
            max: 6,
            message: '用户名长度必须在3到6之间'
          },
          callback:{
              message: '用户名不存在'
          }
        }
      },
      password:{
        validators:{
              notEmpty:{
                  message:"密码不能为空"
              },
              stringLength:{
                  min:6,
                  max:12,
                  message:"用户密码长度必须是6-12"
              },
              callback:{
                  message:"密码错误"
              }
          }
        }
    }
  });

  //给表单注册点击事件 发送请求
  //在发送请求之前先给表单注册一个校验成功的事件 之后在进行发送请求
  $('form').on("success.form.bv",function(e){
      e.preventDefault(); //阻止浏览器的默认的行为
    //console.log("发送请求")
      $.ajax({
          type:"post",
          url:"/employee/employeeLogin",
          data:$("form").serialize(),
          success:function(info){
            // console.log(info);
            if(info.error ==1000){
              // alert("用户名不存在"); 解决alert 里面错误信息显示问题
              //表单数据更新   INVALID校验失败的
              $("form").data('bootstrapValidator').updateStatus("username", "INVALID", "callback");
            }
            if(info.error == 1001){
             // alert("密码错误");
             $("form").data('bootstrapValidator').updateStatus("password", "INVALID", "callback")
            }
            if(info.success){
                location.href = "index.html"
            }
          }
      })
  })

// 点击重置按钮 将表单里面的信息都进行重置
// 回想一下怎么可以不设置类或id找到重置按钮   可以通过选择器
   $("[type='reset']").on("click",function(){
    //    console.log(111);
    $("form").data('bootstrapValidator').resetForm(true);
   })
//入口函数
})