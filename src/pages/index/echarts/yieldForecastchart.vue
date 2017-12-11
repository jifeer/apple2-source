<template>
  <div ref="chart" class="productYeild-wrapper">

  </div>
</template>
<script>
  import {$, datazoom, resizeMixin} from 'assets/js/common'

  export default {
    mixins: [resizeMixin],

    name: 'yeild',
    data(){
      return {
        myChart: null
      }
    },

    props: {
      yechartsData: {
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
      yechartsData: {
        handler: function (val, oldVal) {
          this.initChart()
        },
        deep: true  //增加deep 观察对象的子对象变化
      }
    },

    mounted() {
      this.myChart = this.$echarts.init(this.$refs.chart);
//    this.initChart()
    },
    computed: {},

    methods: {
      initChart(){
        if (Object.keys(this.yechartsData).length) {
          let option = {
            grid: {
              left: '50',
              right: '30',
              top: '35',
              bottom: '25',
//			              width:"85%",
              containLabel: false
            },
            textStyle: {
              fontSize: 10,
            },
            tooltip: {
              trigger: 'axis',
//            formatter: '{b}<br />{a0}: {c0}公斤/亩<br />{a1}: {c1}公斤/亩',
              formatter: (params) => {
                return `${params[0].name}<br>
                	        ${params[0].marker}${params[0].seriesName}：${params[0].value}公斤/亩<br/>
                	        ${params[1].marker}${params[1].seriesName}：${params[1].value}公斤/亩`
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
//          legend: {
//            top: 10,
//            left: 'center',
//            icon: 'line',
//            itemWidth: 15,
//
//            data: [{
//              name: '预测单产',
//            }, {
//              name: '实际单产',
//            }],
//            textStyle: {
//              color: "#fff",
//            }
//          },
            xAxis: [{
              type: 'category',
              boundaryGap: true,
              data: this.yechartsData.xdata,
              axisLine: {
                lineStyle: {
                  color: '#35B4F7',
                  width: 1
                }
              },
              axisTick: {
                show: true
              },
              axisLabel: {
                formatter: '{value}',
                textStyle: {
                  fontSize: 12,
                  color: '#fff'
                }
              },
              splitLine: {
                show: false,

              },
            }],
            yAxis: [{
              type: 'value',
              name: '单产（公斤/亩）',
              nameTextStyle: {
                color: '#fff',
                fontSize: 12,
                padding: [0, 0, 0, 0]
              },
              axisLabel: {
//              formatter: '{value}',
                formatter: (params) => {
                  return params
                },
                textStyle: {
                  fontSize: 12,
                  color: '#fff'
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
                return Math.floor(value.min) - 50;
              },
            }],
            series: [{
              name: '预测单产',
              type: 'line',
              smooth: true,
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
              data: this.yechartsData.data1,
            }, {
              name: '实际单产',
              type: 'line',
              smooth: true,
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
              data: this.yechartsData.data2,
            }],
          };

          //如果有新的配置项的变化 深度拷贝
          /*if (Object.keys(this.yechartsData.option).length) {
            option = $.extend(true, option, this.yechartsData.option)
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
        this.myChart.dispose()
      }
    }
  }

</script>

<style lang="scss" scoped>
  @import "./../../../assets/css/_variable.scss";
  @import "./../../../assets/css/_mixin.scss";

  .productYeild-wrapper {
    width: 100%;
    height: 100%
  }
</style>
