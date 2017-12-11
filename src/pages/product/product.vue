<template>

  <div class="product-wrapper">
    <leftBar></leftBar>
    <div class="cont">

      <div class="procuct-title-info">


        <h2>{{btnIndexCountry ? '全球苹果' : '全国苹果优势'}}产区分布</h2>


      </div>

      <p class="btnwrapper">
        <selectBtn :btnIndex.sync='btnIndexCountry' :btnData="btnData" @changeBtn="changeBtn"></selectBtn>

        <selectBtn :btnIndex.sync='btnIndexRankingCache' :btnData="btnDataRanking"
                   @changeBtn="changeBtnRanking"></selectBtn>

        <explain :eText="eText"></explain>
      </p>

      <div class="map-echarts-wrapper">

        <div class="map">
          <!--地图标题-->
          <div class="map-title">
            <p>{{subTitle.year}}年{{btnIndexCountry ? '全球' : '全国'}}苹果{{btnIndexRanking ? '产量' : '种植面积'}}<span
              style="color: #00af67">{{subTitle.value}}</span>{{btnIndexRanking ? '万吨' : '万亩'}}</p>
          </div>

          <div class="toggle-map-wrapper map-china" v-if="showChina">
            <!--中国地图visualMap-->
            <ul class="visual-map">
              <li v-for="(item, index) in visualMap" :class="{unchecked: item.active}"
                  @click="_toggle(item.data, index)">
                <span>{{item.data[1] ? (item.data[0] + '-' + item.data[1]) : '>' + item.data[0]}}</span></li>
            </ul>

            <!--中国地图组件-->
            <mapChina ref="mapchina" :echartsData="echartsDataChina" :mapColor="mapColor"
                      @showInfo="showInfo"></mapChina>

          </div>

          <!--世界地图组件-->
          <div class="toggle-map-wrapper map-world" v-if="showWorld">
            <mapWorld :echartsData="echartsDataWorld"></mapWorld>
          </div>

          <!--时间轴组件-->
          <div class="timeScroll-wrapper">
            <timeScroll :scorllOption="scorllOption" @scorllTime="_scorllTime"></timeScroll>
          </div>

          <!--排名-->
          <div class="rank-echarts-wrapper">
            <!--<p class="rank-btn">
              <selectBtn :btnIndex.sync='btnIndexRankingCache' :btnData="btnDataRanking"
                         @changeBtn="changeBtnRanking"></selectBtn>
            </p>-->
            <div class="rank-title">{{rankingTitle}}</div>
            <ranking :echartsData="rankingEchart" v-if="rankingEchartToggle"
                     @tipHighLight="tipHighLight"></ranking>
            <div class="show-button" :class="{'active':isHide}">
              <i class="iconfont icon-xiangxia" @click="hideRankecharts"></i>
            </div>
          </div>

        </div>
        <!--<div class="map" v-if="showChina">
          &lt;!&ndash;中国地图标题&ndash;&gt;
          <div class="map-title">
            <p>{{subTitleC.year}}年全国苹果{{subTitleC.type}} <span style="color: #00af67">{{subTitleC.value}}</span>{{btnIndexChina?'万吨':'万亩'}}</p>
          </div>
          &lt;!&ndash;中国地图visualMap&ndash;&gt;
          <ul class="visual-map">
            <li v-for="(item, index) in visualMap" :class="{unchecked: item.active}"
                @click="_toggle(item.data, index)"><span>{{item.data[0]}}-{{item.data[1]}}</span></li>
          </ul>
          &lt;!&ndash;中国地图组件&ndash;&gt;
          <mapChina ref="mapchina" :echartsData="echartsDataChina" @showInfo="showInfo"></mapChina>
          &lt;!&ndash;时间轴组件&ndash;&gt;
          <div class="timeScroll-wrapper">
            <timeScroll :scorllOption="scorllOptionC" @scorllTime="_scorllTimeC"></timeScroll>
          </div>

          <div class="rank-echarts-wrapper">
            <p class="rank-btn">
              <selectBtn :btnIndex.sync='btnIndexChina' :btnData="btnDataRanking"
                         @changeBtn="changeBtnChina"></selectBtn>
            </p>
            <div class="rank-title">{{rankingTitle}}</div>
            <ranking :echartsData="rankingEchartChina" v-if="rankingEchartToggle"
                     @tipHighLight="tipHighLight"></ranking>
            <div class="show-button" :class="{'active':isHide}">
              <i class="iconfont icon-xiangxia" @click="hideRankecharts"></i>
            </div>
          </div>

        </div>-->

        <!--<div class="map" v-if="showWorld">
          <div class="map-title">
            <p>{{subTitleW.year}}年全球苹果{{subTitleW.type}}<span style="color: #00af67">{{subTitleW.value}}</span>{{btnIndexWorld?'万吨':'万亩'}}</p>
          </div>
          <mapWorld :echartsData="echartsDataWorld"></mapWorld>
          &lt;!&ndash;事件轴组件&ndash;&gt;
          <div class="timeScroll-wrapper">
            <timeScroll :scorllOption="scorllOptionW" @scorllTime="_scorllTimeW"></timeScroll>
          </div>

          <div class="rank-echarts-wrapper">
            <p class="rank-btn">
              <selectBtn :btnIndex.sync='btnIndexWorld' :btnData="btnDataRanking"
                         @changeBtn="changeBtnWorld"></selectBtn>
            </p>
            <div class="rank-title">{{rankingTitleW}}</div>
            <ranking :echartsData="rankingEchartWorld" v-if="rankingEchartToggleWorld"></ranking>
            <div class="show-button" :class="{'active':isHideWorld}">
              <i class="iconfont icon-xiangxia" @click="hideRankechartsWorld"></i>
            </div>
          </div>
        </div>-->

      </div>


      <div class="small-window-wrapper">
        <smallWindow class="window1"
                     :isShow="window1"
                     whichWindow="window1"
                     @closeWindow="closeWindow"
                     @openBigWindow="openBigWindow"
                     title="全国苹果种植面积变化趋势">
          <productHisSmall ref="small1"></productHisSmall>
        </smallWindow>

        <!--<smallWindow class="window2" @closeWindow="closeWindow" :isShow="window2"  whichWindow="window2" title="全国苹果园占果园种植面积比重走势" @openBigWindow="openBigWindow">
          <productAreaSmall ref="small2"></productAreaSmall>
        </smallWindow>-->

        <smallWindow class="window2" @closeWindow="closeWindow" :isShow="window2" whichWindow="window2"
                     title="全国苹果种植面积增减幅排名" @openBigWindow="openBigWindow">
          <productRisefallSmall></productRisefallSmall>
        </smallWindow>

        <smallWindow class="window3" @closeWindow="closeWindow" :isShow="window3" whichWindow="window3" title="气象灾害监测"
                     @openBigWindow="openBigWindow">
          <productDisasterSmall></productDisasterSmall>
        </smallWindow>
        <smallWindow class="window4" @closeWindow="closeWindow" :isShow="window4" whichWindow="window4" title="单产预测"
                     @openBigWindow="openBigWindow">
          <productYeildSmall ref="small5"></productYeildSmall>
        </smallWindow>
        <smallWindow class="window1" @closeWindow="closeWindow" :isShow="window5" whichWindow="window5"
                     title="全球苹果种植面积变化趋势" @openBigWindow="openBigWindow">
          <productWorldTrendSmall></productWorldTrendSmall>
        </smallWindow>
        <!--<smallWindow class="window2" @closeWindow="closeWindow" :isShow="window6"  whichWindow="window6" title="全球苹果园占果园种植面积比重走势" @openBigWindow="openBigWindow">
          <productWorldAreaSmall></productWorldAreaSmall>
        </smallWindow>-->
        <smallWindow class="window2" @closeWindow="closeWindow" :isShow="window6" whichWindow="window6"
                     title="全球苹果种植面积增减幅排名" @openBigWindow="openBigWindow">
          <productWorldRisefallSmall></productWorldRisefallSmall>
        </smallWindow>
      </div>
    </div>
    <div class="right-bar-wrapper">
      <ul v-if="showChina">
        <li :class="{'active':active1}" @click="showSmall('window1')"><i class="iconfont icon-lishi"></i></li>
        <li :class="{'active':active2}" @click="showSmall('window2')"><i class="iconfont icon-tongji1"></i></li>
        <li :class="{'active':active3}" @click="showSmall('window3')"><i class="iconfont icon-tianqi"></i></li>
        <li :class="{'active':active4}" @click="showSmall('window4')"><i class="iconfont icon-xiaoliang"></i></li>
      </ul>
      <ul v-if="showWorld">
        <li :class="{'active':active5}" @click="showSmall('window5')"><i class="iconfont icon-lishi"></i></li>
        <!--<li :class="{'active':active6}" @click="showSmall('window6')"><i class="iconfont icon-line-chart"></i></li>-->
        <li :class="{'active':active6}" @click="showSmall('window6')"><i class="iconfont icon-tongji1"></i></li>
      </ul>
    </div>
    <bigWindow title="苹果生产及占水果比重走势" :isShow="bigwindow1" whichWindow="bigwindow1" @closeWindow="closeWindow"
               @closeBigWindow="closeBigWindow">
      <productHis ref="big1"></productHis>
    </bigWindow>
    <!--<bigWindow title="全国苹果占水果比重走势" :isShow="bigwindow2"  whichWindow="bigwindow2" @closeWindow="closeWindow" @closeBigWindow="closeBigWindow">
      <productArea ref="big2"></productArea>
    </bigWindow>-->
    <bigWindow title="" :isShow="bigwindow2" whichWindow="bigwindow2" @closeWindow="closeWindow"
               @closeBigWindow="closeBigWindow">
      <productRisefall></productRisefall>
    </bigWindow>
    <bigWindow title="" :isShow="bigwindow3" whichWindow="bigwindow3" @closeWindow="closeWindow"
               @closeBigWindow="closeBigWindow">

      <!---->
      <productDisaster></productDisaster>
    </bigWindow>
    <bigWindow title="单产预测" :isShow="bigwindow4" whichWindow="bigwindow4" @closeWindow="closeWindow"
               @closeBigWindow="closeBigWindow">
      <productYeild></productYeild>
    </bigWindow>
    <bigWindow title="苹果生产及占水果比重走势" :isShow="bigwindow5" whichWindow="bigwindow5" @closeWindow="closeWindow"
               @closeBigWindow="closeBigWindow">
      <productWorldTrend></productWorldTrend>
    </bigWindow>
    <!--<bigWindow title="全球苹果占水果比重走势" :isShow="bigwindow6"  whichWindow="bigwindow6" @closeWindow="closeWindow" @closeBigWindow="closeBigWindow">
      <productWorldArea></productWorldArea>
    </bigWindow>-->
    <bigWindow title="" :isShow="bigwindow6" whichWindow="bigwindow6" @closeWindow="closeWindow"
               @closeBigWindow="closeBigWindow">
      <productWorldRisefall></productWorldRisefall>
    </bigWindow>

    <!--弹出层地图-->
    <bigWindow title="" :isShow="bigwindow7" whichWindow="bigwindow7" @closeWindow="closeWindow"
               @closeBigWindow="closeBigWindow">
      <productMapTrend :popAreaInfo="popAreaInfo"></productMapTrend>
    </bigWindow>

  </div>

</template>

<script>
  import productHisSmall from 'pages/product/product-historical-evolution-small';
  import productHis from 'pages/product/product-historical-evolution';
  //  import productAreaSmall from 'pages/product/product-area-proportion-small';
  //  import productArea from 'pages/product/product-area-proportion';
  import productRisefallSmall from 'pages/product/product-risefall-ranking-small';
  import productRisefall from 'pages/product/product-risefall-ranking';
  import productYeildSmall from 'pages/product/product-yeild-forecast-small';
  import productYeild from 'pages/product/product-yeild-forecast';
  import productMapTrend from 'pages/product/product-map-trend';

  import productWorldTrendSmall from 'pages/product/product-world-plant-trend-small';
  import productWorldTrend from 'pages/product/product-world-plant-trend';
  import productWorldRisefallSmall from 'pages/product/product-world-risefall-ranking-small';
  import productWorldRisefall from 'pages/product/product-world-risefall-ranking';
  //  import productWorldAreaSmall from 'pages/product/product-world-area-proportion-small';
  //  import productWorldArea from 'pages/product/product-world-area-proportion';
  import productDisasterSmall from 'pages/product/product-disaster-small';
  import productDisaster from 'pages/product/product-disaster';

  import mapChina from './echarts/product-map-china'
  import mapWorld from 'pages/product/echarts/product-map-world'

  import ranking from 'pages/product/echarts/product-ranking';
  import rankingEchart from 'pages/flow/echarts/flow-ranking.vue'
  import selectBtn from 'components/selectBtn/selectBtn'
  import explain from 'components/explain/explain'
  import timeScroll from 'components/timeScroll/timeScroll'

  import {rightBarMixin, resizeMixin} from 'assets/js/common.js'

  export default {
    mixins: [rightBarMixin, resizeMixin],
    name: 'product',
    data() {
      return {
        subTitle: {
          year: '2014',
          value: '3209'
        },

        // 国家按钮控制数据
        btnData: ['中国', '全球'],
        btnIndexCountry: 0,
        // 排名按钮控制数据
        btnDataRanking: ['种植面积', '产量'],
        btnIndexRanking: 0,
        btnIndexRankingCache: 0,
        // 种植面积和产量对应的查询参数
        btnType: ['121689', '112716'],
        // 文字说明
        textInfo: [`数据来源于农业部，起始于1982年，级别为县级。`, `数据来源于FAO，起始于1990年，级别为全球、各国。`],
        // 世界的文字说明
        // 排名小图标切换
        isHide: false,
        // china 和 world 切换
        showChina: true,
        showWorld: false,
        // 排名的开关
        rankingEchartToggle: false,

        // 中国地图的legend 分段数据
        visualMap: [{active: false, data: [150, 300]}, {active: false, data: [120, 149]}, {
          active: false,
          data: [90, 119]
        }, {active: false, data: [60, 89]}, {active: false, data: [30, 59]}, {active: false, data: [0, 29]}],
        // 和vaisualMap 的data一样，传入地图显示和legend对应的颜色
        mapColor: [],
        // 中国地图的数据
        echartsDataChina: {
          data: [],
        },
        // 世界地图的数据
        echartsDataWorld: {
          data: [],
          visualMapData: {
            min: 0,
            max: 0,
          },
        },
        // 排名的数据
        rankingEchart: {
          yAxisData: [],
          data: [],
        },

        popAreaInfo: [], //弹窗是携带回来的信息 ["黄陵县", "2012"]
        // 中国时间轴配置选项
        scorllOption: {
          width: '14rem',
          height: '35px',
          id: 'chinascorll',
          needDefault: true,
          //pos: '2013',
          url: 'apple/production/ChinaTime'
        },

        // 中国地图参数
        paramsC: {
          // 时间 2002
          time: '2007',
          // 数据类型 种植面积/产量/单产  default:121689
          type: '121689'
        },
        // 中国排名参数
        paramsCR: {
          // 时间 2002
          time: '2007',
          // 数据类型 种植面积/产量/单产  default:121689
          type: '121689'
        },
        // 全球地图参数
        paramsW: {
          // 时间 2002
          time: '2013',
          // 数据类型 种植面积/产量/单产  default: 121689 || 112716
          type: '121689'
        },
        // 全球排名参数
        paramsWR: {
          // 时间 2002
          time: '2013',
          // 数据类型 种植面积/产量/单产  default: 121689 || 112716
          type: '121689'
        },
      }
    },
    created() {

    },

    mounted(){

      this.$nextTick(() => {
        this.getDOMStyle()
        this.setRankingPos()
      })
    },

    computed: {
      // 计算弹窗 title 的名字
      popTittle: function () {
        return this.popAreaInfo[0] + '苹果生产历史演变及占水果的比重走势'
      },

      // 中国地图参数变化
      apiChinaParams() {
        return {
          TIME_ID: this.paramsC.time,
          type: this.btnType[this.btnIndexRanking]
        }
      },
      // 中国排名参数变化
      apiChinaParamsR() {
        return {
          TIME_ID: this.paramsCR.time,
          type: this.btnType[this.btnIndexRanking]
        }
      },

      // 世界地图参数变化
      apiWorldParams() {
        return {
          TIME_ID: this.paramsW.time,
          type: this.btnType[this.btnIndexRanking]
        }
      },
      // 世界排名参数变化
      apiWorldParamsR() {
        return {
          TIME_ID: this.paramsWR.time,
          type: this.btnType[this.btnIndexRanking]
        }
      },

      // 计算排名处的标题
      rankingTitle: {
        get: function () {
          let dw = ['万亩', '万吨']
          let county = ['全国', '全球']
          // 要'全国'，'全球'称就打开下面一行注释掉的
          // return `${county[this.btnIndexCountry]}${this.btnDataRanking[this.btnIndexRanking]}排名（${dw[this.btnIndexRanking]}）`
          return `${this.btnDataRanking[this.btnIndexRanking]}排名（${dw[this.btnIndexRanking]}）`
        },
        set: function (val) {
          // 奇了怪了，如果不设置setter会报错 版本问题 参见 state.js
          console.log(val)
        }
      },

      // 地图的文字信息
      eText() {
        return this.textInfo[this.btnIndexCountry]
      }

    },

    watch: {
      apiChinaParams(newVal) {
        if (newVal.TIME_ID && newVal.type && !this.btnIndexCountry) {
          this.getChinaChartData()
        }
      },

      apiChinaParamsR(newVal) {
        if (newVal.TIME_ID && newVal.type && !this.btnIndexCountry) {
          this.rankingBarChina()

        }
      },

      apiWorldParams(newVal) {
        if (newVal.TIME_ID && newVal.type && this.btnIndexCountry) {
          this.getWorldChartData()

        }
      },

      apiWorldParamsR(newVal) {
        if (newVal.TIME_ID && newVal.type && this.btnIndexCountry) {
          this.rankingBarWorld()
        }
      }
    },

    methods: {

      // 获取中国地图数据
      getChinaChartData() {
        this.$xhr.get('apple/production/ChineTheMap', {
          params: {
            ...this.apiChinaParams
          }
        }).then((res) => {
//          console.log(res)
          // 地图数据
          this.echartsDataChina.data = res.data.mapData
          // 标题需要展示的数据
          this.subTitle.value = res.data.titleInfo.toFixed(2)
          // 年份
          this.subTitle.year = res.data.titleTime

          if (!this.btnIndexRanking) {
            // legend 动态展现
            let v = this.getVisualMap(res.data.min, res.data.max)
            this.visualMap.forEach((item, index) => {
              item.data = v[index]
            })

            this.mapColor = this.getVisualMap(res.data.min, res.data.max)

          } else {
            let v = [[100,], [50, 100], [30, 50], [10, 30], [5, 10], [0, 5]]
            this.visualMap.forEach((item, index) => {
              item.data = v[index]
            })

            this.mapColor = v

          }


        }).catch((err) => {
          console.log(err)
        })
      },

      // 获取世界地图数据
      getWorldChartData() {
        this.$xhr.get('apple/production/AllTheMap', {
          params: {
            ...this.apiWorldParams
          }
        })
          .then((res) => {
            // 地图数据
            this.echartsDataWorld.data = res.data.data
            // 标题需要展示的数据
            this.subTitle.value = res.data.titleInfo.toFixed(2)
            // 年份
            this.subTitle.year = res.data.titleTime

            // 得到visualMap 的最大值和最小值
            this.echartsDataWorld.visualMapData.min = res.data.min
            this.echartsDataWorld.visualMapData.max = res.data.max

          })
          .catch((err) => {
            console.log(err)
          })
      },

      // 渲染中国的排名列表
      rankingBarChina(){
        // 请求后台数据
        this.$xhr.get(`/apple/production/ranking?t=${Date.now()}`, {
          params: {
            ...this.apiChinaParamsR
          }
        })
          .then((res) => {
            this.rankingEchart.data = res.data.data;
            this.rankingEchart.yAxisData = res.data.yAxisData
          })
          .catch((err) => {
            console.log(err)
          })
      },

      // 渲染世界的排名列表
      rankingBarWorld(){
        // get data from server
        this.$xhr.get(`/apple/production/Qranking`, {
          params: {
            ...this.apiWorldParamsR,
          }
        })
          .then((res) => {
            this.rankingEchart.data = res.data.data;
            this.rankingEchart.yAxisData = res.data.yAxisData
          })
          .catch((err) => {
            console.log(err)
          })
      },

      //切换全国和全球
      changeBtn(val){
        if (val === '中国' && !this.showChina) {
          this.showWorld = false;
          this.showChina = true;
          this.colseAll();
          // 设置新的时间轴
          this.scorllOption = {
            width: '14rem',
            height: '35px',
            id: 'chinascorll',
            needDefault: true,
            url: 'apple/production/ChinaTime'
          }
//          this.getChinaChartData()

        } else if (val === '全球' && !this.showWorld) {
          this.showChina = false;
          this.showWorld = true;
          this.colseAll();

          if (this.btnIndexRanking == 0) {
            this.scorllOption = {
              width: '14rem',
              height: '35px',
              id: 'chinascorll',
              needDefault: true,
              url: 'apple/production/AllMapTime?type=121689'
            }

          } else if (this.btnIndexRanking == 1) {

            this.scorllOption = {
              width: '14rem',
              height: '35px',
              id: 'chinascorll',
              needDefault: true,
              pos: '2014',
              url: 'apple/production/AllMapTime?type=112716'
            }
          }
//          this.getWorldChartData()
          // 重置中国地图的legend选中状态
          this.resetMapLegend()

        }
      },

      // 排名图表的 种植面积和产量切换
      changeBtnRanking(val) {
        if (this.btnIndexCountry == 0) {
          // 在中国的时候只有一条时间轴，不是用cache
          this.btnIndexRanking = this.btnIndexRankingCache

          if (val === '种植面积') {
            this.paramsC.type = '121689'
          } else if (val === '产量') {
            this.paramsC.type = '112716'
          }

          if (val === '种植面积' && this.rankingEchartToggle) {
            this.paramsC.type = '121689'
            this.paramsCR.type = '121689'
          } else if (val === '产量' && this.rankingEchartToggle) {
            this.paramsC.type = '112716'
            this.paramsCR.type = '112716'
          }
// 重置中国地图的legend选中状态
          this.resetMapLegend()
        } else if (this.btnIndexCountry == 1) {
          if (val === '种植面积') {
            this.paramsW.type = '121689'
            // 切换时间轴
            this.scorllOption = {
              width: '14rem',
              height: '35px',
              id: 'chinascorll',
              needDefault: true,
              // 种植面积
              url: 'apple/production/AllMapTime?type=121689'
            }
          } else if (val === '产量') {
            this.paramsW.type = '112716'
            // 切换时间轴
            this.scorllOption = {
              width: '14rem',
              height: '35px',
              id: 'chinascorll',
              needDefault: true,
              pos: '2014',
              // 种植面积
              url: 'apple/production/AllMapTime?type=112716'
            }
          }

          if (val === '种植面积' && this.rankingEchartToggle) {
            this.paramsW.type = '121689'
            this.paramsWR.type = '121689'
          } else if (val === '产量' && this.rankingEchartToggle) {
            this.paramsW.type = '112716'
            this.paramsWR.type = '112716'
          }

        }


      },

      // 切换中国和全球时重置所有的窗口状态
      colseAll() {
        this.window1 = false;
        this.window2 = false;
        this.window3 = false;
        this.window4 = false;
        this.window5 = false;
        this.window6 = false;

        this.bigwindow1 = false;
        this.bigwindow2 = false;
        this.bigwindow3 = false;
        this.bigwindow4 = false;
        this.bigwindow5 = false;
        this.bigwindow6 = false;

        this.active1 = false;
        this.active2 = false;
        this.active3 = false;
        this.active4 = false;
        this.active5 = false;
        this.active6 = false;
        // 关闭排名的图表
        this.rankingEchartToggle = false;
        // 小箭头的样式恢复默认
        this.isHide = false;

        // 重置中国地图的legend选中状态
        this.resetMapLegend()
      },

      // 切换中国排名图表的展开和收起
      hideRankecharts(){
        this.rankingEchartToggle = !this.rankingEchartToggle
        if (this.rankingEchartToggle) {
          document.getElementsByClassName("rank-echarts-wrapper")[0].style.height = '4.74rem'
//          document.getElementsByClassName("rank-echarts-wrapper")[0].style.height = '5.87rem'
          // 根据btn的index来渲染不同的图表
          if (this.btnIndexCountry == 0) {
            if (this.btnIndexRanking === 0) {
              this.paramsCR.type = '121689'
            } else if (this.btnIndexRanking === 1) {
              this.paramsCR.type = '112716'
            }
            // 数据没变就手动调用
            this.rankingBarChina()
          } else if (this.btnIndexCountry == 1) {
            if (this.btnIndexRanking === 0) {
              this.paramsWR.type = '121689'
            } else if (this.btnIndexRanking === 1) {
              this.paramsWR.type = '112716'
            }
            // 数据没变就手动调用
            this.rankingBarWorld()
          }

          //icon样式设置
          this.isHide = true;
        } else {
          document.getElementsByClassName("rank-echarts-wrapper")[0].style.height = '1.0rem'
          this.isHide = false;
        }
      },


      // 中国地图弹出层窗口
      showInfo(val) {
        // 从中国地图携带回来的数据
        // val ['榆中县', '2012', '121689']
        this.popAreaInfo = val
        // 显示窗口
        this.bigwindow7 = true;
      },

      // 中国地图tip联动高亮
      tipHighLight(val) {
        if (!this.btnIndexCountry) {
          this.$refs.mapchina.highLight(val)
        }
      },

      // 中国地图legend联动高量
      _toggle(item, index) {
        // 修改legend点击时候的样式
        this.visualMap[index].active = !this.visualMap[index].active
        /**
         * 切换数据是否显示
         * @param field 字段名称
         * @param min   最小值
         * @param max   最大值
         */
        this.$refs.mapchina.toggleGisData('PLANT_AREA', ...item)
      },

      // 重置legend 的选中状态为false
      resetMapLegend() {
        for (let i = 0; i < this.visualMap.length; i++) {
          this.visualMap[i].active = false
        }
      },

      // 时间轴切换事件事件
      _scorllTime(time){
        // 这句话是为了处理时间轴线还没有返回的情况下就拿错误的日期去请求数据了！！！
        this.btnIndexRanking = this.btnIndexRankingCache
        this.paramsC.time = time
        this.paramsCR.time = time
        this.paramsW.time = time
        this.paramsWR.time = time

        // 中国的时候
        if (!this.btnIndexCountry) {
          // 重置中国地图的legend选中状态
          this.resetMapLegend()
        }
      },

      // 处理 visualMap 的分段数据
      getVisualMap(min, max) {
        let range = Math.ceil(max) - Math.floor(min)
        let data = []
        for (let i = 0; i < 6; i++) {
          data.push([Math.floor(i * range / 6), Math.floor((i + 1) * range / 6)])
        }
        return data.reverse()
      },

      // 修复不同显示大小的情况下canvas可能会有1px的白边的bug，动态调整窗口以后请记得刷新
      getDOMStyle() {
        let elem1 = document.getElementsByClassName('map')[0];
        let w = window.getComputedStyle(elem1, null).width;
        let h = window.getComputedStyle(elem1, null).height;
        let wf = parseFloat(w)
        let hf = parseFloat(h)
        let wi = parseInt(w)
        let hi = parseInt(h)
        if (wi + 0.5 > wf) {
          elem1.style.width = wi + 'px'
        }
        if (hi + 0.5 > hf) {
          elem1.style.height = hi + 'px'
        }
      },

      // 设置rankingbar的位置
      setRankingPos() {
        let elem = document.getElementsByClassName('map')[0]
        let elem2 = document.getElementsByClassName('rank-echarts-wrapper')[0]
        let h = window.getComputedStyle(elem, null).height;
        let hi = parseInt(h)
        let top = (hi - 574) / 2
        elem2.style.top = top - 20 + 'px'
      },

      // Ranking 图表的位置自适应
      _windowResizeHandler() {
        this.setRankingPos()
      },

      // 销毁的方法
      _destroyEchart() {
        // do nothing here
      }
    },
    components: {
      mapChina,
      mapWorld,
      ranking,
      rankingEchart,

      selectBtn,
      explain,
      timeScroll,
      productHisSmall,
      productHis,
//      productAreaSmall,
//      productArea,
      productDisasterSmall,
      productDisaster,

      productRisefallSmall,
      productRisefall,
      productYeildSmall,
      productYeild,
      productMapTrend,
      productWorldTrendSmall,
      productWorldTrend,
      productWorldRisefallSmall,
      productWorldRisefall,
//      productWorldAreaSmall,
//      productWorldArea

    }

  };
</script>

<style lang="scss">
  @import "./../../assets/css/_variable.scss";
  @import "./../../assets/css/_mixin.scss";

  .procuct-title-info {
    /*margin: 0 auto 0.2rem;*/
    text-align: center;
    display: flex;
    justify-content: center;
    align-items: center;
    p {
      width: 4.8rem;
      /*margin-right: .7rem;*/
      display: flex;
      justify-content: space-between;
    }
  }

  .btnwrapper {
    margin-bottom: 0.1rem;
    padding-right: 0.3rem;
    height: 0.4rem;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    & > div:nth-child(1), & > div:nth-child(2) {
      margin-right: 0.2rem;
    }
  }

  .map-echarts-wrapper {
    height: calc(100% - 0.84rem);
    margin: 0 auto;

    .map {
      width: 100%;
      height: 100% !important;
      position: relative;
      .map-title {
        width: 50%;
        margin: 0 auto;
        position: absolute;
        top: 0;
        left: 25%;
        z-index: 2;
        padding-top: 0.3rem;
        p {
          font-size: 0.26rem;
          font-weight: normal;
          color: #fff;
          text-align: center;
        }
      }
      .toggle-map-wrapper {
        width: 100%;
        height: 100%;
        position: absolute;
        top: 0;
        left: 0;
      }
      .visual-map {
        width: 1rem;
        position: absolute;
        left: 1.6rem;
        bottom: 1rem;
        z-index: 2;
        .unchecked {
          color: #666;
        }
        .unchecked:before {
          background-color: #666 !important;
        }
        li {
          font-size: 14px;
          color: #fff;
          text-align: left;
          height: 0.24rem;
          line-height: 0.24rem;
          position: relative;
          cursor: pointer;
          span {
            display: inline-block;
            height: 0.24rem;
            line-height: 0.24rem;
          }
        }
        li:before {
          width: 0.1rem;
          height: 0.24rem;
          cursor: pointer;
          content: '';
          display: inline-block;
          margin-right: 0.1rem;
          position: absolute;
          top: 0;
          left: -0.2rem;
        }
        li:nth-child(1):before {
          background-color: #db590e;
        }
        li:nth-child(2):before {
          background-color: #e48a13;
        }
        li:nth-child(3):before {
          background-color: #c6a510;
        }
        li:nth-child(4):before {
          background-color: #c9e110;
        }
        li:nth-child(5):before {
          background-color: #fdff1b;
        }
        li:nth-child(6):before {
          background-color: #0071b3;
        }
      }
      .timeScroll-wrapper {
        width: 100%;
        position: absolute;
        left: 0;
        bottom: 0;
        display: flex;
        justify-content: center;
      }
      .rank-echarts-wrapper {
        position: absolute;
        /*top: 1.01rem;*/
        top: 6%;
        right: 0.56rem;
        width: 3.13rem;
        .rank-btn {
          display: flex;
          justify-content: center;
          width: 80%;
          margin: 0.1rem auto;
        }
        .rank-title {
          height: 0.6rem;
          line-height: 0.6rem;
          color: #dddee0;
          font-size: 0.18rem;
          text-align: center;
        }
        .show-button {
          height: 0.4rem;
          line-height: 0.4rem;
          font-size: 0.16rem;
          color: #034058;
          text-align: center;
          cursor: pointer;
          &.active {
            i {
              transform: rotate(180deg);
            }
          }
          i {
            display: inline-block;
            transition: all .5s ease;

          }
        }
        .show-button:hover {
          color: #0174af;
        }
      }

    }
  }

  .cont {
    text-align: center;
    color: $cl-main;
    /*height: ;*/
    h2 {
      font-size: 0.34rem;
    }
  }

  .right-bar-wrapper {
    ul {
      text-align: center;
      li:nth-child(1), li:nth-child(2), li:nth-child(3), li:nth-child(4) {
        .iconfont {
          font-size: $size*50rem;
          &:hover {
            color: #00B064;
          }
        }
      }
    }
  }

  echarts {
    width: 10rem;
  }
</style>
