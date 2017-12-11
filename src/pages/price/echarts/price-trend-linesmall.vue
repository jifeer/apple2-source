<template>
  <div ref="barchart"></div>
</template>

<script>
  import {$, datazoom, resizeMixin} from 'assets/js/common'
  import {dataZoom, tooltipStyle, axisLabel} from 'assets/js/echarts-style'

  export default {
    name: 'lineecharts',
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
      this.myChart = this.$echarts.init(this.$refs.barchart)
      this.initChart()
    },
    computed: {},
    methods: {
      initChart() {
        let echartOpt = {
          fz: '16',
          color: '#fff'
        };
        if (Object.keys(this.echartsData).length) {
          //console.log(this.echartsData)
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
              }
            },
            grid: {
              left: '5%',
              right: '5%',
              bottom: '12%',
              top: '30',
              containLabel: true
            },
            legend: {
              show: false,
              left: 'center',
              //data: ['批发价格', '零售价格', '进口价格', '出口价格','收购价格'],
              data: this.echartsData.legendData,
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
              type: 'category',
              axisLabel: {
                margin: 10,
                textStyle: {
                  fontSize: 12,
                  color: '#fff'
                }
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
              data: this.echartsData.xAxisData
            },
            yAxis: [{
              //axisLabel: axisLabel,
              axisLabel: {
                margin: 10,
                textStyle: {
                  fontSize: 12,
                  color: '#fff'
                }
              },
              type: 'value',
              name: '价格（元/公斤）',
              min: 'dataMin',
              nameTextStyle: {
                fontSize: 12,
                color: '#fff',
                padding: [10, 40, 0, 80]
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
            }],
            series: [
              {
                //name: '零售价格',
                name: this.echartsData.name1,
                type: 'line',
                smooth: true,
                symbolSize: 5,
                symbol: 'circle',
                itemStyle: {
                  normal: {
                    color: '#ff7200',
                    borderWidth: 2,
                    borderColor: '#fff300'
                  }
                },
                data: this.echartsData.data1,

              },
              {
                //name: '批发价格',
                name: this.echartsData.name2,
                type: 'line',
                symbol: 'circle',
                symbolSize: 5,
                itemStyle: {
                  normal: {
                    color: '#00B874',  // 定义 线条及圆点内部的颜色
                    borderColor: '#FEFB00', // 定义圆点边框颜色
                    borderWidth: 2,
                  },
                  emphasis: {
                    borderColor: '#75f908'
                  }
                },
                smooth: true,
                data: this.echartsData.data2,
              },
              {
                //name: '进口价格',
                name: this.echartsData.name3,
                type: 'line',
                symbolSize: 5,
                symbol: 'circle',
                itemStyle: {
                  normal: {
                    color: '#3189c7',
                    borderWidth: 2,
                    borderColor: '#f0f70a'
                  },
                  emphasis: {
                    borderColor: '#f0f70a'
                  }
                },
                smooth: true,
                data: this.echartsData.data3,
              },
              {
                //name: '出口价格',
                name: this.echartsData.name4,
                type: 'line',
                symbolSize: 5,
                symbol: 'circle',
                itemStyle: {
                  normal: {
                    color: '#Fe7090',
                    borderWidth: 2,
                    borderColor: '#fffb00'
                  },
                  emphasis: {
                    borderColor: '#75f908'
                  }
                },
                smooth: true,
                data: this.echartsData.data4,
              },
              {
                //name: '收购价格',
                name: this.echartsData.name5,
                type: 'line',
                symbolSize: 5,
                symbol: 'circle',
                itemStyle: {
                  normal: {
                    color: '#cfd223',
                    borderWidth: 2,
                    borderColor: '#fffb00'
                  },
                  emphasis: {
                    borderColor: '#004574'
                  }
                },
                smooth: true,
                data: this.echartsData.data5,
              }

            ]
          };

          //如果有新的配置项的变化 深度拷贝

          if (Object.keys(this.echartsData.option).length) {
            option = $.extend(true, option, this.echartsData.option)
          }
          this.myChart.setOption(option, true)
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
