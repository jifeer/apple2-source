<template>
  <div ref="echartsData"></div>
</template>

<script>
  import {$, extend, resizeMixin} from 'assets/js/common.js'
  import {dataZoom, tooltipStyle, axisLabel} from 'assets/js/echarts-style'

  export default {
    name: 'seasonalEcharts',
    mixins: [resizeMixin],
    data() {
      return {
        myChart: null
      }
    },
    props: {
      echartsData: {
        type: Object,
        default: null
      },

    },
    mounted() {
      this.myChart = this.$echarts.init(this.$refs.echartsData)
      //console.log(this.echartsData)
      this.$nextTick(() => {
        this.initChart()
      })
    },
    computed: {},
    methods: {
      initChart() {
        if (Object.keys(this.echartsData).length) {
          let option = {
            tooltip: {
              show: true,
              trigger: 'axis',
              ...tooltipStyle,
              axisPointer: {
                lineStyle: {
                  opacity: 0
                }
              }
            },
            legend: {
              show: true,
              itemHeight: 4,
              itemGap: 13,
              data: ['批发价格', '零售价格'],
              x: 'center',
              y: 'top',
              icon: 'line',
              itemWidth: 15,
              textStyle: {
                fontSize: 16,
                color: "#fff",
                padding: [0, 5]
              }
            },
            grid: {
              left: '3%',
              right: '3%',
              bottom: '15%',
              top: '10%',
              containLabel: true
            },
            xAxis: [{
              type: 'category',
              show: false,
              axisLabel: {
                margin: 18,
                textStyle: {
                  fontSize: 16,
                  color: '#fff'
                }
              },
              axisTick: {
                show: false
              },
              axisLine: {
                lineStyle: {
                  color: '#036ca8'
                }
              },
              splitLine: {
                show: false
              },
              data: this.echartsData.xAxisData
            }, {
              show: false,
              name: 'fuzhu',
              boundaryGap: false,
              data: ['10月', '11月', '12月', '1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', 'oth月']
            }],
            yAxis: [{
              //axisLabel: axisLabel,
              axisLabel: {
                margin: 18,
                textStyle: {
                  fontSize: 16,
                  color: '#fff'
                }
              },
              type: 'value',
              name: '',
              min: 'dataMin',
              /*nameTextStyle: {
                fontSize: 16,
                color: '#fff',
                padding: [0, 0, 15, 60]
              },*/
              axisLine: {
                show: false
              },
              splitLine: {
                show: true,
                lineStyle: {
                  color: 'rgb(26, 72, 89)',
                  type: "dotted"
                },
                formatter: '{value}'
              },
              axisTick: {
                show: false
              }
            }],
            series: [{
              name: '批发价格',
              type: 'line',
              smooth: true,
              lineStyle: {
                normal: {
                  color: 'rgb(233, 76, 101)',
                }
              },
              itemStyle: {
                normal: {
                  color: 'rgb(228, 74, 99)',
                  opacity: 0
                },
                emphasis: {
                  color: 'rgb(228, 74, 99)',
                  opacity: 1,
                  borderColor: 'rgb(254, 253, 56)',
                  borderWidth: 2
                }
              },
              data: this.echartsData.data1
            }, {
              name: '零售价格',
              type: 'line',
              smooth: true,
              lineStyle: {
                normal: {
                  color: '#099d4f'
                }
              },
              itemStyle: {
                normal: {
                  color: '#099d4f',
                  opacity: 0
                },
                emphasis: {
                  color: '#099d4f',
                  opacity: 1,
                  borderColor: 'rgb(254, 253, 56)',
                  borderWidth: 2
                }
              },
              data: this.echartsData.data2
            }, {
              name: '零售1',
              type: 'line',
              smooth: true,
              lineStyle: {
                normal: {
                  color: '#3492ce'
                }
              },
              itemStyle: {
                normal: {
                  color: '#099d4f',
                  opacity: 0
                },
                emphasis: {
                  color: '#099d4f',
                  opacity: 1,
                  borderColor: 'rgb(254, 253, 56)',
                  borderWidth: 2
                }
              },
              data: this.echartsData.data3
            }, {
              name: '批发1',
              type: 'line',
              smooth: true,
              lineStyle: {
                normal: {
                  color: '#d0b31f'
                }
              },
              itemStyle: {
                normal: {
                  color: '#099d4f',
                  opacity: 0
                },
                emphasis: {
                  color: '#099d4f',
                  opacity: 1,
                  borderColor: 'rgb(254, 253, 56)',
                  borderWidth: 2
                }
              },
              data: this.echartsData.data4
            }, {
              xAxisIndex: 1,
              // show: false,
              name: '辅助',
              type: 'line',
              data: [],
              markArea: {
                silent: true,
                label: {
                  normal: {
                    offset: [0, -5],
                    align: 'center',
                    position: 'top',
                    textStyle: {
                      color: '#fff',
                      fontSize: 16
                    }
                  }
                },
                data: [
                  [{
                    name: '第一季度',
                    coord: [0],
                    itemStyle: {
                      normal: {
                        color: 'rgba(4, 94, 127, 0.8)'
                      }
                    }
                  }, {
                    coord: [3]
                  }],
                  [{
                    name: '第二季度',
                    coord: [3],
                    itemStyle: {
                      normal: {
                        color: 'rgba(24, 67, 105, 0.5)'
                      }
                    }
                  }, {
                    coord: [6]
                  }],
                  [{
                    name: '第三季度',
                    coord: [6],
                    itemStyle: {
                      normal: {
                        color: 'rgba(18, 51, 83, 0.3)'
                      }
                    }
                  }, {
                    coord: [9]
                  }],
                  [{
                    name: '第四季度',
                    coord: [9],
                    itemStyle: {
                      normal: {
                        color: 'rgba(13, 36, 63, 0.1)'
                      }
                    }
                  }, {
                    coord: [12]
                  }]
                ]
              },
            }]

          };
          //如果有新的配置项的变化 深度拷贝
          if (Object.keys(this.echartsData.option).length) {
            option = $.extend(true, option, this.echartsData.option)
          }
          this.myChart.setOption(option, true);
        }
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
    // watch:{
    //   echartsData: {
    //     handler: function (val, oldVal) {
    //       console.log(val)
    //       this.initChart()
    //     },
    //     deep: true  //增加deep 观察对象的子对象变化
    //   }
    // }


  }
</script>

<style lang="scss" scoped>
  @import "./../../../assets/css/_variable.scss";
  @import "./../../../assets/css/_mixin.scss";


</style>
