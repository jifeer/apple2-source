/**
 * Created by lijunjie on 2017-10-16.
 */

import {gis_shengjie_mian} from '../gis/gis_shengjie_mian';
export const TMask = T.Overlay.extend({
  initialize: function (imgUrl, x, y) {
    this._img = new Image();
    this._img.src = imgUrl;
    this._datas = null;
    this._x = x;
    this._y = y;
  },

  onAdd: function (map) {
    this.map = map;
    var size = map.getSize();
    var div = this._div = document.createElement("canvas");
    this._ctx = div.getContext("2d");


    div.width = size.x;
    div.height = size.y;
    div.style.position = "absolute";
    div.style.width = size.x + "px";
    div.style.height = size.y + "px";

    map.getPanes().overlayPane.appendChild(this._div);

    // map.on("moveend", this.update, this);
    map.on("zoomend", this.update, this);
    map.on("resize", this.update, this);
    map.on("move", this.update, this);


    var self = this;
    this._img.onload = function () {
      self.update();
    };
  },

  onRemove: function () {
    var parent = this.div.parentNode;
    if (parent) {
      parent.removeChild(this.div);
      this.map = null;
      this.div = null;
    }
    ;
  },
  /**
   * ����λ��
   */
  update: function () {

    var size = this.map.getSize();

    var parent = this._div.parentNode.parentNode;
    var reg = /(\-?)\d+/g;

    var result = parent.style.transform.match(reg);

    this._div.style.width = size.x + "px";
    this._div.style.height = size.y + "px"
    this._div.width = size.x;
    this._div.height = size.y;

    function isIE() { //ie?
      if (!!window.ActiveXObject || "ActiveXObject" in window)
        return true;
      else
        return false;
    }
    // 兼容性处理 result数组在Chrome和IE环境下得到不同的结果
    if (isIE()) {
      this._div.style.top = -result[1] + "px";
      this._div.style.left = -result[0] + "px";
    } else {
      this._div.style.top = -result[2] + "px";
      this._div.style.left = -result[1] + "px";
    }

    this._ctx.clearRect(0, 0, size.x, size.y);

    /*
    绘制背景 以下的代码是为了处理放大的时候出现一条无法绘制的白边的问题
     */
    let imgW = 1920
    let imgH = 1080
    let factor = 0
    let scale = 1;
    let flag = 1
    if(document.body.offsetHeight/document.body.offsetWidth > imgH/imgW){
      // 说明 高度变高或者宽度变窄了，这时候以高度为准了
      scale = document.body.offsetHeight/imgH;
      factor  = (imgW * scale - document.body.offsetWidth)/2/scale
      flag = 1
    } else {
      scale = document.body.offsetWidth/imgW;
      factor  = (imgH * scale - document.body.offsetHeight)/2/scale
      flag = 2
    }

    this._ctx.globalCompositeOperation = "source-over";
    // this._x,this._y, 背景图片绘制的起点

    if(flag === 1){
      this._ctx.drawImage(this._img, (this._x/scale + factor), this._y/scale, size.x/scale, size.y/scale, 0, 0, size.x, size.y);
    }
    if(flag === 2){
      this._ctx.drawImage(this._img, this._x/scale, (this._y/scale + factor), size.x/scale, size.y/scale, 0, 0, size.x, size.y);
    }

    // this._ctx.drawImage(this._img, this._x, this._y, size.x, size.y, 0, 0, size.x, size.y);

    this._ctx.globalCompositeOperation = "destination-out";

    if (!this._datas) {
      for (var i = 0; i < gis_shengjie_mian.length; i++) {

        var poly = gis_shengjie_mian[i];

        if (poly.level == "world") {
          this._datas = poly;
        }
      }
    }

    var coordinates = this._datas.coordinates;
    for (var j = 0; j < coordinates.length; j++) {
      var polygon = coordinates[j];
      var path = polygon[0];
      this._ctx.beginPath();
      for (var k = 0; k < path.length; k++) {
        var lngLat = new T.LngLat(path[k][0], path[k][1]);
        var pixel = this.map.lngLatToContainerPoint(lngLat);
        if (k == 0) {
          this._ctx.moveTo(pixel.x, pixel.y);
        } else {
          this._ctx.lineTo(pixel.x, pixel.y);
        }
      }
      this._ctx.closePath();
      this._ctx.fill();
    }


  },
  setXY: function (x, y) {
    this._x = x;
    this._y = y;
    this.update();
  }
});
