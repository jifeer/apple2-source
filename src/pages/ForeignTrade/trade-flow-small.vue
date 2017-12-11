<template>
  <div ref="mapChart" class="mapChart-wrapper">
  </div>
</template>
<script>
  import { $, resizeMixin } from 'assets/js/common'
  import { tooltipStyle } from 'assets/js/echarts-style'
  import { worldGeoCoordMap } from 'assets/js/mapname'

  require('echarts/lib/chart/map')
  require('echarts/map/js/world.js')
  require('echarts/map/json/world.json')

  export default {
    name: 'mapecharts',
    mixins: [resizeMixin],
    data() {
      return {
        data: [],
        appleType: '鲜苹果',
        dir: '出口',
        timeType: 'month',
        time: ''
      }
    },
    mounted() {
      this.myChart = this.$echarts.init(this.$refs.mapChart)
      this.getTime()
    },
    computed: {
      ApiParams() {
        return {
          TIME_ID: this.time,
          NAME: this.dir,
          TIME_TYPE: this.timeType,
          PRODUCT: this.appleType
        }
      }
    },
    methods: {
      getTime() {
        this.$xhr.get('apple/trade/countryFlow/getTimes', {
          params: {
            TIME_TYPE: this.timeType
          }
        }).then((res) => {
          this.time = res.data[res.data.length - 1].replace('-', '')

          this.getData()
        })
      },
      initChart() {
        let me = this

        function handleResData(resData) {
          let color = ['#a6c84c', '#ffa022'];
          let series = [];
          resData.forEach(function(item, i) {
            series.push({ //线
              name: item.name,
              type: 'lines',
              zlevel: 1,
              effect: {
                show: true,
                period: 6,
                trailLength: 0.7,
                color: '#fff',
                symbolSize: 3
              },
              lineStyle: {
                normal: {
                  color: color[i],
                  width: 0,
                  curveness: 0.2,
                  type: 'solid' //dash
                }
              },
              data: me.convertData(item.data)
            }, { //移动 点
              name: item.name,
              type: 'lines',
              zlevel: 2,
              effect: {
                show: true,
                period: 6,
                trailLength: 0,
                //symbol: planePath,
                symbolSize: 5
              },
              lineStyle: {
                normal: {
                  color: color[i],
                  width: 1,
                  opacity: 0.4,
                  curveness: 0.2
                }
              },
              data: me.convertData(item.data)
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
                scale: 4
              },
              label: {
                normal: {
                  show: false,
                  position: 'right',
                  formatter: '{b}'
                }
              },
              symbolSize: 5,
              itemStyle: {
                normal: {
                  color: color[i]
                }
              },
              data: item.data.map(function(dataItem) {
                return {
                  name: dataItem[1].name,
                  value: worldGeoCoordMap[dataItem[1].name].concat([dataItem[1].value])
                };
              })
            }, {
              name: '辅助颜色',
              type: 'map',
              zoom: 1,
              geoIndex: 0,
              label: {
                normal: {
                  show: false
                },
                emphasis: {
                  show: false
                }
              },
              mapType: 'world',
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
              data: [
                { name: '山东', value: 0 },
                { name: '北京', value: 0 },
              ],
              roam: true,
            });
          });
          return series
        }
        let option = {
          tooltip: {
            trigger: 'item',
            ...tooltipStyle,
            formatter: function(params) {
              let str = ''
              if (params.componentSubType === 'effectScatter') {
                if (me.dir === '出口') {
                  str = `${params.seriesName} > ${params.name} <br> 交易量：${params.value[2][0]}吨（${params.value[2][1]}%）`
                } else {
                  str = `${params.name} > ${params.seriesName} <br> 交易量：${params.value[2][0]}吨（${params.value[2][1]}%）`
                }
              }
              return str
            }
          },
          geo: {
            map: 'world',
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
                areaColor: 'rgba(76, 159, 129,0.9)',
                borderColor: '#20508a'
              },
              emphasis: {
                areaColor: '#3952ca'
              }
            }
          },
          visualMap: {
            show: false,
            type: 'piecewise', //分段型。
            splitNumber: 6,
            inverse: true,
            pieces: [{
              min: 0,
              max: 30,
              label: '0-30',
              color: '#007acf'
            }, {
              min: 30,
              max: 69,
              label: '30-69',
              color: '#4ad9c6'
            }, {
              min: 70,
              max: 89,
              label: '70-89',
              color: '#eaff00'
            }, {
              min: 90,
              max: 129,
              label: '90-129',
              color: '#ffc000'
            }, {
              min: 130,
              max: 169,
              label: '130-169',
              color: '#ff7800'
            }, {
              min: 170,
              label: '>170',
              color: '#ff3000'
            }],
            left: '10%',
            bottom: '6%',
            /*text: ['交易量：吨'],*/
            textStyle: {
              color: '#fff'
            }
          },
          series: handleResData(this.data)
        }

        this.myChart.setOption(option)
      },
      convertData(data) {
        let me = this
        var res = [];
        for (var i = 0; i < data.length; i++) {
          var dataItem = data[i];
          var fromCoord = worldGeoCoordMap[dataItem[0].name];
          var toCoord = worldGeoCoordMap[dataItem[1].name];
          if (fromCoord && toCoord) {
            if (me.dir === '出口') {
              res.push({
                fromName: dataItem[0].name,
                toName: dataItem[1].name,
                coords: [fromCoord, toCoord],
                // value: dataItem[1].value
                value: dataItem[1].value[1]
              })
            } else {
              res.push({
                fromName: dataItem[1].name,
                toName: dataItem[0].name,
                coords: [toCoord, fromCoord],
                // value: dataItem[1].value
                value: dataItem[1].value[1]
              })
            }
          }
        }
        return res;
      },
      getData() {
        this.$xhr.get('apple/trade/countryFlow', {
          params: {
            ...this.ApiParams
          }
        }).then((res) => {
          // 地图数据
          this.data = res.data
          this.initChart()
          // 柱状图数据
        })
      },
      _windowResizeHandler() {
        this.myChart.resize()
      },
      _destroyEchart() {
        this.myChart.dispose()
      }
    },
    watch: {
      // data: {
      //   handler: function(val, oldVal) {
      //     this.initChart()
      //   },
      //   deep: true //增加deep 观察对象的子对象变化
      // }
    }
  }

</script>
<style lang="scss" scoped>
  @import "~assets/css/_variable.scss";
  @import "~assets/css/_mixin.scss";
  .mapChart-wrapper {
    width: 100%;
    height: 100%;
  }

</style>
