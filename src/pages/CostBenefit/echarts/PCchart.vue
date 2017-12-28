<template>

  <div ref="pcchart" class="pcchart-wrapper">

  </div>
</template>

<script>
  import {extend, $, datazoom} from 'assets/js/common'
  import {resizeMixin} from 'assets/js/common'

  export default {
    name: 'pcchart',
    mixins: [resizeMixin],
    props: {
      cbchartData: {
        type: Object,
        default: null
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
      this.myChart = this.$echarts.init(this.$refs.pcchart)

      this.initChart()
    },
    methods: {
      initChart() {
        if (Object.keys(this.cbchartData).length) {
          let option = {
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
            dataZoom: datazoom,
            legend: {
              data: [
                {
                  name: "全国",
                },
                {
                  name: "山东",
                },
                {
                  name: "陕西",
                },
              ],
              icon: "line",
              itemHeight: 8,
              itemWidth: 14,
              itemGap: 70,
              textStyle: {
                color: "#fff",
                fontSize: 16
              },
            },

            grid: {
              left: '10%',
              bottom: '12%',
              width: "89%",
              containLabel: false  //总宽度是否包含坐标轴标签
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
                fontSize: 20,
              },
              data: this.cbchartData.xdata
            },
            yAxis: {
              name: '单位面积成本（元/亩）',
              nameTextStyle: {
                color: '#fff',
                fontSize: '16',
                align: "center",
              },
              type: 'value',
              show: true,
              min: '0',
              axisLine: {
                show: false,
              },
              axisLabel: {    //坐标轴刻度标签的相关设置。
                margin: 10,
                formatter:(params)=>{
                  return params
                },
                textStyle: {
                  color: '#fff',
                  fontSize: 16
                }
              },
              splitLine: {
                lineStyle: {
                  color: '#003F69',
                  type: "dashed",

                }
              },
            },
            series: [
              {
                name: "全国",
                type: "line",
                symbolSize: 13,
                symbol: "circle",
                data: this.cbchartData.dataa,
                lineStyle: {
                  normal: {
                    color: '#00B874',
                    width: 4,
                  },
                },
                itemStyle: {
                  normal: {
                    color: '#00B874',
                    borderColor: "#FFF500",
                    borderWidth: 2,
                  },
                  emphasis: {
                    borderColor: '#FFF500'
                  }
                }
              },
              {
                name: "山东",
                type: "line",
                symbolSize: 13,
                symbol: "circle",
                data: this.cbchartData.datab,
                lineStyle: {
                  normal: {
                    color: '#FF8000',
                    width: 4,
                  },
                },
                itemStyle: {
                  normal: {
                    color: '#FF8000',
                    borderColor: "#FFF500",
                    borderWidth: 2,
                  },
                  emphasis: {
                    borderColor: '#FFF500'
                  }
                }
              },
              {
                name: "陕西",
                type: "line",
                symbolSize: 13,
                symbol: "circle",
                data: this.cbchartData.datac,
                lineStyle: {
                  normal: {
                    color: '#2D8ECC',
                    width: 4,
                  },
                },
                itemStyle: {
                  normal: {
                    color: '#2D8ECC',
                    borderColor: "#FFF500",
                    borderWidth: 2,
                  },
                  emphasis: {
                    borderColor: '#FFF500'
                  }
                },
              },
            ],
          };

          //如果有新的配置项的变化 深度拷贝
          if (Object.keys(this.cbchartData.option).length) {
            option = $.extend(true, option, this.cbchartData.option)
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
    },
//      components: {},

  };
</script>

<style lang="scss" scoped>
  @import "./../../../assets/css/_variable.scss";
  @import "./../../../assets/css/_mixin.scss";

  .pcchart-wrapper {
    width: 100%;
    height: 100%;
  }
</style>
