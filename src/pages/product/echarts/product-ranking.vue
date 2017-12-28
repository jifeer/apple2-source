<template>
  <div ref="chart" class="echartsData-wrapper">

  </div>
</template>

<script>
  import {resizeMixin} from 'assets/js/common'

  export default {
    name: 'echarts-ranking',
    mixins: [resizeMixin],
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
      this.myChart = this.$echarts.init(this.$refs.chart)
      this.initOption()
    },

    methods: {
      initOption(){
        this.option = {
          grid: {
            left: 60,
            right: 0,
            top: 0,
            bottom: 0
          },
          tooltip: {
            backgroundColor: '#099d4f',
            formatter: function (params) {
              let str = `<div style="padding: 6px; font-weight: lighter"><p style="text-align: left">${params.name}</p>
                         <p style="text-align: left">${params.value} ${params.data.name === '产量' ? '万吨' : '万亩'}</p>
                         <p style="text-align: left">排行第 <span style="font-weight: bold">${(1 + params.dataIndex)}</span></p>`
              str += `</div>`
              return str
            },
          },
          yAxis: [{
            data: [],
            interval: 0,
            inverse: true,
            axisLabel: {
              margin: 10,
              textStyle: {
                fontSize: '12',
                fontWeight: 'lighter',
                color: '#eeeff1',
                /*color: function (value, index) {
                  return index <= 2 ? '#eeeff1' : '#63676e';
                }*/
              },
              formatter: function (value, index) {
                if (value.length > 4) {
                  let str = value.slice(0, 3);
                  return str + '...'
                } else {
                  return value
                }
              }
            },
            //offset:'15',
            splitLine: {
              show: false
            },
            axisTick: {
              show: false
            },
            axisLine: {
              show: false
            }
          }],
          xAxis: {
            max: 0, //maxData * 1.5
            show: false,
            axisLine: {
              show: false
            }
          },
          color: ['#162f66'],
          series: [{
            // 辅助系列
            type: 'bar',
            silent: true,
            barGap: '-100%',
            itemStyle: {
              normal: {
                color: '#1e3045',
              }
            },
            barWidth: 8,
            data: 0, //辅助数据
          }, {
            type: 'bar',
            data: [],
            barWidth: 8,
            label: {
              normal: {
                position: 'right',
                show: true,
                textStyle: {

                  fontSize: '0.14rem',
                  color: "#40b0fc"
                },
                formatter: function (value) {
                  return value.data.value;
                }
              }
            },
            itemStyle: {
              normal: {
                color: '#40b0fc'
              },
              emphasis: {
                color: '#0ba967',
              }
            }
          }]
        }
      },

      // 初始化图表
      initChart() {
        //获取data里的最大最小值
        Array.prototype.max = function () {
          return Math.max.apply({}, this)
        }
        Array.prototype.min = function () {
          return Math.min.apply({}, this)
        }

        // 确保有数据的时候才调整数据格式
        if (this.echartsData.data) {
          let newArr = []
          for (let i = 0; i < this.echartsData.data.length; i++) {
            newArr.push(this.echartsData.data[i].value)
          }
          let maxData = newArr.max();

          // 设置数据
          this.option.yAxis[0].data = this.echartsData.yAxisData

          // 辅助背景的数据
          this.option.xAxis.max = maxData * 1.5
          //辅助数据
          this.option.series[0].data = newArr.map(function (val) {
            return maxData * 2;
          })

          // 真是数据
          this.option.series[1].data = this.echartsData.data
        } else {
          this.option.yAxis[0].data = []
          this.option.xAxis.max = 0
          this.option.series[0].data = []
          this.option.series[1].data = []
        }

        //如果有新的配置项的变化 深度拷贝
        /*if (Object.keys(this.echartsData.option).length) {
         this.option = $.extend(true, this.option, this.echartsData.option)
         }*/

        this.myChart.setOption(this.option, true);

        // 联动高亮传递数据
        this.myChart.on('click', (params) => {
          this.$emit('tipHighLight', params.name)
        })
      },

      // resize
      _windowResizeHandler(){
        this.myChart.resize()
      },
      _destroyEchart(){
        if (this.myChart) {
          this.myChart.off('click')
          this.myChart.dispose()
        }
      }
    },
  }
</script>

<style lang="scss" scoped>
  @import "./../../../assets/css/_variable.scss";
  @import "./../../../assets/css/_mixin.scss";

  .echartsData-wrapper {
    width: 100%;
    height: 100%;
  }
</style>
