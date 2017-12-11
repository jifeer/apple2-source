<template>
  <div ref="bigBartwo" data-comp="bar-two-component" class="big-bar-two">bar-two组件</div>
</template>

<script type="text/javascript">
  // **** 组件名称 大驼峰 *****
  // ** 本地公用变量 公用函数 **
  // ***** 第三方 组件库 *****
  // ***** 本地 公用组件 *****
  import {resizeMixin} from 'assets/js/common'
  import {dataZoom, tooltipStyle,axisLabel} from 'assets/js/echarts-style'
  // ** 当前组件的 子组件等 ***

  export default {
    name: 'big-bar-two',
    mixins: [resizeMixin],
    props: {
      title: {
        type: String,
        default: ''
      },
      data: {
        type:Object,
        default: () => {}
      }
    },
    data() {
      return {

      }
    },
    mounted() {
      this.initOption();
      this.initChart()
    },
    methods: {
      initOption() {
        // this.chart = this.$echarts.init(document.getElementById('bar'))
        this.chart = this.$echarts.init(this.$refs.bigBartwo);

        this.option = {
          tooltip: {
            ...tooltipStyle,
            trigger: 'axis',
          },
          calculable : true,
          grid: {
            left: '2%',
            right: '4%',
            bottom: '10%',
            top:'18%',
            containLabel: true
          },
          legend: {
            show:true,
            itemWidth: 15,
            itemHeight: 7,
            top: '15',
            itemGap: 30, //两图例之间距离
            data: [{
              name: "苹果价格",
              textStyle: {
                fontSize:16,
                color: "#fff",
                padding: [0, 5]
              }
            }, {
              name: "国内生产总值",
              textStyle: {
                fontSize:16,
                color: "#fff",
                padding: [0, 5]
              },
            },
              {
                name: "苹果替代品（香梨）价格",
                textStyle: {
                  fontSize:16,
                  color: "#fff",
                  padding: [0, 5]
                },
              }
            ]
          },
          xAxis: [
            {
              name: '',
              type: 'category',
              data: [],
              axisPointer: {
                type: 'shadow'
              },
              axisLine: {
                show: true,
                lineStyle: {
                  type: 'dotted',
                  color: '#794A24'
                }
              },
              axisTick: {
                show: false
              },
              axisLabel: axisLabel,
            }
          ],
          yAxis: [
            {
              type: 'value',
              name: '弹性系数',
              nameTextStyle:{
                fontSize:16,
                color:'#fff'
              },
              axisLine: {
                show: false
              },
              axisTick: {
                show: false
              },
              splitLine: {
                show: true,
                lineStyle: {
                  type: 'dotted',
                  color: '#114970'
                }
              },
              axisLabel: axisLabel,
            }
          ],
          // color:["#33A0EA","#119368","#C7C516"],
          color:["#40b0fc","#0e62d4","#4c58b1","#c37837","#c0bb3e"],
          series: [
            {
              name: '苹果价格',
              type: 'bar',
              barWidth : 40,
              barGap: 1,
              data: [],
              label: {
                normal: {
                  show: true,
                  position: 'top',
                  color:'#fff',
                  fontSize:16
                }
              },
//              markLine: {
//                symbolSize: 7,
//                data: [
//                  {
//                    type: '',
//                    name:'-1',
//                    yAxis:-1
//                  },
//
//                ],
//                lineStyle:{
//                  normal:{
//                    color:'#FC6500'
//                  }
//                }
//              }
            },
            {
              name: '国内生产总值',
              type: 'bar',
              barWidth : 40,
              barGap: 1,
              data:[],
              label: {
                normal: {
                  show: true,
                  position: 'top',
                  color:'#fff',
                  fontSize:16
                }
              },
            },
            {
              name: '苹果替代品（香梨）价格',
              type: 'bar',
//              markLine: {
//                symbolSize: 7,
//                data: [
//                  {
//                    type: '',
//                    name:'1',
//                    yAxis:1.0
//                  },
//
//                ],
//                lineStyle:{
//                  normal:{
//                    color:'#FC6500'
//                  }
//                }
//              },
              barWidth : 40,
              barGap: 1,
              data: [],
              label: {
                normal: {
                  show: true,
                  position: 'top',
                  color:'#fff',
                  fontSize:16
                }
              },
            },
          ],
        };
      },
      initChart(){
        if(Object.keys(this.data).length){
          this.option.xAxis[0].data = this.data.time;
          this.option.series[0].data = this.data.data[0].data;
          this.option.series[1].data = this.data.data[1].data;
          this.option.series[2].data = this.data.data[2].data;
        }
        this.chart.setOption(this.option, true)
      },
      // echats 图表自适应
      _windowResizeHandler() {
        this.chart.resize()
      },
      // 销毁echats图表方法
      _destroyEchart() {
        this.chart.dispose()
      }
    },
    computed: {},
    watch: {
      data: {
        handler: function(val, oldVal) {
          this.initChart()
        },
        deep: true //增加deep 观察对象的子对象变化
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "~assets/css/_variable.scss";
  @import "~assets/css/_mixin.scss";
  .big-bar-two {
    width: 100%;
    height: 100%;
  }
</style>
