<template>
  <div class="price-big-wrapper">
    <div class="price-title">
      <h2>苹果价格在<span>7-8</span>月出现峰值，<span>11-12</span>月出现谷底。</h2>
      <explain :eText="eText"></explain>
    </div>
    <div class="price-echarts-wrapper">
      <Linechart v-if="echartsData.data1.length" :echartsData="echartsData"></Linechart>
    </div>
  </div>
</template>

<script>
  import {rightBarMixin} from 'assets/js/common.js'
  import Linechart from './echarts/price-seasonal-law.vue'
  import explain from 'components/explain/explain';

  export default {
    name: 'seasonal-big',
    data() {
      return {
        eText: '以最近五年的数据分析苹果批发和零售价格季节性波动规律，数据来源于农业部。',
        echartsData: {
          xAxisData: [],
          data1: [],
          data2: [],
          option: {
            xAxis: [{
              show: true,
            }]
          }
        }
      };
    },
    computed: {
      getSeasonalParams() {
        return {
          area: '全国'
        }
      }
    },
    mounted() {
      this.getSeasonalData()
    },
    methods: {
      getSeasonalData() {
        /*this.echartsData.xAxisData = ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月']
       this.echartsData.data1 = [24.8, 29.6, 24.1, 26.3, 26.4, 24.8, 20.6, 24.1, 26.3, 16.4, 12, 22]
       this.echartsData.data2 = [4.8, 29.6, 24.1, 26.3, 26.4, 4.8, 29.6, 34.1, 16.3, 36.4, 32, 52]*/
        this.$xhr.get('apple/price/monitor/getHpSeason', {
          params: {
            ...this.getSeasonalParams
          }
        }).then((res) => {
          //console.log(res)
          this.echartsData.xAxisData = res.data.months;
          this.echartsData.data1 = res.data.pifa;
          this.echartsData.data2 = res.data.lingshou;
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

  .big-window-cont {
    width: 100%;
    height: calc(100% - 0.92rem);
  }

  .price-big-wrapper {
    height: calc(100% - 0.92rem);
  }

  .price-big-wrapper, .price-echarts-wrapper > div {
    width: 100%;
    height: 100%;
  }

  .price-echarts-wrapper {
    height: calc(100% - 0.8rem);
    //height: 4.7rem;
    padding: 0.2rem 0.4rem 0.5rem;
    box-sizing: border-box;
  }

  .price-echarts-wrapper > div {
    height: 100%;
  }

  .price-title {
    display: flex;
    height: 0.8rem;
    align-items: center;
    justify-content: space-between;
   /* border-bottom: 1px solid #054672;*/
    margin: 0 0.6rem;
    h2 {
      font-size: 0.24rem;
      span {
        color: #00af67;
      }
    }
  }
</style>
