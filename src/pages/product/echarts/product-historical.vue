<template>
  <div ref="chart" :style="{width:width,height:height}">

  </div>
</template>
<script>
  import {resizeMixin} from 'assets/js/common'
  import {MarkArea} from 'assets/js/echarts-style.js';

  export default {
    mixins: [resizeMixin],
    name: 'historical',
    data(){
      return {
        myChart: {}
      }
    },

    props: {
      echartsData: {
        type: Object,
        default: () => {

        }
      },
      flag: {
        type: Array,
        default: () => [
          [0, 4],
          [4, 8],
          [8, 12],
          [12, 15]]
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

    watch: {
      echartsData: {
        handler: function (val, oldVal) {
          this.initChart()
        },
        deep: true  //增加deep 观察对象的子对象变化
      }
    },

    mounted() {
      this.myChart = this.$echarts.init(this.$refs.chart)
      this.initOption()
    },
    computed: {},

    methods: {
      initOption(){
        this.option = {
          grid: {
            left: '4%',
            right: '2%',
            bottom: '15%',
            top: '22%',
            containLabel: true
          },
          textStyle: {
            fontSize: 12,
            fontWeight: 'lighter'
          },
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              type: 'shadow',
              shadowStyle: {
                color: 'rgba(0, 255, 102, .05)'
              }
            },
//            formatter: '<p style="text-align: left">{b}</p><p style="text-align: left">{a0}:{c0}万亩</p><p style="text-align: left">{a1}:{c1}%</p>',
            formatter: function (params) {
//                console.log(params)
              let str = `<div style="padding: 6px"><p style="text-align: left">${params[0].axisValue}</p>`
              params.forEach(function (val, index) {
                const unite = (val.seriesName.indexOf('种植面积')  > -1 || val.seriesName.indexOf('产量'))  > -1 && val.seriesType === 'bar' ? '万亩' : val.seriesName.indexOf('单产') > -1 && val.seriesType === 'bar' ? '公斤/亩' : '%'
                str += `<p style="text-align: left">${val.seriesName}：${val.value || val.value === 0 ? val.value.toFixed(2) : "-"}${unite}`

                // if (index % 2 == 0) {
                //   str += `<p style="text-align: left">${val.seriesName}:${val.value || val.value === 0 ? val.value.toFixed(2) : "-"}${val.seriesName.indexOf("种植面积") >= 0 ? '万亩' : val.seriesName.indexOf("单产") >= 0 ? '公斤/亩' : '万吨'}</p>`
                // } else {
                //   str += `<p style="text-align: left">${val.seriesName}:${val.value || val.value === 0 ? val.value.toFixed(2) : "-"}%</p>`
                // }
              })
              str += `</div>`
              return str
            },
            backgroundColor: '#099d4f',
          },
          calculable: true,
          legend: {
            top: 10,
            right: 'center',
            icon: 'line',
            itemWidth: 11,
            itemHeight: 6,
            itemGap: 18,
            data: [{
              name: '种植面积',
              icon: 'rect',
            }, {
              name: '变化率',
            }],
            textStyle: {
              color: "#fff",
              padding: [0, 0, 0, 3],
            }
          },
          xAxis: [{
            type: 'category',
            data: this.echartsData.xdata,
            axisLine: {
              lineStyle: {
                color: 'rgb(26, 72, 89)',
                width: 2
              }
            },
            axisTick: {
              show: true
            },
            axisLabel: {
              formatter: '{value}',
              textStyle: {
                fontSize: 12,
                color: '#fff',
                fontWeight: 'lighter'
              }
            },
            splitLine: {
              show: false,

            },
          }],
          yAxis: [{
            type: 'value',
            name: '种植面积（万亩）',
            nameTextStyle: {
              color: '#fff'
            },
            axisLabel: {
              formatter: '{value}',
              textStyle: {
                fontSize: 12,
                color: '#fff',
                fontWeight: 'lighter'
              }
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
            },

          }, {
            type: 'value',
            name: '变化率（%）',
            nameTextStyle: {
              padding: [0, 6, 0, 0],
              color: '#fff'
            },
            axisLabel: {
              show: true,
              formatter: '{value}',
              textStyle: {
                fontSize: 12,
                color: '#fff',
                fontWeight: 'lighter'
              }
            },
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
//          dataZoom,
        };

      },

      initChart() {

        let newSeries = []

        this.option.series = newSeries

        // 增添数据
        if (Object.keys(this.echartsData.data.xdata).length) {
          // 合并数据
          this.option.xAxis[0].data = this.echartsData.data.xdata;
          for (let item in this.echartsData.data) {
            if (item != 'xdata') {

              newSeries.push({
                name: '种植面积',
                type: 'bar',
                barWidth: 8,
                itemStyle: {
                  normal: {
                    color: '#40b0fc'
                  }
                },
                data: this.echartsData.data[item].data1,
              }, {
                name: '变化率',
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
                markLine: {
                  symbolSize: 0,
                  label: {
                    normal: {
                      show: false
                    }
                  },
                  lineStyle: {
                    normal: {
                      color: '#d06a08',
                      type: 'dashed',
                      width: 1
                    }
                  },
                  data: [
                    {
                      yAxis: 0
                    }
                  ]
                },
                data: this.echartsData.data[item].data2,
              })
            }
          }
        }
        //如果有新的配置项的变化 深度拷贝
        /*if (Object.keys(this.echartsData.option).length) {
         this.option = $.extend(true, this.option, this.echartsData.option)
         }*/
        // markarea
        /*this.option = new MarkArea({
         option: this.option,
         flag: this.flag,
         itemStyle: {
         isDiy: true,
         diyStyle: {
         0: [255, 102, 0, 0.05],
         1: [0, 255, 0, 0.05]
         },
         fixStyle: [0, 204, 255]
         }
         }).run();*/

        this.myChart.setOption(this.option, true);

      },

      // echats 图表自适应
      _windowResizeHandler() {
        this.myChart.resize()
      },
      // 销毁echats图表方法
      _destroyEchart() {
        if (this.myChart) {
          this.myChart.dispose()
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "./../../../assets/css/_variable.scss";
  @import "./../../../assets/css/_mixin.scss";
</style>
