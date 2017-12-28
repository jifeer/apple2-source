<template>
  <div ref="small3" data-comp="bar-two-component" class="small">bar-two组件</div>
</template>

<script type="text/javascript">
// **** 组件名称 大驼峰 *****
// ** 本地公用变量 公用函数 **
// ***** 第三方 组件库 *****
// ***** 本地 公用组件 *****
import { resizeMixin, $ } from 'assets/js/common'
import {dataZoom, tooltipStyle} from 'assets/js/echarts-style'
// ** 当前组件的 子组件等 ***

export default {
  name: 'bar-two',
  mixins: [resizeMixin],
  props: {
    title: {
      type: String,
      default: ''
    },
    data: {
      type: Object,
      default: () => {}
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
      this.chart = this.$echarts.init(this.$refs.small3);

      this.option = {
        tooltip: {
          ...tooltipStyle,
          trigger: 'axis',
        },
        calculable : true,
        grid: {
          left: '5%',
          right: '5%',
          bottom: '10%',
          top: '30',
          containLabel: true
        },
        xAxis: [
          {
            name: '',
            type: 'category',
//            data: ['1995/96-2003/04年度','1995/96-2003/04年度'],
            data:[],
            axisPointer: {
              type: 'shadow'
            },
            axisLine: {
              show: true,
              lineStyle: {
                type: 'dotted',
                color: '#794A24'
              }
            },
            axisTick: {
              show: false
            },
            axisLabel: {
              interval: 0,
              color:'#fff',
              textStyle: {
                fontSize: 12,
              },
            }
          }
        ],
        yAxis: [
          {
            type: 'value',
            name: '弹性系数',
            nameTextStyle:{
              fontSize:12,
              color:'#fff'
            },
            axisLine: {
              show: false
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
            axisLabel: {
              formatter:(params)=>{
                return params
              },
              textStyle: {
                color: "#fff",
                fontSize: 12
              }
            }
          }
        ],
        // color:["#33A0EA","#119368","#C7C516"],
        color:["#40b0fc","#0e62d4","#4c58b1","#c37837","#c0bb3e"],
        series: [
          {
            name: '苹果价格',
            type: 'bar',
            barWidth : 15,
            barGap: 1,
            data:[],
            label: {
              normal: {
                show: true,
                position: 'top',
                color:'#fff',
                fontSize:12
              }
            }
          },
          {
            name: '国内生产总值',
            type: 'bar',
            barWidth : 15,
            barGap: 1,
            data:[],
            label: {
              normal: {
                show: true,
                position: 'top',
                color:'#fff',
                fontSize:12
              }
            }
          },
          {
            name: '苹果替代品价格',
            type: 'bar',
            barWidth : 15,
            barGap: 1,
            data:[],
            label: {
              normal: {
                show: true,
                position: 'top',
                color:'#fff',
                fontSize:12
              }
            }
          }
        ]
      }
    },

    initChart() {
      if(Object.keys(this.data).length){
        this.option.xAxis[0].data = this.data.time;
        this.option.series[0].data = this.data.data[0].data;
        this.option.series[1].data = this.data.data[1].data;
        this.option.series[2].data = this.data.data[2].data;
      }
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
