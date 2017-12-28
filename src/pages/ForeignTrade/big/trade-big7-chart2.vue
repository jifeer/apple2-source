<template>
  <div class="trade-big7-line" ref="tradeBig72"></div>
</template>
<script type="text/javascript">
  // **** 组件名称 大驼峰 *****
  // ** 本地公用变量 公用函数 **
  import deepcopy from 'deepcopy'
  // ***** 第三方 组件库 *****
  // ***** 本地 公用组件 *****
  import { resizeMixin, $, distinct } from 'assets/js/common'
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
            data: []
          },
          color: ["#00B874", "#FF8000"],
          xAxis: {
            // name: 'hehe',
            nameTextStyle: {
              verticalAlign: 'bottom'
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
            name: '中国贸易出口变化率（%）',
            nameTextStyle: {
              fontSize: 16,
              color: "#fff",
              padding: [0, -80, 10, 0]
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
              padding: [0, 40, 10, 0]
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
          }],
          series: []
        }
      },
      initChart() {
        let resData = deepcopy(this.data)
        // 单独提出 时间数组来
        let timeArr = resData.map(item => item.data.map(v => v.time))
        // 合并时间
        let timeConcat = timeArr.reduce((a, b) => a.concat(b))
        // 去重时间 排序时间
        let timeDistinct = distinct(timeConcat).sort((a, b) => parseInt(a) - parseInt(b))

        // 整理后台返回的数据，特定时间下如果没有数据，那么 填充为 空值
        timeArr.forEach((item, index) => {
          timeDistinct.forEach((v, i) => {
            if (item.indexOf(v) === -1) {
              resData[index].data.splice(i, 0, {
                rate: '-',
                time: v
              })
            }
          })
        })

        this.option.xAxis.data = timeDistinct
        this.option.legend.data = resData.map(v => v.factor)

        // 提炼数据为 echats 所需格式
        let seriesData = resData.map((item, index) => {
          return {
            data: item.data.map(v => v.rate),
            name: item.factor
          }
        })

        let lineStyle = [{
          yAxisIndex: 1,
          type: 'line',
          data: [],
          symbol: 'circle',
          symbolSize: 10,
          itemStyle: {
            normal: {
              color: '#ff7200',
              borderWidth: 2,
              borderColor: '#fff300'
            }
          },
        }, {
          type: 'line',
          data: [],
          symbol: 'circle',
          symbolSize: 10,
          itemStyle: {
            normal: {
              color: '#099d4f',
              borderWidth: 2,
              borderColor: '#fff300'
            },
            emphasis: {
              borderColor: '#75f908'
            }
          }
        }]

        // 混合数据与样式
        seriesData.forEach((item, index) => {
          $.extend(true, item, lineStyle[index])
        })

        this.option.series = seriesData

        // this.option.series[0].data = resData[0].data.map(item => item.rate)
        // this.option.series[0].name = resData[0].factor

        // this.option.series[1].data = resData[1].data.map(item => item.rate)
        // this.option.series[1].name = resData[1].factor

        this.myChart.setOption(this.option, true);
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
