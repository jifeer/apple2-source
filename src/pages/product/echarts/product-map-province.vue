<template>
  <div class="disaster-map-wrapper">
    <div id="chartDom" ref="chart" :style="{width:width,height:height}">

    </div>
    <ul class="list" ref="list">
      <li :class="{unchecked: item.active}" v-for="(item, index) in legendData" @click="_toggleDisaster(index)">
        {{item.name}}
      </li>
      <li v-for="item in degreeLabelData">{{item}}</li>
    </ul>
  </div>

</template>
<script>

  import map from '../gis/disasterMap.min'
  import icon0 from 'assets/img/0.png';
  import icon1 from 'assets/img/1.png';
  import icon2 from 'assets/img/2.png';
  import {resizeMixin} from 'assets/js/common'

  export default {
    name: 'map-province',
    mixins: [resizeMixin],
    props: {
      echartsData: {
        type: Object,
        default: () => {

        }
      },
      width: {
        type: String,
        default: '100%'
      },
      height: {
        type: String,
        default: "100%"
      }

    },
    data() {
      return {
        map: {},
        min: 0,
        max: 2,
        chartData: [],
        legendData: [
          {
            active: false,
            name: '低温冻害'
          },
          {
            active: false,
            name: '干旱灾害'
          },
          {
            active: false,
            name: '连阴雨灾害'
          }
        ],
        select: [true, true, true],
        degreeLabelData: ['轻度灾害（影响产量5%-10%）', '中度灾害（影响产量10%-15%）', '重度灾害（影响产量超过15%）'],

      }
    },

    watch: {
      echartsData: {
        handler: function (val, oldVal) {
          this._resetLegend()
          this.initData();
          this.showMap();
        },
        deep: true  //增加deep 观察对象的子对象变化
      }
    },
    created() {
//      this.initMap();
    },
    mounted() {
      this.initMap();
    },

    computed: {},

    methods: {
      _toggleDisaster(index) {
        // 修改图例的样式
        this.legendData[index].active = !this.legendData[index].active
        this.select[index] = !this.select[index]
        let selectData = []
        for (let i = 0; i < this.chartData.length; i++) {
          if (this.select[this.chartData[i].level]) {
            selectData.push(this.chartData[i]);
          }
        }
        // 重新渲染灾害地区
        this.map.show({
          mapType: this.echartsData.province,
          data: selectData
        });
      },

      // 重置选中的样式
      _resetLegend() {
        this.legendData.forEach((v, i) => {
          v.active = false
        })
        this.select.forEach((v, i) => {
          this.select[i] = true
        })
      },

      // 初始化数据
      initData() {
        let newArr = this.echartsData.data.map((v, i) => {
          let deg = v.degree == '轻度' ? 0 : v.degree == '中度' ? 1 :  v.degree == '重度' ? 2 : 3
          let temp = {}
          temp.deg = deg
          temp.coord = v.coord
          temp.degree = v.degree
          temp.desc = v.desc
          temp.level = v.level
          temp.name = v.name
          temp.time = v.time
          return temp
        })
        // 降序排列 是为了保证后面的灾害程度始终比前面的小！
        newArr.sort((a, b) => {
          return b.deg - a.deg
        })
        this.chartData = newArr
        // console.log(this.echartsData.data)
      },

      // 调用地图
      showMap() {
        this.map.hide()
        this.map.show({
          mapType: this.echartsData.province,
          data: this.chartData
        });
      },

      // 初始化实例对象
      initMap() {
        //  实例
        this.map = new map.DisasterMap();

        /*
         * 初始化
         *   @param  dom 初始化所需dom元素
         *   @param  disaster 图标对应名称  和 icon 顺序保持一致
         *   @param  icon 图标  和 disaster 顺序保持一致
         *   @param  dataAreaColor 有数据地区颜色  和 disaster、icon 顺序保持一致
         *   @param  areaColor 地区默认颜色 默认为白色 '#fff'
         *   @param  borderColor 地区边框颜色 默认为白色 '#fff'
         *   @param  iconSize 图标大小 默认是[20,20] 表示 宽和高
         *   @param  jsonUrl json文件以disasterMap.min.js为源的相对路径
         *   @param  tooltipCallBack 提示框的回调 可以定义提示框内容  默认显示内容和示例一样
         *   @param  shadowBlur   shadow 大小dize
         *   @param  shadowColor  shadow 颜色 16进制 & rgb & rgba
         *   @param  shadowOffset 阴影偏移量[x, y]
         * */
        this.map.init({
          dom: this.$refs.chart,
          disaster: ['低温冻害', '干旱灾害', '连阴雨灾害'],
          icon: [icon0, icon1, icon2],
          // 隐藏icon
          // icon: [],
          dataAreaColor: ['#e7d32c', '#ec912f', '#ff603b', '#7BD655'],
          // 主图背景颜色
          areaColor: '#06594b',
          iconSize: [20, 20],

          // 主图背景阴影
          shadowBlur: 0,
          shadowColor: '#06bd9e',
          shadowOffset: [3, 10],

          // 提示框样式
          tooltipBackground: '#099d4f',
          tooltipBorderColor: '#099d4f',
          tooltipBorderWidth: 0,
          tooltipPadding: 10,
          tooltipTextStyle: {
            color: '#fff'
          },
          tooltipExtraCssText: '',

          jsonUrl: './static/json/',
          tooltipCallBack: (d) => {
            if (d.data.degree === '无' || d.data.degree === '暂无数据') {
              return
            }
            let disaster = []
            this.map._option.series[1].data.forEach((v, i) => {
              if (v.name === d.data.name) {
                disaster.push(v)
              }
            })
            if (d.data.degree && disaster.length < 2) {
              return `<div style="width: 200px;text-align: left;word-wrap:break-word">
                      <p>地区：${d.data.name}</p>
                      <p>时间：${d.data.time}</p>
                      <p>灾害类型：${d.data.message}</p>
                      <p>灾害程度：${d.data.degree}</p>
                    </div>`
              // <p style="width: 200px;white-space:pre-wrap">附加说明：${d.data.desc}</p>
            } else if (d.data.degree) {
              let text = `<div style="width: 200px;text-align: left;word-wrap:break-word">
                      <p>地区：${d.data.name}</p>
                      <p>时间：${d.data.time}</p>`
              disaster.forEach((v, i) => {
                text += `<p>灾害类型：${v.message}</p><p>灾害程度：${v.degree}</p>`
              })
              return text + `</div>`
            }
          },
          clickCallback: this.clickCallback
        });

        /*
         * 设置地图映射
         * @param key 传入值   value 对应JSON名
         * */
        this.map._nameMap = {
          河北: 130000,
          山西: 140000,
          辽宁: 210000,
          山东: 370000,
          河南: 410000,
          陕西: 610000,
          甘肃: 620000,
        };


        /*
         * 渲染数据
         *   @param  mapType 渲染省份的名称 中文
         *   @param  data 数据
         *       格式为[
         *           {
         *              name : '名称', --- 地区名称
         *             level : '灾害标识',  --- 0 1 2
         *             coord : '[111,222]' --- 地区坐标
         *           }
         *       ]
         * */
//        this.showMap()

        //resize 方法已存在

        // 模拟图例事件  测试---
        /*var select = {},
         selectDom = $('li');
         selectDom.each(function (i, item) {
         select[i] = true;
         $(item).on('click', function () {
         var _i = $(this).index(),
         selectData = [];
         select[_i] = !select[_i];
         for (var j = 0; j < chartData.length; j++) {
         if (select[chartData[j].level]) {
         selectData.push(chartData[j]);
         }
         }
         map.show({
         mapType: '山东',
         data: selectData
         });
         })
         });*/
      },

      /**
       * 点击灾害地图图标时候弹出新的层
       * @param params obj 地图传回的参数
       */
      clickCallback(params) {
        // 筛选有数据的区域
        if(params.data.message && params.data.degree){
            // do something
          this.$parent.$parent.$parent.bigwindow9 = true
          // let name = params.data.name === '文登区' ? '文登市' : params.data.name
          this.$parent.$parent.$parent.paramsdata.name = params.data.name
        }
      },

      // echats 图表自适应
      _windowResizeHandler() {
        this.map.resize()
      },
      // 销毁echats图表方法
      _destroyEchart() {
        this.map._dispose();
      },

    }
  }
</script>

<style lang="scss" scoped>
  @import "./../../../assets/css/_variable.scss";
  @import "./../../../assets/css/_mixin.scss";

  .disaster-map-wrapper {
    width: 100%;
    /*height: 100%;*/
    height: calc(100% - 0.55rem);
    position: relative;
    .list {
      position: absolute;
      top: 2%;
      left: 2%;
      .unchecked {
        color: #666;
        &:before {
          -webkit-filter: grayscale(100%); /* Chrome, Safari, Opera */
          filter: grayscale(100%);
        }
      }
      li {
        font-weight: lighter;
        height: 30px;
        line-height: 30px;
        text-align: left;
        cursor: pointer;
        &:nth-child(1), &:nth-child(2), &:nth-child(3) {
          &:before {
            content: '';
            width: 32px;
            height: 30px;
            display: inline-block;
            vertical-align: middle;
            background: url('../../../assets/img/0.png') no-repeat center;
          }
        }
        &:nth-child(2) {
          &:before {
            background: url('../../../assets/img/1.png') no-repeat center;
          }
        }
        &:nth-child(3) {
          &:before {
            background: url('../../../assets/img/2.png') no-repeat center;
          }
        }
        &:nth-child(4), &:nth-child(5), &:nth-child(6) {
          cursor: auto;
          &:before {
            content: '';
            width: 18px;
            height: 10px;
            margin: 0 7px;
            display: inline-block;
            vertical-align: middle;
            background-color: #e7d32c;
          }
        }
        &:nth-child(5) {
          &:before {
            background-color: #ec912f;
          }
        }
        &:nth-child(6) {
          &:before {
            background-color: #ff603b;
          }
        }

        /*恢复以前的样式只需要删掉下面这一段，释放上面的注释*/
        /*&:nth-child(1), &:nth-child(2), &:nth-child(3) {
          cursor: auto;
          &:before {
            content: '';
            width: 18px;
            height: 10px;
            margin: 0 7px;
            display: inline-block;
            vertical-align: middle;
            background-color: #071c96;
          }
        }
        &:nth-child(2) {
          &:before {
            background-color: #f0ee25;
          }
        }
        &:nth-child(3) {
          &:before {
            background-color: #e04c14;
          }
        }*/

      }
    }
  }

  /*小图的图例的样式*/
  .small-wrapper {
    height: 100%;
    padding: 0 0.2rem;
    .disaster-map-wrapper {
      .list {
        li {
          font-size: 12px;
          height: 24px;
          line-height: 24px;
          &:nth-child(1), &:nth-child(2), &:nth-child(3) {
            &:before {
              background-size: 100%;
              content: '';
              width: 24px;
              height: 24px;
            }
          }
          &:nth-child(4), &:nth-child(5), &:nth-child(6) {
            &:before {
              content: '';
              width: 12px;
              height: 7px;
              margin: 0 6px;
            }
          }
          &:nth-child(4), &:nth-child(5), &:nth-child(6) {
            width: 90px;
            overflow: hidden;
          }
          /*恢复以前的样式只需要删掉下面这一段，释放上面的注释*/
          /*&:nth-child(1), &:nth-child(2), &:nth-child(3) {
            &:before {
              content: '';
              width: 12px;
              height: 7px;
              margin: 0 6px;
            }
          }*/
        }
      }
    }

  }
</style>
