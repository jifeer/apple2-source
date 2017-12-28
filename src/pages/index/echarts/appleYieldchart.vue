<template>
  <div ref="mapEchart" class="mapEchart-wrapper">

  </div>
</template>

<script>
  import {extend, resizeMixin} from 'assets/js/common'

  import {convertData, geoCoordMap} from 'assets/js/common'

  require('echarts/lib/chart/map')
  require('echarts/map/js/china.js')
  require('echarts/map/json/china.json')

  export default {
    name: 'mapechart',
    mixins: [resizeMixin],
    props: {
      aYieldData: {
        type: Object,
        default (){
          return {}
        }
      },
    },

    watch: {
      aYieldData: {
        handler: function (val, oldVal) {
          this.initChart()
        },
        deep: true  //增加deep 观察对象的子对象变化
      }
    },

    mounted() {
      this.myChart = this.$echarts.init(this.$refs.mapEchart)
      this.initOption()
//      this.initChart()
    },

    methods: {
      initOption(){
        if (Object.keys(this.aYieldData).length) {

          this.option = {

            tooltip: {
              trigger: 'item',
              backgroundColor: "#009E4C",
              formatter: (params) => {
//                      	console.log(params)
                if (params.value >= 0) {
                  return "<div style='text-align:left'>" + `苹果产量<br>
		                	        ${params.name}：${params.value}万吨` + "</div>"
                } else {
                  return ''
                }
              },
            },
            grid: {
              left: "50",
              right: "10",
              top: '35',
              bottom: "25",
              containLabel: false
            },

            series: [
              {
                data: [],
                name: '苹果产量',
                type: 'map',
                mapType: 'china',
                // roam: true,
                zoom:1.2,
                label: {
                  normal: {
                    show: false
                  },
                  emphasis: {
                    show: false
                  }
                },
                itemStyle: {
                  normal: {
                    areaColor: '#A0D1B7',
                    borderColor: '#20508a'
                  },
                  emphasis: {
                    areaColor: '#3952ca'
                  }
                },
//                left: "25%",
//                width: "42%",
              }
            ],
            visualMap: {
              type: 'piecewise', //分段型。
              splitNumber: 6,
              inverse: false,
              pieces: [{
                min: 978,
                max: 1100,
                label: '978-1100',
                color: '#00934E'
              }, {
                min: 438,
                max: 978,
                label: '438-978',
                color: '#22AD6C',

              }, {
                min: 365,
                max: 438,
                label: '365-438',
                color: '#10BD6C'
              }, {
                min: 256,
                max: 365,
                label: '256-365',
                color: '#12CA6D'

              }, {
                min: 136,
                max: 256,
                label: '136-256',
                color: '#41DA89'

              }, {
                min: 0,
                max: 136,
                label: '0-136',
                color: '#75F8B1'
              }],
              left: '4%',
              bottom: '6%',
              itemGap: 0,
              itemWidth: 7,
              itemHeight: 13,
//            inRange: {
//              symbol: 'rect',
//            },
              textStyle: {
                color: '#fff'
              }
            },

          }
        }

      },
      initChart(){
        //如果有新的配置项的变化 深度拷贝
//        if (Object.keys(this.aYieldData.option).length) {
//          this.option = extend(true, this.option, this.aYieldData.option)
//        }

        let data = [];
        this.aYieldData.data.forEach((val, index, arr) => {
          data.push({
            name: arr[index].name.replace("省", ""),
            value: arr[index].value
          })
        })

        this.option.series[0].data = data
        this.myChart.setOption(this.option, true);
//      	 console.log(this.option.series[0].data)

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

  .mapEchart-wrapper {
    width: 100%;
    height: 100%;
  }

</style>
