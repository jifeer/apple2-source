<template>
  <div ref="bigPie" class="big-pie">pie组件</div>
</template>
<script type="text/javascript">
  // **** 组件名称 大驼峰 *****
  // ** 本地公用变量 公用函数 **
  // ***** 第三方 组件库 *****
  // ***** 本地 公用组件 *****
  import {resizeMixin, $} from 'assets/js/common'
  import {dataZoom, tooltipStyle, axisLabel} from 'assets/js/echarts-style'
  // ** 当前组件的 子组件等 ***

  export default {
    name: 'big-pie',
    mixins: [resizeMixin],
    props: {
      title: {
        type: String,
        default: ''
      },
      dataOne: {
        type: Array,
        default: () => []
      },
      dataTwo: {
        type: Array,
        default: () => []
      },
      dataThree: {
        type: Array,
        default: () => []
      },
      data: {
        type:Array,
        default: () => []
      }
    },
    data() {
      return {

      }
    },
    mounted() {
      this.initOption();
      if(this.data.length) {
        this.initChart()
      }
    },
    methods: {
      initOption() {
        this.chart = this.$echarts.init(this.$refs.bigPie);
        this.option = {
          tooltip: {
            ...tooltipStyle,
            trigger: 'item',
            formatter: '{b}</br>{c}吨</br>{d}%',
          },
          title: {
            text: this.titletext,
            textStyle: {
              fontSize: 26,
              fontWeight: 'normal',
              color: '#fff'
            },
            x: 'center',
            y: 'center'
          },
          series: [{
            name: '',
            type: 'pie',
            label: {
              normal: {
                position: 'inside',
                formatter: function(params) {
                  if (params.dataIndex < 3 && params.percent > 5) {
                    return params.name
                  } else {
                    return ''
                  }
                },
                textStyle: {
                  fontSize: 16,
                  color: '#fff'
                }
              },
            },
            labelLine: {
              normal: {
                length: 15,
                length2: 20,
                lineStyle: {
                  color: "#fff"
                }
              }
            },
            radius: ['40%', '80%'],
            center: ['50%', '50%'],
            color: ['#38D16F', '#32A1EC', '#1378E2', '#E8C23D', '#E87B20', '#D34D40', '#FF8080', '#85DF5B', '#80B3FF'],
            data: []
          }]
        }
      },
      initChart() {

        this.option.series[0].data = this.data

        // this.option.series[0].data = this.data.sort(function (a,b) {
        //   return b.value-a.value
        // })

        this.chart.setOption(this.option, true)
      },
      // echats 图表自适应
      _windowResizeHandler() {
        this.chart.resize()
      },
      // 销毁echats图表方法
      _destroyEchart() {
        this.chart.dispose()
      }
    },
    computed: {
      titletext() {
        if (this.title === '0') {
          return '价位\n(元/公斤)'
        } else if (this.title === '1') {
          return '果径\n(mm)'
        } else {
          return '包装重量\n(公斤)'
        }
      }
    },
    watch: {
      data(val) {
        if (val.length) {
          this.initChart()
        }
      }
    }
  }

</script>
<style lang="scss" scoped>
  @import "~assets/css/_variable.scss";
  @import "~assets/css/_mixin.scss";

  .big-pie {
    width: 100%;
    height: 100%;
  }

</style>
