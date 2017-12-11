<template>
  <div ref="chart" :style="{width:width,height:height}">

  </div>
</template>
<script>
  import {resizeMixin} from 'assets/js/common'

  export default {
    mixins: [resizeMixin],
    name: 'world-plant-trend',
    data(){
      return {
        myChart: {}
      }
    },

    props: {
      echartsData: {
        type: Object,
        default: () => {

        }
      },
      height: {
        type: String,
        default: '100%'
      },
      width: {
        type: String,
        default: '100%'
      }
    },

    watch: {
      echartsData: {
        handler: function (val, oldVal) {
          this.initChart()
        },
        deep: true  //增加deep 观察对象的子对象变化
      }
    },

    mounted() {
      this.myChart = this.$echarts.init(this.$refs.chart);
      this.initOption()
    },
    computed: {},

    methods: {
      initOption(){
        this.option = {
          grid: {
            left: '4%',
            right: '2%',
            bottom: '15%',
            top: '22%',
            containLabel: true
          },
          textStyle: {
            fontSize: 12,
            fontWeight: 'lighter'
          },
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              type: 'shadow',
              shadowStyle: {
                color: 'rgba(0, 255, 102, .05)'
              }
            },
            backgroundColor: '#099d4f',
            formatter: function (params) {
              return `<ul style="list-style: none; text-align: left; padding: 6px;">
                        <li>${params[0].name}</li>
                        <li>${params[0].seriesName}:${params[0].data}万亩</li>
                        <li>${params[1].seriesName}:${params[1].data}%</li>
                        <li>${params[2].seriesName}:${params[2].data}万亩</li>
                        <li>${params[3].seriesName}:${params[3].data}%</li>
                      </ul>`
            }
          },
          calculable: true,
          legend: {
            top: 0,
            right: 'center',
            icon: 'line',
            itemWidth: 11,
            itemHeight: 6,
            data: [
              {
                name: '全球种植面积',
                icon: 'rect',
              }, {
                name: '全球变化率',
              },
              {
                name: '中国种植面积',
                icon: 'rect',
              }, {
                name: '中国变化率',
              },],
            textStyle: {
              color: "#fff",
              padding: [0, 0, 0, 3],
            }
          },
          xAxis: [{
            type: 'category',
            data: [],
            axisLine: {
              lineStyle: {
                color: 'rgb(26, 72, 89)',
                width: 2
              }
            },
            axisTick: {
              show: true
            },
            axisLabel: {
              formatter: '{value}',
              textStyle: {
                fontSize: 12,
                color: '#fff',
                fontWeight: 'lighter'
              }
            },
            splitLine: {
              show: false,

            },
          }],
          yAxis: [{
            type: 'value',
            name: '种植面积（万亩）',
            nameTextStyle: {
              color: '#fff'
            },
            axisLabel: {
              formatter: '{value}',
              textStyle: {
                fontSize: 12,
                color: '#fff',
                fontWeight: 'lighter'
              }
            },
            axisLine: {
              show: false
            },
            splitLine: {
              show: true,
              lineStyle: {
                color: 'rgb(26, 72, 89)',
                type: "dotted"
              }
            },
            axisTick: {
              show: false
            },

          }, {
            type: 'value',
            name: '变化率（%）',
            nameTextStyle: {
              padding: [0, 6,0,0],
              color: '#fff'
            },
            axisLabel: {
              show: true,
              formatter: '{value}',
              textStyle: {
                fontSize: 12,
                color: '#fff',
                fontWeight: 'lighter'
              }
            },
            axisTick: {
              show: false
            },
            axisLine: {
              show: false
            },
            splitLine: {
              show: false,
              lineStyle: {
                type: "dotted"
              }
            }

          }],
          series: [
            {
              name: '全球种植面积',
              type: 'bar',
              barWidth: 6,
              itemStyle: {
                normal: {
                  color: '#3aa1e7'
                }
              },
              data: [],
            }, {
              name: '全球变化率',
              type: 'line',
              smooth: true,
              yAxisIndex: 1,
              symbolSize: 8,
              lineStyle: {
                normal: {
                  color: '#01a061'
                }
              },
              itemStyle: {
                normal: {
                  color: '#01a061',
                  opacity: 0
                }
              },
              markLine: {
                symbolSize: 0,
                label: {
                  normal: {
                    show: false
                  }
                },
                lineStyle: {
                  normal: {
                    color: '#cd6908',
                    type: 'dashed',
                    width: 1
                  }
                },
                data: [
                  {
                    yAxis: 0
                  }
                ]
              },
              data: [],
            },
            {
              name: '中国种植面积',
              type: 'bar',
              barWidth: 6,
              itemStyle: {
                normal: {
                  color: '#d6d14e'
                }
              },
              data: [],
            }, {
              name: '中国变化率',
              type: 'line',
              smooth: true,
              yAxisIndex: 1,
              symbolSize: 8,
              lineStyle: {
                normal: {
                  color: '#db9a35'
                }
              },
              itemStyle: {
                normal: {
                  color: '#db9a35',
                  opacity: 0
                }
              },
              markLine: {
                symbolSize: 0,
                label: {
                  normal: {
                    show: false
                  }
                },
                lineStyle: {
                  normal: {
                    color: '#cd6908',
                    type: 'dashed',
                    width: 2
                  }
                },
                data: [
                  {
                    yAxis: 0
                  }
                ]
              },
              data: [],
            }],
//          dataZoom: datazoom
        };
      },

      // 初始化图表
      initChart() {

        //如果有新的配置项的变化 深度拷贝
        /*if (Object.keys(this.echartsData.option).length) {
          this.option = $.extend(true, this.option, this.echartsData.option)
        }*/

        // 填充数据
        this.option.xAxis[0].data = this.echartsData.xdata // x轴线
        this.option.series[0].data = this.echartsData.wdata1 // 全球种植面积
        this.option.series[1].data = this.echartsData.wdata2 // 全球变化率
        this.option.series[2].data = this.echartsData.cdata1 // 中国种植面积
        this.option.series[3].data = this.echartsData.cdata2 // 中国变化率

        // 渲染图表
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
    }
  }
</script>

<style lang="scss" scoped>
  @import "./../../../assets/css/_variable.scss";
  @import "./../../../assets/css/_mixin.scss";
</style>
