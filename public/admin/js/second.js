$(function(){
    
    //1.页面渲染
    //在页面已加载的时候就进行页面渲染
    // 页数
    var page = 1;
    // 条数
    var pageSize = 5;
    render();
   
    //2.分页的部分

    //3、点击添加分类显示添加分类模态框
    $(".btn_add").on("click",function(){
        //显示模态框
        $('#addModal').modal('show');
        //在点击的时候就发送请求获取数据渲染下拉框的内容 在之后的地方发送请求获取内容都将来不及渲染数据
        $.ajax({
            type:"get",
            url:"/category/queryTopCategoryPaging",
            data:{
                page:1,
                // 默认设置显示的条数
                pageSize:100
            },
            success:function(info){
                console.log(info);
                //进行渲染下拉框里面的内容
              $('.dropdown-menu').html( template("ptl2" , info));
            }
        })
    })
    
    //因为不是一个下拉框所以在点击下拉的内容是不能被选中到框里面显示的处理方法如下：
    // 给所有li注册点击事件 又因为li动态渲染了 所以利用事件委托了给ul
    // 委托给li 还是 a 给谁更方便拿到数据就给给谁 
    $(".dropdown-menu").on("click",'a',function(){
        //获取当前a的文本的内容
        //console.log($(this).text());
        //将当前a的文本显示在给上面的框里面 dropdown-text
        $('.dropdown-text').text($(this).text());

        // 获取自定义属性里面的id
        var id = $(this).data('id');
        //将获取到的一级分类id 作为val值传入隐藏域里面
        $("[name = 'categoryId']").val(id);
        //表单校验的时候 手动修改categoryId的校验状态，通过
        $("form").data("bootstrapValidator").updateStatus("categoryId","VALID");
    })
    
     
    //上传图片的过程 选择图片--发送ajax请求到后台---后台将图片保存起来---将图片的地址返回出来--渲染图片到页面上
    // 是根据后台的接口的文档而定的
    // 图片上传的步骤：1 引包 2 给input:file 指定name属性data-url属性 属性值在接口文档中
    // 3 调用fileupload 的方法
    $('#fileupload').fileupload({
        // data是一个回调函数 当图片上传成功后data就会执行
        done:function(e , data){
            //console.log(data.result);//得到就是后台返回回来的图片的地址
            //获取到图片的地址
            //1.显示图片  将图片的的地址给改成从后台获取到的地址
            $(".img_box img").attr("src", data.result.picAddr);
            //2. 把图片地址设置给隐藏的表单，才能发送到后台 brandLogo
            $("[name='brandLogo']").val(data.result.picAddr);
            //手动 让brandLogo校验通过
            $("form").data("bootstrapValidator").updateStatus("brandLogo","VALID");
        }
    })
   

    // 表单校验
    $("form").bootstrapValidator({
        fields: {
          categoryId: {
            validators: {
              notEmpty: {
                message: '请选择一级分类'
              }
            }
          },
          brandName: {
            validators: {
              notEmpty: {
                message: '二级分类的名字不能为空'
              }
            }
          },
          brandLogo: {
            validators: {
              notEmpty: {
                message: '请上传一张品牌的图片'
              }
            }
          }
    
        },
        //配置不做校验的类型
        excluded: [],
        //配置小图标的规则
        feedbackIcons: {
          valid: 'glyphicon glyphicon-thumbs-up',
          invalid: 'glyphicon glyphicon-thumbs-down',
          validating: 'glyphicon glyphicon-refresh'
        }
      });
  
    //给表单注册校验成功的时候的事件
    $("form").on("success.form.bv",function(e){
        //阻止默认事件
        e.preventDefault();
        //发送ajax请求
        $.ajax({
            type:"post",
            url:"/category/addSecondCategory",
            data:$("form").serialize(),
            success:function(info){
                console.log(info);
               if(info.success){
                   $("#addModal").modal('hide');
                   page=1;
                   render();
                //添加成功之后 进行重置表单
                $("form").data("bootstrapValidator").resetForm(true);
                //下拉框的重置需要自己设置回最初的默认的值
                $(".dropdown-text").text("请选择一级分类");
                // 图片将该为最初没有图片显示的默认的哪一张图片
                $(".img_box img").attr("src","images/none.png");
               }
            }
        })
    })

    //页面渲染的分装
    function render(){
        $.ajax({
            type:'get',
            url:"/category/querySecondCategoryPaging",
            data:{
                page:page,
                pageSize:pageSize
            },
            success:function(info){
                // console.log(info);
              //进行动态渲染
              $('tbody').html( template("tpl" , info));
             //调用分页插件的方法进行 分页操作
              $('#pagintor').bootstrapPaginator({
                  //版本是多少 使用版本3
                  bootstrapMajorVersion:3,
                  //当前页数
                  currentPage:page,
                  //totalPages 总页数 向下取整 即使最后一页之后一条数据也作为一页显示
                //z总条数 / 每页个数
                  totalPages: Math.ceil(info.total / info.size),
                  //给按钮添加点击事件(分页)  将页面的页面数和分页码的数据进行一一对应
                  onPageClicked:function(a,b,c,p){
                     page = p;
                     //渲染页面
                     render();
                  }
              });
            }
        });
    }
});