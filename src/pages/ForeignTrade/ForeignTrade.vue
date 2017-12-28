<template>
  <div class="product-wrapper">
    <leftBar></leftBar>
    <div class="cont">
      <div class="trade-wrapper">
        <h2>中国{{appleType}}贸易规模</h2>
        <div class="trade-block">
          <div class="trade-top-wrapper">
            <div class="trade-top-block">
              <div class="condition-wrapper">
                <selectDiy :data="selectData" @change="_changeAppleType"></selectDiy>
                <selectBtn :btnData="btnDataTrade" @changeBtn="_changeTradeType" :btnIndex.sync="btnIndex"></selectBtn>
                <selectTime @chooseTime="_chooseTime" url="apple/trade/scale/getTime" defaultTimeType="年度" :timeTypeData="timeTypeData" :productId="appleType"></selectTime>
                <explain>折算鲜苹果贸易量=鲜苹果贸易量+苹果汁贸易量*8；变化率=(当年值-上年值)/上年值*100%；进出口价格=进出口贸易额/进出口贸易量。数据起始于1993年，来源于海关总署。</explain>
              </div>
              <div class="trade-top-echart">
                <topBarLine :data="ApiBodyTopData" :appleType="appleType" :tradeType="tradeType" v-if="ApiBodyTopData.length"></topBarLine>
              </div>
            </div>
          </div>
          <div class="trade-bottom-wrapper">
            <!-- <p class="trade-bottom-title">中国{{btAppleType}}出口价格监测</p> -->
            <div class="trade-bottom-chart">
              <bottomLine :data="ApiBodyBtData" v-if="ApiBodyBtData.length" :timeType="timeType"></bottomLine>
            </div>
          </div>
        </div>
      </div>
      <!--<button @click="myownEvent">我自己的点击事件</button>-->
      <div class="small-window-wrapper">
        <smallWindow class="window1" :isShow="window1" whichWindow="window1" @closeWindow="closeWindow" @openBigWindow="openBigWindow" title="中国苹果贸易流向">
          <tradeFlowSmall></tradeFlowSmall>
        </smallWindow>
        <smallWindow class="window2" @closeWindow="closeWindow" :isShow="window2" whichWindow="window2" title="中国进出口贸易占比及流向" @openBigWindow="openBigWindow">
          <tradeSaleroomSmall></tradeSaleroomSmall>
        </smallWindow>
        <smallWindow class="window3" @closeWindow="closeWindow" :isShow="window3" whichWindow="window3" title="中国苹果产品贸易季节性特点" @openBigWindow="openBigWindow">
          <tradeSeasonalSmall></tradeSeasonalSmall>
        </smallWindow>
        <smallWindow class="window4" @closeWindow="closeWindow" :isShow="window4" whichWindow="window4" title="中国苹果贸易影响因素" @openBigWindow="openBigWindow">
          <tradeAffectSmall></tradeAffectSmall>
        </smallWindow>
        <smallWindow class="window5" @closeWindow="closeWindow" :isShow="window5" whichWindow="window5" title="全球贸易分布及流向" @openBigWindow="openBigWindow">
          <tradeDistributeSmall></tradeDistributeSmall>
        </smallWindow>
        <smallWindow class="window6" @closeWindow="closeWindow" :isShow="window6" whichWindow="window6" title="全球苹果进出口变化趋势" @openBigWindow="openBigWindow">
          <tradeVolumeSmall></tradeVolumeSmall>
        </smallWindow>
        <smallWindow class="window7" @closeWindow="closeWindow" :isShow="window7" whichWindow="window7" title="全球苹果主要出口国竞争力比较" @openBigWindow="openBigWindow">
          <tradePriceSmall></tradePriceSmall>
        </smallWindow>
      </div>
    </div>
    <div class="right-bar-wrapper">
      <ul>
        <li :class="{'active':active1}" @click="showSmall('window1')"><i class="iconfont icon-duiwaimaoyi-quanguoliuxiang "></i></li>
        <li :class="{'active':active2}" @click="showSmall('window2')"><i class="iconfont icon-duiwaimaoyi-diquliuxiang"></i></li>
        <li :class="{'active':active3}" @click="showSmall('window3')"><i class="iconfont icon-duiwaimaoyi-jijiexingguilv"></i></li>
        <li :class="{'active':active4}" @click="showSmall('window4')"><i class="iconfont icon-duiwaimaoyi-yingxiangyinsu"></i></li>
        <li :class="{'active':active5}" @click="showSmall('window5')"><i class="iconfont icon-duiwaimaoyi-maoyifenbu"></i></li>
        <li :class="{'active':active6}" @click="showSmall('window6')"><i class="iconfont icon-duiwaimaoyi-jinchukouqushi"></i></li>
        <li :class="{'active':active7}" @click="showSmall('window7')"><i class="iconfont icon-duiwaimaoyi-jingzhengli"></i></li>
      </ul>
    </div>
    <bigWindow :title="bigOneTitleTime" :isShow="bigwindow1" whichWindow="bigwindow1" @closeWindow="closeWindow" @closeBigWindow="closeBigWindow">
      <tradeFlowLarge @bigOneTime="bigOneTime"></tradeFlowLarge>
    </bigWindow>
    <bigWindow :title="bigTwoTitle" :isShow="bigwindow2" whichWindow="bigwindow2" @closeWindow="closeWindow" @closeBigWindow="closeBigWindow">
      <tradeSaleroomLarge @bigTwo="bigTwo"></tradeSaleroomLarge>
    </bigWindow>
    <bigWindow title="中国苹果产品贸易季节性特点" :isShow="bigwindow3" whichWindow="bigwindow3" @closeWindow="closeWindow" @closeBigWindow="closeBigWindow">
      <tradeSeasonalLarge></tradeSeasonalLarge>
    </bigWindow>
    <bigWindow title="中国苹果贸易影响因素" :isShow="bigwindow4" whichWindow="bigwindow4" @closeWindow="closeWindow" @closeBigWindow="closeBigWindow">
      <tradeAffectLarge></tradeAffectLarge>
    </bigWindow>
    <bigWindow :title="bigFiveTitleTime" :isShow="bigwindow5" whichWindow="bigwindow5" @closeWindow="closeWindow" @closeBigWindow="closeBigWindow">
      <tradeDistributeLarge @bigFiveTime="bigFiveTime"></tradeDistributeLarge>
    </bigWindow>
    <bigWindow :title="bigSix" :isShow="bigwindow6" whichWindow="bigwindow6" @closeWindow="closeWindow" @closeBigWindow="closeBigWindow">
      <tradeVolumeLarge @bigSixTitle="bigSixTitle"></tradeVolumeLarge>
    </bigWindow>
    <bigWindow :title="bigSenven" :isShow="bigwindow7" whichWindow="bigwindow7" @closeWindow="closeWindow" @closeBigWindow="closeBigWindow">
      <tradePriceLarge @bigSenvenTitle="bigSenvenTitle"></tradePriceLarge>
    </bigWindow>
  </div>
</template>
<script>
  import selectTime from 'components/selectTime/selectTime'
  import smallModule1 from 'pages/ForeignTrade/trade-small1.vue'
  import bigModule1 from 'pages/ForeignTrade/trade-big1.vue'
  import selectBtn from 'components/selectBtn/selectBtn'
  import explain from 'components/explain/explain'
  import selectDiy from 'components/selectDiy/selectDiy'
  import { rightBarMixin, descTime } from 'assets/js/common.js'
  import topBarLine from 'pages/ForeignTrade/echart/trade-top-barline.vue'
  import bottomLine from 'pages/ForeignTrade/echart/trade-bottom-line.vue'

  import tradeFlowSmall from 'pages/ForeignTrade/trade-flow-small.vue'
  import tradeVolumeSmall from 'pages/ForeignTrade/trade-volume-small.vue'
  import tradeSaleroomSmall from 'pages/ForeignTrade/trade-saleroom-small.vue'
  import tradeDistributeSmall from 'pages/ForeignTrade/trade-distribute-small.vue'
  import tradePriceSmall from 'pages/ForeignTrade/trade-price-small.vue'
  import tradeSeasonalSmall from 'pages/ForeignTrade/trade-seasonal-small.vue'
  import tradeAffectSmall from 'pages/ForeignTrade/trade-affect-small.vue'

  import tradeFlowLarge from 'pages/ForeignTrade/trade-flow-large.vue'
  import tradeVolumeLarge from 'pages/ForeignTrade/trade-volume-large.vue'
  import tradeSaleroomLarge from 'pages/ForeignTrade/trade-saleroom-large.vue'
  import tradeDistributeLarge from 'pages/ForeignTrade/trade-distribute-large.vue'
  import tradePriceLarge from 'pages/ForeignTrade/trade-price-large.vue'
  import tradeSeasonalLarge from 'pages/ForeignTrade/trade-seasonal-large.vue'
  import tradeAffectLarge from 'pages/ForeignTrade/trade-affect-large.vue'

  export default {
    mixins: [rightBarMixin],
    name: 'ForeignTrade',
    data() {
      return {
        screenWidth: document.body.clientWidth, // 这里是给到了一个默认值 （这个很重要）
        btnData: ['中国', '全球'],
        btnDataTrade: ['贸易量', '贸易额'],
        btnDataIO: ['进口', '出口'],
        selectData: ['鲜苹果', '苹果干', '苹果汁', '折算鲜苹果'],
        bigOneTitle: '鲜苹果',

        bigOneTitleTime: '',  // 大弹窗1 的时间
        bigTwoTitle: '',      // 大弹窗2 弹窗标题
        bigFiveTitleTime: '', // 大弹窗5 的时间
        bigSix: '', // 大弹窗6 的标题
        bigSenven: '', // 大弹窗7 的标题

        btnIndex: 0,

        time: '', // 时间参数
        timeType: '', // 时间处于哪个维度的
        tradeType: '', // 贸易额 贸易量参数
        appleType: '', // 苹果干 鲜苹果参数

        timeTypeData: ['月度', '年度'],
        areaId: '370000',
        ApiBodyTopData: [], // 主图 上面 柱状图 曲线图 数据
        ApiBodyBtData: [], // 主图 下面曲线图 数据
        ApiSeasonData: [] // 季节性规律 数据
      }
    },
    mounted() {
      // this.getTopBarData();
      // this.getBottomLineData()
      // 季节性规律， 无参数变化，只在初始化的时候获取数据即可
      this.getSeasonData()
    },
    computed: {
      btAppleType() {
        if (this.appleType !== '折算鲜苹果') {
          this.huancunAppleType = this.appleType
          return this.appleType
        } else {
          return this.huancunAppleType
        }
      },
      ApiBodyTopParms() {
        return {
          PRODUCT: this.appleType,
          TIME_ID: this.time,
          TIME_TYPE: this.timeType,
          NAME: this.tradeType
        }
      },
      ApiBodyBtParms() {
        return {
          PRODUCT: this.appleType,
          TIME_ID: this.time,
          UNIT: this.timeType
        }
      },
    },
    methods: {
      bigOneTime(title) {
        this.bigOneTitleTime = descTime(title.TIME_ID) + `中国${title.PRODUCT}贸易流向`
      },
      bigTwo(title) {
        this.bigTwoTitle = `${descTime(title.TIME_ID)}中国${title.PRODUCT}分省贸易流向`
      },
      bigFiveTime(title) {
        this.bigFiveTitleTime = `${descTime(title.TIME_ID)}全球贸易${title.PRODUCT}${title.NAME}分布及流向`
      },
      bigSixTitle(title) {
        this.bigSix = `全球${title.PRODUCT}${title.NAME}变化趋势`
      },
      bigSenvenTitle(title) {
        this.bigSenven = `全球${title.PRODUCT}主要出口国竞争力比较`
      },
      // 时间参数 捕获
      _chooseTime(time) {
        this.time = time.time
        this.timeType = time.timeType
      },
      // 贸易量、贸易额 参数捕获
      _changeTradeType(val) {
        this.tradeType = val
      },
      // 鲜苹果 苹果干 参数捕获
      _changeAppleType(item) {
        this.appleType = item
      },
      //获取页面主体上部分折柱图数据
      getTopBarData() {
        //  在这里修改数据
        this.$xhr.get('apple/trade/scale', {
          params: {
            ...this.ApiBodyTopParms
            // PRODUCT: encodeURI(this.appleType),
            // TIME_ID: '2014,2015,2016',
            // NAME: encodeURI(this.tradeType),
            // TIME_TYPE: encodeURI('月度')
          }
        }).then((res) => {
          this.ApiBodyTopData = res.data
        })
      },
      // 获取页面主体下部分折线图数据
      getBottomLineData() {
        //  在这里修改数据
        if (this.appleType !== '折算鲜苹果') {
          this.$xhr.get('apple/trade/priceTrend', {
            params: {
              ...this.ApiBodyBtParms
            }
          }).then((res) => {
            this.ApiBodyBtData = res.data
          })
        }
      },
      // 季节性规律 大小弹窗数据获取
      getSeasonData() {
        this.$xhr.get('apple/trade/getHpSeason').then((res) => {
          this.ApiSeasonData = res.data
        })
      }
    },
    components: {
      selectTime,

      smallModule1,
      bigModule1,
      selectBtn,
      explain,
      selectDiy,
      topBarLine,
      bottomLine,

      tradeFlowSmall,
      tradeVolumeSmall,
      tradeSaleroomSmall,
      tradeDistributeSmall,
      tradePriceSmall,
      tradeSeasonalSmall,
      tradeAffectSmall,

      tradeFlowLarge,
      tradeVolumeLarge,
      tradeSaleroomLarge,
      tradeDistributeLarge,
      tradePriceLarge,
      tradeSeasonalLarge,
      tradeAffectLarge
    },
    watch: {
      ApiBodyTopParms(newVal) {
        if (newVal.PRODUCT && newVal.TIME_ID && newVal.TIME_TYPE && newVal.NAME) {
          this.getTopBarData()
        }
      },
      ApiBodyBtParms(newVal) {
        if (newVal.PRODUCT && newVal.TIME_ID && newVal.UNIT) {
          this.getBottomLineData()
        }
      }
    }
  }

</script>
<style lang="scss" scoped>
  @import "./../../assets/css/_variable.scss";
  @import "./../../assets/css/_mixin.scss";

  .trade-wrapper {
    height: 100%;
    margin: 0 auto;
    position: relative;
    z-index: 0;
    display: flex;
    flex-flow: column nowrap;
    h2 {
      font-size: 0.34rem;
    }
    .trade-block {
      flex: 1;
      @include flex(flex-start, center, column);
      > div {
        width: 100%;
        flex: 1 1 1px;
      }
    }
    .trade-top-wrapper {
      flex: 1 1 1px;
      display: flex;
      flex-flow: column nowrap; // margin-top: 0.2rem;
      padding-left: 0.5rem;
      box-sizing: border-box;
      .trade-top-block {
        flex: 1;
        display: flex;
        flex-flow: column nowrap;
        .trade-top-title {
          font-size: 0.24rem;
          color: #fff;
          text-align: center;
          line-height: 0.7rem;
          span {
            color: #00ae63;
          }
        }
      }
    }
  }

  .condition-wrapper {
    @include flex(flex-end);
    margin-top: 0.3rem;
    > * {
      margin-left: 0.2rem;
      &:first-child {
        margin-left: 0;
      }
    }
  }

  .time-select-wrapper {
    margin-right: 0.4rem;
    p {
      width: 2rem;
    }
  }

  .trade-select-wrapper {
    width: 2.6rem;
    text-align: center;
    display: flex;
    justify-content: space-between;
    align-self: flex-end;
  }

  .time-txt {
    height: 0.34rem;
    margin-right: 0.4rem;
    font-size: 0.18rem;
    color: #0071b3;
    line-height: 0.34rem;
  }

  .cont {
    text-align: center;
    color: $cl-main;
    h2 {
      font-size: 0.34rem;
    }
  }

  .trade-bottom-wrapper {
    flex: 1 1 1px;
    display: flex;
    padding-left: 0.5rem;
    flex-flow: column nowrap;
    // margin-top: 0.15rem;
    margin-top: 0.3rem;
    box-sizing: border-box;
    .trade-bottom-title {
      font-size: 0.22rem;
      color: #fff;
      line-height: 0.54rem;
      text-align: center;
    }
  }

  .trade-top-echart {
    flex: 1;
  }

  .trade-top-echart>div {
    height: 100%;
  }

  .trade-bottom-chart {
    flex: 1;
  }

  .select-box {
    margin-right: 0.4rem;
  }

  .chart_txt {
    top: 50px !important;
  }

</style>
