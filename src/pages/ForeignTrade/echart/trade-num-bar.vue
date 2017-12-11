<template>
  <div :id="bottomBarData.id">

  </div>
</template>

<script>
  import {extend, $} from 'assets/js/common'

  require('echarts/lib/component/tooltip')
  require('echarts/lib/component/legend')
  export default {
    name: 'rankingEchart',
    props: {
      bottomBarData: {
        type: Object,
        default: null
      },
      height:{
        type:String,
        default:"3.8rem"
      },
      width:{
        type:String,
        default:"3rem"
      }
    },
    watch:{
      bottomBarData: {
        handler: function (val, oldVal) {
          this.initChart()
        },
        deep: true  //增加deep 观察对象的子对象变化
      }
    },
    mounted() {
      this.myChart = this.$echarts.init(document.getElementById(this.bottomBarData.id))
      window.addEventListener("resize",  ()=> {
        this.myChart.resize();
      });
      this.initChart()

    },
    computed: {

    },
    methods: {
      initChart(){
        if (Object.keys(this.bottomBarData).length) {
          let option = {
            grid:{
              left:150,
              top:10,
              right:50,
              bottom:20
            },
            yAxis: [{
              data: this.bottomBarData.yAxisData,
              interval:0,
              axisLabel: {
                textStyle:{
                  fontSize:'0.14rem',
                  color:function (value, index) {
                    return index >= 5 ? '#eeeff1' : '#63676e';
                  }

                }
              },
              offset:'15',
              splitLine: {
                show: false
              },
              axisTick:{
                show:false
              },
              axisLine: {
                show: false
              }
            }, {
              // 辅助y 轴
              show: true,
              interval:0,
              axisLabel:{
                textStyle:{
                  fontSize:'0.14rem',
                  color:function (value, index) {
                    return index >= 5 ? 'red' : '#fff';
                  }

                }
              },
              splitLine: {
                show: false
              },
              axisTick:{
                show:false
              },
              axisLine: {
                show: false,
                lineStyle: {
                  color: '#002A75',

                  fontSize:'0.14rem'
                }

              },
              offset:'50',
              data: this.bottomBarData.yNumber,
              position:'left',

            }],
            xAxis: {
              max: 1000,
              show:false,
              axisLine: {
                show: false
              }
            },
            color:['#162f66'],
            series: [{
              // 辅助系列
              type: 'bar',
              silent: true,
              yAxisIndex: 1,
              itemStyle: {
                normal: {
                  color: '#1e3045'
                }
              },
              barWidth:10,
              data: this.bottomBarData.data.map(function (val) {
                return 1000;
              })
            }, {
              type: 'bar',
              data: this.bottomBarData.data,
              barWidth:10,
              label: {
                normal: {
                  position: 'right',
                  show:true,
                  textStyle: {
                    fontSize: '0.14rem',
                    color: "#3aa1e8"
                  },
                  formatter: function(value){
                    return value.data;
                  }
                }
              },
              itemStyle: {
                normal: {
                  color: '#40b0fc'
                }
              }
            }]

          }

          //如果有新的配置项的变化 深度拷贝
          if(Object.keys(this.bottomBarData.option).length){
            option = $.extend(true,option,this.bottomBarData.option)
          }

          this.myChart.setOption(option);
        }

      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "./../../../assets/css/_variable.scss";
  @import "./../../../assets/css/_mixin.scss";
  /*#rankingEchart{

      width:100%;
      height:2.8rem;}*/
  #rankingEchart>div{
    width:100%;
  }
</style>
