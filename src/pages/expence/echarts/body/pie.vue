<template>
  <div ref="pie" class="chart"></div>
</template>

<script type="text/javascript">
  // **** 组件名称 大驼峰 *****
  // ** 本地公用变量 公用函数 **
  // ***** 第三方 组件库 *****
  import {resizeMixin} from 'assets/js/common'
  import {dataZoom, tooltipStyle} from 'assets/js/echarts-style'
  // ***** 本地 公用组件 *****
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
        type: Object,
        default: () => {}
      }
    },
    data() {
      return {}
    },
    created() {},
    mounted() {
      this.initOption();
      this.initChart()
    },
    methods: {
      initOption() {
        this.chart = this.$echarts.init(this.$refs.pie);
        // 基本配置
        this.option = {
          tooltip: {
            ...tooltipStyle,
            trigger: 'item',
            formatter: '{b}</br>{c}万吨</br>{d}%',
          },
          title: {
            text: '',
            textStyle: {
              fontSize: 18,
              fontWeight: 'normal',
              color: '#fff'
            },
            x: 'center',
            y: 'center'
          },
          grid: {
            left: '5%',
            right: '5%',
            bottom: '5%',
            containLabel: true
          },
          series: [{
            name: '',
            label: {
              normal: {
                formatter: '{b}\n{d}%',
                textStyle: {
                  fontSize: 18
                }
              }
            },
            type: 'pie',
            labelLine: {
              normal: {
                length:15,
                length2:20,
                lineStyle: {
                  color: "#fff"
                }
              }
            },
            itemStyle:{
              normal:{
                borderColor:'#08213D',
                borderWidth:2
              }
            },
            radius: ['30%', '60%'],
            center: ['50%', '50%'],
            color: ['#1BAB51','#32A1EC', '#E8C23D'],
            data: []
          }],
        }
      },

      initChart() {

        let newData = [{
          value: this.data.fresh,
          name: '鲜食消费',
        }, {
          value: this.data.processed,
          name: '加工消费',
        }]
        // let newLabel =
        this.option.series[0].data = newData
        this.option.title.text = `消费结构\n${this.data.year}`
        this.chart.setOption(this.option)
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
    }
  }
</script>

<style lang="scss" scoped>
  .chart {
    width: 100%;
    height: 100%;
  }
</style>
