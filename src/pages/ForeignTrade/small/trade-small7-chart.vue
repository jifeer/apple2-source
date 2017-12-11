<template>
  <div class="trade-small7-bar" ref="tradeSmall7"></div>
</template>
<script type="text/javascript">
  // **** 组件名称 大驼峰 *****
  // ** 本地公用变量 公用函数 **
  // ***** 第三方 组件库 *****
  // ***** 本地 公用组件 *****
  import { resizeMixin } from 'assets/js/common'
  import { dataZoom, tooltipStyle } from 'assets/js/echarts-style'
  // ** 当前组件的 子组件等 ***

  export default {
    name: 'trade-small7',
    mixins: [resizeMixin],
    props: {
      title: {
        type: String,
        default: ''
      },
      data: {
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
        this.chart = this.$echarts.init(this.$refs.tradeSmall7);

        this.option = {
          tooltip: {
            ...tooltipStyle,
            trigger: 'axis',
          },
          calculable: true,
          grid: {
            left: '5%',
            right: '5%',
            bottom: '10%',
            top: '5%',
            containLabel: true
          },
          xAxis: [{
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
            axisLabel: {
              interval: 0,
              color: '#fff',
              textStyle: {
                fontSize: 12,
              },
            }
          }],
          yAxis: [{
            type: 'value',
            nameTextStyle: {
              fontSize: 12,
              color: '#fff'
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
          }],
          color:["#40b0fc","#0e62d4","#4c58b1","#c37837","#c0bb3e"],
          series: [{
            name: '主要目标国苹果产量',
            type: 'bar',
            barWidth: 12,
            barGap: 0.5,
            data: []
          }, {
            name: '鲜苹果出口价格',
            type: 'bar',
            barWidth: 12,
            barGap: 0.5,
            data: []
          }, {
            name: '苹果汁出口价格',
            type: 'bar',
            barWidth: 12,
            barGap: 0.5,
            data: []
          }, {
            name: '国内苹果产量',
            type: 'bar',
            barWidth: 12,
            barGap: 0.5,
            data: []
          }, {
            name: '汇率',
            type: 'bar',
            barWidth: 12,
            barGap: 0.5,
            data: []
          }]
        };

      },
      initChart() {
        this.option.xAxis[0].data = this.data.time

        this.option.series.forEach((item, index) => {
          $.extend(true, item, this.data.data[index])
        })

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
    }
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
