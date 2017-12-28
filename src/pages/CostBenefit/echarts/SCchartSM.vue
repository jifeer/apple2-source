<template>

  <div ref="SCchart" class="SCchart-wrapper">

  </div>
</template>

<script>
  import {extend, $, datazoom} from 'assets/js/common'
  import {resizeMixin} from 'assets/js/common'
  export default {
    name: 'SCchart',
    mixins: [resizeMixin],
    props: {
      SCchartData: {
        type: Object,
        default: null
      },

    },
    watch: {
      SCchartData: {
        handler: function (val, oldVal) {
//                  console.log("watch")
          this.initChart()
        },
        deep: true  //增加deep 观察对象的子对象变化
      }
    },
    data() {
      return {
        color: ["#009E4C", "#E9C80E", "#0071B3", "#FF7200"]
      };
    },
    mounted() {
      this.myChart = this.$echarts.init(this.$refs.SCchart)

      this.initOption()
      this.initChart()
    },

    methods: {
      initOption(){
        if (Object.keys(this.SCchartData).length) {
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
            grid: {
              left: '4%',
              right: '4%',
              bottom: '15%',
              top: '15%',
              containLabel: true
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
              axisLabel: {
                textStyle: {
                  color: '#fff',
                },
                fontSize: 12,
                fontWeight: "lighter",
              },
              data: [],
            },
            yAxis: {
              name: '        物质与服务费用（元）',
              nameTextStyle: {
                color: '#fff',
                fontSize: '12',
                align: "center",
                lineHeight: 50,
              },
              nameGap: 15,
              type: 'value',
              show: true,
              min: '0',
              axisLine: {
                show: false,
              },
              axisLabel: {    //坐标轴刻度标签的相关设置。
                margin: 20,
                textStyle: {
                  color: '#fff',
                  fontSize: 12,
                  fontWeight: "lighter",
                },
                formatter: (params) => {
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


        }
      },
      initChart(){
        //如果有新的配置项的变化 深度拷贝
        if (Object.keys(this.SCchartData.option).length) {
          this.option = $.extend(true, this.option, this.SCchartData.option)
        }

        let newSeries = [];
        this.SCchartData.data.forEach((val, index, arr) => {

          newSeries.push({
            type: "line",
            name: arr[index].name,
            symbolSize: 3,
            symbol: "circle",
            icon: "none",
            data: arr[index].value,
            lineStyle: {
              normal: {
                color: this.color[index],
                width: 2,
              },
            },
            itemStyle: {
              normal: {
                color: this.color[index],
                borderColor: "#FFF500",
                borderWidth: 1,
              },
              emphasis: {
                borderColor: '#FFF500'
              }
            }
          },)

        })
        //为tootip加单位
        this.option.tooltip.formatter = (params) => {
          let tooltip = "<div style='text-align:left'>" + params[0].name + "年<br/>"
          for (let index = 0; index < params.length; index++) {
            tooltip += params[index].marker + params[index].seriesName + "：" + params[index].value + "元<br/>"
          }
          return tooltip + "</div>"
        }
        this.option.series = newSeries
        this.option.xAxis.data = this.SCchartData.timeData
        this.myChart.setOption(this.option, true);
//          	console.log(this.SCchartData.timeData)
      },
      _windowResizeHandler(){
        this.myChart.resize()
      },
      _destroyEchart(){
        this.myChart.dispose()
      }
    },
//      components: {},

  };
</script>

<style lang="scss" scoped>
  @import "./../../../assets/css/_variable.scss";
  @import "./../../../assets/css/_mixin.scss";

  .SCchart-wrapper {
    width: 100%;
    height: 100%;
  }
</style>
