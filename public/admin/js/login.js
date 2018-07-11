$(function(){


    //1.表单校验， bootstrapValidator这个插件对表单有要求
    // bootstrapValidator会在表单提交的时候做表单校验,如果校验失败了，阻止表单提交，显示错误信息
    $("form").bootstrapValidator({
      //配置校验的规则，根据表单中的name属性
      fields:{
        //username的校验的规则
        username: {
          //username所有的校验
          validators: {
            //判断输入的用户名不为空
            notEmpty: {
              message: "用户名不能为空"
            },
            //判断字符串的长度
            stringLength: {
              min:3,
              max:6,
              message: "用户名长度必须是3-6位"
            },
             //callback校验没有规则 默认的情况下是不会出现的
            // 所以手动改错的错的时候就让callback显示就可以了
            callback:{
              message:"用户名不存在"
            }
          }
        },
        //password的校验规则
        password: {
          validators: {
            notEmpty: {
              message:"密码不能为空"
            },
            stringLength: {
              min: 6,
              max:12,
              message: "用户密码长度必须是6-12"
            },
            callback:{
              message:"密码错误"
            }
          }
        }
      },
      //因为是在bootstrap基础上的所以可以值直接引用里面的小图标
      //配置小图标的规则
      feedbackIcons: {
        valid: 'glyphicon glyphicon-thumbs-up',
        invalid: 'glyphicon glyphicon-thumbs-down',
        validating: 'glyphicon glyphicon-refresh'
      }
    });
  
  
    //2. 给表单注册一个 校验成功的事件
    $("form").on("success.form.bv", function(e){
      e.preventDefault();//阻止浏览器的默认行为
     //console.log("需要发送ajax请求")
     $.ajax({
        type:"post",
        url:"/employee/employeeLogin",
        data: $("form").serialize(),
        success: function(info){
          //console.log(info);
          //根据参数info 对值进行判断
          if(info.error == 1000){
            //显示 表单在校验的时候使用的是表单校验的插件 在这里错误的信息的展示也用插件里面的方法进行校验
            // updateStatus()对某个字段校验的输出的提示信息 参数一、修改哪个字段 参数二 修改的状态 参数三、校验器的名字(需要显示的提示信息的内容是)
            // NOT-VALIDATED未校验的 VALIDATING校验中的 INVALID校验失败的 VALID校验成功的。
            // $("form").data('bootstrapValidator').updateStatus();
            $("form").data("bootstrapValidator").updateStatus("username","INVALID","callback");

          }
          if(info.error == 1001){
            $("form").data("bootstrapValidator").updateStatus("password","INVALID","callback");
          }
          if(info.success){
            //登录成功的时候进行页面跳转
            location.href = "index.html";
          }
        }
     })

  
    });
  
    //3、点击重置按钮 需要把内容以及样式都清空 需要调用bootstrapValidator提供的方法
    // 找到重置按钮给重置按钮添加点击事件 在点击的时候触发表单的重置事件
    $("[type='reset']").on("click",function(){
      //前面的实例对象调用后面的方法
      // resetForm() 里面的参数是布尔值 传一个true的话就是重置表单里面的内容
      $("form").data('bootstrapValidator').resetForm(true);
    })
  });