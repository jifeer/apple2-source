<template>
  <div id="mapChina" class="map-china" ref="chart" :style="{width:width,height:height}">

  </div>
</template>
<script>
  import {resizeMixin} from 'assets/js/common'
  // mock data
  //  import {test_datas} from '../gis/test';

  import {gis_guojie_xian} from '../gis/gis_guojie_xian';
  import {gis_shengjie_mian} from '../gis/gis_shengjie_mian';
  import {TMask} from '../gis/gis_mask';
  import imgUrl from 'assets/img/bg_01.jpg';
  // require('../gis/tianditu_apiv4_new');
  export default {
    name: 'map-china',
    mixins: [resizeMixin],
    props: {
      echartsData: {
        type: Object,
        default: () => {
        }
      },
      mapColor: {
        type: Array,
        default: () => []
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
        map: null,
        layerGroup: null,
        infoWin: null,
        poly: null,
//        imgUrl: require('../../../assets/img/bg_01.jpg'),
        coor: {            // canvas 距离body的距离
          x: '',
          y: '',
        },
        isFirst: 0,        // 是否是第一次渲染
      }
    },

    watch: {
      echartsData: {
        handler: function (val, oldVal) {

          this.clearGisDatas() // 清除上一次残留的数据
          this.test()          // 绘制新的数据
        },
        deep: true             // 增加deep观察对象的子对象变化
      }
    },
    mounted() {
      this.$nextTick(() => {
        this.initMap()         // 初始化地图
        this._getCoordinate()  // 获取 canvas 左上角的位置
        this.addMask()         // 添加背景层
      })
    },

    computed: {},
    methods: {
      // 得到初始化绘制背景的初始坐标
      _getCoordinate(){
        this.coor.x = document.getElementById('mapChina').getBoundingClientRect().left;
        this.coor.y = document.getElementById('mapChina').getBoundingClientRect().top;
      },

      /* 添加背景图
       @imgUrl 背景图片路径
       @params1 图片的X坐标
       @params2 图片的Y坐标
       */
      addMask() {
        var Mask = new TMask(imgUrl, this.coor.x, this.coor.y);
        Mask.addTo(this.map);
        Mask.setXY(document.getElementById('mapChina').getBoundingClientRect().left, document.getElementById('mapChina').getBoundingClientRect().top)
      },

      initMap() {
        //根据div生成地图 地图div需要指定宽度和高度
        this.map = new T.Map('mapChina', {
          minZoom: 4,
          maxZoom: 18,
          // projection:"EPSG:4326"
        });
        this.map.centerAndZoom(new T.LngLat(106.19434, 37.70549), 5);
        //    this.map.setMaxBounds(new T.LngLatBounds(new T.LngLat(72.24659, 0.35106), new T.LngLat(136.23097, 54.16214)));
        // 禁用惯性拖拽
        this.map.disableInertia()
        // 注释此段代码地图为地形图不注释为影像图
        //--------------------
        var ls = this.map.getLayers();
        for (var l = 0; l < ls.length; l++) {
          this.map.removeLayer(ls[l]);
        }
        var lay = new T.TileLayer("http://t" + T.q.W(0, 7) + ".tianditu.cn/img_w/wmts?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=img&STYLE=default&TILEMATRIXSET=w&FORMAT=tiles&tileMatrixSet=c&TileMatrix={z}&TileRow={y}&TileCol={x}", {
          minZoom: 1,
          maxZoom: 18,
          opacity: 1,
          bounds: new T.LngLatBounds(new T.LngLat(72.24659, 0.35106), new T.LngLat(134.23097, 54.16214))
        });
        this.map.addLayer(lay);

        /*
         //内网影像图
         var img_c = new T.TileLayer("http://10.2.5.91:81/img_c/wmts?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=img&STYLE=default&TILEMATRIXSET=c&FORMAT=tiles&tileMatrixSet=c&TileMatrix={z}&TileRow={y}&TileCol={x}");
         map.addLayer(img_c);
         var cia_c = new T.TileLayer("http://10.2.5.91:81/cia_c/wmts?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=cia&STYLE=default&TILEMATRIXSET=c&FORMAT=tiles&tileMatrixSet=c&TileMatrix={z}&TileRow={y}&TileCol={x}");
         map.addLayer(cia_c);
         //内网地形图
         var vec_c = new T.TileLayer("http://10.2.5.91:81/vec_c/wmts?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=vec&STYLE=default&TILEMATRIXSET=c&FORMAT=tiles&tileMatrixSet=c&TileMatrix={z}&TileRow={y}&TileCol={x}");
         map.addLayer(vec_c);
         var cva_c = new T.TileLayer("http://10.2.5.91:81/cva_c/wmts?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=cva&STYLE=default&TILEMATRIXSET=c&FORMAT=tiles&tileMatrixSet=c&TileMatrix={z}&TileRow={y}&TileCol={x}");
         map.addLayer(cva_c);
         */

        //--------------------

        //layerGroup 存储所有后台数据生成的多边形 用来绘制一个新的图层
        this.layerGroup = new T.LayerGroup();
        this.map.addLayer(this.layerGroup);

        // 绘制省界限地图 国界线单独绘制
        this.drawLineProvince()
      },

      // 绘制边界线条
      drawLineCountry(callback) {
        //gis_guojie_xian.js生成国界线
        for (var j = 0; j < gis_guojie_xian.features.length; j++) {
          var feature = gis_guojie_xian.features[j];
          var paths = feature.geometry.paths;
          for (var k = 0; k < paths.length; k++) {
            var path = paths[k];
            var lngLats = [];
            for (var m = 0; m < path.length; m++) {
              var arry = path[m];
              var lngLat = new T.LngLat(arry[0], arry[1]);
              lngLats.push(lngLat);
            }
            // 开始绘制国界线
            callback(lngLats)
          }
        }
      },

      // 绘制国界线的回调函数
      drawLineCallBack(lngLats) {
        //为国界线指定样式,其中color为边线颜色，opacity为边线透明度，weight为边线宽度
        var polyline = new T.Polyline(lngLats, {
        // 修改国境线颜色
          color: "#ba702d",
          weight: 4,
          opacity: 0.8,
        // lineStyle: 'dashed'
        });
        this.map.addLayer(polyline);
      },

      // 绘制省界限
      drawLineProvince() {
        //gis_shengjie_mian.js生成省外廓线
        for (var i = 0; i < gis_shengjie_mian.length; i++) {

          var poly = gis_shengjie_mian[i];

          if (poly.level == "world") {
            continue;
          }

          //经纬度数组转换成天地图指定的经纬度对象（T.LngLat）
          var lnglats = this._handle(poly.coordinates);

          //为省指定样式，其中color为边线颜色，fillColor为面填充颜色，默认为color颜色，opacity为边线透明度，fillOpacity为
          //面填充颜色透明度，weight为边线宽度
          var option = {
            color: "#537e7b", weight: 2, opacity: 0.5, fillOpacity: 0
          };

          //生成多边形
          var polygon = new T.Polygon(lnglats, option);
          //添加到地图上
          this.map.addLayer(polygon);
        }
      },

      _handle(arry) {
        var arr = null;
        if (typeof arry[0] == "number") {
          return new T.LngLat(arry[0], arry[1]);
        } else {
          arr = [];
          for (var i = 0; i < arry.length; i++) {
            arr.push(this._handle(arry[i]));
          }
        }
        return arr;
      },

      //根据后台数据（格式待定）和根据数据value计算的color生成多变形添加到地图
      //并添加事件
      addGisData(data, color){

        //后台数据COORDINATES存储县边界地理数据
        var coordinates = data["COORDINATES"];

        //边界数据不存储跳过
        if (!coordinates)return;

        //如果边界数据为"[[[]],[[]]]"转换为[[[]],[[]]]
        if (typeof coordinates == "string") {
          coordinates = JSON.parse(coordinates);
        }

        //出来经纬度数组转换为天地图经纬度对象（T.LngLat）
        var lngLats = this._handle(coordinates);

        //存储属性数据
        var props = {};
        for (var key in data) {
          if (key == "COORDINATES") {
            continue;
          }
          props[key] = data[key];
        }

        //根据数据初始化多边形,option可以设置多边形边线颜色（color）、边线透明度（opacity）、边线宽度（weight）、
        //面填充颜色（fillColor)、面透明度（fillOpacity)
        var polygon = new T.Polygon(lngLats, {
          color: "#4eaa85",
          fillOpacity: 1,
          fillColor: color
        });

        //polygon绑定后台数据
        polygon._properties = props;

        //绑定鼠标事件--高亮显示并且弹出信息框
        polygon.addEventListener("mouseover", this._onMouseOver, polygon);

        //生成的多变形添加图层组里便于统一处理和遍历
        this.layerGroup.addLayer(polygon);
      },


      //清除地图叠加的后台数据生成的多边形--用于切换时间轴
      clearGisDatas(){
        this.layerGroup.clearLayers();
        this.closeInfoWindow()
      },


      /**
       * 高亮显示多边形并且弹出信息框
       * @param layer
       * @private
       */
      _onMouseOver(layer){

        //区分真正鼠标事件高亮还是点击按钮高亮
        var self = layer instanceof T.Polygon ? layer : layer.target;

        //多边形属性信息
        var props = self._properties;

        //获取县中心点
        var lat = parseFloat(props["LAT"]);
        var lng = parseFloat(props["LNG"]);
        var coor = new T.LngLat(lng, lat);

        //文本框展示内容可以为html字符串也可以为html对象
        var table = `<table id='gis_data_table' style="text-align: left; cursor: pointer">
                      <tr>
                        <td>${props.AREANAME}</td>
                      </tr>
                      <tr>
                       <td>${props.type == '121689' ? '种植面积：' + (props.PLANT_AREA ? props.PLANT_AREA.toFixed(2) : '-') + '万亩' : props.type == '112716' ? '产量：' + (props.PLANT_AREA ? props.PLANT_AREA.toFixed(2) : '-') + '万吨' : '-'}<td/>
                      </tr>
                      <tr>
                       <td>排名：${props.AREARANKING}</td>
                      </tr>
                    </table>`

        /*var table = `<table id='gis_data_table' style="text-align: center; width: 200px;padding: 6px">
                      <tr style="font-size: 16px; font-weight: bold;height: 30px">
                        <td>区域</td>
                        <td>${props.type == '121689' ? '种植面积' : props.type == '112716' ? '产量' : '-'}</td>
                        <td>排名</td>
                      </tr>
                      <tr style="font-size: 16px; font-weight: bold; color: #07c95c; height: 30px">
                        <td>${props.AREANAME}</td>
                        <td>${(props.PLANT_AREA ? props.PLANT_AREA.toFixed(2) : '-')}</td>
                        <td>${props.AREARANKING}</td>
                      </tr>
                    </table>`*/

        //第一次初始化信息框
        if (!this.infoWin || !this.infoWin.isOpen()) {
          this.infoWin = new T.InfoWindow();
          this.infoWin.setLngLat(coor);
          this.infoWin.setContent(table);
          this.map.addOverLay(this.infoWin);

        } else {
          this.infoWin.setContent(table);
          this.infoWin.setLngLat(coor);
        }

        //绑定click事件--点击弹出框展示详细信息
        /*document.getElementById("gis_data_table").onclick = function () {
         alert(props["AREA_ID"]);

         };*/
        document.getElementById("gis_data_table").onclick = () => {
          this.$emit('showInfo', [props["AREANAME"], props["TIME_ID"], props.type])
        }
        //叠加高亮多边形----

        //复制当前多边形坐标信息
        var coors = self.getLngLats();
        if (this.poly) {
          this.layerGroup.removeLayer(this.poly);
        }
        //初始化高亮多变形，可以设置其他支持的样式，比如setFillColor、setOpacity
        this.poly = new T.Polygon(coors, {
          "color": "#cac706",
          "fillOpacity": 1
        });
        //添加到图层组
        this.layerGroup.addLayer(this.poly);
        //删除高亮多边形

        var _self = this;
        this.infoWin.addEventListener("clickclose", function () {
          _self.poly && _self.layerGroup.removeLayer(_self.poly);
          _self.poly = null;
        })

        this.poly.on("mouseout", function () {
//          console.log(_self.infoWin);
          /*_self.layerGroup.removeLayer(_self.poly);
           _self.infoWin && _self.infoWin.closeInfoWindow();
           _self.poly = null;*/
        })

        // 点击地图时候弹出提示框
        this.poly.on('click', ()=>{
          this.$emit('showInfo', [props["AREANAME"], props["TIME_ID"], props.type])
        })
      },

      // 关闭提示框
      closeInfoWindow() {
        if (this.infoWin && this.infoWin.isOpen()) {
          this.infoWin.closeInfoWindow()
        }
      },

      /**
       * 根据id高亮显示多边形
       * @param area_id
       */
      highLight(area_name){
        //遍历图层组
        var layers = this.layerGroup.getLayers(),
          length = layers.length;

        if (length == 0)return;

        for (var i = 0; i < length; i++) {
          var layer = layers[i];
          var properties = layer._properties;
//          if (properties['AREA_ID'] == area_id) {
          if (properties['AREANAME'] == area_name) {
            //移动到地图中心
            //var center = new T.LngLat(parseFloat(properties["LNG"]), parseFloat(properties["LAT"]));
            //this.map.panTo(center);
            //高亮显示
            this._onMouseOver(layer);
            break;
          }
        }
      },

      /**
       * 切换数据是否显示
       * @param field 字段名称
       * @param min   最小值
       * @param max   最大值
       */
      toggleGisData(field, min, max){

        //
        this.poly && this.layerGroup.removeLayer(this.poly);
        this.infoWin && this.infoWin.closeInfoWindow();


        //遍历图层组
        var layers = this.layerGroup.getLayers(),
          length = layers.length;

        if (length == 0)return;

        if (min == null) {
          min = -Infinity;
        }

        if (max == null) {
          max = Infinity;
        }

        for (var i = 0; i < length; i++) {
          var layer = layers[i],
            properties = layer._properties,
            val = properties[field];
          if (typeof val !== 'undefined' && val >= min && val < max) {
            var path = layer.getElement();
            var type = path.style.display;
            path.style.display = (type == "none" ? "block" : "none");
          }

        }

      },

      /**
       * 测试例子
       * with mock data
       * */
      /*test(){

       for (var i = 0; i < test_datas.length; i++) {
       var data = test_datas[i];
       //          var color = "rgb(0," + (255 - Math.floor(data["SUM_DATA"] * 5)) + ",0)";
       var color = "rgba(2, 142, 52, 0.5)";
       this.addGisData(data, color);
       }
       },*/

      // true data
      test(){
        var colorArr = ['#db590e', '#e48a13', '#c6a510', '#c9e110', '#fdff1b', '#0071b3']
        for (var i = 0; i < this.echartsData.data.length; i++) {
          var data = this.echartsData.data[i];

          var color = "rgba(2, 142, 52, 0.5)";

          // 遍历生成新的颜色
          for (var j = 0; j < this.mapColor.length; j++) {
            if (data.PLANT_AREA >= this.mapColor[j][0] && data.PLANT_AREA < (this.mapColor[j][1] ? this.mapColor[j][1] : Infinity)) {
              color = colorArr[j]
              break
            }
          }

          // 将数据添加到地图上
          this.addGisData(data, color);
        }
        // 只渲染一次
        if (!this.isFirst) {
          // 渲染国界线，这个特别耗时间
          this.drawLineCountry(this.drawLineCallBack)
        }
        this.isFirst++
      },

      // 中国地图背景自适应
      _windowResizeHandler() {
        // 窗口缩放的时候重新绘制背景图片
//        this.map.checkResize()
        this.addMask()
      },
      // 销毁echats图表方法
      _destroyEchart() {
        // destroy map
        if (this.map) {
          this.map = null
        }
      }

    }
  }
</script>

<style lang="scss">
  @import "./../../../assets/css/_variable.scss";
  @import "./../../../assets/css/_mixin.scss";

  .map-china {
    z-index: 0;
    .tdt-infowindow-content-wrapper {
      background-color: rgba(0, 0, 0, .4);
      .tdt-infowindow-content {
        margin: 16px;
      }
      table {
        color: #fff;
        font-weight: lighter;
      }
    }
    .tdt-infowindow {
      cursor: auto;
    }
    .tdt-infowindow-tip-container {
      height: 13px;
      .tdt-infowindow-tip {
        background-color: rgba(0, 0, 0, .4);
        box-shadow: none;
      }

    }
    /*隐藏logo*/
    .tdt-control-copyright {
      display: none !important;
    }
  }
</style>
