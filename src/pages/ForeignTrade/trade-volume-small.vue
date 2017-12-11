<template>
  <div class="trade-small-wrapper">
    <tradeVolumeChart :data="echartsData" v-if="echartsData.length && time.length" :time="time" class="world-chart"></tradeVolumeChart>
  </div>
</template>
<script>
  import { rightBarMixin } from 'assets/js/common.js'
  import tradeVolumeChart from './small/trade-volume-small-chart.vue'
  import { dataZoom, tooltipStyle, axisLabel } from 'assets/js/echarts-style'
  export default {
    name: 'trade-small5',
    data() {
      return {
        time: '',
        echartsData: []
      };
    },
    mounted() {
      this.getTime()
    },
    computed: {
      ApiParams() {
        return {
          TIME_ID: this.time,
          NAME: '出口',
          AREA: '中国',
          PRODUCT: '鲜苹果'
        }
      }
    },
    methods: {
      getTime() {
        this.$xhr.get('apple/trade/history/getTime', {
          params: {
            areaId: '中国',
            timeType: 'year'
          }
        }).then((res) => {
          let defaultTime = res.data.default.split('-')
          let i = defaultTime[0]
          let str = ''
          while(i <= defaultTime[1]) {
            str += i + ','
            i++
          }
          this.time = str.slice(0, -1)
          this.getData()
        })
      },
      getData() {
        this.$xhr.get('apple/trade/history', {
          params: {
            ...this.ApiParams
          }
        }).then((res) => {
          this.echartsData = res.data
        })
      }
    },
    components: {
      tradeVolumeChart
    }
  };

</script>
<style lang="scss" scoped>
  @import "./../../assets/css/_variable.scss";
  @import "./../../assets/css/_mixin.scss";
  .small-window-cont {
    .trade-small-wrapper {
      height: 100%;
    }
  }

  .trade-small-wrapper {}

</style>
