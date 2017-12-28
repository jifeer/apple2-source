<template>
  <div ref="cbchart" class="costBenefit-cbchart-wrapper">
  </div>
</template>
<script>
  import { extend, $, resizeMixin } from 'assets/js/common'
  import { axisLabel, dataZoom } from 'assets/js/echarts-style'
  export default {
    name: 'cbchart',
    mixins: [resizeMixin],
    props: {
      cbchartData: {
        type: Object,
        default: () => ({})
      },
      units: {
        type: Boolean,
        default: true
      },

    },
    data() {
      return {
        myChart: null,
        option: null,
        newSeries: null,
        unit: null,
        color: ['#34A2EE', '#D2C62D', '#00A261', '#CA8622', '#91C7AE', '#fce693', "#D48265", "#749F83", "#BDA29A"],
      }
    },

    mounted() {
      this.initOption()
    },
    watch: {
      cbchartData: {
        handler: function(val, oldVal) {
          this.initChart()
        },
        deep: true //增加deep 观察对象的子对象变化
      }
    },
    methods: {

      initOption() {
        if (Object.keys(this.cbchartData).length) {
          this.myChart = this.$echarts.init(this.$refs.cbchart)

          this.myChart.on("click", (params) => {
            this.$emit("toCostStructure", params)
          })

          this.option = {
            tooltip: {
              trigger: 'axis',
              axisPointer: {
                type: 'shadow',
                shadowStyle: {
                  color: 'rgba(0, 255, 102, .05)'
                }
              },
              backgroundColor: '#099d4f',
              formatter: (params) => {
                let tooltip = "<div style='text-align:left'>" + params[0].name + "年<br/>"

                params.forEach((item, index) => {
                  let unite = item.seriesName.indexOf('利润率') > -1 ? '%' : this.unit
                  tooltip += params[index].marker + params[index].seriesName + "：" + params[index].value.toFixed(2) + unite + "<br/>"
                })

                // for (let index = 0; index < params.length; index++) {
                //   if (index % 3 == 2) {
                //     a1 += params[index].marker + params[index].seriesName + "：" + params[index].value.toFixed(2) + "%" + "<br/>"
                //   } else if (index % 3 == 1) {
                //     a1 += params[index].marker + params[index].seriesName + "：" + this.cbchartData.data[Math.floor(index / 3)].profitRatio[params[index].dataIndex] + this.unit + "<br/>"
                //   } else {
                //     a1 += params[index].marker + params[index].seriesName + "：" + params[index].value + this.unit + "<br/>"
                //   }
                // }
                return tooltip + "</div>"
              }
            },
            legend: {
              data: [],
              itemHeight: 8,
              itemWidth: 14,
              //                               itemGap: 70,
              width: "82%",
              //                               left:"right",
              top: "5%",
              textStyle: {
                color: "#fff",
                fontSize: 18
              },
            },
            dataZoom: dataZoom,
            grid: {
              left: '6.5%',
              bottom: '1%',
              width: "89%",
              height: "100%",
              containLabel: false //总宽度是否包含坐标轴标签
            },
            xAxis: {
              type: 'category',
              boundaryGap: true, //坐标轴的留白
              axisLine: { //隐藏X轴线
                show: true,
                lineStyle: {
                  color: "#35B4F7"
                }
              },
              axisLabel: axisLabel,
              data: []
            },
            yAxis: [{
                name: '元/亩                   ',
                nameTextStyle: {
                  color: '#fff',
                  fontSize: '18',
                  align: "left",
                },
                nameGap: 30,
                type: 'value',
                show: true,
                // min: '0',
                axisLine: {
                  show: false,
                },
                axisLabel: axisLabel,
                splitLine: {
                  lineStyle: {
                    color: '#003F69',
                    type: "dashed",
                  }
                },
              },
              {
                name: '          %',
                nameTextStyle: {
                  color: '#fff',
                  fontSize: '18',
                  align: "left",
                },
                nameGap: 30,
                type: 'value',
                show: true,
                axisLine: {
                  show: false,
                },
                axisLabel: axisLabel,
                splitLine: {
                  show: false,
                },
              }
            ],
            grid: {
              left: '9%',
              //                  bottom: '23%',
              //                  right:"20%",
              top: "22%",
              width: "84%",
              containLabel: false //总宽度是否包含坐标轴标签
            },

            series: []
          };


        }
      },

      initChart() {
        //如果有新的配置项的变化 深度拷贝
        if (Object.keys(this.cbchartData.option).length) {
          this.option = $.extend(true, this.option, this.cbchartData.option)
        }
        this.newSeries = [];
        let legendData = [];
        let costProfitRatio = [];
        let profitRatio = [];
        this.cbchartData.data.forEach((val, index, arr) => {
          costProfitRatio = this.cbchartData.data[index].costProfitRatio.map((val, index, arr) => {
            return val * 100
          })
          profitRatio = this.cbchartData.data[index].profitRatio.map((val, index) => {
            return Math.abs(val)
          })
          legendData.push({
            name: `${val.name}总成本`,
            icon: 'rect',
          }, {
            name: `${val.name}净利润`,
            icon: 'rect',
          }, {
            name: `${val.name}成本利润率`,
            icon: "line"
          })

          this.newSeries.push({
            name: `${val.name}总成本`,
            type: "bar",
            barWidth: 'auto',
            barMaxWidth: 16,
            data: this.cbchartData.data[index].totalCost,
            itemStyle: {
              normal: {
                color: this.color[index * 3]
              }
            }
          }, {
            name: `${val.name}净利润`,
            type: "bar",
            barWidth: 'auto',
            barMaxWidth: 16,
            data: profitRatio,
            itemStyle: {
              normal: {
                //                  color: this.color[index * 3 + 1]
                // 处理特殊情况
                color: (params) => {
                  if (this.cbchartData.data[index].profitRatio[params.dataIndex] < 0) {
                    return '#159847'
                  } else {
                    return this.color[index * 3 + 1]
                  }
                },
              }
            }
          }, {
            name: `${val.name}成本利润率`,
            type: "line",
            icon: "none",
            data: costProfitRatio,
            yAxisIndex: 1,
            symbolSize: 5,
            itemStyle: {
              normal: {
                opacity: 0,
                //                          color: '#00A261',
                color: this.color[index * 3 + 2],
                borderWidth: 1,
              },
              emphasis: {
                borderColor: '#00A261'
              }
            },
            smooth: true,
            zlevel: 9,
            markLine: {
              silent: true,
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
          })
        })
        if (this.units == true) {
          this.unit = "元/亩"
        } else {
          this.unit = "元/公斤"
        }


        this.option.series = this.newSeries
        this.option.legend.data = legendData
        this.option.xAxis.data = this.cbchartData.time
        this.myChart.setOption(this.option, true);

      },


      _windowResizeHandler() {
        this.myChart.resize()
      },
      _destroyEchart() {
        this.myChart.dispose()
      }
    },

  };

</script>
<style lang="scss" scoped>
  @import "./../../../assets/css/_variable.scss";
  @import "./../../../assets/css/_mixin.scss";

  .costBenefit-cbchart-wrapper {
    width: 100%;
    height: 100%;
  }

</style>
