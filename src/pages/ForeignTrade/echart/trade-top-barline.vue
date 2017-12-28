<template>
  <div ref="topBarline">
  </div>
</template>
<script>
  import { $, resizeMixin } from 'assets/js/common'
  import { dataZoom, tooltipStyle, MarkArea, axisLabel} from 'assets/js/echarts-style'

  export default {
    name: 'topBarLine',
    mixins: [resizeMixin],
    props: {
      data: {
        type: Array,
        default: () => []
      },
      appleType: {
        type: String,
        default: '鲜苹果'
      },
      tradeType: {
        type: String,
        default: '贸易量'
      }
    },
    data() {
      return {
      }
    },
    mounted() {
      this.initOption()
      this.initChart()
    },
    methods: {
      initOption() {
        this.myChart = this.$echarts.init(this.$refs.topBarline)
        this.option = {
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
            top: '20%',
            left: '2%',
            right: '1%',
            bottom: '25',
            containLabel: true
          },
          tooltip: {
            trigger: 'axis',
            ...tooltipStyle,
          },
          calculable: true,
          legend: {
            top: 10,
            itemWidth: 15,
            itemHeight: 7,

            itemGap: 30, //两图例之间距离
            textStyle: {
              fontSize: 16,
              color: "#fff",
              padding: [0, 5]
            },
            data: []
          },
          xAxis: [{
            type: 'category',
            data: [],
            axisLabel: axisLabel,
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
            }
          }],
          yAxis: [{
            axisLabel: axisLabel,
            type: 'value',
            //name: '(万吨)',
            name:'',
            nameTextStyle: {
              fontSize: 18,
              color: '#fff',
              padding: [0, -25, 15, 0]
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
            axisLabel: axisLabel,
            nameTextStyle: {
              fontSize: 18,
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
          }],
          series: [{
            name: '出口量',
            type: 'bar',
            barMaxWidth: 16,
            itemStyle: {
              normal: {
                color: '#40b0fc'
              }
            },
            data: []
          }, {
            name: '出口量变化率',
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
            data: []
          }, {
            name: '进口量',
            type: 'bar',
            barMaxWidth: 16,
            itemStyle: {
              normal: {
                color: '#d2c730'
              }
            },
            data: []
          }, {
            name: '进口量变化率',
            type: 'line',
            smooth: true,
            yAxisIndex: 1,
            symbolSize: 8,
            lineStyle: {
              normal: {
                color: '#e98f35'
              }
            },
            itemStyle: {
              normal: {
                color: '#e98f35',
                opacity: 0
              }
            },
            markLine: {
              label: {
                normal: {
                  show: false
                }
              },
              yAxisIndex: 1,
              symbolSize: 0,
              lineStyle: {
                normal: {
                  color: 'red',
                  type: 'dotted',
                  width: 1
                }
              },
              data: [{
                yAxis: 0
              }]
            },
            data: []
          }]
        }
      },
      initChart() {
        let legend = this.tradeType === '贸易量' ? ['出口量', '出口量同比', '进口量', '进口量同比'] : ['出口额', '出口额同比', '进口额', '进口额同比']
        this.option.legend.data = legend

        let yUnite = ''
        if (this.appleType !== '苹果干') {
          yUnite = this.tradeType === '贸易量' ? '万吨' : '万美元'
        } else {
          yUnite = this.tradeType === '贸易量' ? '吨' : '美元'
        }

        this.option.series[0].data = this.data[0].data
        this.option.series[1].data = this.data[2].data
        this.option.series[2].data = this.data[1].data
        this.option.series[3].data = this.data[3].data
        this.option.xAxis[0].data = this.data[4].data
        this.option.yAxis[0].name = `${this.appleType}(${yUnite})`

        this.option.series.forEach((item, index) => {
          item.name = legend[index]
        })

        this.myChart.setOption(this.option, true)
      },
      //echart 图表自适应
      _windowResizeHandler() {
        this.myChart.resize()
      },
      // 销毁echart 图表
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
    }
  }

</script>
<style lang="scss" scoped>
  @import "./../../../assets/css/_variable.scss";
  @import "./../../../assets/css/_mixin.scss";

</style>
