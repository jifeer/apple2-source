<template>
  <div class="trade-small4-wrapper">
    <tradeSmall4 :data="mapData" :time="time" :flowData="flowData" v-if="mapData.length && flowData.length"></tradeSmall4>
  </div>
</template>
<script>
  import tradeSmall4 from './small/trade-small-chart4'
  import { rightBarMixin } from 'assets/js/common.js'
  export default {
    name: 'trade-small4',
    data() {
      return {
        mapData: [],
        flowData: [],
        time: ''
      }
    },
    mounted() {
      this.getTime()
    },
    computed: {
      ApiParams() {
        return {
          // TIME_ID: this.scrollTime,
          // NAME: this.exportType,
          // TIME_TYPE: this.timeType,
          // PRODUCT: this.appleType
          TIME_ID: this.time,
          NAME: '出口',
          PRODUCT: '鲜苹果'
        }
      }
    },
    methods: {
      getTime() {
        this.$xhr.get('apple/trade/tradeDistribution/getTimes').then((res) => {
          this.time = res.data[res.data.length - 1]
          this.getEchartData()
          this.getFlowData()
        })
      },
      getEchartData() {
        this.$xhr.get('apple/trade/tradeDistribution', {
          params: {
            ...this.ApiParams
          }
        }).then((res) => {
          // 地图数据
          this.mapData = res.data
        })
      },
      // 获取 第一个 大弹窗 地图数据 与 柱状图数据 apple/trade/countryFlow
      getFlowData() {
        this.$xhr.get('apple/trade/tradeDistributionFlow', {
          params: {
            ...this.ApiParams
            // TIME_ID: '201707',
            // NAME: '出口',
            // TIME_TYPE: 'month',
            // PRODUCT: '鲜苹果'
          }
        }).then((res) => {
          // 地图数据
          this.flowData = res.data
        })
      }
    },
    components: {
      tradeSmall4
    }
  };

</script>
<style lang="scss" scoped>
  @import "./../../assets/css/_variable.scss";
  @import "./../../assets/css/_mixin.scss";
  .trade-small4-wrapper {
    width: 100%;
    height: 100%;
  }

</style>
