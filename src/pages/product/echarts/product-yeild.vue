<template>
  <div ref="chart" :style="{width:width,height:height}">

  </div>
</template>
<script>
  import {resizeMixin} from 'assets/js/common'

  export default {
    mixins: [resizeMixin],
    name: 'yeild',
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
      this.myChart = this.$echarts.init(this.$refs.chart);

    },
    computed: {},

    methods: {
      initChart(){
        if (Object.keys(this.echartsData).length) {
          let option = {
            grid: {
              left: '4%',
              right: '4%',
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
//              formatter: '{b}<br />{a0}: {c0}公斤/亩<br />{a1}: {c1}公斤/亩',
              formatter: function (params) {
                let text = '<div style="padding: 6px"><p style="width: 100%; text-align: left">' + params[0].axisValue + '</p>';
                params.forEach(function (val, index) {
                  text += '<p style="text-align: left">' + val.seriesName + '： ' + val.value + '公斤/亩' + '</p>'
                })
                text += `</div>`
                return text;

              },
              axisPointer: {
                type: 'line',
                lineStyle: {
                  color: 'rgb(216, 115, 24)',
                  type: 'dotted',
                  width: 2
                }
              },
              backgroundColor: '#099d4f',
            },
            calculable: true,
            legend: {
              top: 10,
              right: 'center',
              icon: 'line',
              itemWidth: 14,
              itemGap: 18,
              data: [{
                name: '预测单产',
              }, {
                name: '实际单产',
              }],
              textStyle: {
                color: "#fff",
                padding: [0, 0, 0, 3],
              }
            },
            xAxis: [{
              type: 'category',
              boundaryGap: false,
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
              data: this.echartsData.xdata,
            }],
            yAxis: [{
              type: 'value',
              name: '单产（公斤/亩）',
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
              min: function (value) {
                return Math.floor(value.min * 0.95);
              }
            }],
            series: [{
              name: '预测单产',
              type: 'line',
              smooth: true,
              symbolSize: 2,
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
              data: this.echartsData.data1,
            }, {
              name: '实际单产',
              type: 'line',
              smooth: true,
              symbolSize: 2,
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
              data: this.echartsData.data2,
            }],
//            dataZoom: datazoom,
          };

          //如果有新的配置项的变化 深度拷贝
          /*if (Object.keys(this.echartsData.option).length) {
           option = $.extend(true, option, this.echartsData.option)
           }*/
          this.myChart.setOption(option);
        }
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
