<template>
  <div class="trade-big7-bar" ref="tradeBig7"></div>
</template>
<script type="text/javascript">
  // **** 组件名称 大驼峰 *****
  // ** 本地公用变量 公用函数 **
  // ***** 第三方 组件库 *****
  // ***** 本地 公用组件 *****
  import { resizeMixin, $ } from 'assets/js/common'
  import { dataZoom, tooltipStyle, axisLabel } from 'assets/js/echarts-style'
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
        // this.chart = this.$echarts.init(document.getElementById('bar'))
        this.chart = this.$echarts.init(this.$refs.tradeBig7)

        this.option = {
          tooltip: {
            ...tooltipStyle,
            trigger: 'axis',
          },
          legend: {
            data: ['主要目标国苹果产量', '鲜苹果出口价格', '苹果汁出口价格', '国内苹果产量', '汇率'],
            left: 'center',
            //top:'0%',
            textStyle: {
              color: '#fff',
              fontSize: 18
            },
            itemGap: 20,
            itemHeight: 8,
            itemWidth: 16
          },
          calculable: true,
          grid: {
            left: '5%',
            right: '5%',
            bottom: '20%',
            top: '14%',
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
            axisLabel: axisLabel
          }],
          yAxis: [{
            type: 'value',
            name: '弹性系数',
            nameTextStyle: {
              fontSize: 18,
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
            axisLabel: axisLabel
          }],
          color: ["#33A0EA", "#119368", "#C7C516", "#CF7013", "#AD3335"],
          series: [{
            name: '主要目标国苹果产量',
            type: 'bar',
            barWidth: 30,
            barGap: 0.5,
            data: [],
          }, {
            name: '鲜苹果出口价格',
            type: 'bar',
            barWidth: 30,
            barGap: 0.5,
            data: []
          }, {
            name: '苹果汁出口价格',
            type: 'bar',
            barWidth: 30,
            barGap: 0.5,
            data: []
          }, {
            name: '国内苹果产量',
            type: 'bar',
            barWidth: 30,
            barGap: 0.5,
            data: []
          }, {
            name: '汇率',
            type: 'bar',
            barWidth: 30,
            barGap: 0.5,
            data: []
          }]
        }

      },
      initChart() {
        // 合并数据

        this.option.legend.data = this.data.data.map(item => item.name)
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
    },
    computed: {},
    watch: {
      data: {
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
  .trade-big7-bar {
    height: 100%;
    width: 100%;
  }

</style>
