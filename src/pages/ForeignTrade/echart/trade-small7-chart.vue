<template>
  <div class="trade-small7-bar" ref="tradeSmall7"></div>
</template>

<script type="text/javascript">
  // **** 组件名称 大驼峰 *****
  // ** 本地公用变量 公用函数 **
  // ***** 第三方 组件库 *****
  // ***** 本地 公用组件 *****
  import {resizeMixin} from 'assets/js/common'
  import {dataZoom, tooltipStyle} from 'assets/js/echarts-style'
  // ** 当前组件的 子组件等 ***

  export default {
    name: 'trade-small7',
    mixins: [resizeMixin],
    props: {
      title: {
        type: String,
        default: ''
      },
      echartsData: {
        type: Object,
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
        this.chart = this.$echarts.init(this.$refs.tradeSmall7);

        this.option = {
          tooltip: {
            ...tooltipStyle,
            trigger: 'axis',
          },
          calculable : true,
          grid: {
            left: '5%',
            right: '7%',
            bottom: '12%',
            top: '30',
            containLabel: true
          },
          xAxis: [
            {
              name: '',
              type: 'category',
//              data: ['1995/96-2003/04年度','1995/96-2003/04年度'],
              data:[],
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
              axisLabel: {
                interval: 0,
                color:'#fff',
                textStyle: {
                  fontSize: 12,
                },
              }
            }
          ],
          yAxis: [
            {
              type: 'value',
              name: '弹性系数',
              nameTextStyle:{
                fontSize:12,
                color:'#fff'
              },
              min: '-6',
              max: '4',
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
              axisLabel: {
                formatter: '{value}',
                textStyle: {
                  color: "#fff",
                  fontSize: 12
                }
              }
            }
          ],
          color:["#33A0EA","#119368","#C7C516","#CF7013","#AD3335"],
          series: [
            {
              name: '主要目标国苹果产量',
              type: 'bar',
              barWidth : 12,
              barGap: 0.5,
              data: []
            },{
              name: '鲜苹果出口价格',
              type: 'bar',
              barWidth : 12,
              barGap: 0.5,
              data:[]
            }, {
              name: '苹果汁出口价格',
              type: 'bar',
              barWidth : 12,
              barGap: 0.5,
              data: []
            }, {
              name: '国内苹果产量',
              type: 'bar',
              barWidth : 12,
              barGap: 0.5,
              data: []
            }, {
              name: '汇率',
              type: 'bar',
              barWidth : 12,
              barGap: 0.5,
              data: []
            }
          ]
        };

      },
      initChart(){
        if (Object.keys(this.echartsData).length) {
          // 合并数据
          this.option.xAxis[0].data = this.echartsData.xdata;
          this.option.series[0].data = this.echartsData.data1;
          this.option.series[1].data = this.echartsData.data2;
          this.option.series[2].data = this.echartsData.data3;
          this.option.series[3].data = this.echartsData.data4;
          this.option.series[4].data = this.echartsData.data5;
        }
        this.chart.setOption(this.option)
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
      echartsData: {
        handler: function(val, oldVal) {
          this.initChart()
        },
        deep: true //增加deep 观察对象的子对象变化
      }
    },
  }
</script>

<style lang="scss" scoped>
  @import "./../../../assets/css/_variable.scss";
  @import "./../../../assets/css/_mixin.scss";
  .trade-small7-bar {
    height: 100%;
    width: 100%;
  }
</style>
