<template>
  <div ref="chart" :style="{width:width,height:height}">

  </div>
</template>

<script>
  import {resizeMixin} from 'assets/js/common.js'
  import {axisLabel} from 'assets/js/echarts-style.js';
  export default {
    name: 'risefall',
    mixins: [resizeMixin],
    data(){
      return {
        myChart: {}
      }
    },
    props: {
      echartsData: {
        type: Object,
        default: () => {
        }
      },
      height: {
        type: String,
        default: "100%"
      },
      width: {
        type: String,
        default: "100%"
      }

    },
    watch: {
      echartsData: {
        handler: function (val, oldVal) {
          this.initChart()
        },
        deep: true  //增加deep 观察对象的子对象变化
      }
    },
    mounted() {
      this.myChart = this.$echarts.init(this.$refs.chart);
      this.initOption()
    },
    computed: {},
    methods: {
      initOption(){
        this.option = {
          grid: {
            left: '4%',
            right: '2%',
            bottom: '10%',
            top: '10%',
            containLabel: true
          },
          textStyle: {
            fontSize: 18,
            fontWeight: 'lighter'
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
            /*formatter: (params, ticket, callback) => {
             if (this.echartsData.data.length > 0 && this.echartsData.data[params[0].dataIndex].value >= 0) {
             return `<ul style="list-style: none;text-align: left">
             <li>${params[0].name}</li>
             <li>${params[0].data.name}：${params[0].data.typeVal}${params[0].data.name === '种植面积' ? '万亩' : params[0].data.name === '产量' ? '千吨' : '公斤/亩'}</li>
             <li>变化率：<span style="color:#fff;font-weight: bold;">${params[0].data.value.toFixed(2)}</span>%↑</li>
             </ul>`;
             }
             else {
             return `<ul style="list-style: none;text-align: left">
             <li>${params[0].name}</li>
             <li>${params[0].data.name}：${params[0].data.typeVal}${params[0].data.name === '种植面积' ? '万亩' : params[0].data.name === '产量' ? '千吨' : '公斤/亩'}</li>
             <li>变化率：<span style='color:#fff;font-weight:bold;'>${-params[0].data.value.toFixed(2)}</span>%↓</li>
             </ul>`;
             }

             },*/

            // 第三版 简化了代码
            formatter: (params, ticket, callback) => {
//              console.log(params)
              let str = ''
              params.forEach((val, index) => {
                if (val.seriesIndex == 0 && (val.data.typeVal || val.data.name)) {
                  if (this.echartsData.data.length > 0 && this.echartsData.data[val.dataIndex].value <= 0) {
                    str = `<ul style="list-style: none;text-align: left;padding: 6px;">
                          <li>${val.name}</li>
                          <li>${val.data.name}：${val.data.typeVal.toFixed(2)}${val.data.name === '种植面积' ? '万亩' : val.data.name === '产量' ? '万吨' : '公斤/亩'}</li>
                          <li>${val.data.name === '产量' ? '减产' : '减少'}：${val.data.riseorfall || val.data.riseorfall === 0 ? val.data.riseorfall.toFixed(2) : "-"}${val.data.name === '种植面积' ? '万亩' : val.data.name === '产量' ? '万吨' : '公斤/亩'}</li>
                          <li>变化率：<span style='color:#fff;font-weight:bold;'>${val.data.value ? -val.data.value.toFixed(2) : val.data.value.toFixed(2)}</span>%↓</li>
                        </ul>`;
                  }
                } else if (val.seriesIndex == 1 && (val.data.typeVal || val.data.name)) {
                  if (this.echartsData.data.length > 0 && this.echartsData.data[val.dataIndex].value >= 0) {
                    str = `<ul style="list-style: none;text-align: left;padding: 6px;">
                          <li>${val.name}</li>
                          <li>${val.data.name}：${val.data.typeVal.toFixed(2)}${val.data.name === '种植面积' ? '万亩' : val.data.name === '产量' ? '万吨' : '公斤/亩'}</li>
                          <li>${val.data.name === '产量' ? '增产' : '增加'}：${val.data.riseorfall || val.data.riseorfall === 0 ? val.data.riseorfall.toFixed(2) : "-"}${val.data.name === '种植面积' ? '万亩' : val.data.name === '产量' ? '万吨' : '公斤/亩'}</li>
                          <li>变化率：<span style="color:#fff;font-weight: bold;">${val.data.value.toFixed(2)}</span>%↑</li>
                        </ul>`;
                  }
                }
              })
              return str


              /*if(params.length == 1){
               if(!params[0].seriesIndex && params[0].data.typeVal){
               if (this.echartsData.data.length > 0 && this.echartsData.data[params[0].dataIndex].value <= 0) {
               return `<ul style="list-style: none;text-align: left">
               <li>${params[0].name}</li>
               <li>${params[0].data.name}：${params[0].data.typeVal}${params[0].data.name === '种植面积' ? '万亩' : params[0].data.name === '产量' ? '万吨' : '公斤/亩'}</li>
               <li>变化率：<span style='color:#fff;font-weight:bold;'>${-params[0].data.value.toFixed(2)}</span>%↓</li>
               </ul>`;
               }

               } else if(params[0].seriesIndex && params[0].data.typeVal){
               if (this.echartsData.data.length > 0 && this.echartsData.data[params[0].dataIndex].value > 0) {
               return `<ul style="list-style: none;text-align: left">
               <li>${params[0].name}</li>
               <li>${params[0].data.name}：${params[0].data.typeVal}${params[0].data.name === '种植面积' ? '万亩' : params[0].data.name === '产量' ? '万吨' : '公斤/亩'}</li>
               <li>变化率：<span style="color:#fff;font-weight: bold;">${params[0].data.value.toFixed(2)}</span>%↑</li>
               </ul>`;
               }
               }
               } else if(params.length == 2){
               if(params[0].data.typeVal){
               if (this.echartsData.data.length > 0 && this.echartsData.data[params[0].dataIndex].value <= 0) {
               return `<ul style="list-style: none;text-align: left">
               <li>${params[0].name}</li>
               <li>${params[0].data.name}：${params[0].data.typeVal}${params[0].data.name === '种植面积' ? '万亩' : params[0].data.name === '产量' ? '万吨' : '公斤/亩'}</li>
               <li>变化率：<span style='color:#fff;font-weight:bold;'>${-params[0].data.value.toFixed(2)}</span>%↓</li>
               </ul>`;
               }
               } else if(params[1].data.typeVal){
               if (this.echartsData.data.length > 0 && this.echartsData.data[params[1].dataIndex].value > 0) {
               return `<ul style="list-style: none;text-align: left">
               <li>${params[1].name}</li>
               <li>${params[1].data.name}：${params[1].data.typeVal}${params[1].data.name === '种植面积' ? '万亩' : params[1].data.name === '产量' ? '万吨' : '公斤/亩'}</li>
               <li>变化率：<span style="color:#fff;font-weight: bold;">${params[1].data.value.toFixed(2)}</span>%↑</li>
               </ul>`;
               }
               }
               }*/

            }
          },
          color: ['#9c3950', '#03714e'],
          legend: {
            top: 0,
            right: 'center',
            icon: 'rect',
            itemWidth: 14,
            itemHeight: 7,
            itemGap: 18,
            selectedMode: true,
            formatter: function (name) {
              return `${name}`
            },
            data: [{
              name: '减幅',
              textStyle: {
                fontWeight: 'lighter'
              },
            }, {
              name: '增幅',
              textStyle: {
                fontWeight: 'lighter'
              }
            }],
            textStyle: {
              color: "#fff",
              padding: [0, 0, 0, 3],
            }
          },
          xAxis: {
            type: 'category',
            name: '',
            data: [],
            axisLine: {
              lineStyle: {
                color: 'rgb(26, 72, 89)',
                width: 2
              }
            },
            axisLabel: {
              rotate: 0,
              interval: 0,
              ...axisLabel,
              formatter: (value, index) => {

                if (value.length > 7) {
                  let str = value.replace(/(.{7})/g, '$1\n')
                  return str
                } else {
                  return value
                }
              },
            },
          },

          yAxis: {
            type: 'value',
            name: '单位(%)',
            nameTextStyle: {
              fontSize: 18,
              color: '#fff',
              padding: [0, 40, 15, 0]
            },
            axisLabel: {
              ...axisLabel
            },
            axisLine: {
              show: false,

            },
            axisTick: {
              show: false,
              interval: 0,
              alignWithLabel: true
            },
            splitLine: {
              show: true,
              formatter: '{value}',
              lineStyle: {
                color: 'rgb(26, 72, 89)',
                type: "dotted"
              }
            },

          },
          series: [
            {
              name: '减幅',
              type: 'bar',
              barWidth: 16,
              label: {
                normal: {
                  show: false
                }
              },
              itemStyle: {
                normal: {
                  color: '#03714e'
                  /*color: (params) => {
                   if (this.echartsData.data.length > 0 && this.echartsData.data[params.dataIndex].value >= 0) {
                   return '#9c3950'
                   } else {
                   return '#03714e'
                   }
                   }*/
                },
                emphasis: {}
              },
              // 选传涨幅从高到低 再传跌幅从低到高都转成正数
              data: []
            },
            {
              // 辅助系列，主要是为了显示一个legend
              name: '增幅',
              type: 'bar',
              barGap: '-100%',
              barWidth: 16, //设置一个极小的宽度，将视觉影响最小化
              label: {
                normal: {
                  show: false
                }
              },
              itemStyle: {
                normal: {
                  color: '#9c3950'
                },
                emphasis: {}
              },
              // 请不要向这里填充数据
              data: []
            }
          ]
        }

      },

      // 初始化图表
      initChart() {

        //如果有新的配置项的变化 深度拷贝
        /*if (Object.keys(this.echartsData.option).length) {
         this.option = $.extend(true, this.option, this.echartsData.option)
         }*/

        // 确保有数据
        if (this.echartsData.data.length > 0) {
          // 填充X轴数据
          this.option.xAxis.data = this.echartsData.xdata

          // 降幅系列
          let s1 = []
          // 增幅系列
          let s2 = []

          this.echartsData.data.forEach((val, index) => {
            if (val.type == '下降') {
              s1.push({
                name: val.name,             // 类型 产量、单产、种植面积
                value: Math.abs(val.value), // 变化率， 后台传回来的负值转换为正值
                typeVal: val.typeVal,       // 类型所对应的值
                type: val.type,             // 增加or减少
                riseorfall: val.riseorfall  // 增加or减少的值
              })
            } else if (val.type == '增加') {
              s2.push({
                name: val.name,
                value: val.value,
                typeVal: val.typeVal,
                type: val.type,
                riseorfall: val.riseorfall
              })
            }
          })
          // 构造一个完整的降幅系列，没有数据的填充空串
          let len1 = this.echartsData.data.length - s1.length
          for (let i = 0; i < len1; i++) {
            s1.push({
              name: '',
              value: '',
              typeVal: '',
              type: '',
              riseorfall: ''
            })
          }
          // 构造一个完整的升幅系列，没有数据的填充空串
          let len2 = this.echartsData.data.length - s2.length
          for (let j = 0; j < len2; j++) {
            s2.unshift({
              name: '',
              value: '',
              typeVal: '',
              type: '',
              riseorfall: ''
            })
          }
          //向图表中添加数据
          this.option.series[0].data = s1
          this.option.series[1].data = s2

        } else {
          this.option.xAxis.data = []
          this.option.series[0].data = []
          this.option.series[1].data = []
        }

        this.myChart.setOption(this.option, true);
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
