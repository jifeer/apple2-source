<template>
  <div ref="chart" :style="{width:width,height:height}">

  </div>
</template>
<script>
  import {resizeMixin} from 'assets/js/common'
  import {axisLabel} from 'assets/js/echarts-style.js';

  export default {
    mixins: [resizeMixin],
    name: 'yeild',
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
      this.initOption()
    },

    computed: {},

    methods: {
      initOption(){
        this.option = {
          grid: {
            left: '4%',
            right: '4%',
            bottom: '10%',
            top: '22%',
            containLabel: true
          },
          textStyle: {
            fontSize: 18,
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
          animation: true,
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
              ...axisLabel
            },
            splitLine: {
              show: false,

            },
            data: [],
          }],
          yAxis: [{
            type: 'value',
            name: '单产（公斤/亩）',
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
              return Math.floor(value.min * 0.95);
            }
          }],
          series: [{
            name: '预测单产',
            type: 'line',
            smooth: true,
            symbolSize: 16,
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
            data: [],
          }, {
            name: '实际单产',
            type: 'line',
            smooth: true,
            symbolSize: 16,
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
            data: [],
          }],
          dataZoom: [{
            "show": true,
            "height": 13,
            "xAxisIndex": [0],

            left: '60',
            right: '60',
            bottom: 20,
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

        //如果有新的配置项的变化 深度拷贝
        /*if (Object.keys(this.echartsData.option).length) {
         this.option = $.extend(true, this.option, this.echartsData.option)
         }*/
        // 填充数据
        this.option.xAxis[0].data = this.echartsData.data.dates
        // 预测单产
        this.option.series[0].data = this.echartsData.data.data1
        // 实际单产
        this.option.series[1].data = this.echartsData.data.data2

        // 渲染图表
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
