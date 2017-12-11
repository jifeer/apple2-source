<template>
  <div class="trade-small-wrapper">
    <tradePie :data="pieData" v-if="pieData.length"></tradePie>
  </div>
</template>
<script>
  import tradePie from './small/trade-pie-chart';
  import { rightBarMixin } from 'assets/js/common.js'

  export default {
    name: 'trade-small3',
    data() {
      return {
        pieData: []
      };
    },
    mounted() {
      this.getTime()
    },
    computed: {
      ApiParams() {
        return {
          TIME_ID: this.scrollTime,
          NAME: '出口',
          TIME_TYPE: 'month',
          PRODUCT: '鲜苹果',
          KIND: '贸易额'
        }
      }
    },
    methods: {
      getTime() {
        this.$xhr.get('apple/trade/countryFlow/getTimes', {
          params: {
            TIME_TYPE: 'month'
          }
        }).then((res) => {
          this.scrollTime = res.data[res.data.length - 1].replace('-', '')
          // 获取时间后 调取饼图数据
          this.getData()
        })
      },
      getData() {
        this.$xhr.get('apple/trade/regionFlow', {
          params: {
            ...this.ApiParams
          }
        }).then((res) => {
          this.pieData = res.data
        })
      }
    },
    components: {
      tradePie
    }
  };

</script>
<style lang="scss" scoped>
  @import "./../../assets/css/_variable.scss";
  @import "./../../assets/css/_mixin.scss";
  .trade-small-wrapper,
  .trade-small-wrapper>div,
  .trade-pie-wrapper>div {
    height: 100%;
  }

</style>
