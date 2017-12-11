<template>
  <div ref="barchart">

  </div>
</template>

<script>
  import {$, datazoom, resizeMixin} from 'assets/js/common'

  export default {
    name: 'lineecharts',
    mixins: [resizeMixin],
    props: {
      echartsData: {
        type: Object,
        default: null
      }
    },
    data(){
      return {
        myChart:null
      }
    },
    watch:{
      echartsData: {
        handler: function (val, oldVal) {
          this.initChart()
        },
        deep: true  //增加deep 观察对象的子对象变化

      }
    },
    mounted() {

      this.$nextTick(()=>{
        this.initChart()
      })
    },
    computed: {

    },
    methods: {
      initChart(){
        this.myChart = this.$echarts.init(this.$refs.barchart)

        if (Object.keys(this.echartsData).length) {
            let option = {
              tooltip: {
                trigger: 'axis',
                axisPointer: {
                  type: 'line',
                  lineStyle: {
                    type: 'dashed',
                    color: '#ff7200'
                  }
                }
                //formatter: '{b}<br />{a0} : {c0}<br />{a1} : {c1}<br />{a2} : {c2}'
              },
              grid: {
                left: '8%',
                right: '3%',
                bottom: '8%',
                top:'20%',
                containLabel: true
              },
//            legend: {
//              show:false,
//              left: 'center',
//              data: ['批发价格', '零售价格', '进口价格', '出口价格'],
//              icon: 'line',
//              textStyle: {
//                color: '#fff'
//              }
//            },
              color: ["#1abc9c", "#1abc9c", "#ffaa3d", "#0130fb", "#0130fb"],
              xAxis: {
                type: 'category',
                boundaryGap: false,
                axisLine: {
                  show: true,
                  lineStyle: {
                    color: '#1a4859'
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
                data:this.echartsData.xAxisData
              },
              yAxis: [{
                type: 'value',
                show: true,
                axisTick: {
                  show: false
                },
                name: '价格（元/公斤）',
                axisLine: {
                  show: false,
                  lineStyle: {
                    color: '#88c6ff'
                  }
                },
                nameTextStyle: {
                  color: '#fff'
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
                    color: ['#1a4859'],
                    type: 'dashed'
                  }
                }
              }],
              dataZoom: datazoom,
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
                  data: this.echartsData.seriesData[0],

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
                  data: this.echartsData.seriesData[1],
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
                  data: this.echartsData.seriesData[2],
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
                  data: this.echartsData.seriesData[3],
                }

              ]
            }

          //如果有新的配置项的变化 深度拷贝

          if(Object.keys(this.echartsData.option).length){
            option = $.extend(true,option,this.echartsData.option)
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


</style>
