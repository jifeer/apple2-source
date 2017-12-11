<template>
  <div ref="bigLine" class="big-line"></div>
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
    name: 'line',
    mixins: [resizeMixin],
    props: {
      title: {
        type: String,
        default: ''
      },
      data: {
        type:Object,
        default:() => {}
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
        this.myChart = this.$echarts.init(this.$refs.bigLine);
        this.option = {
          tooltip: {
            ...tooltipStyle,
            trigger: 'axis',
            axisPointer: {
              type: 'line',             // 样式 为 line 毋须 给其样式，默认就好
              lineStyle: {
                color: 'rgb(216, 115, 24)',
                type: 'dashed',
                width: 2
              }
            }
          },
          grid: {
            left: '2%',
            right: '4%',
            bottom: '10%',
            top:'6%',
            containLabel: true
          },
          color:["#00B874"],
          xAxis:{
            //name:'年度',
            type: 'category',
            nameTextStyle: {
              fontSize: 16,
              color: "#fff",
              fontFamily: "微软雅黑",
            },
            data:  [],
            axisLabel: axisLabel,
            boundaryGap: true,
            axisTick: {
              show: false,
              alignWithLabel: false,
            },
            axisLine: {
              show: true,
              lineStyle: {
                type: 'dotted',
                color: '#794A24'
              }
            },
            splitLine: {
              lineStyle: {
                color: '#35518f', //分割线颜色
                type: "dotted",
                opacity:0.2
              }
            }
          },
          yAxis: {
            type: 'value',
            name:'',
            nameTextStyle: {
              fontSize: 16,
              color: "#fff",
              fontFamily: "微软雅黑",
            },
            axisLine: {
              show: false,
              lineStyle: {
                color: '#fff'
              }
            },
            axisLabel: axisLabel,
            axisTick:{
              show:false
            },
            splitLine: {
              lineStyle: {
                color: '#35518f', //分割线颜色
                type: "dotted",
              }
            }
          },
          series: [
            {
              name:'全国',
              type:'line',
              data:[],
              symbol:'circle',
              symbolSize:15,
              itemStyle:{
                normal:{
                    color:'#00B874',
                    borderColor:'#FEFB00',
                }
              }
            }
          ]
        };
        //console.log(this.option);
      },
      initChart() {
        if(Object.keys(this.data).length) {
          this.option.xAxis.data = this.data.time;
          this.option.series[0].data = this.data.value
        }
        this.myChart.setOption(this.option);
      },
      // echats 图表自适应
      _windowResizeHandler() {
        this.myChart.resize()
      },
      // 销毁echats图表方法
      _destroyEchart() {
        this.myChart.dispose()
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
  .big-line {
    width: 100%;
    height: 100%;
  }
</style>
