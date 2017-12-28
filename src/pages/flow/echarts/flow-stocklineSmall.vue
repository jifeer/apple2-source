<template>
  <div ref="chart" :style="{width:width,height:height}"></div>
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
      height: {
        type: String,
        default: '100%'
      },
      width: {
        type: String,
        default: '100%'
      }
    },
    data() {
      return {}
    },
    mounted() {
      this.$nextTick(() => {
        this.initChart()
      });
      this.myChart = this.$echarts.init(this.$refs.chart)
    },
    methods: {
      initChart() {

        let option = {
          grid: {
            left: '5%',
            right: '5%',
            bottom: '10%',
            top: '20%',
            containLabel: true
          },
          tooltip: {
            ...tooltipStyle,
            trigger: 'axis',
          },
          calculable: true,
          xAxis: [{
            type: 'category',
            // data: this.time.split(','),
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
                fontSize: 12
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
              fontSize: 12,
              padding: [0, 0, 0, 0],
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
                fontSize: 12
              }
            }
          }, {
            type: 'value',
            name: "相比去年同期（%）",
            //interval: 6,
            nameTextStyle: {
              fontSize: 12,
              padding: [0, 20, 0, 0]
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
                fontSize: 12
              }
            }
          }],
          series: []
        };

        // let seriesStyle = [{
        //   type: 'bar',
        //   barMaxWidth: 10,
        //   label: {
        //     normal: {
        //       show: false,
        //       position: 'right',
        //       formatter: "{c}%"
        //     }
        //   },
        //   itemStyle: {
        //     normal: {
        //       color: '#33A0EA'
        //     }
        //   }
        // }, {
        //   type: 'line',
        //   symbolSize: 0,
        //   smooth: true,
        //   yAxisIndex: 1,
        //   itemStyle: {
        //     normal: {
        //       color: '#33A0EA'
        //     }
        //   },
        //   markLine: {
        //     yAxisIndex: 1,
        //     symbolSize: 0,
        //     lineStyle: {
        //       normal: {
        //         color: 'red',
        //         type: 'dotted',
        //         width: 1
        //       }
        //     },
        //     data: [{
        //       name: 'Y 轴值为 100 的水平线',
        //       yAxis: 0
        //     }]
        //   }
        // },{
        //   type: 'bar',
        //   barMaxWidth: 30,
        //   label: {
        //     normal: {
        //       show: false,
        //       position: 'right',
        //       formatter: "{c}%"
        //     }
        //   },
        //   itemStyle: {
        //     normal: {
        //       color: '#C7C516'
        //     }
        //   }
        // }, {
        //   type: 'line',
        //   symbolSize: 0,
        //   smooth: true,
        //   yAxisIndex: 1,
        //   itemStyle: {
        //     normal: {
        //       color: '#C7C516'
        //     }
        //   }
        // },{
        //   type: 'bar',
        //   barMaxWidth: 10,
        //   label: {
        //     normal: {
        //       show: false,
        //       position: 'right',
        //       formatter: "{c}%"
        //     }
        //   },
        //   itemStyle: {
        //     normal: {
        //       color: '#119368'
        //     }
        //   }
        // }, {
        //   type: 'line',
        //   symbolSize: 0,
        //   smooth: true,
        //   yAxisIndex: 1,
        //   itemStyle: {
        //     normal: {
        //       color: '#119368'
        //     }
        //   }
        // },{
        //   type: 'bar',
        //   barMaxWidth: 10,
        //   label: {
        //     normal: {
        //       show: false,
        //       position: 'right',
        //       formatter: "{c}%"
        //     }
        //   },
        //   itemStyle: {
        //     normal: {
        //       color: '#CF7013'
        //     }
        //   }
        // }, {
        //   type: 'line',
        //   symbolSize: 0,
        //   smooth: true,
        //   yAxisIndex: 1,
        //   itemStyle: {
        //     normal: {
        //       color: '#CF7013'
        //     }
        //   }
        // },{
        //   type: 'bar',
        //   barMaxWidth: 10,
        //   label: {
        //     normal: {
        //       show: false,
        //       position: 'right',
        //       formatter: "{c}%"
        //     }
        //   },
        //   itemStyle: {
        //     normal: {
        //       color: '#C7C516'
        //     }
        //   }
        // }, {
        //   type: 'line',
        //   symbolSize: 0,
        //   smooth: true,
        //   yAxisIndex: 1,
        //   itemStyle: {
        //     normal: {
        //       color: '#C7C516'
        //     }
        //   }
        // },{
        //   type: 'bar',
        //   barMaxWidth: 30,
        //   label: {
        //     normal: {
        //       show: false,
        //       position: 'right',
        //       formatter: "{c}%"
        //     }
        //   },
        //   itemStyle: {
        //     normal: {
        //       color: '#AD3335'
        //     }
        //   }
        // }, {
        //   type: 'line',
        //   symbolSize: 0,
        //   smooth: true,
        //   yAxisIndex: 1,
        //   itemStyle: {
        //     normal: {
        //       color: '#AD3335'
        //     }
        //   }
        // },]


        let seriesStyle = [{
          type: 'bar',
          barMaxWidth: 10,
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
        },{
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
          barMaxWidth: 10,
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
        },{
          type: 'bar',
          barMaxWidth: 10,
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
        },  {
          type: 'bar',
          barMaxWidth: 10,
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
              color: '#AD3335'
            }
          }
        }]
        // option.legend.data = this.data.map(item => item.name)

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
