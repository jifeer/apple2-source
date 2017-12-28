<template>
  <div ref="mapChart">

  </div>
</template>

<script>
  require('echarts/lib/chart/map')
  require('echarts/map/js/china.js')
  require('echarts/map/json/china.json')
  import {$, extend, convertData} from 'assets/js/common'
  import {dataZoom, tooltipStyle} from 'assets/js/echarts-style'
  import axios from 'axios'

  export default {
    name: 'mapecharts',
    // props: ['echartsData'],
    data() {
      return {
        myChart: null,
        proxy: {
          click: null
        },
        provinceList: [
          {
            "id": "shanghai",
            "name": "上海"
          }, {
            "id": "hebei",
            "name": "河北"
          }, {
            "id": "shanxi",
            "name": "山西"
          }, {
            "id": "neimenggu",
            "name": "内蒙古"
          }, {
            "id": "liaoning",
            "name": "辽宁"
          }, {
            "id": "jilin",
            "name": "吉林"
          }, {
            "id": "heilongjiang",
            "name": "黑龙江"
          }, {
            "id": "jiangsu",
            "name": "江苏"
          }, {
            "id": "zhejiang",
            "name": "浙江"
          }, {
            "id": "anhui",
            "name": "安徽"
          }, {
            "id": "fujian",
            "name": "福建"
          }, {
            "id": "jiangxi",
            "name": "江西"
          }, {
            "id": "shandong",
            "name": "山东"
          }, {
            "id": "henan",
            "name": "河南"
          }, {
            "id": "hubei",
            "name": "湖北"
          }, {
            "id": "hunan",
            "name": "湖南"
          }, {
            "id": "guangdong",
            "name": "广东"
          }, {
            "id": "guangxi",
            "name": "广西"
          }, {
            "id": "hainan",
            "name": "海南"
          }, {
            "id": "sichuan",
            "name": "四川"
          }, {
            "id": "guizhou",
            "name": "贵州"
          }, {
            "id": "yunnan",
            "name": "云南"
          }, {
            "id": "xizang",
            "name": "西藏"
          }, {
            "id": "shanxi1",
            "name": "陕西"
          }, {
            "id": "gansu",
            "name": "甘肃"
          }, {
            "id": "qinghai",
            "name": "青海"
          }, {
            "id": "ningxia",
            "name": "宁夏"
          }, {
            "id": "xinjiang",
            "name": "新疆"
          }, {
            "id": "beijing",
            "name": "北京"
          }, {
            "id": "tianjin",
            "name": "天津"
          }, {
            "id": "chongqing",
            "name": "重庆"
          }, {
            "id": "xianggang",
            "name": "香港"
          }, {
            "id": "taiwan",
            "name": "台湾"
          }, {
            "id": "aomen",
            "name": "澳门"
          }
        ],
        provinceMap: {},
        currentMap: 'china',
        option: {}
      }
    },
    props: {
      echartsData: {
        type: Object,
        default: () => {}
      }
    },
    mounted() {
      this.myChart = this.$echarts.init(this.$refs.mapChart)
    },
    computed: {},
    methods: {
      initChart() {
        //console.log(this.echartsData)
        if (Object.keys(this.echartsData).length) {
          this.option = {
            tooltip: {
              trigger: 'item',
              ...tooltipStyle,
              formatter: function (params) {
                let values = params.value;
                if (!values) {
                  return;
                } else {
                  let str = "鲜苹果批发价格<br>";
                  str += params.name + '：<b style="color:#ffa600;font-weight: blod;font-size:18px;">' + params.value + "</b>元/公斤" + "<br>";
                  return str
                }

              }
            },
            /*visualMap: {
              type: 'piecewise', //分段型。
              splitNumber: 6,
              //inverse: true,
              pieces: [{
                min: 9,
                label: '>9',
                color: '#a93033'
              }, {
                min: 8,
                max: 9,
                label: '8-9',
                color: '#db590e'
              }, {
                min: 7,
                max: 8,
                label: '7-8',
                color: '#e48a13'
              }, {
                min: 6,
                max: 7,
                label: '6-7',
                color:  '#c6a510'
              }, {
                min: 5,
                max: 6,
                label: '5-6',
                color:  '#c9e110'
              }, {
                min: 3,
                max: 5,
                label: '3-5',
                //color: '#4ad9c6'
                color: '#12A2F0'
              }],
              left: '10%',
              bottom: '6%',
              textStyle: {
                color: '#fff',
              }
            },*/
            visualMap: {
              type: 'piecewise', //分段型。
              inverse: false,
              pieces: [{
                min: 9,
                label: '>9'
              }, {
                min: 8,
                max: 9,
                label: '8-9'
              }, {
                min: 7,
                max: 8,
                label: '7-8'
              }, {
                min: 6,
                max: 7,
                label: '6-7'
              }, {
                min: 5,
                max: 6,
                label: '5-6'
              }, {
                min: 0,
                max: 5,
                label: '0-5'
              }],
              left: '4%',
              bottom: '6%',
              itemGap: 0,
              itemWidth: 20,
              itemHeight: 30,
              textStyle: {
                color: '#fff'
              },
              inRange: {
                symbol: 'rect',
                color: ['#f2f7b3', '#c9f573', '#59da3b', '#27bf42', '#159847', '#187242']
              },
              // 关键所在
              outOfRange: {
                color: '#fff'
              }
            },
            /*geo: {
              map: 'china',
              zoom:'1.2',
              label: {
                emphasis: {
                  show: false
                }
              },
              show: true,
              symbol: "none"
            },*/
            series: [
              {
                name: '苹果平均价格',
                type: 'map',
                map: 'china',
                zoom:'1.2',
                left:'20%',
                roam: true,
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
                    areaColor: '#fff',
                    borderColor: '#20508a'
                  },
                  emphasis: {
                    areaColor: '#3952ca'
                  }
                },
                data: this.echartsData.data
              }
            ]

          };

          /*this.myChart.on('click', (params) => {
            if (this.currentMap == "china") {
              this.showProvince(this.getId(params.name));
              this.$emit('changeProvince', params.name)
            }
          });*/
          //如果有新的配置项的变化 深度拷贝
          if (Object.keys(this.echartsData.option).length) {
            this.option = $.extend(true, option, this.echartsData.option)
          }
          this.myChart.setOption(this.option, true);
        }
      },
      //处理地图下钻的部分

      //通过获取的省份名转换成ID的方法
      /*getId(param) {
        let id = ''
        this.provinceList.forEach((item, index) => {
          if (item.name === param) {
            id = item.id;
          }
        });
        return id
      },

      getProvince() {
        this.provinceList.forEach(function (item, i) {
          this.provinceMap[item.name] = item;
        })
      },

      showMap(id, name) {
        this.option.series[0].map = id;
        this.myChart.setOption(this.option, true);
        this.currentMap = id;
      },
      showProvince(province) {
        axios.get('./static/json/map/province/' + province + '.json').then((geoJson) => {
          this.$echarts.registerMap(province, geoJson.data);
          this.showMap(province, '');
        });
      },*/
      // echats 图表自适应
      _windowResizeHandler() {
        this.myChart.resize()
      },
      // 销毁echats图表方法
      _destroyEchart() {
        this.myChart.dispose()
      }
    },
    watch: {
      echartsData: {
        handler: function (val, oldVal) {
          this.initChart()
        },
        deep: true  //增加deep 观察对象的子对象变化
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "./../../../assets/css/_variable.scss";
  @import "./../../../assets/css/_mixin.scss";


</style>
