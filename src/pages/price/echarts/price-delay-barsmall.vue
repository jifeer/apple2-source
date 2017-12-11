<template>
  <div ref="barchart"></div>
</template>

<script>
  import {$, datazoom, resizeMixin} from 'assets/js/common'
  import {dataZoom, tooltipStyle, axisLabel} from 'assets/js/echarts-style'

  export default {
    name: 'barecharts',
    mixins: [resizeMixin],
    echartsData: {
      type: Object,
      default: null
    },
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
      selectedName: ''
    },
    watch: {
      echartsData: {
        handler: function (val, oldVal) {
          //console.log(val)
          this.initChart()
        },
        deep: true  //增加deep 观察对象的子对象变化

      }
    },
    mounted() {
      this.myChart = this.$echarts.init(this.$refs.barchart)
    },
    computed: {},
    methods: {
      initChart() {
        let echartOpt = {
          fz: '16',
          color: '#fff'
        };
        let that = this;
        if (Object.keys(this.echartsData).length) {
          let option = {
            backgroundColor: '#071429',
            tooltip: {
              trigger: 'item',
              ...tooltipStyle,
              formatter: function (params) {
                let str = that.selectedName + '>' + params.name + '<br/>价格传导滞后时间：' + '<b style="color:#ff7a00;font-weight:blod;font-size:18px;">' + params.value + '</b>' + '周';
                return str;
              }
            },
            label: {
              normal: {
                textStyle: {
                  color: "#ff3b00"
                }
              },
              emphasis: {
                textStyle: {
                  color: "#ff3b00"
                }
              }
            },
            grid: {
              left: '5%',
              right: '5%',
              bottom: '10%',
              top: '30',
              containLabel: true
            },
            yAxis: {
              axisLabel: {
                textStyle: {
                  color: '#fff',
                  fontSize: 12,
                  fontWeight: 'lighter'
                },
                margin: 10,
              },
              type: 'value',
              name: '时间（周）',
              min: '0.5',
              nameTextStyle: {
                fontSize: 12,
                color: '#fff',
                padding: [10, 40, 0, 60]
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
            xAxis: {
              /*name: '销地',*/
              type: 'category',
              inverse: 0,
              axisLabel: {
                textStyle: {
                  color: '#fff',
                  fontSize: 12,
                  fontWeight: 'lighter'
                },
                margin: 10,
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
              data: this.echartsData.xAxisData,
            },
            series: [
              {
                name: '',
                type: 'bar',
                barMaxWidth: 10,
                label: {
                  normal: {
                    show: false
                  }
                },
                itemStyle: {
                  normal: {
                    color: '#3aa1e7'
                  }
                },
                emphasis: {},
                // 选传涨幅从高到低 再传跌幅从低到高都转成正数
                data: this.echartsData.seriesData
              }
            ]
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

    }


  }
</script>

<style lang="scss" scoped>
  @import "./../../../assets/css/_variable.scss";
  @import "./../../../assets/css/_mixin.scss";


</style>
