<template>
  <div ref="small1" class="small">bar-one组件</div>
</template>

<script type="text/javascript">
// **** 组件名称 大驼峰 *****
// ** 本地公用变量 公用函数 **
// ***** 第三方 组件库 *****
import { resizeMixin, $ } from 'assets/js/common'
import {dataZoom, tooltipStyle} from 'assets/js/echarts-style'
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
  },
  methods: {
    initOption() {
      this.chart = this.$echarts.init(this.$refs.small1);

      this.option = {
        tooltip: {
          ...tooltipStyle,
          trigger: 'axis',
        },
        grid: {
          left: '5%',
          right: '5%',
          bottom: '10%',
          top: '30',
          containLabel: true
        },
        yAxis: [{
          type: 'value',
          name: "消费总量（吨）",
          nameTextStyle:{
            fontSize:12,
          },
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
          axisLabel: {
            formatter:(params)=>{
              return params
            },
            textStyle: {
              color: "#fff",
              fontSize: 12
            }
          }
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
          axisLabel: {
            show: true,
            color: "#fff",//刻度标签文字的颜色
            textStyle: {
              fontSize: 12,
            },
          },
          axisLine: {
            lineStyle: {
              color: '#00558B',
            }
          },
//          data: ['全国', '山东', "江苏", "陕西", "云南", '山西', "河南", "其他"],
          data: []
        },
        series: [
          {
            name: '消费总量（吨）',
            type: 'bar',
            barWidth: 10,
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
//            data: [8000, 5000, 4500, 3000, 2500, 2300, 2000, 1800]
            data: []
          }
        ],
      };
    },

    initChart() {
      this.option.xAxis.data = this.data.map((item) => {
        return item.province
      });
      this.option.series[0].data = this.data.map((item) => {
        return item.weight
      });
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

.small {
  @include flex(center, center);
  width: 100%;
  height: 100%;
  background: rgba(255, 0, 0, .3);
}
</style>
