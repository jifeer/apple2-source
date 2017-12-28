<template>
  <div class="index-wrapper">
    <div class="header-bg">
      <div class="header-container">
        <img src="../../assets/img/header.png"/>
      </div>
    </div>
    <div class="main">
      <div class="column-left column">
        <!--左一图-->
        <router-link class="nav-item row standard" :to="{name:'product'}">
          <div class="index-description">
            <div class="title"><span class="map-year">{{aYieldTitle}}</span><span>年，</span><span
              class="map-region">全国</span><span>苹果</span><span class="map-status">产量</span><span class="map-data">{{aYield}}</span><span
              class="map-unites">万吨</span></div>
          </div>
          <div class="index-cont">
            <div class="echart-inst" id="crop-left">
              <appleYieldchart :aYieldData="aYieldData"></appleYieldchart>
            </div>

          </div>
        </router-link>
        <!--左二图-->
        <router-link class="nav-item row standard" :to="{name:'product'}">
          <div class="index-description">
            <div class="title">预计全国{{titleInfo.desYear}}年苹果单产{{titleInfo.desPrice}}公斤/亩，同比{{titleInfo.desResult}}{{titleInfo.desPercent}}</div>
          </div>
          <div class="echart-inst" id="affect-analyse">
            <yieldForecastchart :yechartsData="yechartsData"></yieldForecastchart>
          </div>
        </router-link>
        <!--左三图-->
        <router-link class="nav-item row standard" :to="{name:'CostBenefit'}">
          <div class="index-description">
            <div class="title">{{profitTitle}}年，苹果净利润{{profit}}元／亩，折算每公斤{{profitPrice}}元</div>
          </div>
          <div class="echart-inst" id="profit">
            <costProfitchart :cbchartData="cbchartData"></costProfitchart>
          </div>
        </router-link>
      </div>
      <div class="column-mid column">
        <div class="row row-one">
          <div class="decorate-left">
            <div class="shadow-left"></div>
            <span class="menu-supply">供给侧分析</span>
          </div>
          <div class="decorate-right">
            <div class="shadow-right"></div>
            <span class="menu-demand">需求侧分析</span>
          </div>
          <div class="true-mid">
            <div class="item navigator">
              <ul class="nav">
                <router-link class="nav-item" tag="li" :to="{name:'product'}">
                  <p><i class="icon iconfont icon-guoshumiaomu"></i><br/><span>生产</span></p>
                </router-link>
                <router-link class="nav-item" tag="li" :to="{name:'flow'}">
                  <p><i class="iconfont icon-icon1460188803541"></i><br/><span>流通</span></p>
                </router-link>
                <router-link class="nav-item" tag="li" :to="{name:'price'}">
                  <p><i class="iconfont icon-jiage"></i><br/><span>价格</span></p>
                </router-link>
                <router-link class="nav-item" tag="li" :to="{name:'expence'}">
                  <p><i class="iconfont icon-xiaofei"></i><br/><span>消费</span></p>
                </router-link>
                <router-link class="nav-item" tag="li" :to="{name:'ForeignTrade'}">
                  <p><i class="iconfont icon-shijieditu"></i><br/><span>贸易</span></p>
                </router-link>
                <router-link class="nav-item" tag="li" :to="{name:'CostBenefit'}">
                  <p><i class="iconfont icon-yizhuanshouyi"></i><br/><span>成本收益</span></p>
                </router-link>

              </ul>
            </div>
            <div class="item meter">
              <dashBoard></dashBoard>
            </div>
            <div class="item water">
              <div class="waveMain">
                <div class="waveBox">

                  <Wave></Wave>

                </div>
              </div>
            </div>

          </div>
        </div>
        <div class="row row-two two-side">
          <!--中下左图-->
          <router-link class="nav-item half standard " :to="{name:'price'}">
            <div class="index-description">
              <div class="title">鲜苹果各环节价格</div>

            </div>
            <div class="echart-inst" id="import-quantity">
              <trend :trend="trend"></trend>
            </div>
          </router-link>
          <!--中下右图-->
          <router-link class="nav-item half standard " :to="{name:'flow'}">
            <div class="index-description">
              <div class="title">{{requestMonth}}全国苹果销售流向监测</div>
            </div>
            <div class="echart-inst" id="export-quantity">
              <saleTo :auxiliary="auxiliary" :flag="flag" :mapEchartsData="mapEchartsData"></saleTo>
            </div>
          </router-link>
        </div>
      </div>
      <div class="column-right column">
        <!--右一图-->
        <router-link class="nav-item row standard" :to="{name:'expence'}">
          <div class="index-description">
            <div class="title">近10年来，我国苹果产量和消费量基本维持增长状态，增速有所下降</div>
          </div>
          <div class="echart-inst" id="market">
            <topBarLine :tradeTopBarData="tradeTopBarData"></topBarLine>
          </div>
        </router-link>
        <!--右二图-->
        <router-link class="nav-item row standard " :to="{name:'expence'}">
          <div class="index-description">
            <div class="title">2017年，果径规格在{{maxTitle}}的苹果更受消费者欢迎</div>
          </div>
          <div class="echart-inst" id="flexibility">
            <fruitWidth @maxTitle="title" :fWchartData="fWchartData"></fruitWidth>
          </div>
        </router-link>
        <!--右三图-->
        <router-link class="nav-item row standard" :to="{name:'ForeignTrade'}">
          <div class="index-description">
            <div class="title">{{exportTitle}}，我国鲜苹果出口量{{exportfreshApple}}万吨，苹果汁出口量{{exportappleJuice}}万吨</div>
          </div>
          <div class="echart-inst" id="forecast">
            <exportChart :exportDate="exportDate"></exportChart>
          </div>
        </router-link>
      </div>
    </div>
  </div>

</template>

<script>
  import {rightBarMixin} from 'assets/js/common.js'
  import leftBar from 'components/leftBar/leftBar'
  import costProfitchart from './echarts/costProfitchart.vue'
  import yieldForecastchart from './echarts/yieldForecastchart.vue'
  import appleYieldchart from './echarts/appleYieldchart.vue'
  import trend from './echarts/price-trend-line.vue'
  import fruitWidth from './echarts/fruitWidth.vue'
  import topBarLine from './echarts/trade-top-barline.vue'
  import saleTo from './echarts/saleTo.vue'
  import exportChart from './echarts/exportChart.vue'
  import dashBoard from './echarts/dashBoard.vue'
  import Wave from './echarts/Wave.vue'

  export default {
    name: "index",
    mixins: [rightBarMixin],
    data() {
      return {
        width: "100%",
        height: "100%",
        //左一图
        aYieldData: {
          data: [],
        },
        aYieldTitle: null,
        aYield: null,
        //左二图
        yechartsData: {
          xdata: [],
          data1: [],
          data2: [],
        },
        titleInfo: {
          desYear: '2017',
          desResult: '',
          desPrice: '',
          desPercent: ''
        },
        //左三图
        cbchartData: {
//	              id:"cbchart",
          timeData: [],
          data: [],
        },
        profitTitle: null,
        profit: null,
        profitPrice: null,
        //中下左图
        trend: {
          xAxisData: [],
          seriesData: [],
          option: {}
        },
        //中下右图
        mapEchartsData: {
          xdata: [],
          data: [],
          option: {
            lineStyle: {}
          }

        },
        auxiliary: null,
        marketclass: 1,
        areas: '全国',
        flag: true,
        requestMonth: null,
        //右一图
        tradeTopBarData: {
          //        id: 'tradeTopBar',
          time: [],
          allExpense: [],
          expenseChangeRate: [],
          yield: [],
          yieldChangeRate: [],
          option: {}
        },
        //右二图
        fWchartData: {
          data: [],
          option: {}
        },
        maxTitle: null,
        //右三图
        exportDate: {
          freshApple: [],
          appleJuice: [],
        },
        exportTitle: null,
        exportfreshApple: null,
        exportappleJuice: null,

        toggleshow: false
      }
    },


    mounted() {
      this.renderMap()
      this.renderYeild()
      this.renderCBchart()
      this.firstLoad()
      this.getfWchartData()
      this.getTopBarData()
      this.getFlowdata()
      this.renderExport()
    },

    methods: {

      //左一图
      renderMap() {

        this.$xhr.get("apple/index/getChinaYieldData")
          .then((res) => {
//           	console.log(res)
            this.aYieldData.data = res.data.data
            this.aYieldTitle = res.data.time
            this.aYield = res.data.value
          })


      },
      //左二图
      renderYeild() {
        this.$xhr.get("apple/production/yieldForecast", {
          params: {
            AREA_NAME: "全国",
            TIME_ID: "2002,2003,3004,2005,2006,2007,2008,2009,2010,2011,2012,2013,2014,2015,2016,2017",
            type: "1",
          }
        })
          .then((res) => {
//          	console.log(res)
            this.yechartsData.data1 = res.data.data1
            this.yechartsData.data2 = res.data.data2
            this.yechartsData.xdata = res.data.dates
            this.titleInfo.desYear = res.data.desYear
            this.titleInfo.desPrice = res.data.desPrice
            this.titleInfo.desResult = res.data.desResult
            this.titleInfo.desPercent = res.data.desPercent
          })


      },
      //左三图
      renderCBchart() {
        this.$xhr.get("apple/income/getIndexTrendChange")
          .then((res) => {
            this.cbchartData.data = res.data.data
            this.cbchartData.timeData = res.data.time
            this.profitTitle = res.data.title.time
            this.profit = res.data.title.profits
            this.profitPrice = res.data.title.price
          })
      },
      //中下左图
      firstLoad() {

        this.$xhr.get("/apple/price/getEveryPriceData", {
          params: {
            timeType: 'month',
            areaId: '000000',
//            appleType:'富士苹果',
          }
        })
          .then((res) => {
//          	console.log(res)
            this.trend.seriesData[0] = res.data.lsjg
            this.trend.seriesData[1] = res.data.pfjg
            this.trend.seriesData[2] = res.data.ckjg
            this.trend.seriesData[3] = res.data.jkjg
            this.trend.xAxisData = res.data.time
          })
      },
      //中下右图
      getFlowdata() {
        this.$xhr.get('apple/index/getIndexDetect')
          .then((res) => {
            let dataArr = [];
//						console.log(res)
            if (res.data.data.length > 0) {
              res.data.data.forEach(function (val, index, arr) {
                dataArr.push(...val.data);
              })
              this.auxiliary = res.data.bgColorData
//					  	this.mapEchartsData.option.title.text = res.data.requestMonth
              this.mapEchartsData.data = [{
                name: '全国',
                data: dataArr
              }]
            }
            this.requestMonth = res.data.requestMonth
          })
      },
//
      //右一图
      getTopBarData() {
        this.$xhr.get("apple/index/getPSaleStatus")
          .then((res) => {
            this.tradeTopBarData.allExpense = res.data.allExpense
            this.tradeTopBarData.expenseChangeRate = res.data.expenseChangeRate
            this.tradeTopBarData.yield = res.data.yield
            this.tradeTopBarData.yieldChangeRate = res.data.yieldChangeRate

            let arr = res.data.time
            arr[arr.length - 1] = "2017*"
            this.tradeTopBarData.time = res.data.time
            this.tradeTopBarData.flag = res.data.flag
          })

      },
      //右二图
      getfWchartData() {

        this.$xhr.get("apple/consume/feature/getFruitDiameterPreference?TIME_ID=201701,201702,201703,201704,201705,201706,201707,201708,201709,201710,201711,201712&AREA_NAME=%E5%85%A8%E5%9B%BD&TIME_TYPE=month")
          .then((res) => {
//          	console.log(res)
            this.fWchartData.data = res.data

          })

      },
      title(maxTitle) {
        this.maxTitle = maxTitle
      },
      //右三图
      renderExport() {
        this.$xhr.get("apple/index/getExportInfo")
          .then((res) => {
//        	console.log(res)
            this.exportDate.xdata = res.data.time
            this.exportDate.freshApple = res.data.freshApple
            this.exportDate.appleJuice = res.data.appleJuice
            this.exportTitle = res.data.titleTime
            this.exportfreshApple = res.data.titleAppleNum
            this.exportappleJuice = res.data.titleJuiceNum

          })
      },


    },
    components: {
      appleYieldchart,
      costProfitchart,
      yieldForecastchart,
      trend,
      fruitWidth,
      topBarLine,
      saleTo,
      exportChart,
      dashBoard,
      Wave,
    }

  };
</script>

<style lang="scss" scoped>
  @import "./../../assets/css/_variable.scss";
  @import "./../../assets/css/_mixin.scss";

  .index-wrapper {
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    padding: 4px 20px 22px;
    box-sizing: border-box;
    width: 100%;
    height: calc(100%);
  }

  .index-wrapper .main {
    display: flex;
    align-items: center;
    justify-content: space-between;
    box-sizing: border-box;
    width: 100%;
    height: calc(100% - 0.7rem);
    .column-left {
      .row {
        padding: 20px 30px 20px 10px;
      }
    }
    .column-right {
      .row {
        padding: 20px 10px 20px 30px;
      }
    }
  }

  .index-wrapper .main .column {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 100%;
    box-sizing: border-box;
    flex-flow: column nowrap;
  }

  .index-wrapper .main .column .row {
    box-sizing: border-box;
    width: 100%;
    background-clip: content-box;
    .title {
      cursor: pointer;
    }
  }

  .index-wrapper .main .column-left .row {

  }

  .index-wrapper .main .column-left, .index-wrapper .main .column-right {
    flex: 1 1 auto;
    width: 26.88%;
    background: none;
  }

  .index-wrapper .main .column-left .row, .index-wrapper .main .column-right .row {
    height: 33.33%;
  }

  .index-wrapper .main .column-mid {
    flex: 1.6 0 46.24%;
    width: 46.24%;
    background: transparent;
  }

  .index-wrapper .main .column-mid .row-one {
    position: relative;
    /*flex: 2 1 66.67%;*/
    height: 66.66%;
    padding: 20px 10px 10px;
    box-sizing: border-box;
    cursor: auto;
    .navigator {
      .nav-item {
        cursor: pointer;
      }
    }
  }

  .index-wrapper .main .column-mid .row-one:before {
    content: '';
    position: absolute;
    top: 0px;
    left: 50%;
    width: 90%;
    height: 1px;
    transform: translateX(-50%);
    background: linear-gradient(90deg, transparent, #1153AE 10%, #1153AE 50%, #1153AE 90%, transparent);
  }

  .index-wrapper .main .column-mid .row-one .true-mid {
    display: flex;
    align-items: center;
    justify-content: space-between;
    position: relative;
    z-index: 1;
    flex-flow: column nowrap;
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    .navigator {
      height: calc(7% + 30px);
    }
    .meter {
      height: calc(73% - 60px);
    }
    .water {
      height: 20%;
    }
  }

  .index-wrapper .main .column-mid .row-one .true-mid .item {
    width: 100%;
    display: flex;
    display: -moz-box;
    align-items: center;
    justify-content: space-between;
    flex: 1 1 auto;
  }

  .index-wrapper .main .column-mid .row-one .true-mid .nav {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin: 0 auto;
    width: 80%;
  }

  .index-wrapper .main .column-mid .row-one .true-mid .nav .nav-item {
    flex: 1 1 auto;
    text-align: center;
  }

  .index-wrapper .main .column-mid .row-one .true-mid .nav .nav-item a {
    display: inline-block;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-flow: column nowrap;
    cursor: pointer;
  }

  .index-wrapper .main .column-mid .row-one .true-mid .nav .nav-item a .iconfont {
    font-size: 30px;
    color: #007FFF;
    transition: all .2s ease-in;
  }

  .index-wrapper .main .column-mid .row-one .true-mid .nav .nav-item a span {
    color: #fff;
    transition: all .2s ease-in;
  }

  .index-wrapper .main .column-mid .row-one .decorate-left, .index-wrapper .main .column-mid .row-one .decorate-right {
    position: absolute;
    top: 0;
    bottom: 0;
    z-index: -1;
    width: calc(50% - 2px);
  }

  .index-wrapper .main .column-mid .row-one .decorate-left {
    left: 0;
    border: 1px solid #1CBFD3;
    border-right: none;
    border-radius: 20px 0 0 20px / 20px 0 0 20px;
  }

  .index-wrapper .main .column-mid .row-one .decorate-left:before {
    content: '';
    position: absolute;
    display: block;
    top: 0;
    bottom: 0;
    left: -150px;
    width: 150px;
    background: radial-gradient(69px 35% at right center, rgba(7, 252, 255, 0.3), rgba(7, 252, 255, 0.1) 50px, transparent 100px);
  }

  .index-wrapper .main .column-mid .row-one .decorate-left .menu-supply {
    position: absolute;
    display: inline-block;
    width: 35px;
    height: 120px;
    text-align: center;
    line-height: 35px;
    top: 50%;
    left: 0;
    transform: translateY(-50%);
    color: #07fcff;
    font-size: 16px;
    writing-mode: tb-rl;
    writing-mode: vertical-lr;
  }

  .index-wrapper .main .column-mid .row-one .decorate-left .menu-supply:before, .index-wrapper .main .column-mid .row-one .decorate-left .menu-supply:after {
    content: '';
    position: absolute;
    display: block;
    left: 0;
    height: 60%;
    right: 0;
    box-sizing: border-box;
    border: 1px solid #07fcff;
    z-index: -1;
    background: linear-gradient(-90deg, #006BA8, #0C4893 90%);
  }

  .index-wrapper .main .column-mid .row-one .decorate-left .menu-supply:before {
    top: 0;
    transform: skewY(30deg);
    border-bottom: none;
    border-radius: 0 5px 0 0 / 0 10px 0 0;
  }

  .index-wrapper .main .column-mid .row-one .decorate-left .menu-supply:after {
    bottom: 0;
    transform: skewY(-30deg);
    border-top: none;
    border-radius: 0 0 5px 0 / 0 0 10px 0;
  }

  .index-wrapper .main .column-mid .row-one .decorate-left .shadow-left {
    position: absolute;
    right: 0;
    bottom: 0;
    width: 1px;
    height: 500px;
    transform: translateY(50%);
    background: linear-gradient(180deg, transparent 20%, rgba(0, 252, 255, 0.7), transparent);
  }

  .index-wrapper .main .column-mid .row-one .decorate-left .shadow-left:before {
    content: '';
    position: absolute;
    top: 0;
    right: 0;
    z-index: -1;
    width: 400px;
    height: 250px;
    background: radial-gradient(100% 100% at right bottom, rgba(0, 252, 255, 0.4), rgba(0, 252, 255, 0.25) 60px, transparent 70%);
  }

  .index-wrapper .main .column-mid .row-one .decorate-left .shadow-left:after {
    content: '';
    position: absolute;
    top: 50%;
    right: 0;
    z-index: -1;
    width: 400px;
    height: 250px;
    background: radial-gradient(100% 100% at right top, rgba(0, 252, 255, 0.2), rgba(0, 252, 255, 0.1) 100px, transparent);
  }

  .index-wrapper .main .column-mid .row-one .decorate-right {
    right: 0;
    border: 1px solid #A6DC38;
    border-left: none;
    border-radius: 0 20px 20px 0 / 0 20px 20px 0;
  }

  .index-wrapper .main .column-mid .row-one .decorate-right:before {
    content: '';
    position: absolute;
    display: block;
    top: 0;
    bottom: 0;
    right: -150px;
    width: 150px;
    background: radial-gradient(69px 35% at left center, rgba(255, 238, 0, 0.3), rgba(255, 238, 0, 0.1) 50px, transparent 100px);
  }

  .index-wrapper .main .column-mid .row-one .decorate-right .menu-demand {
    position: absolute;
    display: inline-block;
    width: 35px;
    height: 120px;
    text-align: center;
    line-height: 35px;
    top: 50%;
    right: 0;
    transform: translateY(-50%);
    color: #ffee00;
    font-size: 16px;
    writing-mode: tb-lr;
    writing-mode: vertical-rl;
  }

  .index-wrapper .main .column-mid .row-one .decorate-right .menu-demand:before, .index-wrapper .main .column-mid .row-one .decorate-right .menu-demand:after {
    content: '';
    position: absolute;
    display: block;
    left: 0;
    height: 60%;
    right: 0;
    box-sizing: border-box;
    border: 1px solid #ffee00;
    z-index: -1;
    background: linear-gradient(90deg, #437881, #135EA1 90%);
  }

  .index-wrapper .main .column-mid .row-one .decorate-right .menu-demand:before {
    top: 0;
    transform: skewY(-30deg);
    border-bottom: none;
    border-radius: 5px 0 0 0 / 10px 0 0 0;
  }

  .index-wrapper .main .column-mid .row-one .decorate-right .menu-demand:after {
    bottom: 0;
    transform: skewY(30deg);
    border-top: none;
    border-radius: 0 0 0 5px / 0 0 0 10px;
  }

  .index-wrapper .main .column-mid .row-one .decorate-right .shadow-right {
    position: absolute;
    bottom: 0;
    left: 0;
    z-index: -1;
    width: 1px;
    height: 500px;
    transform: translateY(50%);
    background: linear-gradient(180deg, transparent 20%, rgba(255, 238, 0, 0.7), transparent);
  }

  .index-wrapper .main .column-mid .row-one .decorate-right .shadow-right:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    z-index: -1;
    width: 400px;
    height: 250px;
    background: radial-gradient(100% 100% at left bottom, rgba(184, 248, 71, 0.4), rgba(184, 248, 71, 0.25) 60px, transparent 70%);
  }

  .index-wrapper .main .column-mid .row-one .decorate-right .shadow-right:after {
    content: '';
    position: absolute;
    top: 50%;
    left: 0;
    z-index: -1;
    width: 400px;
    height: 250px;
    background: radial-gradient(100% 100% at left top, rgba(184, 248, 71, 0.2), rgba(184, 248, 71, 0.1) 100px, transparent);
  }

  .index-wrapper .main .column-mid .row-two {
    /*flex: 1 1 33.33%;*/
    height: 33.33%;
    padding: 0 0 20px;
    background-clip: content-box;
  }

  .two-side {
    display: flex;
    align-items: center;
    justify-content: space-between;
    box-sizing: border-box;
  }

  .two-side .half {
    flex: 1 1 50%;
    box-sizing: border-box;
    height: 100%;
    padding: 20px 0 0;
    &:nth-child(1) {
      padding-right: 20px;
    }
    &:nth-child(2) {
      padding-left: 20px;
    }
  }

  .standard {
    .index-description {
      width: 100%;
      line-height: 30px;
      box-sizing: border-box;
      display: flex;
      align-items: center;
      justify-content: space-between;
      .title {
        font-size: 14px;
        color: #fff;
        text-align: left;
        padding-left: 10px;
      }
    }
  }

  .standard .index-cont {
    flex: 1 0 auto;
    height: calc(100% - 30px);
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .standard .index-cont .echart-inst {
    flex: 1 1 50%;
    height: 100%;
    text-align: center;
  }

  .standard .echart-inst {
    flex: 1 0 auto;
    width: 100%;
  }

  .index-wrapper {
    background: url(../../assets/img/index-bg.png) no-repeat;
    background-size: 100% 100%;
    position: fixed;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    z-index: 100;
  }

  .echart-inst {
    display: flex;
    height: calc(100% - 30px);;
  }

  a {
    cursor: default;
    font-size: 14px;
  }

  .header-container {
    width: 15.4rem;
    height: 0.7rem;
    margin: 0 auto;
    img {
      width: 100%;

    }
  }

  .navigator {
    padding-top: 30px;
    .nav {
      width: 90% !important;
      align-items: flex-end !important;
      position: relative;
      z-index: 1200;
      .nav-item {
        width: 16.6%;
        font-size: 14px;
        color: #0080CA;
        .iconfont {
          font-size: 0.42rem !important;
          display: block;
          color: #0080CA;
        }
      }
      & > li:nth-child(2) {
        .iconfont {
          font-size: 0.5rem !important;
        }
      }
    }
    .nav-item:hover {
      color: #00B064 !important;
      .iconfont {
        color: #00B064 !important;
      }
    }
  }

  .index-wrapper {
    .water {
      flex: 1;
      display: flex;
      .waveMain {
        flex: 1;
        height: 100%;
        display: flex;
        align-items: flex-end;
        .waveBox {
          flex: 1;
        }
      }
    }
  }

  .chart_main {
    margin-bottom: 0.5rem;
  }
</style>
