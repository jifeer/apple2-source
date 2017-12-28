<template>
  <div ref="pricePie"></div>
</template>

<script>
  import {$, extend, resizeMixin} from 'assets/js/common'
  import {dataZoom, tooltipStyle, axisLabel} from 'assets/js/echarts-style'

  export default {
    name: 'barecharts',
    mixins: [resizeMixin],
    data() {
      return {
        myChart: null
      }
    },
    props: {
      echartsData: {
        type: Object,
        default: () => {
        }
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
      this.myChart = this.$echarts.init(this.$refs.pricePie)
      /*this.$nextTick(()=>{
        this.initChart()
      })*/
    },
    computed: {},
    methods: {
      initChart() {
        let echartOpt = {
          fz: '16',
          color: '#fff'
        };
        if (Object.keys(this.echartsData).length) {
          let option = {
            tooltip: {
              trigger: 'item',
              //trigger: 'axis',
              ...tooltipStyle,
              formatter: function (params, ticket, callback) {
                if (params.dataIndex > 4) {
                  return params.name + "<br />"
                    + "涨幅预测 ："
                    + "<span style='color:#ff3b00;font-weight:blod;font-size:0.18rem;'>" + params.data + " </span>%";
                }
                else {
                  return params.name + "<br />"
                    + "跌幅预测 ："
                    + "<span style='color:#00ff79;font-weight:blod;font-size:0.18rem;'>" + -params.data + " </span>%";
                }
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
              right: '3%',
              bottom: '1%',
              top: '18%',
              containLabel: true
            },
            yAxis: {
              axisLabel: {
                margin: 18,
                textStyle: {
                  fontSize: 16,
                  color: '#fff'
                }
              },
              type: 'value',
              name: '变化率(%)',
              //min: 'dataMin',
              nameTextStyle: {
                fontSize: 18,
                color: '#fff',
                padding: [20, 40, 5, 0]
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
              name: '',
              type: 'category',
              axisLabel: {
                margin: 18,
                textStyle: {
                  fontSize: 16,
                  color: '#fff'
                }
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
              //data :['北京',"山西","陜西","河南", "河北",'广州','湖北','山东','湖南','天津'],
              data: this.echartsData.Xdata,
            },
            series: [
              {
                name: '',
                type: 'bar',
                barWidth: 20,
                label: {
                  normal: {
                    show: false
                  }
                },
                itemStyle: {
                  normal: {
                    color: function (d) {
                      if (d.dataIndex > 4) {
                        return '#9e384f'
                      } else {
                        return '#00724d'
                      }
                    }
                  },
                  emphasis: {}

                },
                // 选传涨幅从高到低 再传跌幅从低到高都转成正数
                //data:[50,40,30,20,10,10,20,30,40,50]
                data: this.echartsData.data
              }
            ]
          };
          //如果有新的配置项的变化 深度拷贝
          if (Object.keys(this.echartsData.option).length) {
            option = $.extend(true, option, this.echartsData.option)
          }
          this.myChart.setOption(option);

        }
      },
      _windowResizeHandler() {
        this.myChart.resize()
      },
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
