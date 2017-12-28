<template>
  <div ref="chart" :style="{width:width,height:height}">
  </div>
</template>
<script>
  import { resizeMixin } from 'assets/js/common'
  import { axisLabel, MarkArea } from 'assets/js/echarts-style.js';

  export default {
    mixins: [resizeMixin],
    name: 'historical-big',
    data() {
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
      axisData: {
        type: Object,
        default: function() {
          return {
            yAxisNameL: '产量（万吨）',
            yAxisNameR: '变化率（%）',
            type: '产量',
            isXian: false
          }
        }
      },
      flag: {
        type: Array,
        default: () => [
          [0, 4],
          [4, 8],
          [8, 12],
          [12, 15]
        ]
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
        handler: function(val, oldVal) {
          this.initChart()
        },
        deep: true //增加deep 观察对象的子对象变化
      }
    },

    mounted() {
      this.myChart = this.$echarts.init(this.$refs.chart)
      this.initOption()
    },
    computed: {},

    methods: {
      initOption() {
        this.option = {
          grid: {
            left: '4%',
            right: '2%',
            bottom: '15%',
            top: '22%',
            containLabel: true
          },
          color: ['#40b0fc', '#099d4f', '#ca8622', '#CB1B45', '#F05E1C', '#734338', '#986DB2', '#86C166'],
          textStyle: {
            fontSize: 18,
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
            formatter: function(params) {
              //                console.log(params)
              let str = `<div style="padding: 6px"><p style="text-align: left">${params[0].axisValue}</p>`
              params.forEach(function(val, index) {
                const unite = (val.seriesName.indexOf('种植面积')  > -1 || val.seriesName.indexOf('产量'))  > -1 && val.seriesType === 'bar' ? '万亩' : val.seriesName.indexOf('单产') > -1 && val.seriesType === 'bar' ? '公斤/亩' : '%'
                str += `<p style="text-align: left">${val.seriesName}：${val.value || val.value === 0 ? val.value.toFixed(2) : "-"}${unite}`
                // if (index % 2 == 0) {
                //   str += `<p style="text-align: left">${val.seriesName}：${val.value || val.value === 0 ? val.value.toFixed(2) : "-"}${val.seriesName.indexOf("种植面积") >= 0 ? '万亩' : val.seriesName.indexOf("单产") >= 0 ? '公斤/亩' : '万吨'}</p>`
                // } else {
                //   str += `<p style="text-align: left">${val.seriesName}：${val.value || val.value === 0 ? val.value.toFixed(2) : "-"}%</p>`
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
            itemWidth: 14,
            itemHeight: 7,
            itemGap: 18,
            width: 1000,
            /*data: [{
             name: '产量',
             icon: 'rect',
             }, {
             name: '变化率',
             }],*/
            textStyle: {
              color: "#fff",
              padding: [0, 0, 0, 3],
            }
          },
          xAxis: [{
            type: 'category',
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
            name: this.axisData.yAxisNameL,
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

          }, {
            type: 'value',
            name: this.axisData.yAxisNameR,
            nameTextStyle: {
              fontSize: 18,
              color: '#fff',
              padding: [0, 40, 15, 0]
            },
            axisLabel: {
              show: true,
              formatter: '{value}',
              ...axisLabel
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

      initChart() {
        // 设置坐标轴的名称
        this.option.yAxis[0].name = this.axisData.yAxisNameL
        this.option.yAxis[1].name = this.axisData.yAxisNameR


        // 新建一个数组临时保存数据
        let newSeries = []
        let newLegendData = []

        // 添加新数据
        this.option.series = newSeries
        this.option.legend.data = newLegendData

        // 处理新的数据
        if (Object.keys(this.echartsData.data.xdata).length) {
          // 合并数据
          this.option.xAxis[0].data = this.echartsData.data.xdata;
          for (let item in this.echartsData.data) {
            if (item != 'xdata' && item != 'titleInfo') {

              // 生成新的legend
              newLegendData.push({
                name: `${this.axisData.isXian?'苹果':item}${this.axisData.type}`,
                icon: 'rect',
              }, {
                name: `${this.axisData.isXian?'苹果':item}${this.axisData.type}变化率`,
              })

              // 循环遍历生成新的系列
              newSeries.push({
                name: `${this.axisData.isXian?'苹果':item}${this.axisData.type}`,
                type: 'bar',
                //                barWidth: 16,
                barMaxWidth: 16,
                itemStyle: {
                  normal: {
                    //                    color: '#40b0fc'
                  }
                },
                data: this.echartsData.data[item].data1,
              }, {
                name: `${this.axisData.isXian?'苹果':item}${this.axisData.type}变化率`,
                type: 'line',
                smooth: true,
                yAxisIndex: 1,
                symbolSize: 8,
                lineStyle: {
                  normal: {
                    //                    color: '#099d4f'
                  }
                },
                itemStyle: {
                  normal: {
                    //                    color: '#099d4f',
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
                  data: [{
                    yAxis: 0
                  }]
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

        this.myChart.setOption(this.option, true, true);
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
