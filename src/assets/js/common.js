import leftBar from 'components/leftBar/leftBar.vue'
import smallWindow from 'components/smallWindow/smallWindow.vue'
import bigWindow from 'components/bigWindow/bigWindow.vue'

export const rightBarMixin = {
  data() {
    return {

      window1: false,
      window2: false,
      window3: false,
      window4: false,
      window5: false,
      window6: false,
      window7: false,
      window8: false,

      bigwindow1: false,
      bigwindow2: false,
      bigwindow3: false,
      bigwindow4: false,
      bigwindow5: false,
      bigwindow6: false,
      bigwindow7: false,
      bigwindow8: false,

      active1: false,
      active2: false,
      active3: false,
      active4: false,
      active5: false,
      active6: false,
      active7: false,
      active8: false,
    };
  },
  methods: {
    showSmall(whichWindow) {
      if (this[whichWindow] == true) {
        this[whichWindow] = false;
      } else {
        this[whichWindow] = true;
        switch (whichWindow) {
          case 'window1':
            if (this.$refs['small1']) {
              this.$refs.small1.renderChart()
            }
            break;
          case 'window2':
            if (this.$refs.small2) {
              this.$refs.small2.renderChart()
            }
            break;
          case 'window3':
            if (this.$refs.small3) {
              this.$refs.small3.renderChart()
            }
            break;
          case 'window4':
            if (this.$refs.small4) {
              this.$refs.small4.renderChart()
            }
            break;
          case 'window5':
            if (this.$refs.small5) {
              this.$refs.small5.renderChart()
            }
            break;
          case 'window6':
            if (this.$refs.small6) {
              this.$refs.small6.renderChart()
            }
            break;
          case 'window7':
            if (this.$refs.small7) {
              this.$refs.small7.renderChart()
            }
            break;
          default:
        }

      }
      this.changeRightrBarCls(whichWindow)

    },
    closeWindow(whichWindow) {

      this[whichWindow] = false;
      var smallWindow = whichWindow.substring(6, whichWindow.length);
      this[smallWindow] = false;
      this.changeRightrBarCls(whichWindow)

    },
    openBigWindow(whichWindow) {

      switch (whichWindow) {
        case 'window1':
          this.bigwindow1 = true;
          if (this.$refs.big1) {
            this.$refs.big1.renderChart()
          }
          break;
        case 'window2':
          this.bigwindow2 = true;
          if (this.$refs.big2) {
            this.$refs.big2.renderChart()
          }
          break;
        case 'window3':
          this.bigwindow3 = true;
          if (this.$refs.big3) {
            this.$refs.big3.renderChart()
          }
          break;
        case 'window4':
          this.bigwindow4 = true;
          if (this.$refs.big4) {
            this.$refs.big4.renderChart()
          }
          break;
        case 'window5':
          this.bigwindow5 = true;
          if (this.$refs.big5) {
            this.$refs.big5.renderChart()
          }
          break;
        case 'window6':
          this.bigwindow6 = true;
          if (this.$refs.big6) {
            this.$refs.big6.renderChart()
          }
          break;
        case 'window7':
          this.bigwindow7 = true;
          if (this.$refs.big7) {
            this.$refs.big7.renderChart()
          }
          break;
        case 'window8':
          this.bigwindow8 = true;
          if (this.$refs.big8) {
            this.$refs.big8.renderChart()
          }
          break;
        default:
      }
    },
    closeBigWindow(whichWindow) {

      this[whichWindow] = false;

      this.changeRightrBarCls(whichWindow)
    },

    changeRightrBarCls(w) {

      switch (w) {
        case 'window1':
          this[w] == true ? this.active1 = true : this.active1 = false;
          break;
        case 'window2':
          this[w] == true ? this.active2 = true : this.active2 = false;
          break;
        case 'window3':
          this[w] == true ? this.active3 = true : this.active3 = false;
          break;
        case 'window4':
          this[w] == true ? this.active4 = true : this.active4 = false;
          break;
        case 'window5':
          this[w] == true ? this.active5 = true : this.active5 = false;
          break;
        case 'window6':
          this[w] == true ? this.active6 = true : this.active6 = false;
          break;
        case 'window7':
          this[w] == true ? this.active7 = true : this.active7 = false;
          break;
        case 'window8':
          this[w] == true ? this.active8 = true : this.active8 = false;
          break;


        case 'bigwindow1':
          this.window1 == true ? this.active1 = true : this.active1 = false;
          break;
        case 'bigwindow2':
          this.window2 == true ? this.active2 = true : this.active2 = false;
          break;
        case 'bigwindow3':
          this.window3 == true ? this.active3 = true : this.active3 = false;
          break;
        case 'bigwindow4':
          this.window4 == true ? this.active4 = true : this.active4 = false;
          break;
        case 'bigwindow5':
          this.window5 == true ? this.active5 = true : this.active5 = false;
          break;
        case 'bigwindow6':
          this.window6 == true ? this.active6 = true : this.active6 = false;
          break;
        case 'bigwindow7':
          this.window7 == true ? this.active7 = true : this.active7 = false;
          break;
        case 'bigwindow8':
          this.window8 == true ? this.active8 = true : this.active8 = false;
          break;
        default:
      }
    }
  },
  components: {
    leftBar,
    smallWindow,
    bigWindow
  }
}

export const resizeMixin = {
  mounted() {
    setTimeout(() => {
      window.addEventListener('resize', this._windowResizeHandler)
    }, 21)
  },
  methods: {
    _windowResizeHandler() {
      throw new Error('_windowResizeHandler must be implement in current component')
    },
    _destroyEchart() {
      throw new Error('you must destroy your echatrs instance in current component!')
    }
  },
  beforeDestroy() {
    window.removeEventListener('resize', this._windowResizeHandler)
    this._destroyEchart()
  }
}

//深拷贝
export function extend(override, des, src) {
  if (src instanceof Array) {
    for (var i = 0, len = src.length; i < len; i++)
      extend(des, src[i], override);
  }
  for (var i in src) {
    if (override || !(i in des)) {
      des[i] = src[i];
    }
  }
  return des;
};

export const $ = function() {
  var copyIsArray,
    toString = Object.prototype.toString,
    hasOwn = Object.prototype.hasOwnProperty,

    class2type = {
      '[object Boolean]': 'boolean',
      '[object Number]': 'number',
      '[object String]': 'string',
      '[object Function]': 'function',
      '[object Array]': 'array',
      '[object Date]': 'date',
      '[object RegExp]': 'regExp',
      '[object Object]': 'object'
    },

    type = function(obj) {
      return obj == null ? String(obj) : class2type[toString.call(obj)] || "object";
    },

    isWindow = function(obj) {
      return obj && typeof obj === "object" && "setInterval" in obj;
    },

    isArray = Array.isArray || function(obj) {
      return type(obj) === "array";
    },

    isPlainObject = function(obj) {
      if (!obj || type(obj) !== "object" || obj.nodeType || isWindow(obj)) {
        return false;
      }

      if (obj.constructor && !hasOwn.call(obj, "constructor") &&
        !hasOwn.call(obj.constructor.prototype, "isPrototypeOf")) {
        return false;
      }

      var key;
      for (key in obj) {}

      return key === undefined || hasOwn.call(obj, key);
    },

    extend = function(deep, target, options) {
      for (var name in options) {
        var src = target[name];
        var copy = options[name];

        if (target === copy) {
          continue;
        }

        if (deep && copy &&
          (isPlainObject(copy) || (copyIsArray = isArray(copy)))) {
          if (copyIsArray) {
            copyIsArray = false;
            var clone = src && isArray(src) ? src : [];

          } else {
            var clone = src && isPlainObject(src) ? src : {};
          }

          target[name] = extend(deep, clone, copy);
        } else if (copy !== undefined) {
          target[name] = copy;
        }
      }

      return target;
    };

  return { extend: extend };
}();

export const provinceList = [{
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
}];
export const geoCoordMap = {
  '安徽省': [117.17, 31.52],
  '北京市': [116.42, 40.03],
  '重庆市': [106.54, 29.59],
  '福建省': [119.18, 26.05],
  '甘肃省': [103.51, 36.04],
  '广东省': [113.14, 23.08],
  '广西壮族自治区': [108.19, 22.48],
  '贵州省': [106.42, 26.35],
  '海南省': [110.20, 20.02],
  '河北省': [114.30, 38.02],
  '河南省': [113.40, 34.46],
  '黑龙江省': [128.36, 45.44],
  '湖北省': [112.27, 30.15],
  '湖南省': [112.59, 28.12],
  '吉林省': [125.19, 43.54],
  '江苏省': [118.46, 32.03],
  '江西省': [115.55, 28.40],
  '辽宁省': [123.25, 41.48],
  '内蒙古自治区': [108.41, 40.48],
  '宁夏回族自治区': [106.16, 38.27],
  '青海省': [101.48, 36.38],
  '山东省': [118.00, 36.40],
  '山西省': [112.33, 37.54],
  '陕西省': [108.57, 34.17],
  '上海市': [121.29, 31.14],
  '海南': [108.77, 19.10],
  '四川省': [104.04, 30.40],
  '天津市': [117.12, 39.02],
  '西藏自治区': [91.08, 29.39],
  '新疆维吾尔族自治区': [87.36, 43.45],
  '云南省': [102.42, 25.04],
  '浙江省': [120.10, 30.16],
  '澳门': [115.07, 21.33],
  '台湾省': [121.21, 23.53]
};

export const geoCoordMaps = {
  "贵阳市": [
    "106.71",
    "26.58"
  ],
  "长春市": [
    "125.32",
    "43.89"
  ],
  "常德市": [
    "111.69",
    "29.04"
  ],
  "江门市": [
    "113.09",
    "22.59"
  ],
  "咸宁市": [
    "114.33",
    "29.83"
  ],
  "定西市": [
    "104.63",
    "35.58"
  ],
  "新竹县": [
    "121.51",
    "25.04"
  ],
  "海北藏族自治州": [
    "100.9",
    "36.96"
  ],
  "吴忠市": [
    "106.2",
    "37.99"
  ],
  "黑河市": [
    "127.5",
    "50.25"
  ],
  "台中市": [
    "121.51",
    "25.04"
  ],
  "临高县": [
    "109.69",
    "19.91"
  ],
  "吉安市": [
    "114.99",
    "27.11"
  ],
  "南投县": [
    "121.51",
    "25.04"
  ],
  "鸡西市": [
    "130.98",
    "45.3"
  ],
  "迪庆藏族自治州": [
    "99.71",
    "27.83"
  ],
  "金华市": [
    "119.65",
    "29.09"
  ],
  "大连市": [
    "121.62",
    "38.91"
  ],
  "陇南市": [
    "104.93",
    "33.39"
  ],
  "湘西土家族苗族自治州": [
    "109.74",
    "28.31"
  ],
  "河池市": [
    "108.06",
    "24.7"
  ],
  "伊春市": [
    "128.9",
    "47.72"
  ],
  "日喀则地区": [
    "88.89",
    "29.27"
  ],
  "台南市": [
    "121.51",
    "25.04"
  ],
  "克孜勒苏柯尔克孜自治州": [
    "76.17",
    "39.71"
  ],
  "衡阳市": [
    "112.61",
    "26.9"
  ],
  "遂宁市": [
    "105.57",
    "30.51"
  ],
  "三明市": [
    "117.64",
    "26.27"
  ],
  "阿里地区": [
    "80.11",
    "32.5"
  ],
  "包头市": [
    "109.84",
    "40.66"
  ],
  "开封市": [
    "114.34",
    "34.8"
  ],
  "黄石市": [
    "115.08",
    "30.22"
  ],
  "普洱市": [
    "100.97",
    "22.78"
  ],
  "聊城市": [
    "115.98",
    "36.46"
  ],
  "荆州市": [
    "112.24",
    "30.33"
  ],
  "台东县": [
    "121.51",
    "25.04"
  ],
  "资阳市": [
    "104.64",
    "30.12"
  ],
  "长治市": [
    "113.11",
    "36.19"
  ],
  "玉溪市": [
    "102.54",
    "24.35"
  ],
  "延安市": [
    "109.49",
    "36.6"
  ],
  "襄阳市": [
    "112.14",
    "32.04"
  ],
  "福州市": [
    "119.31",
    "26.08"
  ],
  "桃园县": [
    "121.51",
    "25.04"
  ],
  "兰州市": [
    "103.82",
    "36.06"
  ],
  "云林县": [
    "121.51",
    "25.04"
  ],
  "忻州市": [
    "112.73",
    "38.42"
  ],
  "潜江市": [
    "112.9",
    "30.42"
  ],
  "威海市": [
    "122.12",
    "37.51"
  ],
  "东莞市": [
    "113.75",
    "23.05"
  ],
  "朔州市": [
    "112.43",
    "39.33"
  ],
  "长沙市": [
    "112.98",
    "28.19"
  ],
  "宜春市": [
    "114.39",
    "27.8"
  ],
  "焦作市": [
    "113.24",
    "35.24"
  ],
  "昌江黎族自治县": [
    "109.05",
    "19.26"
  ],
  "辽阳市": [
    "123.18",
    "41.27"
  ],
  "阿坝藏族羌族自治州": [
    "102.22",
    "31.9"
  ],
  "烟台市": [
    "121.39",
    "37.54"
  ],
  "贺州市": [
    "111.55",
    "24.41"
  ],
  "德宏傣族景颇族自治州": [
    "98.58",
    "24.44"
  ],
  "晋中市": [
    "112.74",
    "37.7"
  ],
  "鹤壁市": [
    "114.3",
    "35.75"
  ],
  "桂林市": [
    "110.3",
    "25.27"
  ],
  "乌兰察布市": [
    "113.11",
    "41.03"
  ],
  "营口市": [
    "122.24",
    "40.67"
  ],
  "德州市": [
    "116.31",
    "37.45"
  ],
  "博尔塔拉蒙古自治州": [
    "82.07",
    "44.9"
  ],
  "东营市": [
    "118.66",
    "37.43"
  ],
  "文昌市": [
    "110.75",
    "19.61"
  ],
  "湛江市": [
    "110.36",
    "21.27"
  ],
  "阳江市": [
    "111.98",
    "21.86"
  ],
  "延边朝鲜族自治州": [
    "129.51",
    "42.9"
  ],
  "河源市": [
    "114.7",
    "23.75"
  ],
  "鹰潭市": [
    "117.03",
    "28.24"
  ],
  "榆林市": [
    "109.74",
    "38.29"
  ],
  "保亭黎族苗族自治县": [
    "109.7",
    "18.64"
  ],
  "五指山市": [
    "109.52",
    "18.78"
  ],
  "屏东县": [
    "121.51",
    "25.04"
  ],
  "九龙": [
    "114.17",
    "22.32"
  ],
  "秦皇岛市": [
    "119.59",
    "39.94"
  ],
  "怀化市": [
    "109.98",
    "27.55"
  ],
  "亳州市": [
    "115.78",
    "33.87"
  ],
  "澳门半岛": [
    "113.55",
    "22.2"
  ],
  "安庆市": [
    "117.04",
    "30.51"
  ],
  "基隆市": [
    "121.51",
    "25.04"
  ],
  "信阳市": [
    "114.08",
    "32.12"
  ],
  "随州市": [
    "113.37",
    "31.72"
  ],
  "新乡市": [
    "113.88",
    "35.3"
  ],
  "内江市": [
    "105.07",
    "29.59"
  ],
  "六安市": [
    "116.51",
    "31.75"
  ],
  "台北市": [
    "121.51",
    "25.04"
  ],
  "塔城地区": [
    "82.99",
    "46.75"
  ],
  "银川市": [
    "106.28",
    "38.47"
  ],
  "百色市": [
    "106.62",
    "23.9"
  ],
  "酒泉市": [
    "98.51",
    "39.74"
  ],
  "宁德市": [
    "119.53",
    "26.66"
  ],
  "湖州市": [
    "120.1",
    "30.87"
  ],
  "东沙群岛": [
    "112.55",
    "21.81"
  ],
  "沈阳市": [
    "123.43",
    "41.8"
  ],
  "武汉市": [
    "114.3",
    "30.58"
  ],
  "阿勒泰地区": [
    "88.14",
    "47.85"
  ],
  "湘潭市": [
    "112.94",
    "27.83"
  ],
  "莆田市": [
    "119.01",
    "25.43"
  ],
  "洛阳市": [
    "112.43",
    "34.66"
  ],
  "廊坊市": [
    "116.7",
    "39.52"
  ],
  "泰安市": [
    "117.13",
    "36.19"
  ],
  "株洲市": [
    "113.15",
    "27.84"
  ],
  "钦州市": [
    "108.62",
    "21.97"
  ],
  "张家口市": [
    "114.88",
    "40.81"
  ],
  "宝鸡市": [
    "107.14",
    "34.37"
  ],
  "临夏回族自治州": [
    "103.21",
    "35.6"
  ],
  "金昌市": [
    "102.19",
    "38.51"
  ],
  "许昌市": [
    "113.83",
    "34.02"
  ],
  "天津市": [
    "117.2",
    "39.12"
  ],
  "汕尾市": [
    "115.36",
    "22.77"
  ],
  "伊犁哈萨克自治州": [
    "81.32",
    "43.92"
  ],
  "张掖市": [
    "100.46",
    "38.93"
  ],
  "吕梁市": [
    "111.13",
    "37.52"
  ],
  "商洛市": [
    "109.94",
    "33.87"
  ],
  "花莲县": [
    "121.51",
    "25.04"
  ],
  "菏泽市": [
    "115.47",
    "35.25"
  ],
  "大兴安岭地区": [
    "124.71",
    "52.34"
  ],
  "崇左市": [
    "107.35",
    "22.4"
  ],
  "合肥市": [
    "117.28",
    "31.86"
  ],
  "铁岭市": [
    "123.84",
    "42.29"
  ],
  "通辽市": [
    "122.26",
    "43.62"
  ],
  "本溪市": [
    "123.77",
    "41.3"
  ],
  "德阳市": [
    "104.4",
    "31.13"
  ],
  "黄冈市": [
    "114.88",
    "30.45"
  ],
  "三沙市": [
    "112.35",
    "16.83"
  ],
  "滨州市": [
    "118.02",
    "37.38"
  ],
  "通化市": [
    "125.94",
    "41.72"
  ],
  "天门市": [
    "113.17",
    "30.65"
  ],
  "哈密地区": [
    "93.51",
    "42.83"
  ],
  "抚顺市": [
    "123.92",
    "41.88"
  ],
  "琼海市": [
    "110.47",
    "19.25"
  ],
  "赤峰市": [
    "118.96",
    "42.28"
  ],
  "泰州市": [
    "119.92",
    "32.48"
  ],
  "常州市": [
    "119.95",
    "31.77"
  ],
  "红河哈尼族彝族自治州": [
    "103.38",
    "23.37"
  ],
  "萍乡市": [
    "113.85",
    "27.62"
  ],
  "保山市": [
    "99.17",
    "25.11"
  ],
  "佛山市": [
    "113.12",
    "23.03"
  ],
  "南宁市": [
    "108.32",
    "22.82"
  ],
  "孝感市": [
    "113.93",
    "30.93"
  ],
  "昭通市": [
    "103.72",
    "27.34"
  ],
  "澎湖县": [
    "121.51",
    "25.04"
  ],
  "北海市": [
    "109.12",
    "21.47"
  ],
  "宜兰县": [
    "121.51",
    "25.04"
  ],
  "唐山市": [
    "118.18",
    "39.64"
  ],
  "阳泉市": [
    "113.58",
    "37.86"
  ],
  "文山壮族苗族自治州": [
    "104.24",
    "23.37"
  ],
  "新界": [
    "114.17",
    "22.32"
  ],
  "云浮市": [
    "112.04",
    "22.93"
  ],
  "自贡市": [
    "104.77",
    "29.35"
  ],
  "九江市": [
    "115.99",
    "29.71"
  ],
  "凉山彝族自治州": [
    "102.26",
    "27.89"
  ],
  "吐鲁番地区": [
    "89.18",
    "42.95"
  ],
  "杭州市": [
    "120.15",
    "30.29"
  ],
  "淮北市": [
    "116.79",
    "33.97"
  ],
  "周口市": [
    "114.65",
    "33.62"
  ],
  "怒江傈僳族自治州": [
    "98.85",
    "25.85"
  ],
  "来宾市": [
    "109.23",
    "23.73"
  ],
  "潍坊市": [
    "119.11",
    "36.71"
  ],
  "龙岩市": [
    "117.03",
    "25.09"
  ],
  "眉山市": [
    "103.83",
    "30.05"
  ],
  "锦州市": [
    "121.14",
    "41.12"
  ],
  "丽江市": [
    "100.23",
    "26.87"
  ],
  "惠州市": [
    "114.41",
    "23.08"
  ],
  "太原市": [
    "112.55",
    "37.86"
  ],
  "连江县": [
    "121.51",
    "25.04"
  ],
  "咸阳市": [
    "108.71",
    "34.33"
  ],
  "鞍山市": [
    "123",
    "41.11"
  ],
  "黄南藏族自治州": [
    "102.02",
    "35.52"
  ],
  "宁波市": [
    "121.55",
    "29.87"
  ],
  "图木舒克市": [
    "79.08",
    "39.87"
  ],
  "甘孜藏族自治州": [
    "101.96",
    "30.05"
  ],
  "济宁市": [
    "116.59",
    "35.42"
  ],
  "衢州市": [
    "118.87",
    "28.94"
  ],
  "渭南市": [
    "109.5",
    "34.5"
  ],
  "驻马店市": [
    "114.02",
    "32.98"
  ],
  "兴安盟": [
    "122.07",
    "46.08"
  ],
  "青岛市": [
    "120.36",
    "36.08"
  ],
  "运城市": [
    "111",
    "35.02"
  ],
  "池州市": [
    "117.49",
    "30.66"
  ],
  "张家界市": [
    "110.48",
    "29.13"
  ],
  "香港岛": [
    "114.17",
    "22.32"
  ],
  "嘉义市": [
    "121.51",
    "25.04"
  ],
  "郴州市": [
    "113.03",
    "25.79"
  ],
  "连云港市": [
    "119.18",
    "34.6"
  ],
  "七台河市": [
    "131.02",
    "45.77"
  ],
  "达州市": [
    "107.5",
    "31.21"
  ],
  "徐州市": [
    "117.18",
    "34.26"
  ],
  "绵阳市": [
    "104.74",
    "31.46"
  ],
  "阿拉善盟": [
    "105.71",
    "38.84"
  ],
  "厦门市": [
    "118.11",
    "24.49"
  ],
  "安阳市": [
    "114.35",
    "36.1"
  ],
  "乌鲁木齐市": [
    "87.62",
    "43.79"
  ],
  "安康市": [
    "109.03",
    "32.69"
  ],
  "五家渠市": [
    "87.53",
    "44.17"
  ],
  "邢台市": [
    "114.51",
    "37.07"
  ],
  "遵义市": [
    "106.94",
    "27.71"
  ],
  "果洛藏族自治州": [
    "100.24",
    "34.47"
  ],
  "扬州市": [
    "119.42",
    "32.39"
  ],
  "嘉峪关市": [
    "98.28",
    "39.79"
  ],
  "庆阳市": [
    "107.64",
    "35.73"
  ],
  "南昌市": [
    "115.89",
    "28.68"
  ],
  "铜陵市": [
    "117.82",
    "30.93"
  ],
  "牡丹江市": [
    "129.62",
    "44.58"
  ],
  "鄂州市": [
    "114.89",
    "30.4"
  ],
  "曲靖市": [
    "103.8",
    "25.5"
  ],
  "陵水黎族自治县": [
    "110.04",
    "18.51"
  ],
  "娄底市": [
    "112.01",
    "27.73"
  ],
  "离岛": [
    "113.55",
    "22.2"
  ],
  "新竹市": [
    "121.51",
    "25.04"
  ],
  "六盘水市": [
    "104.85",
    "26.58"
  ],
  "吉林市": [
    "126.55",
    "43.84"
  ],
  "临沧市": [
    "100.09",
    "23.89"
  ],
  "金门县": [
    "121.51",
    "25.04"
  ],
  "郑州市": [
    "113.67",
    "34.76"
  ],
  "淮南市": [
    "117.02",
    "32.65"
  ],
  "平凉市": [
    "106.68",
    "35.54"
  ],
  "衡水市": [
    "115.67",
    "37.74"
  ],
  "平顶山市": [
    "113.31",
    "33.74"
  ],
  "马鞍山市": [
    "118.51",
    "31.69"
  ],
  "温州市": [
    "120.67",
    "28"
  ],
  "苗栗县": [
    "121.51",
    "25.04"
  ],
  "天水市": [
    "105.72",
    "34.58"
  ],
  "西宁市": [
    "101.78",
    "36.62"
  ],
  "丹东市": [
    "124.38",
    "40.12"
  ],
  "丽水市": [
    "119.92",
    "28.45"
  ],
  "潮州市": [
    "116.63",
    "23.66"
  ],
  "抚州市": [
    "116.36",
    "27.98"
  ],
  "恩施土家族苗族自治州": [
    "109.49",
    "30.28"
  ],
  "楚雄彝族自治州": [
    "101.55",
    "25.04"
  ],
  "屯昌县": [
    "110.1",
    "19.36"
  ],
  "柳州市": [
    "109.41",
    "24.31"
  ],
  "宿州市": [
    "116.98",
    "33.63"
  ],
  "阿克苏地区": [
    "80.27",
    "41.17"
  ],
  "石家庄市": [
    "114.5",
    "38.05"
  ],
  "珠海市": [
    "113.55",
    "22.22"
  ],
  "南阳市": [
    "112.54",
    "33"
  ],
  "台州市": [
    "121.43",
    "28.66"
  ],
  "承德市": [
    "117.94",
    "40.98"
  ],
  "哈尔滨市": [
    "126.64",
    "45.76"
  ],
  "鄂尔多斯市": [
    "109.99",
    "39.82"
  ],
  "赣州市": [
    "114.94",
    "25.85"
  ],
  "海西蒙古族藏族自治州": [
    "97.37",
    "37.37"
  ],
  "佳木斯市": [
    "130.36",
    "46.81"
  ],
  "漯河市": [
    "114.03",
    "33.58"
  ],
  "广元市": [
    "105.83",
    "32.43"
  ],
  "昌都地区": [
    "97.18",
    "31.14"
  ],
  "绥化市": [
    "126.99",
    "46.64"
  ],
  "海东市": [
    "102.1",
    "36.5"
  ],
  "梅州市": [
    "116.12",
    "24.3"
  ],
  "高雄市": [
    "121.51",
    "25.04"
  ],
  "南平市": [
    "118.18",
    "26.64"
  ],
  "白银市": [
    "104.17",
    "36.55"
  ],
  "邯郸市": [
    "114.49",
    "36.61"
  ],
  "景德镇市": [
    "117.21",
    "29.29"
  ],
  "巴音郭楞蒙古自治州": [
    "86.15",
    "41.77"
  ],
  "澄迈县": [
    "110.01",
    "19.74"
  ],
  "山南地区": [
    "91.77",
    "29.24"
  ],
  "汉中市": [
    "107.03",
    "33.08"
  ],
  "拉萨市": [
    "91.13",
    "29.66"
  ],
  "呼和浩特市": [
    "111.67",
    "40.82"
  ],
  "济源市": [
    "112.59",
    "35.09"
  ],
  "肇庆市": [
    "112.47",
    "23.05"
  ],
  "新北市": [
    "121.51",
    "25.04"
  ],
  "晋城市": [
    "112.85",
    "35.5"
  ],
  "白城市": [
    "122.84",
    "45.62"
  ],
  "大庆市": [
    "125.11",
    "46.59"
  ],
  "乐东黎族自治县": [
    "109.18",
    "18.75"
  ],
  "济南市": [
    "117",
    "36.68"
  ],
  "新余市": [
    "114.93",
    "27.81"
  ],
  "巴中市": [
    "106.75",
    "31.86"
  ],
  "苏州市": [
    "120.62",
    "31.3"
  ],
  "铜仁市": [
    "109.19",
    "27.72"
  ],
  "神农架林区": [
    "114.3",
    "30.58"
  ],
  "宿迁市": [
    "118.28",
    "33.96"
  ],
  "淄博市": [
    "118.05",
    "36.81"
  ],
  "盐城市": [
    "120.14",
    "33.38"
  ],
  "阜阳市": [
    "115.82",
    "32.9"
  ],
  "黔南布依族苗族自治州": [
    "107.52",
    "26.26"
  ],
  "昌吉回族自治州": [
    "87.3",
    "44.01"
  ],
  "防城港市": [
    "108.35",
    "21.61"
  ],
  "定安县": [
    "110.35",
    "19.68"
  ],
  "嘉义县": [
    "121.51",
    "25.04"
  ],
  "儋州市": [
    "109.58",
    "19.52"
  ],
  "甘南藏族自治州": [
    "102.91",
    "34.99"
  ],
  "荆门市": [
    "112.2",
    "31.04"
  ],
  "和田地区": [
    "79.93",
    "37.11"
  ],
  "韶关市": [
    "113.59",
    "24.8"
  ],
  "白山市": [
    "126.43",
    "41.94"
  ],
  "双鸭山市": [
    "131.16",
    "46.64"
  ],
  "黄山市": [
    "118.32",
    "29.71"
  ],
  "玉林市": [
    "110.15",
    "22.63"
  ],
  "濮阳市": [
    "115.04",
    "35.77"
  ],
  "阜新市": [
    "121.65",
    "42.01"
  ],
  "南京市": [
    "118.77",
    "32.04"
  ],
  "乐山市": [
    "103.76",
    "29.58"
  ],
  "广安市": [
    "106.63",
    "30.46"
  ],
  "镇江市": [
    "119.45",
    "32.2"
  ],
  "成都市": [
    "104.07",
    "30.66"
  ],
  "三门峡市": [
    "111.19",
    "34.78"
  ],
  "呼伦贝尔市": [
    "119.76",
    "49.22"
  ],
  "深圳市": [
    "114.09",
    "22.55"
  ],
  "临汾市": [
    "111.52",
    "36.08"
  ],
  "岳阳市": [
    "113.13",
    "29.37"
  ],
  "揭阳市": [
    "116.36",
    "23.54"
  ],
  "西安市": [
    "108.95",
    "34.26"
  ],
  "大理白族自治州": [
    "100.23",
    "25.59"
  ],
  "喀什地区": [
    "75.99",
    "39.47"
  ],
  "四平市": [
    "124.37",
    "43.17"
  ],
  "梧州市": [
    "111.3",
    "23.47"
  ],
  "三亚市": [
    "109.51",
    "18.25"
  ],
  "雅安市": [
    "103",
    "29.99"
  ],
  "锡林郭勒盟": [
    "116.09",
    "43.94"
  ],
  "琼中黎族苗族自治县": [
    "109.84",
    "19.04"
  ],
  "沧州市": [
    "116.86",
    "38.31"
  ],
  "北京市": [
    "116.4",
    "39.91"
  ],
  "巴彦淖尔市": [
    "107.42",
    "40.76"
  ],
  "无锡市": [
    "120.3",
    "31.57"
  ],
  "枣庄市": [
    "117.56",
    "34.86"
  ],
  "保定市": [
    "115.48",
    "38.87"
  ],
  "宜昌市": [
    "111.29",
    "30.7"
  ],
  "克拉玛依市": [
    "84.87",
    "45.6"
  ],
  "泸州市": [
    "105.44",
    "28.89"
  ],
  "白沙黎族自治县": [
    "109.45",
    "19.22"
  ],
  "黔东南苗族侗族自治州": [
    "107.98",
    "26.58"
  ],
  "安顺市": [
    "105.93",
    "26.25"
  ],
  "林芝地区": [
    "94.36",
    "29.65"
  ],
  "绍兴市": [
    "120.58",
    "30"
  ],
  "齐齐哈尔市": [
    "123.96",
    "47.34"
  ],
  "大同市": [
    "113.3",
    "40.09"
  ],
  "海南藏族自治州": [
    "100.62",
    "36.28"
  ],
  "乌海市": [
    "106.83",
    "39.67"
  ],
  "葫芦岛市": [
    "120.86",
    "40.76"
  ],
  "仙桃市": [
    "113.45",
    "30.36"
  ],
  "十堰市": [
    "110.79",
    "32.65"
  ],
  "阿拉尔市": [
    "81.29",
    "40.54"
  ],
  "西双版纳傣族自治州": [
    "100.8",
    "22"
  ],
  "海口市": [
    "110.33",
    "20.03"
  ],
  "邵阳市": [
    "111.47",
    "27.24"
  ],
  "黔西南布依族苗族自治州": [
    "104.9",
    "25.09"
  ],
  "朝阳市": [
    "120.45",
    "41.58"
  ],
  "武威市": [
    "102.63",
    "37.93"
  ],
  "嘉兴市": [
    "120.75",
    "30.76"
  ],
  "铜川市": [
    "108.98",
    "34.92"
  ],
  "盘锦市": [
    "122.07",
    "41.12"
  ],
  "彰化县": [
    "121.51",
    "25.04"
  ],
  "莱芜市": [
    "117.68",
    "36.21"
  ],
  "益阳市": [
    "112.36",
    "28.57"
  ],
  "蚌埠市": [
    "117.36",
    "32.94"
  ],
  "日照市": [
    "119.46",
    "35.43"
  ],
  "淮安市": [
    "119.02",
    "33.6"
  ],
  "中山市": [
    "113.38",
    "22.52"
  ],
  "攀枝花市": [
    "101.72",
    "26.58"
  ],
  "昆明市": [
    "102.71",
    "25.04"
  ],
  "东方市": [
    "108.65",
    "19.1"
  ],
  "宣城市": [
    "118.76",
    "30.95"
  ],
  "那曲地区": [
    "92.06",
    "31.48"
  ],
  "贵港市": [
    "109.6",
    "23.09"
  ],
  "南充市": [
    "106.08",
    "30.8"
  ],
  "永州市": [
    "111.61",
    "26.43"
  ],
  "汕头市": [
    "116.71",
    "23.37"
  ],
  "宜宾市": [
    "104.63",
    "28.76"
  ],
  "清远市": [
    "113.05",
    "23.69"
  ],
  "辽源市": [
    "125.15",
    "42.9"
  ],
  "临沂市": [
    "118.33",
    "35.07"
  ],
  "石嘴山市": [
    "106.38",
    "39.01"
  ],
  "上海市": [
    "121.47",
    "31.24"
  ],
  "泉州市": [
    "118.59",
    "24.91"
  ],
  "玉树藏族自治州": [
    "97.01",
    "33"
  ],
  "中卫市": [
    "105.19",
    "37.51"
  ],
  "广州市": [
    "113.28",
    "23.13"
  ],
  "滁州市": [
    "118.32",
    "32.3"
  ],
  "松原市": [
    "124.82",
    "45.12"
  ],
  "万宁市": [
    "110.39",
    "18.8"
  ],
  "上饶市": [
    "117.97",
    "28.44"
  ],
  "茂名市": [
    "110.92",
    "21.66"
  ],
  "舟山市": [
    "122.11",
    "30.02"
  ],
  "固原市": [
    "106.29",
    "36"
  ],
  "芜湖市": [
    "118.38",
    "31.33"
  ],
  "鹤岗市": [
    "130.28",
    "47.33"
  ],
  "毕节市": [
    "105.29",
    "27.3"
  ],
  "南通市": [
    "120.86",
    "32.02"
  ],
  "石河子市": [
    "86.04",
    "44.31"
  ],
  "商丘市": [
    "115.65",
    "34.44"
  ],
  "漳州市": [
    "117.66",
    "24.51"
  ]

};
export function convertData(data, istrue) {

  if (typeof(istrue) != 'undefined') {
    let res = [];
    for (let i = 0; i < data.length; i++) {
      let dataItem = data[i];
      let fromCoord = geoCoordMap[dataItem[0].name];
      let toCoord = geoCoordMap[dataItem[1].name];
      if (fromCoord && toCoord) {
        if (istrue) {
          res.push({
            fromName: dataItem[0].name,
            toName: dataItem[1].name,
            coords: [fromCoord, toCoord],
            value: dataItem[1].value
          });
        } else {
          res.push({
            fromName: dataItem[0].name,
            toName: dataItem[1].name,
            coords: [toCoord, fromCoord],
            value: dataItem[1].value
          });
        }

      }
    }
    return res;
  }

};


export const datazoom = [{
  "show": true,
  "height": 10,
  "xAxisIndex": [0],

  left: '60',
  right: '60',
  bottom: 0,
  backgroundColor: 'rgba(3, 114, 177, .6)',
  dataBackground: {
    areaStyle: {
      color: 'rgba(3, 114, 177, .7)'
    },
    lineStyle: {
      opacity: 0.8,
      color: '#8392A5'
    }
  },
  fillerColor: '#063052',
  borderColor: '#276b9f',
  "start": 0,
  "end": 100,
  handleIcon: 'path://M306.1,413c0,2.2-1.8,4-4,4h-59.8c-2.2,0-4-1.8-4-4V200.8c0-2.2,1.8-4,4-4h59.8c2.2,0,4,1.8,4,4V413z',
  handleSize: '110%',
  handleStyle: {
    color: '#00ADFA',
    shadowBlur: 0,
    shadowColor: 'rgba(255, 0, 0, 1)',
    shadowOffsetX: 0,
    shadowOffsetY: 0
  },
  textStyle: {
    color: "#11caff",
    fontSize: '12'
  },
  borderColor: "#3458B4"
}, {
  "type": "inside",
  "show": true,
  "height": 15,
  "start": 1,
  "end": 35
}]


export function getArrayMax(arr) {
  let newArr = [];
  arr.forEach((v, i) => {
    newArr.push(parseInt(v))
  })
  if (Object.keys(newArr).length)
    return Math.max.apply(null, newArr)
  else
    return false
}

export function getArrayMin(arr) {
  let newArr = [];
  arr.forEach((v, i) => {
    newArr.push(parseInt(v))
  })
  if (Object.keys(newArr).length)
    return Math.min.apply(null, newArr)
  else
    return false
}


export function handleTimeData(data, type) {
  let res = '';
  let arr = []
  if (type === 'year') {
    let startYear = data.substring(0, 4);
    let endYear = data.substring(5);
    for (let i = startYear; i <= endYear; i++) {
      arr.push(i)
    }
    res = arr.join(',')
  } else if (type === 'month') {
    for (let i = 1; i <= 12; i++) {
      //console.log(i.toString().length)
      if (i.toString().length !== 2) {
        i = '0' + i;
      }
      arr.push(data + i.toString())
    }
    res = arr.join(',')

  } else if (type === 'week') {
    // 2017.8-2017.10

    let res = []
    // 首先 将 2014.1 - 2015.12 这种分割成 ['2014.1','2015.12']这种数组
    let twoArr = data.split('-')
    twoArr.forEach((v, i, a) => {
      //v  就是 2014.1   2015.12
      //oneArr 就是  ['2014',1]  ['2015','12']
      let oneArr = v.split('.')
      res.push(oneArr) //二维数组 [['2014',1],['2015','12']]
    })
    let startYear = parseInt(res[0][0]);
    let startMonth = parseInt(res[0][1]);
    let endYear = parseInt(res[1][0]);
    let endMonth = parseInt(res[1][1]);

    let result = [];

    let contYear = parseInt(endYear) - parseInt(startYear);
    //如果开始年和结束年是同一年
    if (contYear === 0) {
      // debugger
      for (let i = startMonth; i <= endMonth; i++) {
        if (i.toString().length !== 2) {
          i = '0' + i.toString();
        }
        result.push(startYear.toString() + i)
      }
    }
    //如果开始年和结束年不是同一年
    if (contYear > 0) {
      //先塞入开始年1-12月
      for (let i = startMonth; i <= 12; i++) {
        if (i.toString().length !== 2) {
          i = '0' + i.toString();
        }
        result.push(startYear.toString() + i)
      }

      //再塞入开始年之后一年 到 结束年之前一年的 之间的所有年份的1-12月
      for (let i = startYear + 1; i < endYear; i++) {
        for (let j = 1; j <= 12; j++) {
          if (j.toString().length !== 2) {
            j = '0' + j.toString();
          }
          result.push(i.toString() + j)
        }
      }

      //最后塞入  最后一年的 1月到 12月
      for (let i = 1; i <= endMonth; i++) {
        if (i.toString().length !== 2) {
          i = '0' + i.toString();
        }
        result.push(endYear.toString() + i)
      }
    }
    return result.join(',')
    // let arr = data.split('-')

  } else if (type === 'day') {
    res = data.split('.'); //[2017,8]
    if (res[1].length !== 2) {
      res[1] = '0' + res[1]
    }
    res = res.join('')
  }

  return res
}

/**
 * 处理时间格式
 * @param  {Array} times 传入的时间参数，如 ['201201', '201202', '201203']
 * @param  {String} type  默认可以不传，只在年的时候 传 'year' 其实年的时候未做处理，可以直接用的
 * @return {Array}       返回数据格式为： ['2012-01', '2012-02', '2012-03']
 */
export function handleTime(times, type) {
  let timesArr = times.slice(0)
  if (type === 'year') {
    return timesArr
  }
  timesArr.forEach((item, index) => {
    let a = timesArr[index].substr(0, 4)
    let b = timesArr[index].slice(4)
    timesArr[index] = `${a}-${b}`
  })
  return timesArr
}

/**
 * 颠倒对象 的 key value。成为 value:key
 * @param  {Object} obj 传入进的对象
 * @return {Object}     颠倒后的对象
 */
export function reverseObj(obj) {
  let newObj = {}
  for (let key in obj) {
    let temp = obj[key]
    newObj[temp] = key
  }
  return newObj
}

export function distinct(arr) {
  var obj = {},
    i = 0,
    len = 0;
  if (Array.isArray(arr) && arr.length > 0) {
    len = arr.length;
    for (i = 0; i < len; i += 1) {
      obj[arr[i]] = arr[i];
    }
    return Object.keys(obj);
  }
  return [];
}

export function descTime(time) {
  let flag = time.length === 4 ? true : false
  if (flag) {
    return `${time}年`
  } else {
    return `${time.slice(0, 4)}年${time.slice(4)}月`
  }
}
