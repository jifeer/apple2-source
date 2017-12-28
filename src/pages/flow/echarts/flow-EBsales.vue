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
              left: '3%',
              right: '0',
              bottom: '3%',
              top: '3%',
              containLabel: true
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
                  fontSize: 16
                }
              },
              data: this.echartsData.xdata
            },
            yAxis: {
              name:'年销量(吨)',
              nameTextStyle: {
                color: '#fff',
                fontSize: 16,
                align: 'left',
              },
              nameGap: '25',
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
               /* formatter: '{value}',*/
                formatter:(params)=>{
                  return params
                },
                textStyle: {
                  color: '#fff',
                  fontSize: 16
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
                symbolSize: 16,
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
            dataZoom: [{
              "show": true,
              "height": 15,
              "xAxisIndex": [0],

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
            }]
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
