<template>
  <div ref="mapChart" class="mapChart-wrapper">
  </div>
</template>
<script>
  import {$, convertData, geoCoordMap, resizeMixin} from 'assets/js/common'
  import {dataZoom, tooltipStyle, axisLabel} from 'assets/js/echarts-style'

  require('echarts/lib/chart/map')
  require('echarts/map/js/china.js')
  require('echarts/map/json/china.json')
  export default {
    name: 'mapecharts',
    mixins: [resizeMixin],
    data() {
      return {
        myChart: null
      }
    },
    props: {
      echartsData: {
        type: Object,
        default: null
      },
      flag: {
        type: Boolean,
        default: false
      },
      auxiliary: {
        type: Array,
        default: []
      },
      flowType: {
        type: Number,
        default: 1
      }

    },
    watch: {
      echartsData: {
        handler: function (val, oldVal) {
          this.initChart()
        },
        deep: true //增加deep 观察对象的子对象变化
      }
    },
    mounted() {
      this.$emit('update:flag', true)
      this.myChart = this.$echarts.init(this.$refs.mapChart)
    },
    computed: {},
    methods: {
      initChart() {
        let that = this
        if (Object.keys(this.echartsData).length) {
          function handleResData(resData, auxiliary, istrue) {
            let color = ['#a6c84c', '#ffa022'];
            let series = [];
            resData.forEach(function (item, i) {
              series.push({ //线
                name: item.name,
                type: 'lines',
                zlevel: 1,
                effect: {
                  show: true,
                  period: 6,
                  trailLength: 0.3,
                  symbolSize: 5
                },
                lineStyle: {
                  normal: {
                    color: color[i],
                    width: 0.6,
                    curveness: 0.2,
                  }
                },
                data: convertData(item.data, istrue)
              }, { //移动 点
                name: item.name,
                type: 'lines',
                zlevel: 2,
                effect: {
                  show: true,
                  period: 6,
                  trailLength: 0,
                  //symbol: planePath,
                  symbolSize: 10
                },
                lineStyle: {
                  normal: {
                    color: color[i],
                    width: 1,
                    opacity: 0.4,
                    curveness: 0.2
                  }
                },
                data: convertData(item.data)
              }, { //省份圆点
                name: item.name,
                type: 'effectScatter',
                coordinateSystem: 'geo',
                zlevel: 2,
                effectScatter: {
                  symbol: 'diamond'

                },
                rippleEffect: {
                  brushType: 'stroke',
                  scale: 6
                },
                label: {
                  normal: {
                    show: true,
                    position: 'right',
                    formatter: '{b}',
                    fontSize: '16',
                    /*textBorderColor: '#38378a',
                    textBorderWidth: 1*/
                  }
                },
                symbolSize: 10,
                itemStyle: {
                  normal: {
                    color: color[i]
                  }
                },
                data: item.data.map(function (dataItem) {
                  return {
                    name: dataItem[1].name,
                    value: geoCoordMap[dataItem[1].name].concat([dataItem[1].value]),
                    tooltip: {
                      ...tooltipStyle,
                      formatter: function (params) {
                        let psername = dataItem[1].name == '黑龙江省' || dataItem[1].name == '内蒙古自治区' ? dataItem[1].name.substring(0, 3) : dataItem[1].name.substring(0, 2)
                        let seriesName = dataItem[0].name.substring(0, 2)
                        //判断主销区的北京单位用%其它用吨
                        let unit = seriesName == '北京' ? '%' : '吨'
                        // 判断如果 是自己对自己的数据则 不显示 提示框，其 flag 为 fakedata
                        if (params.data && params.data.value && params.data.value[2] === 'fakedata') {
                          return ''
                        }
                        //判断主产区
                        if (psername != params.seriesName && that.flowType == 1) {
                          return seriesName + '>' + psername + '<br>' + '交易量:<b style="color:#ffa600;font-weight:blod;font-size:18px;">' + dataItem[1].value + '</b>吨';

                        } else if (psername != params.seriesName && that.flowType == 2) {//判断主销区
                          return psername + '>' + seriesName + '<br>' + '交易量:<b style="color:#ffa600;font-weight:blod;font-size:18px;">' + dataItem[1].value + '</b>' + unit;
                        }
                      }
                    }
                  };
                })
              }, {
                name: '辅助颜色',
                type: 'map',
                zoom: 1.2,
                geoIndex: 0,
                label: {
                  normal: {
                    show: false
                  },
                  emphasis: {
                    show: false
                  }
                },
                mapType: 'china',
                showLegendSymbol: false,
                markPoint: {
                  symbol: 'circle'
                },
                itemStyle: {
                  normal: {
                    borderColor: '#20508a',
                    areaColor: 'transparent'
                  },
                  emphasis: {
                    areaColor: '#3952ca'
                  }
                },
                data: auxiliary,
                roam: true,
              });
            });
            return series
          }

          let option = {
            tooltip: {
              trigger: 'item',
              formatter: function (params) {
                // 判断如果 是自己对自己的数据则 不显示 提示框，其 flag 为 fakedata
                if (params.data && params.data.value && params.data.value[2] === 'fakedata') {
                  return ''
                }
              }
            },
            geo: {
              map: 'china',
              zoom: 1.2,
              label: {
                normal: {
                  show: false
                },
                emphasis: {
                  show: false
                }
              },
              roam: true,
              itemStyle: {
                normal: {
                  //areaColor: 'rgba(76, 159, 129,0.9)',
                  areaColor: 'rgba(122, 247, 179,0.8)',
                  borderColor: '#20508a'
                },
                emphasis: {
                  areaColor: '#3952ca'
                }
              }
            },
            visualMap: {
              type: 'piecewise', //分段型。
              splitNumber: 7,
              inverse: false,
              pieces: [{
                min: 0,
                max: 0,
                label: '有数据区域',
                show: false,
                color: '#0071b3'
              }, {
                min: 0.00001,
                max: 500,
                label: '0-500',
                color: '#70ffd8'
              }, {
                min: 500,
                max: 1000,
                label: '500-1000',
                color: '#68fd4f'
              }, {
                min: 1000,
                max: 2000,
                label: '1000-2000',
                color: '#ccff00'
              }, {
                min: 2000,
                max: 3000,
                label: '2000-3000',
                color: '#ffd200'
              }, {
                min: 3000,
                max: 4000,
                label: '3000-4000',
                color: '#ff806b'
              }, {
                min: 4000,
                label: '>4000',
                color: '#ec2d2d'
              }],
              left: '10%',
              bottom: '6%',
              /*text: ['交易量：吨'],*/
              // 关键所在
              /*outOfRange: {
                color: '#fff'
              },*/
              textStyle: {
                color: '#fff'
              }
            },
            series: handleResData(this.echartsData.data, this.auxiliary, this.flag)

          }
          this.myChart.off('click');
          this.myChart.on('click', (params) => {
            /*if (params.seriesType == 'map') {
              this.$emit('changeProvince', params.name)
            }*/
            if (params.data.value == 0) {
              this.$emit('changeProvince', params.name)
            }
          })

          //如果有新的配置项的变化 深度拷贝
          if (Object.keys(this.echartsData.option).length) {
            option = $.extend(true, option, this.echartsData.option)
          }
          this.myChart.setOption(option, true);
        }
      },
      _windowResizeHandler() {
        this.myChart.resize()
      },
      _destroyEchart() {
        this.myChart.dispose()
      }
    }
  }

</script>
<style lang="scss" scoped>
  @import "./../../../assets/css/_variable.scss";
  @import "./../../../assets/css/_mixin.scss";

  .mapChart-wrapper {
    width: 100%;
    height: 100%;
  }

</style>
