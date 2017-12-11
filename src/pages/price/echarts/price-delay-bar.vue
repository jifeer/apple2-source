<template>
  <div ref="barchart"></div>
</template>

<script>
  import {$, datazoom, resizeMixin} from 'assets/js/common'
  import {dataZoom, tooltipStyle, axisLabel} from 'assets/js/echarts-style'

  export default {
    name: 'barecharts',
    mixins: [resizeMixin],
    echartsData: {
      type: Object,
      default: null
    },
    data() {
      return {
        myChart: null
      }
    },
    props: {
      echartsData: {
        type: Object,
        default: null
      },
      selectedName: ''
    },
    watch: {
      echartsData: {
        handler: function (val, oldVal) {
          //console.log(val)
          this.initChart()
        },
        deep: true  //增加deep 观察对象的子对象变化

      }
    },
    mounted() {
      this.myChart = this.$echarts.init(this.$refs.barchart)
    },
    computed: {},
    methods: {
      initChart() {
        let echartOpt = {
          fz: '16',
          color: '#fff'
        };
        let that = this;
        if (Object.keys(this.echartsData).length) {
          let option = {
            backgroundColor: '#071429',
            tooltip: {
              trigger: 'item',
              ...tooltipStyle,
              formatter: function (params) {
                let str = that.selectedName + '>' + params.name + '<br/>价格传导滞后时间：' + '<b style="color:#ff7a00;font-weight:blod;font-size:18px;">' + params.value + '</b>' + '周';
                return str;
              }
            },
            label: {
              normal: {
                textStyle: {
                  color: "#ff3b00"
                }
              },
              emphasis: {
                textStyle: {
                  color: "#ff3b00"
                }
              }
            },
            grid: {
              left: '3%',
              right: '5%',
              bottom: '10%',
              top: '12%',
              containLabel: true
            },
            yAxis: {
              axisLabel: {
                textStyle: {
                  color: '#fff',
                  fontSize: 16,
                  fontWeight: 'lighter'
                },
                margin: 18,
              },
              type: 'value',
              name: '时间（周）',
              min: '0.5',
              nameTextStyle: {
                fontSize: 18,
                color: '#fff',
                padding: [0, 0, 15, 40]
              },
              axisLine: {
                show: false
              },
              splitLine: {
                show: true,
                lineStyle: {
                  color: 'rgb(26, 72, 89)',
                  type: "dotted"
                },
                formatter: '{value}'
              },
              axisTick: {
                show: false
              }
            },
            xAxis: {
              name: '销地',
              type: 'category',
              axisLabel: {
                textStyle: {
                  color: '#fff',
                  fontSize: 16,
                  fontWeight: 'lighter'
                },
                margin: 18,
              },
              nameTextStyle: {
                fontSize: 18,
                color: '#fff',
                padding: [40, 40, 15, 0]
              },
              axisTick: {
                show: true
              },
              axisLine: {
                lineStyle: {
                  color: '#036ca8'
                }
              },
              splitLine: {
                show: false
              },
              data: this.echartsData.xAxisData,
            },
            dataZoom: [{
              "show": true,
              "height": 15,
              "xAxisIndex": [0],

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
              "height": 15,
              "start": 1,
              "end": 35
            }],
            series: [
              {
                name: '',
                type: 'bar',
                barMaxWidth: 20,
                label: {
                  normal: {
                    show: false
                  }
                },
                itemStyle: {
                  normal: {
                    color: '#3aa1e7'
                  }
                },
                emphasis: {},
                // 选传涨幅从高到低 再传跌幅从低到高都转成正数
                data: this.echartsData.seriesData
              }
            ]
          };
          //如果有新的配置项的变化 深度拷贝

          if (Object.keys(this.echartsData.option).length) {
            option = $.extend(true, option, this.echartsData.option)
          }
          this.myChart.setOption(option, true);
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
