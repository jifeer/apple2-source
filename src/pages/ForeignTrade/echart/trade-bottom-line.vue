<template>
  <div ref="chart" class="chart"></div>
</template>
<script type="text/javascript">
  import { $, resizeMixin, handleTime } from 'assets/js/common'
  import { dataZoom, tooltipStyle, axisLabel } from 'assets/js/echarts-style'
  // ** 当前组件的 子组件等 ***

  export default {
    name: 'line',
    mixins: [resizeMixin],
    props: {
      bottomLineData: {
        type: Object,
        default: () => {}
      },
      timeType: {
        type: String,
        default: 'month'
      },
      data: {
        type: Array,
        default: () => []
      }
    },
    mounted() {
      this.initOption()
      this.initChart()
    },
    methods: {
      initOption() {
        this.myChart = this.$echarts.init(this.$refs.chart)
        this.option = {
          dataZoom: [{
            show: true,
            height: 15,
            xAxisIndex: [0],
            left: '60',
            right: '60',
            bottom: '0',
            backgroundColor: 'rgba(3, 114, 177, .6)',
            dataBackground: {
              areaStyle: {
                color: 'rgba(3, 114, 177, .7)'
              },
              lineStyle: {
                opacity: 0.8,
                color: '#8392A5'
              }
            },
            fillerColor: '#063052',
            borderColor: '#276b9f',
            start: 0,
            end: 100,
            handleIcon: 'path://M306.1,413c0,2.2-1.8,4-4,4h-59.8c-2.2,0-4-1.8-4-4V200.8c0-2.2,1.8-4,4-4h59.8c2.2,0,4,1.8,4,4V413z',
            handleSize: '110%',
            handleStyle: {
              color: '#00ADFA',
              shadowBlur: 0,
              shadowColor: 'rgba(255, 0, 0, 1)',
              shadowOffsetX: 0,
              shadowOffsetY: 0
            },
            textStyle: {
              color: "#11caff",
              fontSize: '12'
            }
          }],
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              type: 'line',
              lineStyle: {
                color: 'rgb(216, 115, 24)',
                type: 'dashed',
                width: 2
              } // 去掉不需要此项
            },
            backgroundColor: '#099d4f',
          },
          grid: {
            top: '20%',
            left: '2%',
            right: '1%',
            bottom: '25',
            containLabel: true
          },
          legend: {
            x: 'center',
            data: ['进口价格', '出口价格'],
            padding: [10, 0],
            itemGap: 65, //两图例之间距离
            textStyle: {
              color: '#fff',
              fontSize: 18,
              padding: [0, 5]
            },
            icon: 'line',
            itemWidth: 15
          },
          color: ["#00B874", "#FF8000"],
          xAxis: {
            type: 'category',
            nameTextStyle: {
              fontSize: 18,
              color: "#fff",
              fontFamily: "微软雅黑",
              padding: [0, -50, 10, 0]
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
            axisTick: {
              show: true,
              alignWithLabel: false,
            },
            axisLine: {
              lineStyle: {
                color: '#036ca8'
              }
            },
            boundaryGap: true,
          },
          yAxis: {
            type: 'value',
            name: '价格（元/公斤）',
            axisLabel: axisLabel,
            axisTick: {
              show: false
            },
            splitLine: {
              lineStyle: {
                color: '#35518f', //分割线颜色
                type: "solid",
                opacity: 0.2
              }
            },
            axisLine: {
              lineStyle: {
                color: '#707c95', //分割线颜色
                type: "solid",
                opacity: 0
              }
            },
            nameTextStyle: {
              fontSize: 18,
              color: '#fff',
              padding: [0, -50, 15, 0]
            }
          },
          series: [{
            name: '进口价格',
            type: 'line',
            data: [],
            markPoint: {},
            symbol: 'circle',
            symbolSize: 15,
            itemStyle: {
              normal: {
                color: '#00B874',
                borderColor: '#FEFB00',
              }
            }
          }, {
            name: '出口价格',
            type: 'line',
            data: [],
            symbol: 'circle',
            symbolSize: 15,
            markPoint: {},
            itemStyle: {
              normal: {
                color: '#FF8000',
                borderColor: '#FEFB00',
              }
            }
          }]
        }
      },
      initChart() {
        let xData = this.timeType === 'month' ? handleTime(this.data[2].data) : this.data[2].data
        this.option.xAxis.data = xData
        this.option.series[0].data = this.data[0].data.map(v=>parseFloat(v).toFixed(2))
        this.option.series[1].data = this.data[1].data.map(v=>parseFloat(v).toFixed(2))

        this.myChart.setOption(this.option, true)
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
    watch: {
      data: {
        handler(newVal, oldVal) {
          this.initChart()
        },
        deep: true
      }
    }
  }

</script>
<style lang="scss" scoped>
  .chart {
    width: 100%;
    height: 100%;
  }

</style>
