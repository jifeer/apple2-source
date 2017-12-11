<template>
  <div ref="mapChart" class="mapChart-wrapper">
  </div>
</template>

<script>
  import {$} from 'assets/js/common'

  import {convertData, geoCoordMap, resizeMixin} from 'assets/js/common'

  require('echarts/lib/chart/map')
  require('echarts/map/js/china.js')
  require('echarts/map/json/china.json')
  //  require('echarts/map/js/province/anhui.js')
  //  require('echarts/map/json/province/anhui.json')
  /*require('echarts/lib/component/tooltip')
   require('echarts/lib/component/legend')*/
  export default {
    name: 'mapecharts',
    mixins: [resizeMixin],
    // props: ['mapEchartsData'],
    data(){
      return {
        myChart: null
      }
    },
    props: {
      mapEchartsData: {
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

    },
    watch: {
      mapEchartsData: {
        handler: function (val, oldVal) {
          this.initChart()
        },
        deep: true  //增加deep 观察对象的子对象变化
      }
    },
    mounted() {
      //this.flag = false;
      this.$emit('update:flag', true)
      this.$nextTick(() => {
        this.initChart()
      })
      this.myChart = this.$echarts.init(this.$refs.mapChart)
    },
    computed: {},
    methods: {
      initChart(){
        let echartOpt = {
          fz: '16',
          color: '#fff'
        };
        if (Object.keys(this.mapEchartsData).length) {
          let id = this.mapEchartsData.id
          //.log(this.mapEchartsData)

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
                  //color: '#fff',
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
                  show: false,
//                              normal: {
//                                  show: true,
//                                  position: 'right',
//                                  formatter: '{b}'
//                              }
                },
                symbolSize: 3,
                itemStyle: {
                  normal: {
                    color: color[i]
                  }
                },
                data: item.data.map(function (dataItem) {
                  return {
                    name: dataItem[1].name,
                    value: geoCoordMap[dataItem[1].name].concat([dataItem[1].value])
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
              backgroundColor: '#099d4f',
              formatter: function (params) {
                let psername = params.name.substring(0, 2)
                let seriesName = params.seriesName.substring(0, 2)
                if (params.seriesType == 'effectScatter') {
                  if (psername != params.seriesName) {
                    return seriesName + '>' + psername + '<br>' + '交易量：<b style="color:#ffa600;font-weight:blod;font-size:18px;">' + params.data.value[2] + '</b>吨';
                  }

                }
              }
            },
            grid: {
              top: '35',
              left: '10',
              right: '10',
              bottom: '25'
            },
            geo: {
              map: 'china',
//              width: "55%",
              left: "26%",
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
                  areaColor: 'rgba(122, 247, 179,0.8)',
                  borderColor: '#20508a'
                },
                emphasis: {
                  areaColor: '#3952ca'
                }
              }
            },
//                   grid:{
//	              		left:"27%",
//	              		right:"15%",
//	              		bottom:"20%",
//	              		width:"30%",
//	              		containLabel: false
//	              	},
            visualMap: {
              type: 'piecewise', //分段型。
              splitNumber: 6,
              inverse: false,
              inRange: {
                symbol: 'rect',
              },
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
                color: '#fdff1b'
              }, {
                min: 500,
                max: 1000,
                label: '500-1000',
                color: '#c9e110'
              }, {
                min: 1000,
                max: 2000,
                label: '1000-2000',
                color: '#c6a510'
              }, {
                min: 2000,
                max: 3000,
                label: '2000-3000',
                color: '#e48a13'
              }, {
                min: 3000,
                max: 4000,
                label: '3000-4000',
                color: '#db590e'
              }, {
                min: 4000,
                label: '>4000',
                color: '#a93033'
              }],
              left: '20',
              bottom: '30',
              itemGap: 0,
              itemWidth: 7,
              itemHeight: 13,
              /*text: ['交易量：吨'],*/
              textStyle: {
                color: '#fff'
              }
            },
            series: handleResData(this.mapEchartsData.data, this.auxiliary, this.flag)

          }
          this.myChart.off('click');
          this.myChart.on('click', (params) => {
            if (params.seriesType == 'map') {
              this.$emit('changeProvince', params.name)
            }
          })


          //如果有新的配置项的变化 深度拷贝
          if (Object.keys(this.mapEchartsData.option).length) {
            option = $.extend(true, option, this.mapEchartsData.option)
          }
          this.myChart.setOption(option, true);

        }

      },
      _windowResizeHandler(){
        this.myChart.resize()
      },
      _destroyEchart(){
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
