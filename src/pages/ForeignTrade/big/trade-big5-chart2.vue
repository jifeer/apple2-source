<template>
  <div class="trade-big5-bar" ref="tradeBig5"></div>
</template>
<script type="text/javascript">
  // **** 组件名称 大驼峰 *****
  // ** 本地公用变量 公用函数 **
  // ***** 第三方 组件库 *****
  // ***** 本地 公用组件 *****
  import { resizeMixin, $ } from 'assets/js/common'
  import { dataZoom, tooltipStyle, MarkArea, axisLabel } from 'assets/js/echarts-style'
  // ** 当前组件的 子组件等 ***

  export default {
    name: 'trade-big5',
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
        // this.chart = this.$echarts.init(document.getElementById('bar'))
        this.chart = this.$echarts.init(this.$refs.tradeBig5);
        this.option = {
          dataZoom: [{
            show: true,
            height: 15,
            xAxisIndex: [0],
            left: '60',
            right: '60',
            bottom: '30',
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
            ...tooltipStyle,
            trigger: 'axis',
            axisPointer: {
              type: 'line', // 样式 为 line 毋须 给其样式，默认就好
              lineStyle: {
                color: 'rgb(216, 115, 24)',
                type: 'dashed',
                width: 2
              }
            },
            formatter: function (params) {
              let str = params[0].name + '<br>'
              params.forEach((item, index) => {
                str += `${item.seriesName}： ${item.value}％<br>`
              })
              return str
            }
          },
          grid: {
            left: '5%',
            right: '5%',
            bottom: '22%',
            top: '15%',
            containLabel: true
          },
          legend: {
            x: 'center',
            data: [],
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
            },
            boundaryGap: true,
            axisTick: {
              alignWithLabel: false,
            },
            axisLabel: axisLabel,
            splitLine: {
              lineStyle: {
                color: '#35518f', //分割线颜色
                type: "solid",
                opacity: 0.2
              }
            },
            axisLine: {
              lineStyle: {
                color: '#00558B',
              }
            },
            data: []
          },
          yAxis: {
            type: 'value',
            name: '国际市场占有率（%）',
            nameTextStyle: {
              fontSize: 16,
              color: "#fff",
              padding: [0, -35, 10, 0]
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
          },
          // dataZoom: dataZoom,
          series: []
        }
        // ['#33A0EA', '#119368', '#C7C516', '#CF7013', '#AD3335']
        this.lineStyle = [{
          type: 'line',
          symbol: 'circle',
          symbolSize: 15,
          itemStyle: {
            normal: {
              color: '#33A0EA',
              borderColor: '#FEFB00',
            },
          },
        }, {
          type: 'line',
          symbol: 'circle',
          symbolSize: 15,
          itemStyle: {
            normal: {
              color: '#119368',
              borderColor: '#FEFB00',
            }
          },
        }, {
          type: 'line',
          symbol: 'circle',
          symbolSize: 15,
          itemStyle: {
            normal: {
              color: '#C7C516',
              borderColor: '#FEFB00',
            }
          },
        }, {
          type: 'line',
          symbol: 'circle',
          symbolSize: 15,
          itemStyle: {
            normal: {
              color: '#CF7013',
              borderColor: '#FEFB00',
            }
          },
        }, {
          type: 'line',
          symbol: 'circle',
          symbolSize: 15,
          itemStyle: {
            normal: {
              color: '#AD3335',
              borderColor: '#FEFB00',
            }
          },
        }]



      },
      initChart() {
        let filterIndex = this.data.findIndex(item => item.name === '全球')
        let resData = filterIndex === -1 ? this.data : this.data.splice(filterIndex, 1)

        // 合并数据
        var res = resData.map((item, index) => {
          return {
            name: item.name,
            data: item.data.map((v, k) => {
              return v.rate
            }),
            xAxis: item.data.map((v, k) => {
              return v.time
            })
          }
        })

        res.forEach((item, index) => {
          $.extend(true, item, this.lineStyle[index])
        })


        this.option.series = res
        this.option.xAxis.data = res[0].xAxis
        this.option.legend.data = resData.map(item => item.name)

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
  @import "~assets/css/_variable.scss";
  @import "~assets/css/_mixin.scss";
  .trade-big5-bar {
    height: 100%;
    width: 100%;
  }

</style>
