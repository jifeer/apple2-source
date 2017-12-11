<template>
  <div ref="mapChart" class="mapChart-wrapper">
  </div>
</template>

<script>
  var worldGeoCoordMap = {
    '北京市': [116.24, 39.55],
    "阿富汗": [69.11, 34.28],
    "阿尔巴尼亚": [19.49, 41.18],
    "阿尔及利亚": [3.08, 36.42]
  };

  // var planePath = 'path://M1705.06,1318.313v-89.254l-319.9-221.799l0.073-208.063c0.521-84.662-26.629-121.796-63.961-121.491c-37.332-0.305-64.482,36.829-63.961,121.491l0.073,208.063l-319.9,221.799v89.254l330.343-157.288l12.238,241.308l-134.449,92.931l0.531,42.034l175.125-42.917l175.125,42.917l0.531-42.034l-134.449-92.931l12.238-241.308L1705.06,1318.313z';
  var convertData = function(data) {
    var res = [];
    for (var i = 0; i < data.length; i++) {
      var dataItem = data[i];
      var fromCoord = worldGeoCoordMap[dataItem[0].name];
      var toCoord = worldGeoCoordMap[dataItem[1].name];
      if (fromCoord && toCoord) {
        res.push({
          fromName: dataItem[0].name,
          toName: dataItem[1].name,
          coords: [fromCoord, toCoord],
          value: dataItem[1].value
        });
      }
    }
    return res;
  };
  import {$, resizeMixin} from 'assets/js/common'

//  import {convertData,geoCoordMap,resizeMixin} from 'assets/js/common'

  require('echarts/lib/chart/map')
  require('echarts/map/js/world.js')
  require('echarts/map/json/world.json')
  export default {
    name: 'mapecharts',
    mixins:[resizeMixin],
    data(){
      return {
        myChart:null
      }
    },
    props: {
      echartsData: {
        type: Object,
        default: null
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
      this.myChart = this.$echarts.init(this.$refs.mapChart)
    },
    computed: {

    },
    methods: {
      initChart(){
        if (Object.keys(this.echartsData).length) {
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
                    type: 'solid'//dash
                  }
                },
                data: convertData(item.data)
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
                geoIndex:0,
                label: {
                  normal: {
                    show: false
                  },
                  emphasis: {
                    show:false
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
              formatter: function(params) {
                if (params.seriesType == 'effectScatter') {
                  return params.name + '>' + params.seriesName + '<br>' + '交易量:<b style="color:#ffa600;font-weight:blod;font-size:18px;">' + params.data.value[2] + '</b>吨';
                }
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
                label:'0-30',
                color: '#007acf'
              }, {
                min: 30,
                max: 69,
                label:'30-69',
                color: '#4ad9c6'
              }, {
                min: 70,
                max: 89,
                label:'70-89',
                color: '#eaff00'
              }, {
                min: 90,
                max:129,
                label:'90-129',
                color: '#ffc000'
              }, {
                min: 130,
                max: 169,
                label:'130-169',
                color: '#ff7800'
              }, {
                min: 170,
                label:'>170',
                color: '#ff3000'
              }],
              left: '10%',
              bottom: '6%',
              /*text: ['交易量：吨'],*/
              textStyle: {
                color: '#fff'
              }
            },
            series: handleResData(this.echartsData.data)

          }

          this.myChart.on('click',(params)=>{

            this.$emit('changeProvince',params.name)

          })


          //如果有新的配置项的变化 深度拷贝
          if(Object.keys(this.echartsData.option).length){
            option = $.extend(true,option,this.echartsData.option)
          }
          this.myChart.setOption(option);

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
  .mapChart-wrapper{
    width: 100%;
    height: 100%;
  }

</style>
