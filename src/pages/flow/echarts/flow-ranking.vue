<template>
  <div ref="rankingEchart" class="rankingEchart-wrapper">
  </div>
</template>

<script>
  import {extend, $, resizeMixin} from 'assets/js/common'

  require('echarts/lib/component/tooltip')
  require('echarts/lib/component/legend')
  export default {
    name: 'rankingEchart',
    mixins: [resizeMixin],
    //props: ['echartsData'],
    props: {
      rankingEchart: {
        type: Object,
        default: null
      },

    },
    watch: {
      rankingEchart: {
        handler: function (val, oldVal) {
          this.initChart()
        },
        deep: true  //增加deep 观察对象的子对象变化
      }
    },
    mounted() {
      this.myChart = this.$echarts.init(this.$refs.rankingEchart)
      this.initChart()
    },

    methods: {
      initChart() {
        let echartOpt = {
          fz: '16',
          color: '#fff'
        };

        //获取data里的最大最小值
        Array.prototype.max = function () {
          return Math.max.apply({}, this)
        }
        Array.prototype.min = function () {
          return Math.min.apply({}, this)
        }
        let maxData = (this.rankingEchart.data).max();
        if (Object.keys(this.rankingEchart).length) {
          let option = {
            grid: {
              left: 90,
              top: 0,
              bottom: 0
            },
            tooltip: {
              formatter: '{b}:{c}',
              backgroundColor: '#099d4f',
            },
            yAxis: [{
              interval: 0,
              axisLabel: {
                margin: 10,
                textStyle: {
                  fontSize: echartOpt.fz,
                  /*color: function (value, index) {
                    return index >= 7 ? '#eeeff1' : '#63676e';
                  }*/
                  color: '#eeeff1'
                }
              },
              //offset:'15',
              splitLine: {
                show: false
              },
              axisTick: {
                show: false
              },
              axisLine: {
                show: false
              },
              data: this.rankingEchart.yAxisData
            }, {
              // 辅助y 轴
              show: true,
              interval: 0,
              axisLabel: {
                textStyle: {
                  fontSize: echartOpt.fz,
                  color: function (value, index) {
                    return index >= 7 ? 'red' : '#fff';
                  }

                }
              },
              splitLine: {
                show: false
              },
              axisTick: {
                show: false
              },
              axisLine: {
                show: false,
                lineStyle: {
                  color: echartOpt.color,
                  fontSize: echartOpt.fz
                }

              },
              offset: '50',
              data: this.rankingEchart.yNumber,
              position: 'left',

            }],
            xAxis: {
              max: maxData * 1.5,
              show: false,
              axisLine: {
                show: false
              }
            },
            color: ['#162f66'],
            series: [{
              // 辅助系列
              type: 'bar',
              silent: true,
              barGap: '-100%',
              itemStyle: {
                normal: {
                  color: '#1e3045',
                  /*barBorderRadius: 5,
                  shadowColor: 'rgba(37, 90, 162, 0.8)',
                  shadowBlur: 20*/
                }
              },
              barWidth: 10,
              data: this.rankingEchart.data.map(function (val) {
                return maxData * 2;
              })
            }, {
              type: 'bar',
              data: this.rankingEchart.data,
              barWidth: 10,
              label: {
                normal: {
                  position: 'right',
                  show: true,
                  textStyle: {
                    fontSize: echartOpt.fz,
                    color: "#3aa1e8"
                  },
                  formatter: function (value) {
                    return value.data;
                  }
                }
              },
              itemStyle: {
                normal: {
                  //barBorderWidth:10,
                  //barBorderRadius: 5,
                  color: '#40b0fc'
                },
                emphasis: {
                  color: '#099d4f',
                }
              }
            }]

          }

          //如果有新的配置项的变化 深度拷贝
          if (Object.keys(this.rankingEchart.option).length) {
            option = $.extend(true, option, this.rankingEchart.option)
          }
          //console.log(option)
          this.myChart.setOption(option);
        }

      },
      _windowResizeHandler() {
        this.myChart.resize()
      },
      _destroyEchart() {
        this.myChart.dispose()
      }
    },
  }
</script>

<style lang="scss" scoped>
  @import "./../../../assets/css/_variable.scss";
  @import "./../../../assets/css/_mixin.scss";

  .rankingEchart-wrapper {
    width: 100%;
    height: 100%;
  }
</style>
