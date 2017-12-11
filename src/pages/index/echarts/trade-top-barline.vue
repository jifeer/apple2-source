<template>
  <div ref="topBarline" class="topBarline-wrapper">

  </div>
</template>
<script>
  import {$,datazoom,resizeMixin} from 'assets/js/common'

  export default {
    name: 'topBarline',
    mixins: [resizeMixin],
//  data(){
//    return {
//      myChart:null
//    }
//  },
    props: {
      tradeTopBarData: {
        type: Object,
        default(){
        	return {}
        }
      }
    },
    watch:{
      tradeTopBarData: {
        handler: function (val, oldVal) {
          this.initChart()
        },
        deep: true  //增加deep 观察对象的子对象变化
      }
    },
    mounted() {
    	this.myChart = this.$echarts.init(this.$refs.topBarline)
      this.initChart()
    },
    computed: {

    },
    methods: {
      initChart(){
        let option = {
         grid: {
              left: '50',
              right: '30',
              bottom: '25',
              top: '35',
//              width:"82%",
              containLabel: false
            },
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              type: 'shadow',
              shadowStyle: {
                color: 'rgba(0, 255, 102, .05)'
              }
            },
            backgroundColor: '#099d4f',
            formatter:(params)=>{
//          	   console.log(params)
            	   return `${params[0].name}年<br/>
            	           ${params[0].marker}${params[0].seriesName}：${params[0].value}万吨<br/>
            	           ${params[1].marker}${params[1].seriesName}：${params[1].value}%<br/>
            	           ${params[2].marker}${params[2].seriesName}：${params[2].value}万吨<br/>
            	           ${params[3].marker}${params[3].seriesName}：${params[3].value}%`
            }
          },
          calculable: true,

          xAxis: [{
            type: 'category',
            data: this.tradeTopBarData.time,
            axisLine: {
              lineStyle: {
                color: '#35B4F7',
                width: 1
              }
            },
            axisTick: {
              show: true
            },
            axisLabel: {
              formatter: '{value}',
              textStyle:{
                fontSize: 12,
                color:'#fff'
              }
            },
            splitLine: {
              show: false,

            },
          }],
          yAxis: [{
            type: 'value',
            name: '万吨',
            nameTextStyle: {
              fontSize: 12,
              color:'#fff',
              padding: [0,0,0,-50]
            },
            axisLabel: {
//            formatter: '{value}',
              formatter:(params)=>{
		            	return params
		           },
              textStyle:{
                fontSize: 12,
                color:'#fff'
              }
            },
            axisLine: {
              show: false
            },
            splitLine: {
              show: true,
              lineStyle: {
                color: 'rgb(26, 72, 89)',
                type : "dotted"
              }
            },
            axisTick: {
              show: false
            },

          }, {
            type: 'value',
            name: '变化率（%）',
            nameTextStyle: {
              fontSize: 12,
              color:'#fff',
              padding: [0,0,0,0]
            },
            axisLabel: {
              show: true,
              formatter: '{value}',
              textStyle:{
                fontSize: 12,
                color:'#fff'
              }
            },
            axisTick: {
              show: false
            },
            axisLine: {
              show: false
            },
            splitLine: {
              show: false,
              lineStyle: {

                type : "dotted"
              }
            }

          }],
          series: [{
            name: '苹果消费总量',
            type: 'bar',
            barWidth:7,
            itemStyle:{
              normal:{
                color:'#40b0fc'
              }
            },
            data: this.tradeTopBarData.allExpense,
          }, {
            name: '消费量变化率',
            type: 'line',
            smooth: true,
            yAxisIndex: 1,
            symbolSize:8,
            lineStyle:{
              normal:{
                color:'#099d4f'
              }
            },
            itemStyle:{
              normal:{
                color:'#099d4f',
                opacity: 0
              }
            },
            data: this.tradeTopBarData.expenseChangeRate,
          },{
            name: '苹果总产量',
            type: 'bar',
            barWidth:7,
            itemStyle:{
              normal:{
                color:'#d2c730'
              }
            },
            data: this.tradeTopBarData.yield,
          }, {
            name: '产量变化率',
            type: 'line',
            smooth: true,
            yAxisIndex: 1,
            symbolSize:8,
            lineStyle:{
              normal:{
                color:'#e98f35'
              }
            },
            itemStyle:{
              normal:{
                color:'#099d4f',
                opacity: 0
              }
            },markLine: {
              symbolSize: 0,
              lineStyle: {
                normal: {
                  color: 'red',
                  type: 'dotted',
                  width: 1
                }
              },
              data: [{
                type: 'average',
//              value: this.tradeTopBarData.flag
              }]
            },
            data: this.tradeTopBarData.yieldChangeRate,
          }]
        };

        //如果有新的配置项的变化 深度拷贝
        /*if(Object.keys(this.tradeTopBarData.option).length){
          option = $.extend(true,option,this.tradeTopBarData.option)
        }*/
        this.myChart.setOption(option);
      },
      //echart 图表自适应
      _windowResizeHandler () {
        this.myChart.resize()
      },
      // 销毁echart 图表
      _destroyEchart () {
        this.myChart.dispose()
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "./../../../assets/css/_variable.scss";
  @import "./../../../assets/css/_mixin.scss";
  .topBarline-wrapper{
  	width: 100%;
  	height: 100%;
  }
</style>
