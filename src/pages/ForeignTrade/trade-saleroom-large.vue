<template>
  <div class="trade-salerroom-wrapper big-wrapper">
    <div class="bigW-option">
      <selectDiy :data="selectDiyData" @change="_changeAppleType" class="marginRight"></selectDiy>
      <selectBtn :btnData="btnData1" @changeBtn="_changeTradeType" class="marginRight" :btnIndex.sync="btnIndex1"></selectBtn>
      <selectBtn :btnData="btnData2" @changeBtn="_changeExport" class="marginRight" :btnIndex.sync="btnIndex2"></selectBtn>
      <selectBtn :btnData="btnData" @changeBtn="_changeTimeType" :btnIndex.sync="btnIndex0"></selectBtn>
      <explain>起始于1993年，级别为省级，数据来源于海关总署</explain>
    </div>
    <div class="bigW-chart">
      <div class="chart-left">
        <h3 class="rank-title">{{pieTitle}}</h3>
        <tradePie :data="pieData" @changeArea="_changeArea" :tradeType="tradeType" :timeType="timeType" v-if="pieData.length"></tradePie>
      </div>
      <div class="chart-right">
        <h3 class="rank-title">{{rankTitile}}</h3>
        <rankingEchart :data="rankData" v-if="rankFlag" class="rank-chart"></rankingEchart>
      </div>
    </div>
    <timeScroll :scorllOption="scorllOption" @scorllTime="_scorllTime" class="timescroll"></timeScroll>
  </div>
</template>
<script>
  import selectTime from 'components/selectTime/selectTime';
  import selectBtn from 'components/selectBtn/selectBtn';
  import selectArea from 'components/selectArea/selectArea';
  import selectDiy from 'components/selectDiy/selectDiy';
  import selectBtn1 from 'components/selectBtn/selectBtn';
  import explain from 'components/explain/explain';

  import rankingEchart from './big/flow-ranking2';
  import tradePie from './big/trade-big-pie-chart';
  import timeScroll from 'components/timeScroll/timeScroll'
  export default {
    data() {
      return {
        btnData: ['月度', '年度'],
        btnData1: ['贸易量', '贸易额'],
        btnData2: ['出口', '进口'],
        timeType: 'year',
        selectAreaData: [],
        selectDiyData: ['鲜苹果', '苹果干', '苹果汁'],
        width: '6.8rem',
        height: '4.6rem',

        btnIndex0: 0,
        btnIndex1: 0,
        btnIndex2: 0,

        // 时间轴参数
        scorllOption: {
          width: '100%',
          height: '40px',
          id: 'b1',
          url: '',
          needDefault: true,
        },
        appleType: '', // 苹果类型参数
        tradeType: '', // 贸易类型参数， 贸易额 贸易量
        scrollTime: '', // 时间轴参数捕获
        exportType: '', // 进口出口

        area: '', // 左侧饼图的 area

        rankData: [], // 柱状图数据
        rankFlag: false,  // 排序数据获取到的flag
        pieData: [], // 饼图数据

        emitTitle: {}
      }
    },
    computed: {
      ApiParams() {
        return {
          TIME_ID: this.scrollTime,
          NAME: this.exportType,
          TIME_TYPE: this.timeType,
          PRODUCT: this.appleType,
          KIND: this.tradeType
        }
      },
      ApiRankParams() {
        return {
          TIME_ID: this.scrollTime,
          NAME: this.exportType,
          TIME_TYPE: this.timeType,
          PRODUCT: this.appleType,
          KIND: this.tradeType,
          AREA: this.area
        }
      },
      rankTitile() {
        let desc = this.exportType === '出口' ? '出口去向' : '进口来源'
        let trade = this.tradeType === '贸易额' ? '万美元' : this.timeType === 'month' ? '吨' : '万吨'
        return `${this.area}${this.appleType}${this.tradeType}${desc}排名（${trade}）`
      },
      pieTitle() {
        return `中国分省${this.tradeType}${this.exportType}流向`
      }
    },
    methods: {
      // 捕获事件类型参数，并 传给时间轴
      _changeTimeType(val) {
        this.timeType = val === '月度' ? 'month' : 'year'
        this.scorllOption.url = `apple/trade/countryFlow/getTimes?TIME_TYPE=${this.timeType}`
      },
      //自定义-下拉框改变
      _changeAppleType(val) {
        this.appleType = val
      },
      // 贸易类型参数捕获
      _changeTradeType(val) {
        this.tradeType = val
      },
      // 时间轴参数捕获
      _scorllTime(time) {
        this.scrollTime = time
      },
      // 进出口参数捕获
      _changeExport(name) {
        this.exportType = name
      },
      _changeArea(val) {
        this.area = val
      },
      getData() {
        this.$xhr.get('apple/trade/regionFlow', {
          params: {
            ...this.ApiParams
          }
        }).then((res) => {
          this.pieData = res.data
          if (res.data[0]) {
            this.area = res.data[0].name
          }
        })
      },
      getRankData() {
        this.$xhr.get('apple/trade/regionFlow', {
          params: {
            ...this.ApiRankParams
          }
        }).then((res) => {
          this.rankData = res.data
          this.rankFlag = true
        })
      }
    },
    components: {
      selectTime,
      selectArea,
      selectDiy,
      selectBtn,
      selectBtn1,
      explain,
      tradePie,
      rankingEchart,
      timeScroll
    },
    watch: {
      ApiParams(newVal) {
        let flag1 = newVal.TIME_ID.length === 4 && newVal.TIME_TYPE === 'year'
        let flag2 = newVal.TIME_ID.length === 6 && newVal.TIME_TYPE === 'month'
        let flag = flag1 || flag2
        if (flag && newVal.NAME && newVal.PRODUCT) {
          this.$emit('bigTwo', newVal)
          this.getData()
        }
      },
      ApiRankParams(newVal) {
        let flag1 = newVal.TIME_ID.length === 4 && newVal.TIME_TYPE === 'year'
        let flag2 = newVal.TIME_ID.length === 6 && newVal.TIME_TYPE === 'month'
        let flag = flag1 || flag2

        if (flag && newVal.NAME && newVal.PRODUCT && newVal.AREA && newVal.KIND) {
          this.getRankData()
        }
      }
    }
  }

</script>
<style lang="scss" scoped>
  @import "~assets/css/_variable.scss";
  @import "~assets/css/_mixin.scss";
  .bigW-option>div {
    margin-left: 0.4rem;
  }

  .bigW-chart {
    @include flex(space-between, center);
    margin-top: 0.5rem;
    width: 100%;
    flex: 1;
    font-size: 0;
    >div {
      @include flex(center, center);
      flex: 1 1 1px;
      height: 100%;
    }
  } // 修补样式
  .big-wrapper {
    @include flex(flex-start, center, column);
    padding: 0 .5rem .2rem .5rem;
    width: 100%;
    height: 100%;
    box-sizing: border-box;
  }

  .bigW-option {
    width: 100%;
  }

  .timescroll {
    margin-top: 0.5rem;
    width: 100%;
  }

  .chart-left {
    margin-right: 1.0rem;
  }

  .chart-left, .chart-right {
    @include flex(flex-start, center, column);
    flex-flow: column !important;
    justify-content: flex-start !important;
    .rank-title {
      @include flex(center, center);
      flex: 0 0 0.45rem;
      width: 100%;
      font-size: 18px;
    }
     .trade-pie-wrapper, .rank-chart {
      flex: 1;
      width: 100%;
      text-align: center;
    }
  }
</style>
