$(function () {

    // 定义全局变量 page 当前页  pageSize 每一页显示的条数
    var page = 1;
    var pageSize = 5;

    //用来储存上传的图片的
    var imgs = [];
    //为了渲染页面方便将渲染封装成函数
    //页面一加载的时候就进行渲染页面
    // 1. 渲染页面
    render();

    // 2、显示分页 在渲染页面成功的时候
    
    //3. 点击添加按钮显示模态框
    $('.add_product').on("click",function(){
        //显示添加商品的模态框
        $("#addModal").modal("show");
        //动态的渲染更新请输入二级分类的下拉的信息
        $.ajax({
            type:"get",
            url:"/category/querySecondCategoryPaging",
            data:{
                page:1,
                pageSize:100
            },
            success:function(info){
                console.log(info);
               //动态渲染数据和模板结合
               $(".dropdown-menu").html( template("tpl1",info) )
            }
        })
    })

    // 给每一个a 注册点击事件 将当前选中的a的文本显示在它上面框中
    // a是动态渲染的数据 使用事件委托将点击事件注册给 ul
    $(".dropdown-menu").on("click","a",function(){
        // console.log(111);
        //获取到a的文本内容显示在请选择上面
        // console.log($(this).text())
        $('.dropdown-text').text($(this).text())
        // console.log($(this).data("id"));
        $("[type='brandId']").val($(this).data("id")); 
        //手动的让brandId 校验成功
        $('form').data("bootstrapValidator").updateStatus("brandId","VALID");
    })


    // 图片上传的功能
    $("#fileupload").fileupload({
        // dataType:"json",
        //e：事件对象
        //data：图片上传后的对象，通过e.result.picAddr可以获取上传后的图片地址
        done:function (e, data) {
            if(imgs.length == 3){
                return;
            }
            // 得到图片名和图片的地址
            // {picName: "bebdca20-872c-11e8-86c4-75d3298d86ff.jpg", picAddr: "/upload/product/bebdca20-872c-11e8-86c4-75d3298d86ff.jpg"}
            console.log(data.result);
            //把图片上传到的结果存放到数组
            //好处1： 确定已经上传了几张图片
            //好处2： 添加商品的时候，通过$(form).serialize() 可以获取到8个参数
            imgs.push(data.result);
            //img的内容是通过动态添加上去的
            $('.img_box').append('<img src="'+data.result.picAddr+'" width="100" heigth="100" alt="">');
            //手动的改变brandLogo 的状态 然后间接的改变图片的状态
            //必须满足条件  手动更新状态
            if(imgs.length === 3){
                //当图片的上传的个数为3 的时候就让brandLogo的状态通过 反则不通过
                $('form').data("bootstrapValidator").updateStatus("brandLogo","VALID");
            }else{
                $('form').data("bootstrapValidator").updateStatus("brandLogo","VALID")
            }
            
        }
    });

    

    //表单校验功能
    $("form").bootstrapValidator({
        //配置小图标的规则
        feedbackIcons: {
            valid: 'glyphicon glyphicon-thumbs-up',
            invalid: 'glyphicon glyphicon-thumbs-down',
            validating: 'glyphicon glyphicon-refresh'
        },
        // 让所有的都进行校验 比如隐藏的
        excluded:[],
        fields:{
          brandId:{
              validators:{
                  notEmpty:{
                      message:"请选择二级分类"
                  }
              }
          },
          proName:{
            validators:{
                notEmpty:{
                    message:"请输入商品的名称"
                }
            }
          },
          proDesc:{
              validators:{
                  notEmpty:{
                      message:"请输入商品的库存"
                  }
              }
          },
          num:{
              validators:{
                  notEmpty:{
                      message:"请输入商品的库存"
                  },
                  regexp:{
                    //正则校验
                    regexp:/^[1-9]\d{0,4}$/,
                    message:'请输入正确的库存(1-99999)'
                  } 
              }
          },
          size:{
             validators:{
                // 数量 大于0 99999 1-5 [1-9]4为数  1  111
                 notEmpty:{
                     message:"请输入商品的尺码"
                 },
                //  正则校验 xx-xx
                regexp:{
                    regexp:/^\d{2}-\d{2}$/,
                    message:"请输入正确的尺码(xx-xx)"
                }
             }
          },
          oldPrice:{
              validators:{
                 notEmpty:{
                     message:"请输入商品的原价"
                 }
              }
          },
          price:{
              validators:{
                  notEmpty:{
                      message:"请输入商品的价格"
                  }
              }
          },
          brandLogo:{
              validators:{
                  notEmpty:{
                      message:"请输入三种图片"
                  }
              }
          }
        }
    });

    //添加商品  给表单注册校验成功的事件
    $('form').on('success.form.bv',function(e){
        //阻止事件的默认的行为
        e.preventDefault();
        // 参数拼接  8 个参数 拼接上三张图片各自的名字和地址
        //通过表单序列化先获取到8个参数
        var param = $('form').serialize();
        param += "&picName1="+ imgs[0].picName + "&picAddr1="+ imgs[0].picAddr; 
        param += "&picName2="+ imgs[1].picName + "&picAddr2="+ imgs[1].picAddr; 
        param += "&picName3="+ imgs[2].picName + "&picAddr3="+ imgs[2].picAddr; 
        $.ajax({
            type:"post",
            url:"/product/addProduct",
            data:param,
            success:function(info){
                console.log(info);
                if(info.success){
                    //页面渲染到第一页
                    page=1;
                    render();
                    //模态框消失
                    $('#addModal').modal('hide');
                    //表单内容进行重置
                    $('form').data("bootstrapValidator").resetForm(true);
                    //手动重置第一个和最后一个图片的重置
                    $('.dropdown-text').text("请选择二级分类");
                    $('.img_box img').remove();
                }
            }
        })
    })


















    //1、渲染页面
    function render() {
        //发生ajax请求
        $.ajax({
            type: "get",
            url: "/product/queryProductDetailList",
            data: {
                page: page,
                pageSize: pageSize
            },
            success: function (info) {
                console.log(info.total);
                //进行数据模板结合渲染
                $('tbody').html(template("tpl", info));
                //分页的功能
                $("#paginator").bootstrapPaginator({
                    //指定版本号 必须的
                    bootstrapMajorVersion: 3,
                    //当前页
                    currentPage: page,
                    // 总页数 记得页数需要向下取整  总的条数 / 每个的个数
                    totalPages: Math.ceil(info.total / info.size),
                    //控制每个按钮显示的文字,通过返回值进行显示 
                    itemTexts: function (type, page, current) {
                        // type：代表的是按钮的类型  page 按钮代码的是第几页 current当前的页数 
                        switch (type) {
                            case "first":
                                return "第一页";
                            case "prev":
                                return "上一页";
                            case "next":
                                return "下一页";
                            case "last":
                                return "最后一页";
                            case "page":
                                return page + "页";
                          }

                    },
                    tooltipTitles:function(type, page, current){
                        switch (type) {
                            case "first":
                              return "第一页";
                            case "prev":
                              return "上一页";
                            case "next":
                              return "下一页";
                            case "last":
                              return "最后一页";
                            case "page":
                              return page+"页";
                          }
                    },
                    // 提示信息是否使用bootstrap上的样式 true就是使用 
                    useBootstrapTooltip:true,
                    // 鼠标划上的动画
                    bootstrapTooltipOptions:{
                        //显示信息的框的方向
                       placement:"bottom"
                    },
                    // 添加点击事件将页码和 分页的翻页 实现页面的跳转
                    onPageClicked: function (a, b, c, p) {
                        page = p,
                            render();
                    }
                })
            }
        })
    }
})