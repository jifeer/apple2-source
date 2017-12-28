<template>
  <div ref="bar" class="bar"></div>
</template>
<script type="text/javascript">
  // **** 组件名称 大驼峰 *****
  // ** 本地公用变量 公用函数 **
  // ***** 第三方 组件库 *****
  import { resizeMixin, $ } from 'assets/js/common'
  import { dataZoom, tooltipStyle, MarkArea, axisLabel} from 'assets/js/echarts-style'
  // ***** 本地 公用组件 *****
  // ** 当前组件的 子组件等 ***

  export default {
    name: 'bar',
    mixins: [resizeMixin],
    props: {
      title: {
        type: String,
        default: ''
      },
      data: {
        type: Object,
        default: () => {}
      },
      flag: {
        type: Array,
        default: () => []
      }
    },
    data() {
      return {}
    },
    mounted() {
      this.initOption();
      this.initChart()
    },
    methods: {
      initOption() {
        // initOption 作用： 一次性捕获 echats 图表的挂载点，声明好 echats 图表的 基本配置
        this.chart = this.$echarts.init(this.$refs.bar);
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
          grid: {
            left: '8%',
            right: '5%',
            bottom: '10%',
            top: '25%',
            containLabel: true
          },
          tooltip: {
            ...tooltipStyle,
            trigger: 'axis',
          },
          legend: {
            left: 'center',
            //top: 15,
            itemWidth: 15,
            itemHeight: 7,
            itemGap: 30, //两图例之间距离
            data: [{
              name: "消费总量（万吨）",
              textStyle: {
                fontSize: 18,
                color: "#fff",
                padding: [0, 5]
              }
            }, {
              name: "变化率（%）",
              icon: 'line',
              itemWidth: 15,
              textStyle: {
                fontSize: 18,
                color: "#fff",
                padding: [0, 5]
              },
            }]
          },
          yAxis: [{
            name: "消费量（万吨）",
            // min: 1000,
            nameTextStyle: {
              fontSize: 18,
              padding: [0, 0, 15, 0],
            },
            type: 'value',
            // interval: 500,
            splitNumber: 3,
            axisTick: {
              show: false,
            },
            splitLine: {
              show: false,
            },
            axisLine: {
              show: false,
              lineStyle: {
                color: '#fff'
              }
            },
            axisLabel: axisLabel
          }, {
            type: 'value',
            name: "变化率（%）",
            // interval: 6,
            splitNumber: 3,
            nameTextStyle: {
              fontSize: 18,
              padding: [0, 30, 15, 0]
            },
            axisTick: {
              show: false
            },
            splitLine: {
              show: true,
              lineStyle: {
                type: 'dotted',
                color: '#114970'
              }
            },
            axisLine: {
              show: false,
              lineStyle: {
                color: '#fff',
              }
            },
            axisLabel: axisLabel,
          }],

          xAxis: [{
            type: 'category',
            name: '',
            splitLine: {
              show: false,
            },
            axisTick: {
              show: true, //显示刻度
            },
            axisLabel: axisLabel,
            axisLine: {
              lineStyle: {
                color: '#036ca8'
              }
            },
            data: [],
          }],

          series: [{
            name: '消费总量（万吨）',
            type: 'bar',
            barMaxWidth: 16,
            label: {
              normal: {
                show: false,
                position: 'right',
                formatter: "{c}%"
              }
            },
            itemStyle: {
              normal: {
                color: '#35A2ED'
              }
            },
            data: []
          }, {
            name: '变化率（%）',
            type: 'line',
            symbolSize: 0,
            smooth: true,
            yAxisIndex: 1,
            itemStyle: {
              normal: {
                color: '#019A60'
              }
            },
            markLine: {
              label: {
                normal: {
                  show: false
                }
              },
              symbolSize: 0,
              lineStyle: {
                normal: {
                  color: 'red',
                  type: 'dotted',
                  width: 1
                }
              },
              data: [{
                yAxis: 0,
              }]
            },
            data: []
          }],
        }
      },
      initChart() {
        // 增添数据
        if (Object.keys(this.data).length) {
          // 合并数据
          this.option.xAxis[0].data = this.data.year;
          this.option.series[0].data = this.data.totalData;
          this.option.series[1].data = this.data.changeRate;
        }
//        this.option = new MarkArea({
//          option: this.option,
//          flag: this.flag,
//          itemStyle: {
//            isDiy: true,
//            diyStyle: {
//              0: [255, 102, 0, 0.05],
//              1: [0, 255, 0, 0.05]
//            },
//            fixStyle: [0, 204, 255]
//          }
//        }).run();

        this.chart.setOption(this.option, true);
        this.chart.on('click', (params) => {
          this.$emit('toBodyPie', params)
            //alert(params)
        })
      },

      // echats 图表自适应
      _windowResizeHandler() {
        this.chart.resize()
      },
      // 销毁echats图表方法
      _destroyEchart() {
        this.chart.dispose()
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
  .bar {
    width: 100%;
    // height: 100%;
    // height: 300px;
  }

</style>
