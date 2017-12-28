<template>
  <div ref="bus" class="busineschart-wrapper">

  </div>
</template>

<script>
  import {extend, geoCoordMap, resizeMixin} from 'assets/js/common'
  import {dataZoom, tooltipStyle} from 'assets/js/echarts-style'

  export default {
    name: 'lineChart',
    mixins: [resizeMixin],
    props: {
      echartsData: {
        type: Object,
        default: null
      }
    },
    watch: {
      echartsData: {
        handler: function (val, oldVal) {
          //console.log("watch")
          this.initChart()
        },
        deep: true  //增加deep 观察对象的子对象变化
      }
    },
    data() {
      return {myChart: null,};
    },
    mounted() {
      this.myChart = this.$echarts.init(this.$refs.bus)
    },
    methods: {
      initChart() {
        if (Object.keys(this.echartsData).length) {

          //图表处理数据部分
          let option = {
            geo: {
              map: 'china',
              label: {
                emphasis: {
                  show: false
                }
              },
              zoom: 1.2,
              roam: true,
              left:'20%',
              itemStyle: {
                normal: {
                  //areaColor: 'rgba(76, 159, 129,0.9)',
                  areaColor: 'rgba(122, 247, 179,0.8)',
                  borderColor: '#20508a'
                },
                emphasis: {
                  areaColor: '#3952ca'
                }
              }
            },
            tooltip: {
              trigger: 'item',
              ...tooltipStyle,
              formatter: function (params) {
                let str = "苹果电商网店分布<br>";
                str += params.name + '：<b style="color:#ffa600;font-weight:blod;font-size:18px;">' + params.data.value[2] + "</b>家" + "<br>";
                return str
              }
            },
            series: [{
              //type: 'effectScatter',
              type: 'scatter',
              coordinateSystem: 'geo',
              data: this.echartsData.series,
              symbolSize: function (val) {
                return Math.max(val[2] / 30, 10);
              },
              showEffectOn: 'render',
              rippleEffect: {
                brushType: 'stroke'
              },
              hoverAnimation: true,
              label: {
                normal: {
                  /* formatter: '{b}',*/
                  position: 'right',
                  show: false
                }
              },
              itemStyle: {
                normal: {
                  color: '#f4e925',
                  shadowBlur: 50,
                  shadowColor: '#EE0000'
                }
              },
              zlevel: 1
            }]
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
    components: {}
  };
</script>

<style lang="scss" scoped>
  @import "./../../../assets/css/_variable.scss";
  @import "./../../../assets/css/_mixin.scss";

  .busineschart-wrapper {
    width: 100%;
    height: 100%;
  }
</style>
