<template>
  <div class="chart-wrapper">
    <tradeSeasonal :echartsData="data" v-if="flag"></tradeSeasonal>
  </div>
</template>
<script>
  import tradeSeasonal from './small/trade-seasonal-law.vue'
  export default {
    name: 'trade-small1',
    data() {
      return {
        data: {
          data1: [],
          data2: [],
          data3: [],
          data4: []
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
      tradeSeasonal
    }
  };

</script>
<style lang="scss" scoped>
  @import "./../../assets/css/_variable.scss";
  @import "./../../assets/css/_mixin.scss";
  .chart-wrapper {
    width: 100%;
    height: 100%;
  }

  .chart-wrapper>div {
    height: 100%;
  }

</style>
