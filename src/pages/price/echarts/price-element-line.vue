<template>
  <div ref="linechart"></div>
</template>

<script>
  import {$, resizeMixin} from 'assets/js/common.js'
  import {dataZoom, tooltipStyle, axisLabel} from 'assets/js/echarts-style'

  export default {
    name: 'linechart',
    mixins: [resizeMixin],
    data() {
      return {
        myChart: null
      }
    },
    props: {
      linechart: {
        type: Object,
        default: null
      },

    },
    mounted() {
      //console.log(this.linechart)
      this.myChart = this.$echarts.init(this.$refs.linechart)
      this.$nextTick(() => {
        this.initChart()
      })
    },
    watch: {
      linechart: {
        handler: function (val, oldVal) {
          this.initChart()
        },
        deep: true  //增加deep 观察对象的子对象变化
      }
    },
    computed: {},
    methods: {
      initChart() {
        if (Object.keys(this.linechart).length) {
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
              left: '1%',
              right: '1%',
              bottom: '15%',
              top: '18%',
              containLabel: true
            },
            legend: {
              left: 'center',
              //data: ['产量变化率', '批发价格变化率'],
              data: this.linechart.legendData,
              icon: 'line',
              textStyle: {
                fontSize: 16,
                color: "#fff",
                padding: [5, 5]
              }
            },
            color: ["#1abc9c", "#1abc9c", "#ffaa3d", "#0130fb", "#0130fb"],
            xAxis: {
              type: 'category',
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
                  type: 'dotted',
                  color: '#794A24'
                }
              },
              splitLine: {
                show: false
              },
              //data: ['2016-01', '2016-02', '2016-03', '2016-04', '2016-05', '2016-06', '2016-07', '2016-08']
              data: this.linechart.Xdata
            },
            yAxis: [{
              axisLabel: {
                margin: 18,
                textStyle: {
                  fontSize: 16,
                  color: '#fff'
                }
              },
              type: 'value',
              name: '批发价格变化率(%)',
              nameTextStyle: {
                fontSize: 16,
                color: '#fff',
                padding: [0, 40, 15, 80]
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
              }
            }, {
              axisLabel: {
                margin: 18,
                textStyle: {
                  fontSize: 16,
                  color: '#fff'
                }
              },
              nameTextStyle: {
                fontSize: 16,
                color: '#fff',
                padding: [0, 0, 15, 30]
              },
              type: 'value',
              name: '    %',
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
            }
            ],
            dataZoom: [{
              "show": true,
              "height": 15,
              "xAxisIndex": [0],

              left: '60',
              right: '60',
              bottom: '10',
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
              "start": 0,
              "end": 100,
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
              },
              borderColor: "#3458B4"
            }, {
              "type": "inside",
              "show": true,
              "height": 15,
              "start": 1,
              "end": 35
            }],
            series: [
              {
                name: '批发价格变化率',
                //name: '',
                type: 'line',
                smooth: true,
                yAxisIndex: 0,
                symbolSize: 10,
                symbol: 'circle',
                itemStyle: {
                  normal: {
                    color: '#ff7200',
                    borderWidth: 2,
                    borderColor: '#fff300'
                  }
                },
                //data: [-7, 5, -4, 8, -6, 5, 6, 8],
                data: this.linechart.data1
              },
              {
                //name: '产量变化率',
                name: this.linechart.yName,
                type: 'line',
                symbolSize: 10,
                yAxisIndex: 1,
                symbol: 'circle',
                itemStyle: {
                  normal: {
                    color: '#099d4f',
                    borderWidth: 2,
                    borderColor: '#fff300'
                  },
                  emphasis: {
                    borderColor: '#75f908'
                  }
                },
                smooth: true,
                //data: [-3, -6, 7, 5, 8, -7, 5, 7],
                data: this.linechart.data2
              }
            ]
          };
          //如果有新的配置项的变化 深度拷贝
          if (Object.keys(this.linechart.option).length) {
            option = $.extend(true, option, this.linechart.option)
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
