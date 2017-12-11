<template>
  <div ref="small2" class="small">pie组件</div>
</template>
<script type="text/javascript">
  // **** 组件名称 大驼峰 *****
  // ** 本地公用变量 公用函数 **
  // ***** 第三方 组件库 *****
  // ***** 本地 公用组件 *****
  import { resizeMixin, $ } from 'assets/js/common'
  import { dataZoom, tooltipStyle } from 'assets/js/echarts-style'
  // ** 当前组件的 子组件等 ***

  export default {
    name: 'pie',
    mixins: [resizeMixin],
    props: {
      title: {
        type: String,
        default: ''
      },
      data: {
        type: Array,
        default: () => []
      }
    },
    data() {
      return {

      }
    },
    mounted() {
      this.initOption();
      this.initChart()
    },
    methods: {
      initOption() {
        // this.chart = this.$echarts.init(document.getElementById('bar'))
        this.chart = this.$echarts.init(this.$refs.small2);

        this.option = {
          tooltip: {
            ...tooltipStyle,
            trigger: 'item',
            formatter: function(params) {
              return params.name + '</br>'+params.value + '吨' + '</br>' + params.percent + '%'
            },
            //formatter: '{d}%\n{b}',
          },
          title: {
            text: '价位\n(元/公斤)',
            textStyle: {
              fontSize: 18,
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
                show: false,
              }
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
            radius: ['40%', '85%'],
            center: ['50%', '50%'],
            color: ['#38D16F', '#32A1EC', '#1378E2', '#E8C23D', '#E87B20'],
            data: []
          }],
        };
      },

      initChart() {
        this.option.series[0].data = this.data.sort(function (a, b) {
          return b.value-a.value
        })
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
    computed: {}
  }

</script>
<style lang="scss" scoped>
  @import "~assets/css/_variable.scss";
  @import "~assets/css/_mixin.scss";

  .small {
    @include flex(center, center);
    height: 100%;
    background: rgba(255, 0, 0, .3);
  }

  .small {
    width: 100%;
    height: 100%;
  }

</style>
