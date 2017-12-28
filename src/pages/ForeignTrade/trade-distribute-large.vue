<template>
  <div class="product-historical-wrapper big-wrapper trade-large-wrapper">
    <!-- <div class="bigW-intro">{{title}}</div> -->
    <div class="bigW-option">
      <selectDiy :data="selectDiyData" @change="_changeAppleType" class="marginRight"></selectDiy>
      <selectBtn :btnData="btnData" @changeBtn="_changeExportType" :btnIndex.sync="btnIndex" class="marginRight"></selectBtn>
      <!-- <selectBtn :btnData="monthOrYear" @changeBtn="_changeTimeType" :btnIndex.sync="btnIndex2" class="marginRight"></selectBtn> -->
      <explain>数据起始于1988年，贸易流向数据起始于1997年，源于联合国商品贸易统计数据库。</explain>
    </div>
    <div class="large-chart">
      <div class="large-chart-left">
        <tradeLargeChart4 :data="mapData" :flowData="flowData" class="world-chart"  @changeArea="_changeArea" :time="scrollTime" :appleType="appleType" :dir="exportType" v-if="mapData.length && flowData.length"></tradeLargeChart4>
      </div>
      <div class="rank-echarts-wrapper">
        <div class="rank-title">{{rankTitle}}</div>
        <div class="right-chart-height" v-if="rankingEchartToggle">
          <rankingEchart :data="rankingEchart" class="barchart" v-if="rankingEchart.length"></rankingEchart>
        </div>
        <div class="show-button" :class="{'active':isHideChina}">
          <i class="iconfont icon-xiangxia" @click="hideRankecharts"></i>
        </div>
      </div>
    </div>
    <timeScroll :scorllOption="scorllOption" @scorllTime="_scorllTime"></timeScroll>
  </div>
</template>
<script>
  import selectTime from 'components/selectTime/selectTime';
  import selectArea from 'components/selectArea/selectArea';
  import selectDiy from 'components/selectDiy/selectDiy';
  import selectBtn from 'components/selectBtn/selectBtn'
  import explain from 'components/explain/explain';
  import { rightBarMixin } from 'assets/js/common.js'
  import tradeLargeChart4 from './big/trade-big-chart4'
  import rankingEchart from './big/flow-ranking4.vue'
  import timeScroll from 'components/timeScroll/timeScroll'

  export default {
    name: 'trade-small1',
    data() {
      return {
        btnIndex: 0,
        btnIndex2: 0,
        title: '',
        timeType: 'year',
        isHideChina: true,

        selectDiyData: ['鲜苹果', '苹果干', '苹果汁'],
        rankingEchartToggle: true,

        // 时间轴参数
        scorllOption:{
          width:'100%',
          height:'40px',
          id:'b1',
          needDefault: true,
          url: 'apple/trade/tradeDistribution/getTimes'
        },

        area: '',     // 地图组件传递过来的地区

        scrollTime: '', // 时间轴 的时间
        appleType: '', // 苹果干 鲜苹果参数
        exportType: '', // 进口出口 参数
        btnData: ['出口', '进口'],
        monthOrYear: [{name: '月度', value: 'month'}, {name: '年度', value: 'year'}],
        mapData: [],
        flowData: [],
        rankingEchart: [],
      }
    },
    created() {
      // this.rankingBar()
    },
    mounted() {
      // this.getPopFourData()
    },
    computed: {
      ApiParams() {
        return {
          // TIME_ID: this.scrollTime,
          // NAME: this.exportType,
          // TIME_TYPE: this.timeType,
          // PRODUCT: this.appleType
          TIME_ID: this.scrollTime,
          NAME: this.exportType,
          PRODUCT: this.appleType
        }
      },
      ApiFlowAreaParams() {
        return {
          TIME_ID: this.scrollTime,
          NAME: this.exportType,
          PRODUCT: this.appleType,
          AREA_ID: this.area
        }
      },
      rankTitle() {
        let desc = this.exportType === '出口' ? '出口' : '进口'
        let unite = this.appleType === '苹果干' ?  '吨' : '万吨'
        return `全球${this.appleType}${desc}贸易排名（${unite}）`
      }
    },
    methods: {
      _changeArea(area) {
        this.area = area
      },
      // 捕获事件类型参数，并 传给时间轴
      // _changeTimeType(timeType) {
      //   this.timeType = timeType
      //   this.scorllOption.url = `apple/trade/tradeDistribution?TIME_TYPE=${timeType}`
      // },
      // 进出口按钮切换
      _changeExportType(val) {
        this.exportType = val
      },
      // 鲜苹果 苹果干 参数捕获
      _changeAppleType(item) {
        this.appleType = item
      },
      // 时间轴参数
      _scorllTime(time) {
        this.scrollTime = time
      },
      //获取地图数据
      // 获取 第一个 大弹窗 地图数据 与 柱状图数据
      getPopFourData() {
        this.$xhr.get('apple/trade/tradeDistribution', {
          params: {
            ...this.ApiParams
          }
        }).then((res) => {
          // 地图数据
          this.mapData = res.data
          // 柱状图数据
          this.rankingEchart = res.data.slice(0, 10).sort((a, b) => a.value - b.value)
        })
      },
      // 获取 第一个 大弹窗 地图数据 与 柱状图数据 apple/trade/countryFlow
      getFlowData() {
        this.$xhr.get('apple/trade/tradeDistributionFlow', {
          params: {
            ...this.ApiParams,
            // TIME_ID: '201707',
            // NAME: '出口',
            // TIME_TYPE: 'month',
            // PRODUCT: '鲜苹果'
          }
        }).then((res) => {
          // 地图数据
          this.flowData = res.data
        })
      },
      getFlowAreaData() {
        this.$xhr.get('apple/trade/tradeDistributionSingelFlow', {
          params: {
            ...this.ApiFlowAreaParams,
          }
        }).then((res) => {
          // 地图数据
          this.flowData = [res.data]
        })
      },
      // 收起隐藏图表
      hideRankecharts() {
        this.rankingEchartToggle = !this.rankingEchartToggle
        if (this.rankingEchartToggle) {
          document.getElementsByClassName("rank-echarts-wrapper")[0].style.height = '100%'
          this.isHideChina = true;
        } else {
          document.getElementsByClassName("rank-echarts-wrapper")[0].style.height = '1.0rem'
          this.isHideChina = false;
        }
      }
    },
    components: {
      selectTime,
      selectArea,
      selectDiy,
      selectBtn,
      explain,
      tradeLargeChart4,
      rankingEchart,
      timeScroll
    },
    watch: {
      ApiParams: {
        handler: function(newVal, oldVal) {
          if (newVal.TIME_ID && newVal.NAME && newVal.PRODUCT) {
            this.getPopFourData()
            this.getFlowData()
            this.$emit('bigFiveTime', newVal)
          }
        },
        deep: true
      },
      ApiFlowAreaParams: {
        handler: function(newVal, oldVal) {
          if (newVal.TIME_ID && newVal.NAME && newVal.PRODUCT && newVal.AREA_ID) {
            this.getFlowAreaData()
          }
        },
        deep: true
      }
    }
  };

</script>
<style lang="scss" scoped>
  @import "./../../assets/css/_variable.scss";
  @import "./../../assets/css/_mixin.scss";
  .large-chart-wrapper {
    width: 100%;
    height: 100%;
  }

  .trade-large-wrapper {
    @include flex(flex-start, center, column);
    height: 100%;
    padding-bottom: 0.2rem;
    box-sizing: border-box;
    // overflow-y: hidden;
    >* {
      width: 100%;
    }
  }

  .marginRight {
    margin-right: 0.4rem;
  }

  .large-chart {
    @include flex(space-between, flex-start);
    position: relative;
    margin-top: 0.2rem;
    flex: 1;
  }

  .large-chart-left {
    display: flex;
    flex: 1;
    height: 100%;
  }

  .world-chart {
    flex: 1;
    height: 100%;
  }

  .rank-echarts-wrapper {
    width: 3.13rem;
    height: 100%;
    @include flex(flex-start, center, column);
    >* {
      width: 100%;
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

  .right-chart-height {
    flex: 1;
  }

  .barchart {
    height: 100%;
  }

</style>
