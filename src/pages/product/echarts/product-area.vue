<template>
  <div ref="chart" :style="{width:width,height:height}">

  </div>
</template>
<script>
  import {$, resizeMixin} from 'assets/js/common'

  export default {
    mixins: [resizeMixin],
    name: 'area',
    data(){
      return {
        myChart: null
      }
    },
    props: {
      echartsData: {
        type: Object,
        default: null
      },
      height:{
        type:String,
        default: '100%'
      },
      width: {
        type:String,
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
      window.addEventListener("resize", () => {
        this.myChart.resize();
      });
    },
    computed: {},
    methods: {
      initChart(){
        this.myChart = this.$echarts.init(this.$refs.chart);
        if (Object.keys(this.echartsData).length) {
          let option = {
            grid: {
              left: '4%',
              right: '2%',
              bottom: '15%',
              top: '22%',
              containLabel: true
            },
            tooltip: {
              trigger: 'axis',
              axisPointer: {
                type: 'shadow',
                shadowStyle: {
                  color: 'rgba(0, 255, 102, .05)'
                }
              },
              backgroundColor: '#099d4f',
            },
            calculable: true,
            xAxis: [{
              type: 'category',
              data: this.echartsData.xdata,
              axisLine: {
                lineStyle: {
                  color: 'rgb(26, 72, 89)',
                  width: 1
                }
              },
              axisTick: {
                show: false
              },
              axisLabel: {
                formatter: '{value}',
                textStyle: {
                  fontSize: 10,
                  color: '#fff'
                }
              },
              splitLine: {
                show: false,

              },
            }],
            yAxis: [{
              type: 'value',
              name: '占比(%)',
              nameTextStyle: {
                fontSize: 10,
                color: '#fff'
              },
              axisLabel: {
                formatter: '{value}',
                textStyle: {
                  fontSize: 10,
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

            }],
            series: [{
              name: '变化率',
              type: 'line',
              smooth: true,
              yAxisIndex: 0,
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
              data: this.echartsData.data,
            }],
          };

          //如果有新的配置项的变化 深度拷贝
          if (Object.keys(this.echartsData.option).length) {
            option = $.extend(true, option, this.echartsData.option)
          }
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
</style>
