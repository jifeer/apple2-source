<template>
  <div ref="chart" class="chart"></div>
</template>
<script type="text/javascript">
  // **** 组件名称 大驼峰 *****
  // ** 本地公用变量 公用函数 **
  // ***** 第三方 组件库 *****
  // ***** 本地 公用组件 *****
  import { resizeMixin, $ } from 'assets/js/common'
  import { dataZoom, tooltipStyle, axisLabel } from 'assets/js/echarts-style'
  // ** 当前组件的 子组件等 ***

  export default {
    name: 'line',
    mixins: [resizeMixin],
    props: {
      title: {
        type: String,
        default: ''
      },
      selectType: {
        type: String,
        default: '1'
      },
      data: {
        type: Object,
        default: () => {}
      }
    },
    data() {
      return {

      }
    },
    created() {},
    mounted() {
      this.initOption();
      this.initChart()
    },
    methods: {
      initOption() {
        this.myChart = this.$echarts.init(this.$refs.chart);
      },

      initChart() {

        // 基本配置
        this.option = {
          dataZoom: [{
            show: true,
            height: 15,
            xAxisIndex: [0],
            left: '60',
            right: '60',
            bottom: '0',
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
            start: 0,
            end: 100,
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
            }
          }],
          tooltip: {
            ...tooltipStyle,
            trigger: 'axis',
            axisPointer: {
              type: 'line', // 样式 为 line 毋须 给其样式，默认就好
              lineStyle: {
                color: 'rgb(216, 115, 24)',
                type: 'dashed',
                width: 2
              }
            }
          },
          grid: {
            left: '5%',
            right: '5%',
            bottom: '10%',
            top: '25%',
            containLabel: true
          },
          legend: {
            x: 'center',
            //data: ['全球', '中国'],
            data: [],
            //show:true,
            top: 30,
            itemGap: 80,
            textStyle: {
              color: '#fff',
              fontSize: 18,
              padding: [0, 5]
            },
            icon: 'line',
            itemWidth: 15
          },
          color: ["#00B874", "#FF8000"],
          xAxis: {
            type: 'category',
            nameTextStyle: {
              fontSize: 18,
              color: "#fff",
            },
            data: [],
            axisLabel: axisLabel,
            splitLine: {
              lineStyle: {
                color: '#35518f', //分割线颜色
                type: "solid",
                opacity: 0.2
              }
            },
            boundaryGap: true,
            axisTick: {
              alignWithLabel: false,
            },
            axisLine: {
              lineStyle: {
                color: '#00558B',
              }
            },
          },
          yAxis: {
            type: 'value',
            name: '公斤/人',
            nameTextStyle: {
              fontSize: 18,
              color: "#fff",
              padding: [0, 0, 15, 0]
            },
            axisLabel: axisLabel,
            axisTick: {
              show: false
            },
            axisLine: {
              show: false,
            },
            splitLine: {
              show: true,
              lineStyle: {
                type: 'dotted',
                color: '#114970'
              }
            },
          },
          series: [{
            //name: '全球',
            name: '',
            type: 'line',
            // data:[12, 13, 14, 15, 14.5, 15, 12.5, 15],
            data: [],
            symbol: 'circle',
            symbolSize: 15,
            itemStyle: {
              normal: {
                color: '#00B874',
                //color: '#fff',
                borderColor: '#FEFB00',
              }
            }
          }, {
            //name: '中国',
            name: '',
            type: 'line',
            // data:[24, 16.5, 19.5, 17, 23, 17, 16.5, 25],
            data: [],
            symbol: 'circle',
            symbolSize: 15,
            itemStyle: {
              normal: {
                color: '#FF8000',
                borderColor: '#FEFB00',
              }
            }
          }]
        }

        // 处理数据
        //console.log(JSON.stringify(this.data))
        let desc = this.selectType === '0' ? '人均消费总量' : this.selectType === '1' ? '人均鲜食消费' : this.selectType === '2' ? '人均加工消费' : '人均消费总量'
        this.option.legend.data = this.data.areas.split(',').map((item, index) => {
          return item.slice(0, -4) + desc
        })


        this.option.series[0].name = this.option.legend.data[0]
        this.option.series[1].name = this.option.legend.data[1]

        this.option.series[0].data = this.data.data[0].data
        this.option.series[1].data = this.data.data[1].data
        this.option.xAxis.data = this.data.year

        this.myChart.setOption(this.option, true)
      },

      // echats 图表自适应
      _windowResizeHandler() {
        this.myChart.resize()
      },
      // 销毁echats图表方法
      _destroyEchart() {
        this.myChart.dispose()
      }
    },
    computed: {},
    watch: {
      data: {
        handler: function(val, oldVal) {
          this.initChart()
        },
        deep: true //增加deep 观察对象的子对象变化
      }
    },
  }

</script>
<style lang="scss" scoped>
  .chart {
    width: 100%;
    height: 100%;
  }

</style>
