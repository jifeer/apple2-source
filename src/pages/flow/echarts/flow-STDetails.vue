<template>
  <div ref="stdetails" class="stdetails-wrapper">

  </div>
</template>

<script>
  import {datazoom, $, resizeMixin} from 'assets/js/common'

  export default {
    name: 'lineChart',
    mixins: [resizeMixin],
    data() {
      return {
        myChart: null
      }
    },
    props: {
      echartsDatab: {
        type: Object,
        default: null
      },
      height: {
        type: String,
        default: ""
      },
      width: {
        type: String,
        default: ""
      },
    },
    watch: {
      echartsDatab: {
        handler: function (val, oldVal) {
          //console.log("watch")
          this.initChart()
        },
        deep: true  //增加deep 观察对象的子对象变化
      }
    },
    data() {
      return {};
    },
    mounted() {
      this.myChart = this.$echarts.init(this.$refs.stdetails)

    },
    methods: {
      initChart() {
        if (Object.keys(this.echartsDatab).length) {
          let option = {
            tooltip: {
              trigger: 'axis',
              axisPointer: {
                type: 'shadow',
                shadowStyle: {
                  color: 'rgba(0, 255, 102, .05)'
                }
              },
              backgroundColor: '#099d4f',
            },
            grid: {
              left: '15%',
              containLabel: false  //总宽度是否包含坐标轴标签
            },
            xAxis: {
              type: 'category',
              boundaryGap: true,
              axisLine: {
                lineStyle: {
                  color: 'rgb(26, 72, 89)'
                }
              },
              axisLine: {      //隐藏X轴线
                show: true,
                lineStyle: {
                  color: "#35B4F7"
                }
              },

              axisLabel: {
                textStyle: {
                  color: '#fff'
                }
              },
              data: this.echartsDatab.xdata
            },
            yAxis: {
              name: '（吨）',
              nameTextStyle: {
                color: '#fff',
                align: "center",
              },
              type: 'value',
              show: true,
              min: '0',
              axisLine: {
                show: false,
              },
              axisLabel: {    //坐标轴刻度标签的相关设置。
                formatter:(params)=>{
                  return params
                },
                margin: 10,
                textStyle: {
                  color: '#fff'
                }
              },
              splitLine: {
                lineStyle: {
                  color: '#003F69',
                  type: "dashed"
                }
              }
            },
            series: [
              {
                name: "第一季度",
                type: "bar",
                barwidth: 16,
                data: this.echartsDatab.data[0],
                itemStyle: {
                  normal: {
                    color: "#33A0EA"
                  }
                }
              },
              {
                name: "第二季度",
                type: "bar",
                barwidth: 16,
                data: this.echartsDatab.data[1],
                itemStyle: {
                  normal: {
                    color: "#00A15F"
                  }
                }
              },
              {
                name: "第三季度",
                type: "bar",
                barwidth: 16,
                data: this.echartsDatab.data[2],
                itemStyle: {
                  normal: {
                    color: "#D6D241"
                  }
                }
              },
              {
                name: "第四季度",
                type: "bar",
                barwidth: 16,
                data: this.echartsDatab.data[3],
                itemStyle: {
                  normal: {
                    color: "#D38133"
                  }
                }
              }
            ]
          };

          //如果有新的配置项的变化 深度拷贝
          if (Object.keys(this.echartsDatab.option).length) {
            option = $.extend(true, option, this.echartsDatab.option)
          }
          this.myChart.setOption(option, true);

        }
      },
      _windowResizeHandler() {
        this.myChart.resize()
      },
      _destroyEchart() {
        this.myChart.dispose()
      }
    },
    components: {},

  };
</script>

<style lang="scss" scoped>
  @import "./../../../assets/css/_variable.scss";
  @import "./../../../assets/css/_mixin.scss";

  .stdetails-wrapper {
    width: 100%;
    height: 100%;
  }
</style>
