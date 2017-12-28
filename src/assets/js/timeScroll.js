let TimeLinescale = function(el) {
  this.el = el;
  this.destroy();
};

TimeLinescale.prototype = {
  csvg: function(el) {
    let _this = this;
    let ns = "http://www.w3.org/2000/svg";
    return document.createElementNS(ns, el);
  },
  svg: function(id) {
    let _this = this;
    let svgBox = document.getElementById(id);
    svgBox.innerHTML = '';
    return svgBox;
  },
  createScale: function(option) {
    let _this = this;
    let self = this.el;
    self.data = option.data;
    self.init = option.init;
    let endData = self.data[self.data.length - 1];
    let startData = self.data[0];
    let _scaleWidth = self.width;
    let _scaleHeight = self.height;
    let _svgHeight = self.handle;

    let _scaleMargin = {
      top: _svgHeight,
      right: 36.5,
      bottom: 20,
      left: 39
    };
    let ticklength = self.ticklength;
    //生成SVG
    let _svg = _this.csvg('svg'); //创建完svg标签
    _svg.setAttribute('width', _scaleWidth);
    _svg.setAttribute('height', _scaleHeight);
    let svgBox = _this.svg(self.id);
    svgBox.appendChild(_svg);
    //标尺的组
    let _rule = _svg.appendChild(_this.csvg('g'));
    _rule.setAttribute("transform", "translate(" + (_scaleMargin.left) + "," + (_scaleMargin.top - 1) + ")");
    let ticks_g = _rule.appendChild(_this.csvg('g'));

    //刻度生成
    let all = self.data.length;
    let delateWidth = Math.floor(_scaleWidth - _scaleMargin.left - _scaleMargin.right) / all; //每一大格

    // let smallWidth=delateWidth/5;//每一小格
    for (let i = 0; i < all; i++) {
      let _bigLine = this.csvg("line");
      _bigLine.setAttribute("class", "bigtick" + i);
      _bigLine.setAttribute("x1", i * delateWidth);
      _bigLine.setAttribute("y1", 1);
      _bigLine.setAttribute("x2", i * delateWidth);
      _bigLine.setAttribute("y2", ticklength + 1);
      _bigLine.setAttribute("stroke-width", 2);
      _bigLine.setAttribute("stroke", "#0376a9");
      ticks_g.appendChild(_bigLine);
      // 小格
      // for(let j=0;j<5;j++){
      //     if(i>=all) break;
      //     let _smallLine=this.csvg("line");
      //     _smallLine.setAttribute("class","smalltick"+j);
      //     _smallLine.setAttribute("x1",j*smallWidth+i*delateWidth);
      //     _smallLine.setAttribute("y1",1);
      //     _smallLine.setAttribute("x2",j*smallWidth+i*delateWidth);
      //     _smallLine.setAttribute("y2",ticklength*0.5);
      //     _smallLine.setAttribute("stroke-width",2);
      //     _smallLine.setAttribute("stroke","#0376a9");
      //     ticks_g.appendChild(_smallLine);
      // }

    }

    /*数字线起始值*/
    let label_g = _rule.appendChild(_this.csvg('g'));

    /*数字线结束值*/
    let datas = self.data;
    let _labelText1 = this.csvg("text");
    _labelText1.setAttribute("x", delateWidth * (datas.length - 1));
    _labelText1.setAttribute("y", 1);
    _labelText1.setAttribute("dy", 24);
    _labelText1.setAttribute("text-anchor", "middle");
    _labelText1.setAttribute("font-size", "12px");
    _labelText1.setAttribute("style", "fill:#0376a9");
    _labelText1.innerHTML = endData;
    label_g.appendChild(_labelText1);

    /*中间值*/
    let data = self.data;
    let n;
    if (data.length < 130) {
      for (let k = 0; k < data.length; k++) {
        if (data[k].length === 4) {
          n = 10;
          let _labelText = this.csvg("text");
          _labelText.setAttribute("x", 0);
          _labelText.setAttribute("y", 1);
          _labelText.setAttribute("dy", 24);
          _labelText.setAttribute("text-anchor", "middle");
          _labelText.setAttribute("style", "fill:#0376a9");
          _labelText.setAttribute("font-size", "12px");
          _labelText.setAttribute("text-anchor", "middle");
          _labelText.innerHTML = startData;
          label_g.appendChild(_labelText);

        } else {
          n = 12
        }
      }
    } else {
      for (let k = 0; k < data.length; k++) {
        if (data[k].length === 4) {
          n = 30;
          let _labelText = this.csvg("text");
          _labelText.setAttribute("x", 0);
          _labelText.setAttribute("y", 1);
          _labelText.setAttribute("dy", 24);
          _labelText.setAttribute("text-anchor", "middle");
          _labelText.setAttribute("style", "fill:#0376a9");
          _labelText.setAttribute("font-size", "12px");
          _labelText.setAttribute("text-anchor", "middle");
          _labelText.innerHTML = startData;
          label_g.appendChild(_labelText);

        } else {
          n = 60
        }
      }
    }

    let delateWidths = (_scaleWidth - _scaleMargin.left - _scaleMargin.right) / all * n;
    let flag = all / n;
    if (all % n <= 3) {
      flag = all / n - 1;
    }

    for (let i = 0; i < flag; i++) {
      let _labelTextcenter = this.csvg("text");
      _labelTextcenter.setAttribute("x", delateWidths * i);
      _labelTextcenter.setAttribute("y", ticklength);
      _labelTextcenter.setAttribute("dy", ticklength);
      _labelTextcenter.setAttribute("text-anchor", "middle");
      _labelTextcenter.setAttribute("font-size", "12px");
      _labelTextcenter.setAttribute("style", "fill:#0376a9");
      _labelTextcenter.innerHTML = data[i * n];
      label_g.appendChild(_labelTextcenter);
    }
    //数据显示区域
    let _rect_g = _svg.appendChild(_this.csvg('g'));
    let _rect = _this.csvg('rect');
    _rect.setAttribute('x', 0);
    _rect.setAttribute('y', 0);
    _rect.setAttribute('rx', '4');
    _rect.setAttribute('ry', '4');
    _rect.setAttribute('width', _scaleWidth);
    _rect.setAttribute('height', _svgHeight);
    _rect.setAttribute('style', 'fill:#0376a9');
    _rect_g.appendChild(_rect);
    //动态创建绿色框
    let dragFrame = document.createElement("p");
    dragFrame.id = "bar";
    //设置初始化状态
    let def = this.el.init; //2014
    let widthAll = this.el.width - 76;
    let _topIndex = _this.el.data.indexOf(def);
    dragFrame.style.left = widthAll * (_topIndex / _this.el.data.length) + 1 + "px";
    // console.log(def)
    // console.log(dragFrame.style.left)
    /*设置样式*/
    dragFrame.style.color = "#fff";
    dragFrame.style.cursor = "pointer";
    dragFrame.style.width = 75 + "px";
    dragFrame.style.height = 40 + "px";
    dragFrame.style.fontSize = 12 + "px";
    dragFrame.style.background = "#00af67";
    dragFrame.style.display = 'block';
    dragFrame.style.borderRadius = "5px";
    dragFrame.style.position = "absolute";
    dragFrame.style.textAlign = "center";
    dragFrame.style.lineHeight = 40 + "px";
    dragFrame.style.top = -55 + "px";
    //动态创建绿色杠
    let bar = document.createElement("b");
    bar.style.width = 2 + "px";
    bar.style.height = (ticklength + 4) + "px";
    bar.style.background = "#00af67";
    bar.style.display = 'block';
    bar.style.position = "absolute";
    bar.style.top = 40 + "px";
    bar.style.left = 37 + "px";
    //动态创建小三角
    let triangle = document.createElement("span");
    triangle.style.display = 'block';
    triangle.style.width = 0;
    triangle.style.borderLeft = "10px solid transparent";
    triangle.style.borderRight = "10px solid transparent";
    triangle.style.borderTop = "8px solid #00af67";
    triangle.style.position = "absolute";
    triangle.style.top = 38 + "px";
    triangle.style.left = 28 + "px";
    //动态创建绿色框里的字
    let otext = document.createElement("i");
    otext.innerHTML = def;
    //添加节点
    dragFrame.appendChild(otext);
    dragFrame.appendChild(bar);
    dragFrame.appendChild(triangle);
    svgBox.appendChild(dragFrame);
    //拖拽事件
    dragFrame.onmousedown = function(event) {
      let e = event || window.event;
      event.preventDefault();
      let Left = e.clientX - this.offsetLeft;
      let that = this;
      //移动鼠标时
      document.onmousemove = function(event) {
        let e = event || window.event;
        let barleft = e.clientX - Left;
        if (barleft < 0) barleft = 1;
        else if (barleft > (_scaleWidth - dragFrame.offsetWidth) - delateWidth)
          barleft = (_scaleWidth - dragFrame.offsetWidth) - delateWidth;
        that.style.left = barleft + "px";
        let _index = Math.ceil(barleft / (_scaleWidth - (dragFrame.offsetWidth + 1)) * self.data.length) - 1;
        let _tooltipContent = self.data[_index < 0 ? 0 : _index];
        otext.innerHTML = _tooltipContent;
      }
    };
    //鼠标抬起时
    document.onmouseup = function() {
      document.onmousemove = null; //弹起鼠标不做任何操作
      document.onmousedown = null;
      let n = otext.innerHTML;
      if (n !== _this.oldHtml) {
        _this.oldHtml = otext.innerHTML;
        _this._upChange(otext.innerHTML);
      }
    };
  },
  //事件监听
  _upChange() {},
  on: function(listener) {
    this._upChange = listener;
  },
  //事件销毁
  destroy: function() {
    let oa = document.createElement("p");
    oa.onmousedown = null;
    oa.onmouseup = null;
    document.onmousemove = null;
    document.onmousedown = null;
  }
};
export { TimeLinescale };
