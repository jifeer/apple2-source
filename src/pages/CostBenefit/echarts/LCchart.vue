<template>

  <div ref="LCchart" class="LCchart-wrapper">

  </div>
</template>

<script>
  import {extend, $, resizeMixin} from 'assets/js/common'
  import {axisLabel, dataZoom} from 'assets/js/echarts-style'

  export default {
    name: 'LCchart',
    mixins: [resizeMixin],
    props: {
      lcChartData: {
        type: Object,
        default: () => {

        }
      },
      item: {
        type: Number,
        default: 0
      },

      btnIndex: {
        type: Number,
        default: 0
      },
    },

    watch: {
      lcChartData: {
        handler: function (val, oldVal) {
          this.initChart()
        },
        deep: true  //增加deep 观察对象的子对象变化
      }
    },

    data() {
      return {
        color: ["#009E4C", "#E9C80E", "#0071B3", "#FF7200", '#986DB2', '#86C1ee', '#64363C', '#F0A986', '#F7C242', '#2EA9DF', '#E03C8A', '#5DAC81'],
      };
    },

    mounted() {
      this.myChart = this.$echarts.init(this.$refs.LCchart)
      this.initOption()
    },

    methods: {
      initOption() {
        this.option = {
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              show: true,
              type: 'line',
              snap: true,
              lineStyle: {
                color: '#CF6900',
                width: 2,
                type: "dashed"
              }
            },
            backgroundColor: '#099d4f',
          },
          dataZoom: [
            {
              show: true,
              height: 13,
//              "xAxisIndex": [0],

              left: '60',
              right: '60',
              bottom: '20',
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
              },
              borderColor: "#3458B4"
            }, {
              "type": "inside",
              "show": true,
              "height": 13,
              "start": 1,
              "end": 35
            }],
          legend: {
            type: 'scroll',
            pageButtonGap: 20,
            pageIconColor: '#fff',
            pageIconInactiveColor: '#666',
            pageTextStyle: {
              color: '#fff'
            },
            data: [],
            width: '1100',
            top: "3%",
            itemHeight: 8,
            itemWidth: 14,
            color: "#099D4F",
            itemGap: 5,
            icon: "line",
            textStyle: {
              color: "#fff",
              fontSize: 18,
              padding: [5, 10]
            },
          },
          grid: {
            left: '100',
            right: '45',
            bottom: '15%',
            top: "15%",
            containLabel: false  //总宽度是否包含坐标轴标签
          },
          xAxis: {
            type: 'category',
            boundaryGap: true,   //坐标轴的留白
            axisLine: {      //隐藏X轴线
              show: true,
              lineStyle: {
                color: "#004B7D",
              }
            },
            axisLabel: axisLabel,
            data: [],
          },
          yAxis: {
            name: '',
            nameTextStyle: {
              color: '#fff',
              fontSize: '18',
              align: "left",
              padding: [0, 0, 0, -40]
            },
            nameGap: 26,
            type: 'value',
            show: true,
            min: '0',
            axisLine: {
              show: false,
            },
            axisLabel: {
              textStyle: {
                color: '#fff',
                fontSize: 16,
                fontWeight: 'lighter'
              },
              margin: 18,
              formatter:(params)=>{
                return params
              }
            },
            splitLine: {
              lineStyle: {
                color: '#004574',
                type: "dashed",

              }
            },
          },
          series: [],
        };
      },

      initChart() {

        let newSeries = [];
        let legendData = [];
        let axisName = [];
        this.option.yAxis.axisLabel.formatter = null
        this.lcChartData.data.forEach((val, index, arr) => {

          // Y轴单位
          if (!this.btnIndex) {
            if (val.name.indexOf('成本') >= 0 || val.name.indexOf('费用') >= 0 || val.name.indexOf('折价') >= 0) {
              axisName.push('元/亩')
            } else if (val.name.indexOf('工价') >= 0) {
              axisName.push('元（亩·日）')
            } else if (val.name.indexOf('天数') >= 0) {
              axisName.push('天')
            }
          } else {
            if (val.name.indexOf('成本') >= 0 || val.name.indexOf('费用') >= 0 || val.name.indexOf('折价') >= 0) {
              axisName.push('元/50公斤')
              this.option.yAxis.axisLabel.formatter = function (value, index) {
                return value * 50
              }
            } else if (val.name.indexOf('工价') >= 0) {
              axisName.push('元（亩·日）')
            } else if (val.name.indexOf('天数') >= 0) {
              axisName.push('天')
            }
          }

          // 新的 legend
          legendData.push({
            name: arr[index].name.replace('-', '')
          })
          // 新的系列
          newSeries.push({
            type: "line",
            name: arr[index].name.replace('-', ''),
            symbolSize: 13,
            symbol: "circle",
            icon: "none",
            data: arr[index].value,
            lineStyle: {
              normal: {
                color: this.color[index],
                width: 4,
              },
            },
            itemStyle: {
              normal: {
                color: this.color[index],
                borderColor: "#FFF500",
                borderWidth: 2,
              },
              emphasis: {
                borderColor: '#FFF500'
              }
            }
          },)
        })

        this.option.tooltip.formatter = (params) => {
//          console.log(params)
          let tooltip = "<div style='text-align:left'>" + params[0].name + "年<br/>"
          if (!this.btnIndex) {
            for (let index = 0; index < params.length; index++) {
              tooltip += `${params[index].marker}${params[index].seriesName}：${params[index].value === '-' ? 0 : params[index].value.toFixed(2)} ${(params[index].seriesName.indexOf('天数') >= 0 ? '天' : params[index].seriesName.indexOf('工价') >= 0 ? '元/(亩·日)' : '元/亩')}<br/>`
            }
          } else {
            for (let index = 0; index < params.length; index++) {
              if (params[index].seriesName.indexOf('天数') >= 0 || params[index].seriesName.indexOf('工价') >= 0) {
                tooltip += `${params[index].marker}${params[index].seriesName}：${params[index].value === '-' ? 0 : params[index].value.toFixed(2)} ${(params[index].seriesName.indexOf('天数') >= 0 ? '天' : params[index].seriesName.indexOf('工价') >= 0 ? '元/(亩·日)' : '')}<br/>`
              } else {
                tooltip += `${params[index].marker}${params[index].seriesName}：${params[index].value === '-' ? 0 : (params[index].value * 50).toFixed(2)} 元/50公斤<br/>`
              }
            }
          }
          return tooltip + "</div>"
        }

        this.option.yAxis.name = this.uniqArr(axisName).join(' ')   // 设置Y轴名称
        this.option.series = newSeries                              // 设置系列
        this.option.legend.data = legendData                        // 设置legend
        this.option.xAxis.data = this.lcChartData.timeData          // 设置X轴
        this.myChart.setOption(this.option, true);                  // 向图表中添加配置
      },

      // 去除多余的单位
      uniqArr(array) {
        var r = [];
        for (var i = 0, l = array.length; i < l; i++) {
          for (var j = i + 1; j < l; j++)
            if (array[i] === array[j]) j = ++i;
          r.push(array[i]);
        }
        return r;
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

  .LCchart-wrapper {
    width: 100%;
    height: 100%;
  }
</style>
