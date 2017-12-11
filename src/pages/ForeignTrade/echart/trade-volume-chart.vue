<template>
  <div ref="chart" :style="{width:width,height:height}"></div>
</template>
<script>
  import { $, datazoom, resizeMixin } from 'assets/js/common'
  import { dataZoom, tooltipStyle, axisLabel, legend } from 'assets/js/echarts-style'

  export default {
    mixins: [resizeMixin],
    name: 'trade-chart',
    data() {
      return {}
    },

    props: {
      data: {
        type: Object,
        default: () => {}
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
    mounted() {
      this.$nextTick(() => {
        this.initChart()
      });
      this.myChart = this.$echarts.init(this.$refs.chart);
    },
    methods: {
      initChart() {

        let option = {
          grid: {
            left: '5%',
            right: '7%',
            bottom: '15%',
            top: '22%',
            containLabel: true
          },
          textStyle: {
            fontSize: 10,
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
          },
          calculable: true,
          legend: {
            top: 10,
            right: 'center',
            icon: 'line',
            itemWidth: 15,
            itemHeight: 6,
            data: [{
              name: '全球出口',
              icon: 'rect',
            }, {
              name: '全球变化率',
            }],
            ...legend
          },
          xAxis: [{
            type: 'category',
            axisLabel: axisLabel,
            data: ['2002', '2003', '2004', '2005', '2006', '2007', '2008', '2009', '2010', '2011', '2012', '2013', '2014', '2015', '2016'],
            axisLine: {
              lineStyle: {
                color: 'rgb(26, 72, 89)',
                width: 1
              }
            },
            axisTick: {
              show: true
            },
            splitLine: {
              show: false
            }
          }],
          yAxis: [{
            type: 'value',
            axisLabel: axisLabel,
            name: '贸易量(万吨)',
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
            nameTextStyle: {
              fontSize: 18,
              color: '#fff',
              padding: [0, 40, 15, 0]
            }
          }, {
            type: 'value',
            name: '变化率(%)',
            axisLabel: axisLabel,
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
            },
            nameTextStyle: {
              fontSize: 18,
              color: '#fff',
              padding: [0, 40, 15, 0]
            }
          }],
          series: [{
            name: '全球出口',
            type: 'bar',
            barWidth: 6,
            itemStyle: {
              normal: {
                color: '#40b0fc'
              }
            },
            data: [12, 321, 12, 312, 31, 93, 321, 321, 4,12],
          }, {
            name: '全球变化率',
            type: 'line',
            smooth: true,
            yAxisIndex: 1,
            symbolSize: 8,
            lineStyle: {
              normal: {
                color: '#099d4f'
              }
            },
            itemStyle: {
              normal: {
                color: '#099d4f',
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
                  color: 'rgb(186, 94, 31)',
                  type: 'dashed',
                  width: 2
                }
              },
              data: [{
                yAxis: 0
              }]
            },
            data: [12, 32, 12, 32, 12, 321, 123],
          }],
          dataZoom: datazoom
        };

        //如果有新的配置项的变化 深度拷贝
        option = $.extend(true, option, this.data.option)
        this.myChart.setOption(option);

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
