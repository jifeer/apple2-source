<template>
  <div ref="chart" ></div>
</template>
<script>
  import { $, datazoom, resizeMixin } from 'assets/js/common'
  import { dataZoom, tooltipStyle, axisLabel, legend } from 'assets/js/echarts-style'
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

    },
    data() {
      return {}
    },
    mounted() {
      this.$nextTick(() => {
        this.initChart()
      })
      console.log(this.data)
      this.myChart = this.$echarts.init(this.$refs.chart)
    },
    methods: {
      initChart() {

        let option = {
          grid: {
            left: '5%',
            right: '5%',
            bottom: '15%',
            top: '20%',
            containLabel: true
          },
          tooltip: {
            ...tooltipStyle,
            trigger: 'axis',
          },
          legend: {
            left: 'center',
            top:'60',
            itemWidth: 15,
            itemHeight: 7,
            itemGap: 30, //两图例之间距离
            textStyle: {
              color: '#fff',
              fontSize: 18
            },
            data: ['山东仓容比','陕西仓容比','山东相比去年同期','陕西相比去年同期']
          },
          dataZoom: [{
            show: true,
            height: 15,
            xAxisIndex: [0],
            left: '60',
            right: '60',
            bottom: '50',
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
          calculable: true,
          xAxis: [{
            type: 'category',
            data: this.data[0].time,
            splitLine: {
              show: false,
            },
            axisTick: {
              show: true, //显示刻度
            },
            axisLabel: {
              formatter: '{value}',
              textStyle: {
                color: "#fff",
                fontSize: 16
              }
            },
            axisLine: {
              lineStyle: {
                color: '#036ca8'
              }
            }
          }],
          yAxis: [{
            name: "仓容比（%）",
            nameTextStyle: {
              fontSize: 16,
              padding: [0, 0, 20, 40],
            },
            type: 'value',
            //interval: 700,
            axisTick: {
              show: false,
            },
            splitLine: {
              show: false,
            },
            axisLine: {
              show: false,
              lineStyle: {
                color: '#fff'
              }
            },
            axisLabel: {
              formatter: '{value}',
              textStyle: {
                color: "#fff",
                fontSize: 16
              }
            }
          }, {
            type: 'value',
            name: "相比去年同期（%）",
            //interval: 6,
            nameTextStyle: {
              fontSize: 16,
              padding: [0, 60, 20, 0]
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
            axisLabel: {
              formatter: '{value}',
              textStyle: {
                color: "#fff",
                fontSize: 16
              }
            }
          }],
          series: []
        };

        let seriesStyle = [{
          type: 'bar',
          barMaxWidth: 30,
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
          type: 'bar',
          barMaxWidth: 30,
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
          type: 'bar',
          barMaxWidth: 30,
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
          type: 'bar',
          barMaxWidth: 30,
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
          }
        }, {
          type: 'bar',
          barMaxWidth: 30,
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
        }]

        this.data.forEach((item, index) => {
          $.extend(true, item, seriesStyle[index])
        })

        option.series = this.data

        //如果有新的配置项的变化 深度拷贝
        this.myChart.setOption(option)
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

</style>
