<template>
  <div ref="tradePie" class="trade-pie-wrapper"> </div>
</template>
<script>
  import { $, extend, resizeMixin } from 'assets/js/common'
  export default {
    name: "tradePie",
    mixins: [resizeMixin],
    props: {
      data: {
        type: Array,
        default: () => []
      }
    },
    data() {
      return {}
    },
    mounted() {
      this.myChart = this.$echarts.init(this.$refs.tradePie)
      this.$nextTick(() => {
        this.initChart()
      });
    },
    methods: {
      initChart() {
        let option = {
          grid: {
            top: "1%",
          },
          color: ['#0064CC', '#1BAB51', '#04933E', '#0064CC', '#1378E2', '#32A1EC', '#E8C23D', '#E87B20'],
          series: [{
            name: '占比',
            type: 'pie',
            radius: ['30%', '90%'],
            center: ['50%', '50%'],
            avoidLabelOverlap: false,
            label: {
              normal: {
                position: 'inside',
                color: "#fff",
                fontSize: "18",
                formatter: function(params) {
                  if (params.dataIndex < 3) {
                    return params.percent + '%\n' + params.name
                  } else {
                    return ''
                  }
                },
              },
              emphasis: {
                position: 'inside',
                color: "#fff",
                formatter: '{d}%\n{b}',
                textStyle: {
                  fontSize: 18,
                  color: '#fff'
                }
              }
            },
            labelLine: {
              normal: {
                lineStyle: {
                  color: "#fff",
                }
              }
            },
            itemStyle: {
              normal: {
                borderColor: '#042546',
                borderWidth: 2,
              },
            },
            data: []
          }]
        }

        option.series[0].data = this.data
        this.myChart.setOption(option, true);
      },
      _windowResizeHandler() {
        this.myChart.resize()
      },
      _destroyEchart() {
        this.myChart.dispose()
      }
    },
    watch: {
      data: {
        handler: function(val, oldVal) {
          this.initChart()
        },
        deep: true //增加deep 观察对象的子对象变化
      }
    },
  }

</script>
<style lang="scss" scoped>
  @import "./../../../assets/css/_variable.scss";
  @import "./../../../assets/css/_mixin.scss";
  .trade-pie-wrapper {
    width: 100%;
    height: 100%;
  }

</style>
