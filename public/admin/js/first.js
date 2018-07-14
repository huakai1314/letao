$(function(){
    

    // 第一个功能 已加载就进行页面渲染
    // 页面 每一页显示的条数
    var page = 1;
    var pageSize = 5;
    render();
   
    // 第二个分页的功能：在ajax发送请求成功的函数里面

    // 添加分类
    //点击按钮 显示模态框
    $(".btn-add").on('click',function(){
        $("#addModal").modal("show");
    })

    //添加按钮的表单验证
    $('form').bootstrapValidator({
        //配置校验的规则，根据表单中的name属性
        fields:{
          categoryName:{
            validators:{
                notEmpty:{
                    message:"用户名不能为空"
                }
            }
          }
        },
        //配置小图标的规则
        feedbackIcons: {
            valid: 'glyphicon glyphicon-thumbs-up',
            invalid: 'glyphicon glyphicon-thumbs-down',
            validating: 'glyphicon glyphicon-refresh'
        }
    })

    //3.给表单注册校验成功的事件 阻止默认的行为 改用ajax提交
    $('form').on('success.form.bv',function(e){
        //阻止默认事件
        e.preventDefault();
        //console.log("发送ajax请求了");
        // 发送ajax请求
        $.ajax({
            type:"post",
            url:"/category/addTopCategory",
            data:$('form').serialize(),
            success:function(info){
                // console.log(info);
                if(info.success){
                //渲染页面  隐藏模态框
                // 添加成功的时候渲染回到第一页上去
                page = 1;
                render();
                $('#addModal').modal("hide");
                
                //数据添加完了之后 将模态框里面的内容进行重置
                $('form').data("bootstrapValidator").resetForm(true); 
                }
            }
        })
    })



    //页面已加载的时候就发送ajax请求渲染页面
    function render(){
        $.ajax({
            type:'get',
            url:'/category/queryTopCategoryPaging',
            data:{
                page:page,
                pageSize:pageSize
            },
            success:function(info){
            //   console.log(info);
              $('tbody').html( template('tpl' , info) )  
              //分页的功能 首先分页要准备一个ul 然后一个id 是通过id找到ul的
            //因为使用的是版本3 版本3要求上是这样的
              $('#paginator').bootstrapPaginator({
                //需要先指定版本
                bootstrapMajorVersion:3,
                currentPage:page,//当前页
                //总页数 向下取整 条数/个数 向下取整是因为即使那一夜只有一条数据也作为一页显示
                totalPages:Math.ceil(info.total / info.size),
                // 为分页的按钮绑定点击事件  让对应的分页页码和列表的页数等步
                onPageClicked: function(a,b,c,p){
                    // 渲染p对应的页面即可
                    page = p;
                    render();
                }
              })
              
            }
        })
    }
})