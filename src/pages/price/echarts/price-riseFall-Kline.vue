<template>
  <div ref="echartsData">

  </div>
</template>

<script>
  import {$, extend, resizeMixin} from 'assets/js/common.js'
  import {dataZoom, tooltipStyle, axisLabel} from 'assets/js/echarts-style'

  export default {
    name: 'KlineEcharts',
    mixins: [resizeMixin],
    data() {
      return {}
    },
    props: {
      echartsData: {
        type: Object,
        default: () => {
        }
      },
      dateName: ''
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
      this.myChart = this.$echarts.init(this.$refs.echartsData);
      /*this.$nextTick(() => {
      })
      this.initChart()*/
    },
    computed: {},
    methods: {
      initChart() {
        if (Object.keys(this.echartsData).length) {
          let upColor = '#ec0000';
          //let upBorderColor = '#8A0000';
          let upBorderColor = '#ec0000';
          let downColor = '#00da3c';
          //let downBorderColor = '#008F28';
          let downBorderColor = '#00da3c';
          let dateName = this.dateName
          // 数据意义：开盘(open)，收盘(close)，最低(lowest)，最高(highest)
          let data0 = splitData(this.echartsData.data);

          function splitData(rawData) {
            let values = []
            for (let i = 0; i < rawData.length; i++) {
              values.push(rawData[i].slice(1, 5))
            }
            return {
              values: values
            };
          }

          let option = {
            legend: {
              right: '60',
              data: ['K线图', '均价'],
              itemWidth: 15,
              textStyle: {
                fontSize: 16,
                color: "#fff",
                padding: [0, 5]
              }
            },
            tooltip: {
              trigger: 'axis',
              axisPointer: {
                show: true,
                type: 'line',
                snap: true,
                lineStyle: {
                  color: '#CF6900',
                  width: 2,
                  type: "dashed"
                }
              },
              backgroundColor: '#099d4f',
              formatter: function (params) {
                let times = (params[0].name).split('-');
                if (dateName == '周') {
                  times = times[0] + '年' + times[1] + '周'
                }
                if (dateName == '月') {
                  times = times[0] + '年' + times[1] + '月'
                }
                if (dateName == '年') {
                  times += '年'
                }
                if (dateName == '日') {
                  times = times[0] + '年' + times[1] + '月' + times[2] + '日'
                }
                let addWord = dateName == '年' ? '月' : ''

                if (params.length > 1) {
                  times += '<br/>' + dateName + '初' + addWord + '均价 : ' + params[0].value[1] + '<br/>' + dateName + '最高' + addWord + '均价 : ' + params[0].value[4];
                  times += '<br/>' + dateName + '末' + addWord + '均价 : ' + params[0].value[2] + '<br/>' + dateName + '最低' + addWord + '均价 : ' + params[0].value[3];
                  times += '<br/>  均价 : ' + params[1].value;
                  return times;
                } else {
                  if (params[0].seriesName == "K线图") {
                    times += '<br/>' + dateName + '初' + addWord + '均价 : ' + params[0].value[1] + '<br/>' + dateName + '最高' + addWord + '均价 : ' + params[0].value[4];
                    times += '<br/>' + dateName + '末' + addWord + '均价 : ' + params[0].value[2] + '<br/>' + dateName + '最低' + addWord + '均价 : ' + params[0].value[3];
                    return times;
                  } else {
                    times += '<br/>  均价 : ' + params[0].value;
                    return times;
                  }
                }
              }
            },
            grid: {
              top: '18%',
              right: '5%',
              left: '5%',
              bottom: '20%',
            },
            xAxis: {
              type: 'category',
              data: this.echartsData.Xdata,
              //scale: true,
              // boundaryGap: false,
              splitLine: {show: false},
              axisTick: {
                show: false
              },
              axisLine: {
                lineStyle: {
                  color: '#8ac7ff'
                }
              },
              axisLabel: {
                onZero: false,
                textStyle: {
                  color: '#fff',
                  fontSize: 16,
                  fontWeight: 'lighter'
                },
                margin: 18,
              },
              //splitNumber: 20,
              /*min: 'dataMin',
              max: 'dataMax'*/
            },
            yAxis: {
              name: '价格(元/公斤)',
              nameTextStyle: {
                fontSize: 16,
                color: '#fff',
                padding: [40, 0, 10, 40]
              },
              scale: true,
              splitArea: {
                show: false
              },
              axisTick: {
                show: false
              },
              axisLine: {
                show: false,
                lineStyle: {
                  color: '#112942',
                  type: 'dashed'
                }
              },
              splitLine: {
                show: true,
                formatter: '{value}',
                lineStyle: {
                  color: 'rgba(138, 199, 255, .2)',
                  type: 'dashed'
                }
              },
              axisLabel: {
                textStyle: {
                  color: '#fff',
                  fontSize: 16,
                  fontWeight: 'lighter'
                },
                margin: 18,
              },
              // min: this.echartsData.minData,
              // max: this.echartsData.maxData
              min: function(value) {
                return (value.min*0.9).toFixed(1);
              },
              max: function(value) {
                return (value.max*1.1).toFixed(1);
              }
            },
            dataZoom: [{
              "show": true,
              "height": 15,
              "xAxisIndex": [0],

              left: '60',
              right: '60',
              bottom: '0',
              backgroundColor: 'rgba(3, 114, 177, .6)',
              dataBackground: {
                areaStyle: {
                  color: 'rgba(3, 114, 177, .7)'
                },
                lineStyle: {
                  opacity: 0.8,
                  color: '#8392A5'
                }
              },
              fillerColor: '#063052',
              borderColor: '#276b9f',
              "start": 0,
              "end": 100,
              handleIcon: 'path://M306.1,413c0,2.2-1.8,4-4,4h-59.8c-2.2,0-4-1.8-4-4V200.8c0-2.2,1.8-4,4-4h59.8c2.2,0,4,1.8,4,4V413z',
              handleSize: '110%',
              handleStyle: {
                color: '#00ADFA',
                shadowBlur: 0,
                shadowColor: 'rgba(255, 0, 0, 1)',
                shadowOffsetX: 0,
                shadowOffsetY: 0
              },
              textStyle: {
                color: "#11caff",
                fontSize: '12'
              },
              borderColor: "#3458B4"
            }, {
              "type": "inside",
              "show": true,
              "height": 15,
              "start": 1,
              "end": 35
            }],
            series: [
              {
                name: 'K线图',
                type: 'candlestick',
                barWidth: '20%',
                data: data0.values,
                itemStyle: {
                  normal: {
                    color: upColor,
                    color0: downColor,
                    borderColor: upBorderColor,
                    borderColor0: downBorderColor,
                    borderWidth: 3
                  }
                }
              },
              {
                name: '均价',
                type: 'line',
                data: this.echartsData.data1,
                smooth: true,
                symbolSize: 10,
                symbol: 'circle',
                lineStyle: {
                  normal: {
                    color: '#fdff1b'
                  }
                },
                itemStyle: {
                  normal: {
                    color: 'rgb(228, 74, 99)',
                    borderColor: 'rgb(254, 253, 56)',
                    opacity: 1,
                    symbolSize: 15,
                    symbol: 'circle',
                    borderWidth: 2
                  },
                  emphasis: {
                    color: 'rgb(228, 74, 99)',
                    // opacity: 1,
                    borderColor: 'rgb(254, 253, 56)',
                    borderWidth: 2
                  }
                }
              }

            ]
          };
          //如果有新的配置项的变化 深度拷贝
          if (Object.keys(this.echartsData.option).length) {
            option = $.extend(true, option, this.echartsData.option)
          }

          this.myChart.setOption(option, true);

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
