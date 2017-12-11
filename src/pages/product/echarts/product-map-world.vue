<template>
  <div ref="chart" :style="{width:width,height:height}">

  </div>
</template>

<script>
  import {resizeMixin} from 'assets/js/common'
  import {nameMap} from 'assets/js/mapname.js';

  require('echarts/lib/chart/map')
  require('echarts/map/js/world.js')
  //  require('echarts/map/json/world.json')

  export default {
    mixins: [resizeMixin],
    name: 'productWorldMap',
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
          tooltip: {
            trigger: 'item',
            backgroundColor: '#099d4f',
            formatter: function (params) {
//                console.log(params)
              if (params.value) {
                return `<div style="text-align: left;">
                        <p>${params.data.name}</p>
                        <p>${params.data.type == '121689' ? '种植面积' + (params.data.value ? params.data.value.toFixed(2) : '-') + '万亩' : params.data.type == '112716' ? '产量：' + (params.data.value ? params.data.value.toFixed(2) : '-') + '万吨' : '-'}</p>
                        <p>占比：${params.data.percent ? params.data.percent : '-'}%</p>
                        </div>
                        `
              }
            }
          },
          itemStyle: {
            normal: {
              areaColor: '#777'
            },
            emphasis: {
//                areaColor: '#666',
              color: '#444'
            },
          },
          visualMap: [
            {
              type: 'piecewise', //分段型。
              splitNumber: 6,
              inverse: false,
//                text: ['mu'],
              textGap: 30,
              pieces: [{
                min: 0,
                max: 4,
                label: ' ',
                color: '#666'
              }, {
                min: 4,
                max: 15,
                label: ' ',
                color: '#666'
              }, {
                min: 15,
                max: 41,
                label: ' ',
                color: '#666'
              }, {
                min: 41,
                max: 80,
                label: ' ',
                color: '#666'
              }, {
                min: 80,
                max: 550,
                label: ' ',
                color: '#666'
              }, {
                min: 550,
                max: 4093,
                label: ' ',
                color: '#666'
              }],
              itemWidth: 10,
              itemHeight: 24,
              itemGap: 0,
              inRange: {
                symbol: 'rect',
              },
              left: '136',
              bottom: '96',
              textStyle: {
                color: '#fff'
              }
            },
            {
              type: 'piecewise', //分段型。
              splitNumber: 6,
              inverse: false,
//              text: ['heigh'],
              pieces: [{
                min: 0,
                max: 4,
                color: '#0071b3'
              }, {
                min: 4,
                max: 15,
                color: '#fdff1b'
              }, {
                min: 15,
                max: 41,
                color: '#c9e110'
              }, {
                min: 41,
                max: 80,
                color: '#c6a510'
              }, {
                min: 80,
                max: 550,
                color: '#e48a13'
              }, {
                min: 550,
                max: 4093,
                color: '#db590e'
              }],
              itemWidth: 10,
              itemHeight: 24,
//              itemSymbol: 'reac',
              itemGap: 0,
              inRange: {
                symbol: 'rect',
                color: ['#007acf', '#12A2F0', '#eaff00', '#ffc000', '#ff7800', '#ff3000']
              },
              left: '136',
              bottom: '96',
              textStyle: {
                fontSize: 14,
                color: '#fff'
              },
              /*formatter: function (v1, v2) {
               console.log(v1, v2)
               return v1+'-' +v2
               }*/
            }],
          series: [
            {
              name: '苹果平均价格',
              type: 'map',
              map: 'world',
              zoom: 1.1,
              center: [24.00, 20.00],
              // 设置英文和中文国家名称的映射
              nameMap: {
                ...nameMap
              },
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
//                  areaColor: 'rgba(76, 159, 129,0.9)',
                  areaColor: '#fff',
                  borderColor: '#20508a'
                },
                emphasis: {
                  areaColor: '#fde53b'
                }
              },
              data: []
            }
          ]

        }

        // 地图点击事件
        /*this.myChart.on('click', (params) => {

         this.$emit('changeProvince', params.name)

         })*/

      },

      initChart() {

        if (this.echartsData.data) {
          /*// 处理visualMap 的数据
           let v = this.getVisualMap(this.echartsData.visualMapData.min, this.echartsData.visualMapData.max)

           // 填充数据
           this.option.visualMap[0].pieces.forEach((item, index) => {
           item.min = v[index][0]
           item.max = v[index][1]
           })
           this.option.visualMap[1].pieces.forEach((item, index) => {
           item.min = v[index][0]
           item.max = v[index][1]
           })*/

//          this.sortArratObj(this.echartsData.data)
          // 这是地图数据
//          console.log(this.echartsData.data)
          this.option.series[0].data = this.echartsData.data
        } else {
          // 没有数据就置空
          /*this.option.visualMap[0].pieces = []
           this.option.visualMap[1].pieces = []*/
          this.option.series[0].data = []
        }

        // 初始化图表
        this.myChart.setOption(this.option);
      },

      sortArratObj(arr) {
        if (Array.isArray(arr) && arr.length > 1) {
          arr.sort((a, b) => {
            return a.value - b.value
          })
        }
      },


      // 得到visualMap 的分段数据
      getVisualMap(min, max) {
        let range = Math.ceil(max) - Math.floor(min)
        // 处理只有一个数据的情况
        if (max == min) {
          range = max
        }
        let data = []
        for (let i = 0; i < 6; i++) {
          data.push([Math.floor(i * range / 6), Math.floor((i + 1) * range / 6)])
        }
        return data
      },

      sliceNum() {
        let num = 901;
        let labelArr = [];
        let numArr = [];
        for (let i = 0; i < 6; i++) {
          numArr.push(Math.round(num / 6 * i))
          labelArr.push(Math.round(num / 6 * i) + '-' + Math.round(num / 6 * (i + 1)));
        }

      },

      // echats 图表自适应
      _windowResizeHandler() {
        this.myChart.resize()
      },
      // 销毁echats图表方法
      _destroyEchart() {
        if (this.myChart) {
          this.myChart.dispose()
        }
      }

    }
  }
</script>

<style lang="scss" scoped>
  @import "./../../../assets/css/_variable.scss";
  @import "./../../../assets/css/_mixin.scss";


</style>
