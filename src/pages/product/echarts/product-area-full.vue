<template>
  <div ref="chart" :style="{width:width,height:height}">

  </div>
</template>
<script>
  import {resizeMixin} from 'assets/js/common'
  import {axisLabel} from 'assets/js/echarts-style.js';

  export default {
    mixins: [resizeMixin],
    name: 'area-full',
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
            fontSize: 18,
            fontWeight: 'lighter'
          },
          color: ['#40b0fc', '#099d4f', '#ca8622', '#CB1B45', '#F05E1C', '#734338', '#986DB2', '#86C166'],
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              type: 'line',
              lineStyle: {
                color: 'rgb(216, 115, 24)',
                type: 'dotted',
                width: 2
              }
            },
            formatter: function (params) {
              let str = `<div style="padding: 6px"><p style="text-align: left">${params[0].axisValue}</p>`
              params.forEach(function (val, index) {
                str += `<p style="text-align: left">${val.seriesName}：${val.value}%</p>`
              })
              str += `</div>`
              return str
            },
            backgroundColor: '#099d4f',
          },
          calculable: true,
          legend: {
            top: 0,
            itemWidth: 14,
            itemGap: 18,
            right: 'center',
            icon: 'line',
            width: 'auto',
            /*data: [{
             name: '面积占比',
             }, {
             name: '产量占比',
             }],*/
            textStyle: {
              color: "#fff",
              padding: [0, 0, 0, 3],
            }
          },
          xAxis: [{
            type: 'category',
            boundaryGap: false,
            data: [],
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
              ...axisLabel
            },
            splitLine: {
              show: false,

            },
          }],
          yAxis: [{
            type: 'value',
            name: '占比（%）',
            nameTextStyle: {
              fontSize: 18,
              color: '#fff',
              padding: [0, 40, 15, 0]
            },
            axisLabel: {
              formatter: '{value}',
              ...axisLabel
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
              return Math.floor(value.min * 0.98);
            }
          }],

          dataZoom: [{
            "show": true,
            "height": 13,
            "xAxisIndex": [0],

            left: '60',
            right: '60',
            bottom: 15,
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
            "height": 13,
            "start": 1,
            "end": 35
          }],
        };

      },

      // 初始化图表
      initChart() {

        let newSeries = []
        let newLegendData = []

        // 得到新的系列和legend
        this.option.series = newSeries
        this.option.legend.data = newLegendData

        // 增添数据
        if (Object.keys(this.echartsData.data.xdata).length) {
          // 合并数据
          this.option.xAxis[0].data = this.echartsData.data.xdata;
          for (let item in this.echartsData.data) {
            if (item != 'xdata') {

              // 生成新的图例
              newLegendData.push({
                name: `${this.echartsData.isXian?'':item}苹果占水果面积`,
              }, {
                name: `${this.echartsData.isXian?'':item}苹果占水果产量`,
              })
              // 生成新的系列
              newSeries.push({
                name: `${this.echartsData.isXian?'':item}苹果占水果面积`,
                type: 'line',
                smooth: true,
                symbolSize: 6,
                lineStyle: {
                  normal: {
//                    color: 'rgb(218, 134, 60)',
                  }
                },
                itemStyle: {
                  normal: {
//                    color: 'rgb(218, 134, 60)',
                    opacity: 0
                  },
                  emphasis: {
//                    color: 'rgb(218, 134, 60)',
                    opacity: 1,
                    borderColor: 'rgb(254, 253, 56)',
                    borderWidth: 2
                  }
                },
                data: this.echartsData.data[item].data1,
              }, {
                name: `${this.echartsData.isXian?'':item}苹果占水果产量`,
                type: 'line',
                smooth: true,
                symbolSize: 6,
                lineStyle: {
                  normal: {
//                    color: '#099d4f'
                  }
                },
                itemStyle: {
                  normal: {
//                    color: '#099d4f',
                    opacity: 0
                  },
                  emphasis: {
//                    color: '#099d4f',
                    opacity: 1,
                    borderColor: 'rgb(254, 253, 56)',
                    borderWidth: 2
                  }
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
        this.myChart.setOption(this.option, true);

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
