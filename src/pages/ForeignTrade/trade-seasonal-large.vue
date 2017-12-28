<template>
  <div class="trade-big-wrapper">
    <div class="trade-title">
      <h2>中国鲜苹果出口高峰在11月，进口高峰在4月，苹果汁出口高峰在12月</h2>
      <explain>根据近5年的月均贸易量，将时间序列分解成季节性规律，长期趋势和中短期波动，数值的大小表示该点与全年平均值之间相差多少个标准差，数据来源于海关总署。</explain>
    </div>
    <div class="trade-echarts-wrapper">
      <Linechart :echartsData="data" v-if="flag" class="line-chart"></Linechart>
    </div>
  </div>
</template>
<script>
  import { rightBarMixin } from 'assets/js/common.js'
  import Linechart from './big/trade-seasonal-law.vue'
  import { dataZoom, tooltipStyle, axisLabel } from 'assets/js/echarts-style'
  import explain from 'components/explain/explain';
  export default {
    name: 'seasonal-big',
    props: {},
    data() {
      return {
        data: {
          data1: [],
          data2: [],
          data3: [],
          data4: [],
          option: {}
        },
        flag: false
      }
    },
    mounted() {
      this.getSeasonData()
    },
    methods: {
      // 季节性规律 大小弹窗数据获取
      getSeasonData() {
        this.$xhr.get('apple/trade/getHpSeason').then((res) => {
          this.data.data1 = res.data[0].data
          this.data.data2 = res.data[1].data
          this.data.data3 = res.data[2].data
          this.data.data4 = res.data[3].data

          this.flag = true
        })
      }
    },
    components: {
      Linechart,
      explain
    }
  };

</script>
<style lang="scss" scoped>
  @import "./../../assets/css/_variable.scss";
  @import "./../../assets/css/_mixin.scss";

  .trade-big-wrapper {
    @include flex(flex-start, center, column);
    height: 100%;
  }

  .trade-title {
    @include flex(space-between, center);
    flex: 0 0 0.8rem;
    width: calc(100% - 120px) !important;
    box-sizing: border-box;
    h2 {
      font-size: 20px;
      .title-date {
        color: #019159;
      }
    }
  }

  .trade-echarts-wrapper {
    flex: 1 1 auto;
    height: 100%;
    width: 100%;
    padding: 0.4rem 0;
    .line-chart {
      width: 100%;
      height: 100%;
      box-sizing: border-box;
    }
  }

</style>
