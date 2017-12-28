s<template>

  <div ref="salesto" class="salesto-wrapper">

  </div>

</template>

<script>
  import {extend, resizeMixin} from 'assets/js/common'

  export default {
    name: 'barChart',
    mixins: [resizeMixin],
    data() {
      return {
        myChart: null
      }
    },
    props: {
      echartsData: {
        type: Object,
        default: null,
      },
      seriesName: '',
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
      this.myChart = this.$echarts.init(this.$refs.salesto)
    },
    methods: {
      initChart() {
        if (Object.keys(this.echartsData).length) {
          let that = this
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
              formatter: function (params) {
                //console.log(params)
                return that.seriesName + '>' + params[0].name + '<br>' + '总交易量:<b style="color:#ffa600;font-weight:blod;font-size:18px;">' + params[0].value + '</b>吨';
              }

            },
            legend: {
              data: this.echartsData.legend
            },
            grid: {
              left: '15%',
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
                  color: '#fff'
                },
                fontSize: 16
              },
              data: this.echartsData.xdata
            },
            yAxis: {
              name: '（吨）',
              nameTextStyle: {
                color: '#fff',
                fontSize: '16',
                align: "center"
              },
              type: 'value',
              show: true,
              min: '0',
              axisLine: {
                show: false
              },
              axisLabel: {    //坐标轴刻度标签的相关设置。
                formatter:(params)=>{
                  return params
                },
                margin: 10,
                textStyle: {
                  color: '#fff',
                  fontSize: 16
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
                name: "",
                type: "bar",
                barWidth: 16,
                data: this.echartsData.data,
                itemStyle: {
                  normal: {
                    color: "#33A0EA"
                  }
                }
              }
            ]
          };

          //如果有新的配置项的变化 深度拷贝
          if (Object.keys(this.echartsData.option).length) {
            option = extend(true, option, this.echartsData.option)
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

  .salesto-wrapper {
    width: 100%;
    height: 100%;
  }
</style>
