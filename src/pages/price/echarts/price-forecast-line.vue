<template>
  <div ref="lineChart"></div>
</template>

<script>
  import {$, resizeMixin} from 'assets/js/common'
  import {dataZoom, tooltipStyle, axisLabel} from 'assets/js/echarts-style'

  export default {
    name: 'lineChart',
    mixins: [resizeMixin],
    props: {
      lineChart: {
        type: Object,
        default: () => {
        }
      }
    },
    data() {
      return {
        myChart: null
      }
    },
    mounted() {
      this.myChart = this.$echarts.init(this.$refs.lineChart)
    },
    watch: {
      lineChart: {
        handler: function (val, oldVal) {
          this.initChart()
        },
        deep: true  //增加deep 观察对象的子对象变化
      }
    },
    computed: {},
    methods: {
      initChart() {
        if (Object.keys(this.lineChart).length) {
          //console.log(this.lineChart)
          let echartOpt = {
            fz: '16',
            color: '#fff'
          };

          let option = {
            tooltip: {
              ...tooltipStyle,
              trigger: 'axis',
              axisPointer: {
                show: true,
                type: 'line',
                snap: true,
                lineStyle: {
                  color: '#CF6900',
                  width: 2,
                  type: "dashed"
                }
              },
              backgroundColor: '#099d4f',
              //formatter: '{b}<br />{a0} : {c0}<br />{a1} : {c1}<br />{a2} : {c2}'
            },
            grid: {
              left: '3%',
              right: '3%',
              bottom: '1%',
              top: '20%',
              containLabel: true
            },
            legend: {
              left: 'center',
              data: ['预测价格', '实际价格'],
              icon: 'line',
              itemWidth: 15,
              textStyle: {
                fontSize: 16,
                color: "#fff",
                padding: [0, 5]
              }
            },
            color: ["#1abc9c", "#1abc9c", "#ffaa3d", "#0130fb", "#0130fb"],
            xAxis: {
              name: '',
              type: 'category',
              axisLabel: axisLabel,
              nameTextStyle: {
                fontSize: 16,
                color: '#fff',
                padding: [50, 0, 0, 0]
              },
              axisTick: {
                show: true
              },
              axisLine: {
                lineStyle: {
                  color: '#036ca8'
                }
              },
              splitLine: {
                show: false
              },
              //data: ['2016-01','2016-02','2016-03','2016-04','2016-05','2016-06','2016-07','2016-08']
              data: this.lineChart.Xdata
            },
            yAxis: {
              axisLabel: axisLabel,
              type: 'value',
              name: '元/公斤',
              min: 'dataMin',
              nameTextStyle: {
                fontSize: 18,
                color: '#fff',
                padding: [0, 40, 15, 0]
              },
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
            },
            series: [
              {
                name: '预测价格',
                type: 'line',
                /*symbolSize: 0,
                itemStyle: {
                  normal: {
                    color: 'rgb(222,119,53)',
                    borderWidth: 2
                  },
                  emphasis: {
                    borderColor: '#fc7303'
                  }
                },*/
                smooth: true,
                lineStyle: {
                  normal: {
                    color: 'rgb(222,119,53)',
                  }
                },
                itemStyle: {
                  normal: {
                    color: 'rgb(222,119,53)',
                    opacity: 0
                  },
                  emphasis: {
                    color: 'rgb(222,119,53)',
                    opacity: 1,
                    borderColor: 'rgb(254, 253, 56)',
                    borderWidth: 2
                  }
                },
                //data:[70,110,145,165,135,120,140,160],
                data: this.lineChart.data1

              },
              {
                name: '实际价格',
                type: 'line',
                /*symbolSize: 0,
                itemStyle: {
                  normal: {
                    color: 'rgb(94,247,82)',
                    borderWidth: 2
                  },
                  emphasis: {
                    borderColor: '#75f908'
                  }
                },*/
                smooth: true,
                lineStyle: {
                  normal: {
                    color: 'rgb(94,247,82)',
                  }
                },
                itemStyle: {
                  normal: {
                    color: 'rgb(94,247,82)',
                    opacity: 0
                  },
                  emphasis: {
                    color: 'rgb(94,247,82)',
                    opacity: 1,
                    borderColor: 'rgb(254, 253, 56)',
                    borderWidth: 2
                  }
                },
                //data:[30,60,70,80,125,70,100,150,],
                data: this.lineChart.data2
              }
            ]
          };
          //如果有新的配置项的变化 深度拷贝
          if (Object.keys(this.lineChart.option).length) {
            option = $.extend(true, option, this.lineChart.option)
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

    }


  }
</script>

<style lang="scss" scoped>
  @import "./../../../assets/css/_variable.scss";
  @import "./../../../assets/css/_mixin.scss";

</style>
