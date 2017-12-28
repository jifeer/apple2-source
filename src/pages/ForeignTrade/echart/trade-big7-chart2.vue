<template>
  <div class="trade-big7-line" ref="tradeBig72"></div>
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
    name: 'trade-big7',
    mixins: [resizeMixin],
    props: {
      title: {
        type: String,
        default: ''
      },
      data: {
        type: Array,
        default: () => []
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
        this.myChart = this.$echarts.init(this.$refs.tradeBig72);
        this.option = {
          tooltip: {
            ...tooltipStyle,
            trigger: 'axis',
            axisPointer: {
              type: 'line',
              lineStyle: {
                color: 'rgb(216, 115, 24)',
                type: 'dashed',
                width: 2
              } // 去掉不需要此项
            },
          },
          grid: {
            left: '5%',
            right: '5%',
            bottom: '13%',
            top: '20%',
            containLabel: true
          },
          legend: {
            left: 'center',
            top: 10,
            itemWidth: 15,
            itemHeight: 7,
            itemGap: 30, //两图例之间距离
            textStyle: {
              fontSize: 16,
              color: "#fff",
              padding: [0, 5]
            },
            data: [{
              name: "鲜苹果出口量变化率",
              icon: 'line',

            }, {
              name: "目标国产量变化率",
              icon: 'line',
            }]
          },
          color: ["#00B874", "#FF8000"],
          xAxis: {
            // name: 'hehe',
            nameTextStyle: {
              verticalAlign:'bottom'
            },
            type: 'category',
            nameTextStyle: {
              fontSize: 16,
              color: "#fff",
              fontFamily: "微软雅黑",
            },
            boundaryGap: true,
            axisTick: {
              show: false,
              alignWithLabel: false,
            },
            data: [],
            axisLabel: axisLabel,
            splitLine: {
              lineStyle: {
                color: '#35518f', //分割线颜色
                type: "solid",
                opacity: 0.2
              }
            },
            axisLine: {
              show: false,
              lineStyle: {
                color: '#00558B',
              }
            },
          },
          yAxis: [{
            type: 'value',
            name: '鲜苹果出口量变化率（%）',
            nameTextStyle: {
              fontSize: 16,
              color: "#fff",
              padding: [0, -100, 10, 0]
            },
            axisLabel: axisLabel,
            axisTick: {
              show: false
            },
            axisLine: {
              show: false,
            },
            splitLine: {
              show: true,
              lineStyle: {
                type: 'dotted',
                color: '#114970'
              }
            },
          }, {
            type: 'value',
            name: '（%）',
            nameTextStyle: {
              fontSize: 16,
              color: "#fff",
              padding: [0, 0, 10, 0]
            },
           // interval: 4,
            axisLabel: axisLabel,
            axisTick: {
              show: false
            },
            axisLine: {
              show: false,
            },
            splitLine: {
              show: true,
              lineStyle: {
                type: 'dotted',
                color: '#114970'
              }
            },
          }],
          series: [{
              name: '鲜苹果出口量变化率',
              type: 'line',
              data: [],
              symbol: 'circle',
              symbolSize: 15,
              itemStyle: {
                normal: {
                  color: '#00B874',
                  borderColor: '#FEFB00',
                }
              }
            }
          ]
        }
      },
      initChart() {
        // 合并数据
        this.option.xAxis.data = this.data.data.map(item => item.time)
        this.option.series[0].data = this.data.data.map(item => item.rate)
        this.option.series[0].name = this.data.factor
        this.option.legend.data = [this.data.factor]

        this.myChart.setOption(this.option);
      },
      // echats 图表自适应
      _windowResizeHandler() {
        this.myChart.resize()
      },
      // 销毁echats图表方法
      _destroyEchart() {
        this.myChart.dispose()
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
  .trade-big7-line {
    height: 100%;
    width: 100%;
  }

</style>
