 // 基于准备好的dom，初始化echarts实例
var myChart = echarts.init(document.querySelector('.cont_left'));
 // 指定图表的配置项和数据
 var option1 = {
     title: {
         text: '2018年注册的人数'
     },
     tooltip: {},
     legend: {
         data:['销量','人数']
     },
     xAxis: {
         data: ["1月","2月","3月","4月","5月","6月"]
     },
     yAxis: {},
     series: [{
         name: '销量',
         type: 'bar',
         data: [5, 20, 36, 10, 10, 20]
     },
     {
        name: '人数',
        type: 'bar',
        data: [5, 20, 36, 10, 10, 20]
    }]
 };

 // 使用刚指定的配置项和数据显示图表。
 myChart.setOption(option1);

 var myChart = echarts.init(document.querySelector('.cont_right'));
 var option2 = {
    title : {
        text: '热门品牌销售',
        subtext: '2017年7月',
        x:'center'
    },
    tooltip : {
        trigger: 'item',
        formatter: "{a} <br/>{b} : {c} ({d}%)"
    },
    legend: {
        orient: 'vertical',
        left: 'left',
        data: ['耐克','阿迪','李宁','新百伦','阿迪王']
    },
    series : [
        {
            name: '访问来源',
            type: 'pie',
            radius : '55%',
            center: ['50%', '60%'],
            data:[
                {value:335, name:'耐克'},
                {value:310, name:'阿迪'},
                {value:234, name:'李宁'},
                {value:135, name:'新百伦'},
                {value:1548, name:'阿迪王'}
            ],
            itemStyle: {
                emphasis: {
                    shadowBlur: 10,
                    shadowOffsetX: 0,
                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
            }
        }
    ]
};
myChart.setOption(option2);