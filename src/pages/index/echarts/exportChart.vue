<template>
  <div ref="cbchart" class="costBenefit-cbchart-wrapper">

  </div>
</template>

<script>
  import {extend, datazoom, $} from 'assets/js/common'
  import {resizeMixin} from 'assets/js/common'
  export default {
    name: 'cbchart',
    mixins: [resizeMixin],
    props: {
      exportDate: {
        type: Object,
        default(){
          return {}
        }
      },
    },

    watch: {
      exportDate: {
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
      this.initChart()
    },
    methods: {
      initChart(){
        if (Object.keys(this.exportDate).length) {
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
              formatter: (params) => {
                return `${params[0].name}<br>
                            	        ${params[0].marker}${params[0].seriesName}：${params[0].value}万吨<br/>
                            	        ${params[1].marker}${params[1].seriesName}：${params[1].value}万吨`
              }
            },

            grid: {
              left: '50',
              right: '30',
              bottom: '25',
              top: '35',
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
              data: this.exportDate.xdata
            },
            yAxis: [
              {
                name: '万吨',
                nameTextStyle: {
                  color: '#fff',
                  fontSize: 12,
                  padding: [0, 0, 0, -50]
                },
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
                    fontSize: 12
                  }
                },
                splitLine: {
                  lineStyle: {
                    color: '#003F69',
                    type: "dashed",
                  }
                },
              }

            ],
            series: [
              {
                name: "鲜苹果",
                type: "bar",
                barWidth: 7,
                data: this.exportDate.freshApple,
                itemStyle: {
                  normal: {
                    color: "#34A2EE"

                  }
                }
              },
              {
                name: "苹果汁",
                type: "bar",
                barWidth: 7,
                data: this.exportDate.appleJuice,
                itemStyle: {
                  normal: {
                    color: "#D2C62D"

                  }
                }
              },

            ],
          };

          //如果有新的配置项的变化 深度拷贝
          /*if (Object.keys(this.exportDate.option).length) {
            option = $.extend(true, option, this.exportDate.option)
          }*/
          this.myChart.setOption(option);
          this.myChart.on("click", (params) => {
            this.$emit("toCostStructure", params)
//                   	alert(params.dataIndex)
          })

        }
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
