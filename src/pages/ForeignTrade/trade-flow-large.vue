<template>
  <div class="product-historical-wrapper big-wrapper trade-large-wrapper">
    <!-- <div class="bigW-intro">{{title}}</div> -->
    <div class="bigW-option">
      <selectDiy :data="selectDiyData" @change="_changeAppleType" class="marginRight"></selectDiy>
      <selectBtn :btnData="btnData" @changeBtn="_changeExportType" :btnIndex.sync="btnIndex" class="marginRight"></selectBtn>
      <selectBtn :btnData="monthOrYear" @changeBtn="_changeTimeType" :btnIndex.sync="btnIndex2" class="marginRight"></selectBtn>
      <explain>数据起始于1988年，贸易流向数据起始于1997年，源于联合国商品贸易统计数据库，中国数据来源于海关总署。</explain>
    </div>
    <div class="large-chart">
      <div class="large-chart-left">
        <tradeLargeChart1 :data="echartsData" class="world-chart" :dir="exportType" v-if="rankingEchart.length"></tradeLargeChart1>
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
  import tradeLargeChart1 from './big/trade-big-chart1'
  import rankingEchart from './echart/flow-ranking'
  import timeScroll from 'components/timeScroll/timeScroll'

  export default {
    name: 'trade-small1',
    data() {
      return {
        btnIndex: 0,
        btnIndex2: 0,
        // title: '2016年中国鲜苹果出口前三国家为孟加拉国、印度、泰国，第一进口来源为美国。',
        timeType: 'year',
        isHideChina: true,

        selectDiyData: ['鲜苹果', '苹果干', '苹果汁'],
        rankingEchart: [],
        rankingEchartToggle: true,

        // 时间轴参数
        scorllOption: {
          width: '100%',
          height: '40px',
          id: 'b1',
          url: '',
          needDefault: true,
        },

        title: '', // 标题文字内容

        scrollTime: '', // 时间轴 的时间
        appleType: '', // 苹果干 鲜苹果参数
        exportType: '', // 进口出口 参数
        btnData: ['出口', '进口'],
        monthOrYear: [{ name: '月度', value: 'month' }, { name: '年度', value: 'year' }],
        echartsData: [],
        topThree: '', // 前三国家

        emitTitle: {}
      }
    },
    created() {
      // this.rankingBar()
    },
    mounted() {
      // this.getPopOneData()
    },
    computed: {
      // title() {
      //   // '2016年中国鲜苹果出口前三国家为孟加拉国、印度、泰国，第一进口来源为美国。',
      //   let timeType = this.timeType === 'year' ? '年' : '月'
      //   let time = ''
      //   if (this.timeType === 'month') {
      //     time = this.scrollTime.slice(0, 4) + '年' + this.scrollTime.slice(4)
      //   } else {
      //     time = this.scrollTime
      //   }
      //   return `${time}${timeType}中国${this.appleType}${this.exportType}前三国家为 ${this.topThree}`
      // },
      ApiTitleParams() {
        return {
          TIME_ID: this.scrollTime,
          TIME_TYPE: this.timeType,
          PRODUCT: this.appleType
        }
      },
      ApiParams() {
        return {
          TIME_ID: this.scrollTime,
          NAME: this.exportType,
          TIME_TYPE: this.timeType,
          PRODUCT: this.appleType
        }
      },
      rankTitle() {
        let desc = this.exportType === '出口' ? '出口去向' : '进口来源'
        return '中国' + this.appleType + desc + '排名（吨）'
      }
    },
    methods: {
      // 捕获事件类型参数，并 传给时间轴
      _changeTimeType(timeType) {
        this.timeType = timeType
        this.scorllOption.url = `apple/trade/countryFlow/getTimes?TIME_TYPE=${timeType}`
      },
      // 进出口按钮切换
      _changeExportType(val) {
        this.exportType = val
      },
      // 鲜苹果 苹果干 参数捕获
      _changeAppleType(item) {
        this.appleType = item
        this.emitTitle.appleType = item
      },
      // 时间轴参数
      _scorllTime(time) {
        this.scrollTime = time
        this.emitTitle.time = time
      },
      // 获取title标题数据
      getTitleData() {
        this.$xhr.get('apple/trade/countryFlowTittle', {
          params: {
            ...this.ApiTitleParams
          }
        }).then((res) => {
          // '2016年中国鲜苹果出口前三国家为孟加拉国、印度、泰国，第一进口来源为美国。',
          let timeType = this.timeType === 'year' ? '年' : '月'
          let time = ''
          if (this.timeType === 'month') {
            time = this.scrollTime.slice(0, 4) + '年' + this.scrollTime.slice(4)
          } else {
            time = this.scrollTime
          }

          // 年我国鲜苹果/苹果汁出口前三国家为**、**、**，第一进口来源国为**（苹果汁没有后半句，苹果干无标题）。
          if (this.appleType === '鲜苹果') {
            this.title = `${time}${timeType}中国${this.appleType}出口前三国家为 ${res.data.ex.join('、')}，第一进口来源为${res.data.im}`
          } else if (this.appleType === '苹果汁') {
            this.title = `${time}${timeType}中国${this.appleType}出口前三国家为 ${res.data.ex.join('、')}`
          } else {
            this.title = ''
          }
        })
      },
      //获取地图数据
      // 获取 第一个 大弹窗 地图数据 与 柱状图数据
      getPopOneData() {
        this.$xhr.get('apple/trade/countryFlow', {
          params: {
            ...this.ApiParams
          }
        }).then((res) => {
          // 地图数据
          this.echartsData = res.data

          // 前三国家
          this.topThree = res.data[0].rank[0].slice(0, 3).join('，')

          // 倒序数据
          res.data[0].rank[0] = res.data[0].rank[0].reverse()
          res.data[0].rank[1].sort((a, b) => a - b)
          this.rankingEchart = res.data[0].rank
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
      tradeLargeChart1,
      rankingEchart,
      timeScroll
    },
    watch: {
      ApiParams: {
        handler: function(newVal, oldVal) {
          let flag1 = newVal.TIME_ID.length === 4 && newVal.TIME_TYPE === 'year'
          let flag2 = newVal.TIME_ID.length === 6 && newVal.TIME_TYPE === 'month'
          let flag = flag1 || flag2
          if (flag && newVal.NAME && newVal.PRODUCT) {
            this.$emit('bigOneTime', newVal)
            this.getPopOneData()
          }
        },
        deep: true
      },
      ApiTitleParams: {
        handler: function(newVal, oldVal) {
          let flag1 = newVal.TIME_ID.length === 4 && newVal.TIME_TYPE === 'year'
          let flag2 = newVal.TIME_ID.length === 6 && newVal.TIME_TYPE === 'month'
          let flag = flag1 || flag2
          if (flag && newVal.PRODUCT) {
            this.getTitleData()
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
    box-sizing: border-box; // overflow-y: hidden;
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
