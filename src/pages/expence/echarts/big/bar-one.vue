<template>
  <div ref="barOne" data-comp="bar-one-component" class="bar">bar-one组件</div>
</template>

<script type="text/javascript">
// **** 组件名称 大驼峰 *****
// ** 本地公用变量 公用函数 **
// ***** 第三方 组件库 *****
import {resizeMixin, $} from 'assets/js/common'
import {dataZoom, tooltipStyle, axisLabel} from 'assets/js/echarts-style'
// ***** 本地 公用组件 *****
// ** 当前组件的 子组件等 ***

export default {
  name: 'bar-one',
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
    //console.log(this.data)
  },
  methods: {
    initOption() {
      this.chart = this.$echarts.init(this.$refs.barOne);

      this.option = {
        tooltip: {
          ...tooltipStyle,
          trigger: 'axis',
        },
        grid: {
          left: '2%',
          right: '2%',
          bottom: '0%',
          top: '10%',
          containLabel: true
        },
        yAxis: [{
          name: "消费总量（吨）",
          type: 'value',
          nameTextStyle:{
            fontSize: 16,
          },
          nameGap: 20,
          axisTick: {
            show: false
          },
          splitLine: {
            show: true,
            lineStyle: {
              type: 'dotted',
              color: '#114970'
            }
          },
          axisLine: {
            show: false,
            lineStyle: {
              color: '#fff',
            }
          },
          axisLabel: axisLabel
        }],
        xAxis: {
          type: 'category',
          name: '',
          splitLine: {
            show: false,
          },
          axisTick: {
            show: true,//显示刻度
          },
          axisLabel: axisLabel,
          axisLine: {
            lineStyle: {
              color: '#00558B',
            }
          },
          data: [],
        },
        series: [{
            name: '消费总量（吨）',
            type: 'bar',
            barMaxWidth: 16,
            label: {
              normal: {
                show: false,
                position: 'right',
                formatter: "{c}%"
              }
            },
            itemStyle: {
              normal: {
                color: '#35A2ED'
              }
            },
            // 顺序 从下向上 传入
            data: []
          }
        ]
      };
    },
    initChart() {
      this.option.xAxis.data = this.data.map((item, index) => {
        return item.province
      })
      this.option.series[0].data = this.data.map((item, index) => {
        return item.weight
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
  computed: {},
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
@import "~assets/css/_variable.scss";
@import "~assets/css/_mixin.scss";

.bar {
  background: rgba(255, 0, 0, .3);
  width: 100%;
  height: 100%;
}
</style>
