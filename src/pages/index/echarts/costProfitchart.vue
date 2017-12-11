<template>


  <div ref="cbchart" class="costBenefit-cbchart-wrapper">

  </div>


</template>

<script>

  import {extend, $, resizeMixin} from 'assets/js/common'
  import {axisLabel, dataZoom} from 'assets/js/echarts-style'
  export default {
    name: 'cbchart',
    mixins: [resizeMixin],
    props: {
      cbchartData: {
        type: Object,
        default(){
          return {}
        }
      },
    },
    watch: {
      cbchartData: {
        handler: function (val, oldVal) {
          this.initChart()
        },
        deep: true  //增加deep 观察对象的子对象变化
      }
    },
    data() {
      return {};
    },
    mounted() {
      this.myChart = this.$echarts.init(this.$refs.cbchart)
      this.initOption()
    },
    methods: {
      initOption(){
        if (Object.keys(this.cbchartData).length) {
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
                return `${params[0].name}<br>
                            	        ${params[0].marker}${params[0].seriesName}：${params[0].value}元/亩<br/>
                            	        ${params[1].marker}${params[1].seriesName}：${params[1].value}元/亩<br/>
                            	        ${params[2].marker}${params[2].seriesName}：${params[2].value.toFixed(2)}%`
              }
            },

            grid: {
              left: '50',
              right: '35',
              bottom: '25',
              top: '35',
//			              width:"75%",
              containLabel: false
            },

            xAxis: {
              type: 'category',
              boundaryGap: true,   //坐标轴的留白
              axisLine: {      //隐藏X轴线
                show: true,
                lineStyle: {
                  color: "#35B4F7"
                }
              },
              axisLabel: {
                textStyle: {
                  color: '#fff',
                },
                fontSize: 12,
              },
              data: [],
            },
            yAxis: [
              {
                name: '元/亩',
                nameTextStyle: {
                  color: '#fff',
                  fontSize: '12',
                  padding: [0,0,0,-50]
                },
                type: 'value',
                show: true,
                min: '0',
                axisLine: {
                  show: false,
                },
                axisLabel: {    //坐标轴刻度标签的相关设置。
                  margin: 10,
                  textStyle: {
                    color: '#fff',
                    fontSize: 12
                  },
                  formatter: (params) => {
                    return params
                  }
                },
                splitLine: {
                  lineStyle: {
                    color: '#003F69',
                    type: "dashed",
                  }
                },
              },
              {
                name: '%',
                nameTextStyle: {
                  color: '#fff',
                  fontSize: '12',
                  padding: [0,-30,0,0]
                },
                type: 'value',
                show: true,
                min: '0',
                axisLine: {
                  show: false,
                },
                axisLabel: {    //坐标轴刻度标签的相关设置。
                  margin: 12,
                  textStyle: {
                    color: '#fff',
                    fontSize: 12
                  }
                },
                splitLine: {
                  show: false,
                },
              }
            ],
            series: [
              {
                name: "总成本",
                type: "bar",
                barWidth: 6,
                data: [],
                itemStyle: {
                  normal: {
                    color: "#34A2EE",

                  }
                }
              },
              {
                name: "净利润",
                type: "bar",
                barWidth: 7,
                data: [],
                itemStyle: {
                  normal: {
                    color: "#D2C62D"

                  }
                }
              },
              {
                name: "成本利润率",
                type: "line",
                icon: "none",
                data: [],
                yAxisIndex: 1,
                symbolSize: 5,
                itemStyle: {
                  normal: {
                    opacity: 0,
                    color: '#00A261',
                    borderWidth: 1,
                  },
                  emphasis: {
                    borderColor: '#00A261'
                  }
                },
                smooth: true,
                zlevel: 9
              },
            ],
          };
        }
      },
      initChart(){
        //如果有新的配置项的变化 深度拷贝
        /*if (Object.keys(this.cbchartData.option).length) {
          this.option = $.extend(true, this.option, this.cbchartData.option)
        }*/

        this.option.series[0].data = this.cbchartData.data[0].totalCost,
          this.option.series[1].data = this.cbchartData.data[0].profitRatio,
          this.option.series[2].data = this.cbchartData.data[0].costProfitRatio.map((item) => {
            return item * 100
          }),
          this.option.xAxis.data = this.cbchartData.timeData,
          this.myChart.setOption(this.option);
//        	  console.log(this.cbchartData.data[0])
      },
      _windowResizeHandler(){
        this.myChart.resize()
      },
      _destroyEchart(){
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
