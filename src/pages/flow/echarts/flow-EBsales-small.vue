<template>
  <div ref="businesmapChart" class="businesmapChart-wrapper">

  </div>
</template>

<script>
  import {datazoom, $, resizeMixin} from 'assets/js/common'
  import {dataZoom, tooltipStyle} from 'assets/js/echarts-style'

  export default {
    name: 'lineChart',
    mixins: [resizeMixin],
    data() {
      return {
        myChart: null
      };
    },
    props: {
      echartsData: {
        type: Object,
        default: () => {
        }
      },

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
      this.myChart = this.$echarts.init(this.$refs.businesmapChart)
    },
    methods: {
      initChart() {
        if (Object.keys(this.echartsData).length) {
          let option = {
            tooltip: {
              trigger: 'axis',
              ...tooltipStyle,
              axisPointer: {
                type: 'line',
                lineStyle: {
                  color: 'rgb(216, 115, 24)',
                  type: 'dotted',
                  width: 2
                }
              }
            },
            grid: {
              top: '18%',
              right: '5%',
              left: '12%',
              bottom: '25%',
            },
            xAxis: {
              type: 'category',
              boundaryGap: true,
              axisLine: {
                lineStyle: {
                  color: 'rgb(26, 72, 89)'
                }
              },
              axisLabel: {
                textStyle: {
                  color: '#fff',
                  fontSize: 12
                }
              },
              data: this.echartsData.xdata
            },
            yAxis: {
              name: '月销量（吨）',
              nameTextStyle: {
                fontSize: 12,
                color: '#fff',
                padding: [20, 0, 0, 20]
              },
              //nameGap: '25',
              type: 'value',
              show: true,
              min: '0',
              axisTick: {
                show: false
              },
              axisLine: {
                show: false,
              },
              axisLabel: {
                margin: 10,
                formatter:(params)=>{
                  return params
                },
                textStyle: {
                  color: '#fff',
                  fontSize: 12
                }
              },
              splitLine: {
                show: true,
                formatter: '{value}',
                lineStyle: {
                  color: 'rgb(26, 72, 89)',
                  type: 'dotted'
                }
              }
            },
            series: [
              {
                name: '电商销量',
                type: 'line',
                smooth: true,
                symbol: 'circle',
                symbolSize: 8,
                //hoverAnimation: false,
                lineStyle: {
                  normal: {
                    color: '#19b776',
                  }
                },
                itemStyle: {
                  normal: {
                    color: '#19b776',
                    //opacity: 0
                    borderColor: 'rgb(254, 253, 56)',
                    borderWidth: 2
                  },
                  emphasis: {
                    color: 'rgb(228, 74, 99)',
                    opacity: 1,
                    borderColor: 'rgb(254, 253, 56)',
                    borderWidth: 2
                  }
                },

                data: this.echartsData.data,
              }
            ],
            dataZoom: ''
          };

          //如果有新的配置项的变化 深度拷贝
          if (Object.keys(this.echartsData.option).length) {
            option = $.extend(true, option, this.echartsData.option)
          }
          this.myChart.setOption(option);

        }
      },
      _windowResizeHandler() {
        this.myChart.resize()
      },
      _destroyEchart() {
        this.myChart.dispose()
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "./../../../assets/css/_variable.scss";
  @import "./../../../assets/css/_mixin.scss";

  .businesmapChart-wrapper {
    width: 100%;
    height: 100%;
  }
</style>
