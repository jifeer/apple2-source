<template>
  <div class="disaster-map-wrapper">
    <div id="chartDom" ref="chart" :style="{width:width,height:height}">

    </div>
    <ul class="list" ref="list">
      <!--<li :class="{unchecked: item.active}" v-for="(item, index) in legendData" @click="_toggleDisaster(index)">{{item.name}}</li>-->
      <li v-for="item in degreeLabelData">{{item}}</li>
    </ul>
  </div>

</template>
<script>

  import map from  '../gis/disasterMap.min'
  import icon0 from 'assets/img/0.png';
  import icon1 from 'assets/img/1.png';
  import icon2 from 'assets/img/2.png';

  //  console.log(map)
  export default {
    name: 'map-province',
    props: {
      echartsData: {
        type: Object,
        default: ()=>{

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
            name: '低温灾害'
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
        degreeLabelData:['轻度灾害','中度灾害','重度灾害'],

      }
    },
    watch: {
      echartsData: {
        handler: function (val, oldVal) {

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

      _toggleDisaster(index){
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

      // 初始化数据
      initData() {
        // console.log(this.echartsData.data)

        this.chartData = this.echartsData.data
      },
      /*initData() {
        for (let item in this.dataMap) {
          if (this.dataMap[item])
            this.chartData.push({
              name: item,
              level: parseInt(Math.random() * (this.max - this.min + 1) + this.min, 10),
              coord: this.dataMap[item],
              time: '2017/6/2',
              desc: '附加说明',
              degree: '灾害程度'
            })
        }
      },*/

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
//          icon: [icon0, icon1, icon2],
          // 隐藏icon
          icon: [],
          dataAreaColor: ['#071c96', '#f0ee25', '#e04c14'],
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
          tooltipCallBack: function (d) {
//            console.log(d)
            if (d.data.degree) {
              return `<div style="width: 200px;text-align: left;word-wrap:break-word">
                      <p>地区：${d.data.name}</p>
                      <p>时间：${d.data.time}</p>
                      <p>灾害类型：${d.data.message}</p>
                      <p>灾害程度：${d.data.degree}</p>
                      <p style="width: 200px;white-space:pre-wrap">附加说明：${d.data.desc}</p>
                    </div>`
              // return '地区 : ' + d.data.name + '<br />时间 : ' + d.data.time + '<br />灾害类型 : ' + d.data.message + '<br />灾害程度 : ' + d.data.degree + '<br />附加说明 : ' + d.data.desc
            }
          }
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
      }
      li {
        font-weight: lighter;
        height: 30px;
        line-height: 30px;
        text-align: left;
        cursor: pointer;
        /*&:nth-child(1), &:nth-child(2), &:nth-child(3) {
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
            background-color: #071c96;
          }
        }
        &:nth-child(5) {
          &:before {
            background-color: #f0ee25;
          }
        }
        &:nth-child(6) {
          &:before {
            background-color: #e04c14;
          }
        }*/

        /*恢复以前的样式只需要删掉下面这一段，释放上面的注释*/
        &:nth-child(1), &:nth-child(2), &:nth-child(3) {
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
        }


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
          /*&:nth-child(1), &:nth-child(2), &:nth-child(3) {
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
          */
          /*恢复以前的样式只需要删掉下面这一段，释放上面的注释*/
          &:nth-child(1), &:nth-child(2), &:nth-child(3) {
            &:before {
              content: '';
              width: 12px;
              height: 7px;
              margin: 0 6px;
            }
          }
        }
      }
    }

  }
</style>
