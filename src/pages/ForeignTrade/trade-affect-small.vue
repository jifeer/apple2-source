<template>
  <div class="trade-small7-wrapper">
    <tradeSmall7 :data="echartsData" v-if="echartsData1Flag"></tradeSmall7>
  </div>
</template>
<script>
  import tradeSmall7 from './small/trade-small7-chart.vue'

  export default {
    name: 'trade-small7',
    data() {
      return {
        echartsData: {},
        echartsData1Flag: false
      };
    },
    mounted() {
      this.getData()
    },
    methods: {
      getData() {
        this.$xhr.get('apple/trade/influenceFactorsAnalysis').then((res) => {
          this.echartsData = res.data
          this.echartsData1Flag = true
        })
      }
    },
    components: {
      tradeSmall7
    }
  };

</script>
<style lang="scss" scoped>
  @import "~assets/css/_variable.scss";
  @import "~assets/css/_mixin.scss";
  .trade-small7-wrapper {
    width: 100%;
    height: 100%;
  }

  .trade-small7-wrapper>div {
    height: 100%;
  }

</style>
