<template>
  <div ref="chart" class="chart"></div>
</template>
<script>
  import { $, resizeMixin, distinct, handleTime } from 'assets/js/common'
  import { dataZoom, tooltipStyle, axisLabel, legend } from 'assets/js/echarts-style'
  import deepcopy from 'deepcopy'

  export default {
    mixins: [resizeMixin],
    name: 'trade-chart',
    props: {
      data: {
        type: Array,
        default: () => []
      },
      time: {
        type: String,
        default: ''
      },
      timeType: {
        type: String,
        default: ''
      }
    },
    data() {
      return {}
    },
    mounted() {
      this.$nextTick(() => {
        this.initChart()
      });
      this.myChart = this.$echarts.init(this.$refs.chart);
    },
    methods: {
      initChart() {

        let option = {
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
          grid: {
            left: '5%',
            right: '5%',
            top: '20%',
            bottom: '15%',
            containLabel: true
          },
          tooltip: {
            ...tooltipStyle,
            trigger: 'axis',
            formatter: function (params) {
              let str = params[0].name + '<br>'
              params.forEach((item, index) => {
                let unite = item.componentSubType === 'bar' ? '万吨' : '％'
                str += `${item.seriesName}：${item.value}${unite}<br>`
              })
              return str
            }
          },
          calculable: true,
          legend: {
            left: 'center',
            itemWidth: 15,
            itemHeight: 7,
            itemGap: 30, //两图例之间距离
            textStyle: {
              color: '#fff',
              fontSize: 18
            },
            data: []
          },
          xAxis: [{
            type: 'category',
            data: [],
            splitLine: {
              show: false,
            },
            axisTick: {
              show: true, //显示刻度
            },
            axisLabel: axisLabel,
            axisLine: {
              lineStyle: {
                color: '#036ca8'
              }
            },
          }],
          yAxis: [{
            name: "贸易量（万吨）",
            nameTextStyle: {
              fontSize: 18,
              padding: [0, 0, 15, 0],
            },
            type: 'value',
            //interval: 700,
            axisTick: {
              show: false,
            },
            splitLine: {
              show: true,
              lineStyle: {
                type: 'dotted',
                color: '#114970'
              }
            },
            axisLine: {
              show: false,
              lineStyle: {
                color: '#fff'
              }
            },
            axisLabel: axisLabel
          }, {
            type: 'value',
            name: "变化率（%）",
            //interval: 6,
            nameTextStyle: {
              fontSize: 18,
              padding: [0, 30, 15, 0]
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
            axisLine: {
              show: false,
              lineStyle: {
                color: '#fff',
              }
            },
            axisLabel: axisLabel,
          }],
          series: []
        }

        let BarLineStyle = [{
          type: 'bar',
          barMaxWidth: 16,
          label: {
            normal: {
              show: false,
              position: 'right',
              formatter: "{c}%"
            }
          },
          itemStyle: {
            normal: {
              color: '#33A0EA'
            }
          }
        }, {
          type: 'line',
          symbolSize: 0,
          smooth: true,
          yAxisIndex: 1,
          itemStyle: {
            normal: {
              color: '#33A0EA'
            }
          },
          markLine: {
            label: {
              normal: {
                show: false
              }
            },
            symbolSize: 0,
            lineStyle: {
              normal: {
                color: 'red',
                type: 'dotted',
                width: 1
              }
            },
            data: [{
              yAxis: 0,
            }]
          },
        },{
          type: 'bar',
          barMaxWidth: 16,
          label: {
            normal: {
              show: false,
              position: 'right',
              formatter: "{c}%"
            }
          },
          itemStyle: {
            normal: {
              color: '#119368'
            }
          }
        }, {
          type: 'line',
          symbolSize: 0,
          smooth: true,
          yAxisIndex: 1,
          itemStyle: {
            normal: {
              color: '#119368'
            }
          },
          markLine: {
            label: {
              normal: {
                show: false
              }
            },
            symbolSize: 0,
            lineStyle: {
              normal: {
                color: 'red',
                type: 'dotted',
                width: 1
              }
            },
            data: [{
              yAxis: 0,
            }]
          },
        },{
          type: 'bar',
          barMaxWidth: 16,
          label: {
            normal: {
              show: false,
              position: 'right',
              formatter: "{c}%"
            }
          },
          itemStyle: {
            normal: {
              color: '#C7C516'
            }
          }
        }, {
          type: 'line',
          symbolSize: 0,
          smooth: true,
          yAxisIndex: 1,
          itemStyle: {
            normal: {
              color: '#C7C516'
            }
          },
          markLine: {
            label: {
              normal: {
                show: false
              }
            },
            symbolSize: 0,
            lineStyle: {
              normal: {
                color: 'red',
                type: 'dotted',
                width: 1
              }
            },
            data: [{
              yAxis: 0,
            }]
          },
        },{
          type: 'bar',
          barMaxWidth: 16,
          label: {
            normal: {
              show: false,
              position: 'right',
              formatter: "{c}%"
            }
          },
          itemStyle: {
            normal: {
              color: '#CF7013'
            }
          },
          markLine: {
            label: {
              normal: {
                show: false
              }
            },
            symbolSize: 0,
            lineStyle: {
              normal: {
                color: 'red',
                type: 'dotted',
                width: 1
              }
            },
            data: [{
              yAxis: 0,
            }]
          },
        }, {
          type: 'line',
          symbolSize: 0,
          smooth: true,
          yAxisIndex: 1,
          itemStyle: {
            normal: {
              color: '#CF7013'
            }
          },
          markLine: {
            label: {
              normal: {
                show: false
              }
            },
            symbolSize: 0,
            lineStyle: {
              normal: {
                color: 'red',
                type: 'dotted',
                width: 1
              }
            },
            data: [{
              yAxis: 0,
            }]
          },
        },{
          type: 'bar',
          barMaxWidth: 16,
          label: {
            normal: {
              show: false,
              position: 'right',
              formatter: "{c}%"
            }
          },
          itemStyle: {
            normal: {
              color: '#AD3335'
            }
          }
        }, {
          type: 'line',
          symbolSize: 0,
          smooth: true,
          yAxisIndex: 1,
          itemStyle: {
            normal: {
              color: '#AD3335'
            }
          },
          markLine: {
            label: {
              normal: {
                show: false
              }
            },
            symbolSize: 0,
            lineStyle: {
              normal: {
                color: 'red',
                type: 'dotted',
                width: 1
              }
            },
            data: [{
              yAxis: 0,
            }]
          },
        },]

        let resData = deepcopy(this.data)
        option.legend.data = resData.map(item => item.name)
        // 合并时间
        let timeConcat = resData.map(item => item.time).reduce((a, b) => a.concat(b))
        // 去重时间 排序时间
        let timeDistinct = distinct(timeConcat).sort((a, b) => parseInt(a) - parseInt(b))
        // 转换格式
        let resTime = this.timeType === 'year' ? timeDistinct : handleTime(timeDistinct)
        // console.log(resTime)

        // 整理后台返回的数据，特定时间下如果没有数据，那么 填充为 空值
        let lackIndex = []
        resData.forEach((item, index) => {
          timeDistinct.forEach((v, i) => {
            if (item.time.indexOf(parseInt(v)) === -1) {
              item.data.splice(i, 0, '-')
            }
          })
        })

        // 月度的时候没有变化率
        option.yAxis[1].name = this.timeType === 'year' ?  '变化率（%）' : ''

        // 混合数据与样式
        resData.forEach((item, index) => {
          this.timeType === 'year' ? $.extend(true, item, BarLineStyle[index]) : $.extend(true, item, BarLineStyle[index * 2])
        })

        // x轴时间
        option.xAxis[0].data = resTime
        // split 是否显现
        option.yAxis[0].splitLine.show = this.timeType === 'year' ? false : true

        option.series = resData

        //如果有新的配置项的变化 深度拷贝
        this.myChart.setOption(option, true)
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
  .chart {}

</style>
