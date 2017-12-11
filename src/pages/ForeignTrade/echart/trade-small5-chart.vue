<template>
  <div class="trade-small5-bar" ref="tradeSmall5"></div>
</template>

<script type="text/javascript">
  // **** 组件名称 大驼峰 *****
  // ** 本地公用变量 公用函数 **
  // ***** 第三方 组件库 *****
  // ***** 本地 公用组件 *****
  import {resizeMixin, $} from 'assets/js/common'
  import {dataZoom, tooltipStyle} from 'assets/js/echarts-style'
  // ** 当前组件的 子组件等 ***

  export default {
    name: 'trade-small5',
    mixins: [resizeMixin],
    props: {
      title: {
        type: String,
        default: ''
      },
      echartsData: {
        type: Object,
        default: () => {}
      },
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
        this.chart = this.$echarts.init(this.$refs.tradeSmall5);

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
            left: '5%',
            right: '7%',
            bottom: '12%',
            top: '30',
            containLabel: true
          },
          color:["#00B874","#FF8000"],
          xAxis:  {
            type: 'category',
            nameTextStyle: {
              fontSize: 12,
              color: "#fff",
              fontFamily: "微软雅黑",
            },
            boundaryGap: false,
//            data:  ['2002','2004','2006','2008','2010','2012','2014','2016'],
            data:[],
            axisLabel: {
              textStyle: {
                fontSize: 12,
                color: "#fff",
                fontFamily: "微软雅黑"
              },
              margin: 10,
              interval:0,
            },
            splitLine: {
              lineStyle: {
                color: '#35518f', //分割线颜色
                type: "solid",
                opacity:0.2
              }
            },
            axisTick:{
              show:true
            },
            axisLine: {
              lineStyle: {
                color: '#00558B',
              }
            },
          },
          yAxis: {
            type: 'value',
            name:'价格（元/公斤）',
            nameTextStyle: {
              fontSize: 12,
              color: "#fff",
              fontFamily: "微软雅黑",
              padding:[0, -20, 0, 0]
            },
            min: 9,
            max: 27,
            interval:5,
            axisLabel: {
              margin: 10,
              textStyle: {
                fontSize: 12,
                color: "#fff",
                fontFamily: "微软雅黑"
              },
              formatter:' {value} ',
            },
            axisTick:{
              show:false
            },
            axisLine: {
              show: false,
            },
            splitLine: {
              show: true,
              lineStyle: {
                type: 'dotted',
                color: '#114970'
              }
            },
          },
          series: [
            {
              name:'全球',
              type:'line',
//              data:[12, 13, 14, 15, 14.5, 15, 12.5, 15],
              data:[],
              symbol:'circle',
              symbolSize:8,
              itemStyle:{
                normal:{
                  lineStyle:{
                    color:'#00B874'
                  },
                  borderColor:'#FEFB00',
                },
              }
            },
            {
              name:'中国',
              type:'line',
//              data:[24, 16.5, 19.5, 17, 23, 17, 16.5, 25],
              data:[],
              symbol:'circle',
              symbolSize:8,
              itemStyle:{
                normal:{
                  lineStyle:{
                    color:'#FF8000'
                  },
                  borderColor:'#FEFB00',
                },
                emphasis:{
                  //borderWidth:'#ac7f1f',
                }
              }
            }
          ]
        };

      },
      initChart(){
        if (Object.keys(this.echartsData).length) {
          // 合并数据
          this.option.xAxis.data = this.echartsData.xAxisData;
          this.option.series[0].data = this.echartsData.Data1;
          this.option.series[1].data = this.echartsData.Data2
        }
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
      echartsData: {
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
  .trade-small5-bar {
    height: 100%;
    width: 100%;
  }
</style>
