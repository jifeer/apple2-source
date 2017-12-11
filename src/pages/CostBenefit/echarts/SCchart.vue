<template>

  <div ref="SCchart" class="SCchart-wrapper">

  </div>
</template>

<script>
  import {extend, $, resizeMixin} from 'assets/js/common'
  import {axisLabel, dataZoom} from 'assets/js/echarts-style'
  export default {
    name: 'SCchart',
    mixins: [resizeMixin],
    props: {
      SCchartData: {
        type: Object,
        default: ()=>{

        }
      },
      item: {
        type: Boolean,
        default: true
      },

    },

    watch: {
      SCchartData: {
        handler: function (val, oldVal) {
          this.initChart()
        },
        deep: true  //增加deep 观察对象的子对象变化
      }
    },

    data() {
      return {
        color: ["#009E4C", "#E9C80E", "#0071B3", "#FF7200"],
        unit: null,
      };
    },

    mounted() {
      this.myChart = this.$echarts.init(this.$refs.SCchart)
      this.initOption()
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
              /*position: function (point, params, dom, rect, size) {
               console.log(dom.innerHTML)
               }*/
            },
            dataZoom: [{
              "show": true,
              "height": 13,
              "xAxisIndex": [0],

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
              "start": 50,
              "end": 35
            }],
            legend: {
              type: "scroll",
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
              name: '元/亩        ',
              nameTextStyle: {
                color: '#fff',
                fontSize: '20',
                align: "center",
                lineHeight: 50,
              },
              nameGap: 26,
              type: 'value',
              show: true,
              min: '0',
              axisLine: {
                show: false,
              },
              axisLabel: axisLabel,
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
        let legendData = [];
        this.SCchartData.data.forEach((val, index, arr) => {
          legendData.push({
            name: arr[index].name.replace('-','')
          })
          newSeries.push({
            type: "line",
            name: arr[index].name.replace('-',''),
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
//                   newSeries.push(val[index].value)
//                   console.log(val)
        })
        //为tootip加单位
        if (this.item == true) {
          this.unit = "元/亩"
        } else {
          this.unit = "元/公斤"
        }
        this.option.tooltip.formatter = (params) => {
          let a1 = "<div style='text-align:left'>" + params[0].name + "年<br/>"
          for (let index = 0; index < params.length; index++) {
            a1 += params[index].marker + params[index].seriesName + "：" + params[index].value + this.unit + "<br/>"
          }
          return a1 + "</div>"
        }
        this.option.series = newSeries
        this.option.legend.data = legendData
        this.option.xAxis.data = this.SCchartData.timeData
        this.myChart.setOption(this.option, true);
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
