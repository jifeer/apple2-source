<template>
  <div ref="chart" :style="{width:width,height:height}">

  </div>
</template>
<script>
  import {resizeMixin} from 'assets/js/common'
  import {axisLabel, MarkArea} from 'assets/js/echarts-style.js';

  export default {
    mixins: [resizeMixin],
    name: 'apple-bag',
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
        default: function () {
          return {
            yAxisNameL: '产量（万吨）',
            yAxisNameR: '变化率（%）',
            type: '纸袋',
            isXian: false
          }
        }
      },
      height: {
        type: String,
        default: '100%'
      },
      width: {
        type: String,
        default: '100%'
      },
    },

    watch: {
      echartsData: {
        handler: function (val, oldVal) {
          this.initChart()
        }
        ,
        deep: true  //增加deep 观察对象的子对象变化
      }
    }
    ,

    mounted() {
      this.myChart = this.$echarts.init(this.$refs.chart)
      this.initOption()
    }
    ,
    computed: {}
    ,

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
            formatter: function (params) {
              // let str = `<div style="padding: 6px"><p style="text-align: left">纸袋</p>`
              let str = ''
              params.forEach(function (val, index) {
                str += `<p style="text-align: left">${val.seriesName}同比：${val.value || val.value === 0 ? val.value.toFixed(2) : "-"}%</p>
                        <p style="text-align: left">取样时间：${val.data.time}</p>`
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
//              interval: 1,
              fontSize: 12,
              color: '#fff',
              fontWeight: 'lighter',
            },
            splitLine: {
              show: false,

            },
            textStyle: {
              fontSize: 12,
            },
          }],
          yAxis: [{
            type: 'value',
            name: '套袋量同比(%)',
            nameTextStyle: {
              fontSize: 12,
              color: '#fff',
              //padding: [0, 0, 15, 10]
            },
            axisLabel: {
              formatter: '{value}',
              fontSize: 12,
              color: '#fff',
              fontWeight: 'lighter'
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

          },],
        };
      }
      ,

      initChart() {

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
                name: `${item}${this.axisData.type}`,
                icon: 'rect',
              })

              // 循环遍历生成新的系列
              newSeries.push({
                name: `${item}${this.axisData.type}`,
                type: 'bar',
//                barWidth: 16,
                barMaxWidth: 8,
                itemStyle: {
                  normal: {
//                    color: '#40b0fc'
                  }
                },
                data: this.echartsData.data[item].data1,
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
      }
      ,

      // echats 图表自适应
      _windowResizeHandler() {
        this.myChart.resize()
      }
      ,
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
