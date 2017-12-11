<template>
  <div ref="barchart" class="barchart-wrapper">

  </div>
</template>

<script>
  import {$, datazoom, resizeMixin} from 'assets/js/common'

  export default {
    name: 'barchart',
    mixins: [resizeMixin],
    props: {
      trend: {
        type: Object,
        default(){
        	return {}
        },
      }
    },

    watch:{
      trend: {
        handler: function (val, oldVal) {
          this.initChart()
        },
        deep: true  //增加deep 观察对象的子对象变化

      }
    },
    mounted() {

    	this.myChart = this.$echarts.init(this.$refs.barchart)
//    this.$nextTick(()=>{
//      this.initChart()
//    })
    },
    computed: {

    },
    methods: {
      initChart(){

        if (Object.keys(this.trend).length) {
            let option = {
              tooltip: {
                trigger: 'axis',
                backgroundColor:"#099d4f",
                axisPointer: {
                  type: 'line',
                  lineStyle: {
                    type: 'dashed',
                    color: '#ff7200'
                  }
                },
                formatter:(params)=>{
                            	return `${params[0].name}<br>
                            	        ${params[0].marker}${params[0].seriesName}：${params[0].value}元/公斤<br/>
                            	        ${params[1].marker}${params[1].seriesName}：${params[1].value}元/公斤<br/>
                            	        ${params[2].marker}${params[2].seriesName}：${params[2].value}元/公斤<br/>
                            	        ${params[3].marker}${params[3].seriesName}：${params[3].value}元/公斤`
                            }
              },
              grid: {
			              left: '30',
			              right: '10',
			              bottom: '25',
			              top: '35',
			              containLabel: false
			            },
              color: ["#1abc9c", "#1abc9c", "#ffaa3d", "#0130fb", "#0130fb"],
              xAxis: {
                type: 'category',
                boundaryGap: true,
                axisLine: {
                  show: true,
                  lineStyle: {
                    color: '#35B4F7'
                  }
                },
                axisTick: {
                  show: true
                },
                axisLabel: {
                  margin: 10,
                  textStyle: {
                    fontSize: 12,
                    color: '#fff'
                  }
                },
                data:this.trend.xAxisData
              },
              yAxis: [{
                type: 'value',
                show: true,
                axisTick: {
                  show: false
                },
                name: '价格（元/公斤）',
                nameTextStyle: {
                  color: '#fff',
                  padding: [0,0,0,50]
                },
                axisLine: {
                  show: false,
                  lineStyle: {
                    color: '#88c6ff'
                  }
                },
                axisLabel: {
                  margin: 10,
                  textStyle: {
                    fontSize: 12,
                    color: '#fff'
                  }
                },
                splitLine: {
                  show: true,
                  formatter: '{value}',
                  lineStyle: {
                    color: '#004374',
                    type: 'dashed'
                  }
                }
              }],
              series: [
                {
                  name: '零售价格',
                  type: 'line',
                  smooth: true,
                  symbolSize: 5,
                  symbol: 'circle',
                  itemStyle: {
                    normal: {
                      color: '#ff7200',
                      borderWidth: 2,
                      borderColor: '#fff300'
                    }
                  },
                  data: this.trend.seriesData[0],

                },
                {
                  name: '批发价格',
                  type: 'line',
                  symbolSize: 5,
                  symbol: 'circle',
                  itemStyle: {
                    normal: {
                      color: '#00af67',
                      borderWidth: 2,
                      borderColor: '#fff300'
                    },
                    emphasis: {
                      borderColor: '#75f908'
                    }
                  },
                  smooth: true,
                  data: this.trend.seriesData[1],
                },
                {
                  name: '出口价格',
                  type: 'line',
                  symbolSize: 5,
                  symbol: 'circle',
                  itemStyle: {
                    normal: {
                      color: '#3189c7',
                      borderWidth: 2,
                      borderColor: '#f0f70a'
                    },
                    emphasis: {
                      borderColor: '#f0f70a'
                    }
                  },
                  smooth: true,
                  data: this.trend.seriesData[2],
                },
                {
                  name: '进口价格',
                  type: 'line',
                  symbolSize: 5,
                  symbol: 'circle',
                  itemStyle: {
                    normal: {
                      color: '#cfd223',
                      borderWidth: 2,
                      borderColor: '#fffb00'
                    },
                    emphasis: {
                      borderColor: '#75f908'
                    }
                  },
                  smooth: true,
                  data: this.trend.seriesData[3],
                }

              ]
            }

          //如果有新的配置项的变化 深度拷贝

          if(Object.keys(this.trend.option).length){
            option = $.extend(true,option,this.trend.option)
          }
          this.myChart.setOption(option)
        }
        },
      // echats 图表自适应
      _windowResizeHandler() {
        this.myChart.resize()
      },
      // 销毁echats图表方法
      _destroyEchart() {
        this.myChart.dispose()
      }

   }



  }
</script>

<style lang="scss" scoped>
  @import "./../../../assets/css/_variable.scss";
  @import "./../../../assets/css/_mixin.scss";
   .barchart-wrapper{
   	width: 100%;
   	height: 100%;
   }

</style>
