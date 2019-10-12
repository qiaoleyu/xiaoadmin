<template>
  <div>
  <h2>{{msg}}</h2>
    <!--<div style="float: left;margin: auto">-->
    <el-button type="success" round plain style="width: 200px;margin-left: 10px" @click="show1()">笔记本|平板</el-button>
    <el-button type="success" round plain style="width: 200px"@click="show2()">出行|穿戴</el-button>
    <el-button type="success" round plain style="width: 200px"@click="show3()">手机|电话卡</el-button>
    <el-button type="success" round plain style="width: 200px"@click="show4()">电视|盒子</el-button>
    <el-button type="success" round plain style="width: 200px;margin-bottom: 10px"@click="show5()">家电|插线板</el-button>
    <!--</div>-->
    <!--<div style="float: left;margin: auto">-->
    <el-button type="success" round plain style="width: 200px"@click="show6()">智能|路由器</el-button>
    <el-button type="success" round plain style="width: 200px"@click="show7()">电源|配件</el-button>
    <el-button type="success" round plain style="width: 200px"@click="show8()">健康|儿童</el-button>
    <el-button type="success" round plain style="width: 200px"@click="show9()">生活|箱包</el-button>
    <el-button type="success" round plain style="width: 200px"@click="show10()">耳机|音箱</el-button>
    <!--</div>-->
  <div id="saleShow" style="width: 1000px;height: 500px;margin: auto ;padding-top: 20px"></div>
  </div>

</template>
<style>
  .el-main{
    line-height: inherit;
  }
</style>


<script>
  import axios from 'axios'
  // 引入基本模板
  //var echarts = require('echarts/lib/echarts')
  export default{
      data(){
          return{
            msg:'商品季度销量图',
            x:[],
            y:[],
            title:''
          }
      },
    mounted(){

    },

    methods:{
        showtitle:function (id) {
          var url="api/findShopKindsById/"+id
          axios.get(url).then(res=>{
            var data=res.data

              this.title= data.skName+'商品季度销量图'

            this.draw()
          })
          },
        show:function (id) {
          var url="api/show2/"+id
          axios.get(url).then(res=>{
            var data=res.data
            for(var i=0;i<data.length;i++){
              //console.log(data[i].shopName+'='+data[i].shopPrice)
              this.x.push( data[i].shopName)
              this.y.push( data[i].shopNumber)
            }

            this.draw()
          })

        },
      show1:function () {
        this.x=[]
        this.y=[]
        var id=1
        this.showtitle(id)
        this.show(id)
      },
      show2:function () {
        this.x=[]
        this.y=[]
        var id=2
        this.showtitle(id)
        this.show(id)
      },
      show3:function () {
        this.x=[]
        this.y=[]
        var id=3
        this.showtitle(id)
        this.show(id)
      },
      show4:function () {
        this.x=[]
        this.y=[]
        var id=4
        this.showtitle(id)
        this.show(id)
      },
      show5:function () {
        this.x=[]
        this.y=[]
        var id=5
        this.showtitle(id)
        this.show(id)
      },
      show6:function () {
        this.x=[]
        this.y=[]
        var id=6
        this.showtitle(id)
        this.show(id)
      },
      show7:function () {
        this.x=[]
        this.y=[]
        var id=7
        this.showtitle(id)
        this.show(id)
      },
      show8:function () {
        this.x=[]
        this.y=[]
        var id=8
        this.showtitle(id)
        this.show(id)
      },
      show9:function () {
        this.x=[]
        this.y=[]
        var id=9
        this.showtitle(id)
        this.show(id)
      },
      show10:function () {
        this.x=[]
        this.y=[]
        var id=10
        this.showtitle(id)
        this.show(id)
      },
        draw:function () {
          var myChart=this.$echarts.init(document.getElementById("saleShow"))
          myChart.clear()
          myChart.setOption({
            title:{
                text:this.title
            },
            tooltip:{
                show:true
            },
            legend:{
                data:['销量']
            },
            xAxis:{
                data:this.x,
              axisLabel: {
                interval: 0,
                formatter: function (params) {
                  var newParamsName = "";
                  var paramsNameNumber = params.length;
                  var provideNumber = 4;  //一行显示几个字
                  var rowNumber = Math.ceil(paramsNameNumber / provideNumber);
                  if (paramsNameNumber > provideNumber) {
                    for (var p = 0; p < rowNumber; p++) {
                      var tempStr = "";
                      var start = p * provideNumber;
                      var end = start + provideNumber;
                      if (p == rowNumber - 1) {
                        tempStr = params.substring(start, paramsNameNumber);
                      } else {
                        tempStr = params.substring(start, end) + "\n";
                      }
                      newParamsName += tempStr;
                    }

                  } else {
                    newParamsName = params;
                  }
                  return newParamsName
                },
              }
            },
            yAxis:{
                style:"value"
            },
            series:[
              {
                  name:'销量',
                color:'darkseagreen',
                type:'bar',
                barWidth : 30,
                data:this.y
              },
              {
                  name:'销量',
                color:'black',
                type:'line',
                data:this.y,
                markLine:{
                      data:[
                        {type:'average',name:'平均值'}
                      ]
                },
                markPoint:{
                      data:[
                        {type:'max',name:'最大值'},
                        {type:'min',name:'最小值'}
                      ]
                }

              }
            ]

          },);

        }
    }
  }
</script>
