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
            top: '15%',
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
            top: 20,
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
            name: '套袋量同比(%)',
            nameTextStyle: {
              fontSize: 18,
              color: '#fff',
              padding: [0, 0, 15, 10]
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

          },],
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

              /*let newdata = this.echartsData.data[item].data1.map((v, i)=>{
                  return {
                    time: v.time,
                    value: Math.abs(v.value)
                  }
              })*/
              // 生成新的legend
              newLegendData.push({
                name: `${item}套袋量`,
                icon: 'rect',
              })

              // 循环遍历生成新的系列
              newSeries.push({
                name: `${item}套袋量`,
                type: 'bar',
//                barWidth: 16,
                barMaxWidth: 16,
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
