<template>

  <div class="product-small-wrapper">
    <delayBar :echartsData="echartsData" :selectedName="selectedName"></delayBar>
  </div>

</template>

<script>
  import delayBar from './echarts/price-delay-barsmall.vue'
  import {$, rightBarMixin} from 'assets/js/common.js'

  export default {

    name: 'delay-small',
    data() {
      return {
        echartsData: {
          xAxisData: [],
          seriesData: [],
          option: {}
        },
        selectedName: '河北省',
      };
    },
    computed: {
      getDelayParams() {
        return {
          area: '河南省'
        }
      }
    },
    methods: {
      getDelayData() {
        /*this.echartsData.xAxisData = ['上海', '内蒙', '贵州', '甘肃', '新疆', '安徽', '天津', '北京', '四川', '江西', '湖南', '重庆', '黑龙江', '湖北', '浙江', '江苏', '广西', '广东']
        this.echartsData.seriesData = [1.9, 2.1, 1.4, 1.7, 2.5, 2.3, 1.8, 2.6, 2.2, 1.9, 2.4, 1.5, 2.3, 1.5, 1.8, 2.0, 2.7, 1.8]*/
        this.$xhr.get('apple/price/conduction/getDelay', {
          params: {
            ...this.getDelayParams
          }
        }).then((res) => {
          //console.log(res)
          this.echartsData.xAxisData = res.data.AreaData
          this.echartsData.seriesData = res.data.DelayData
        })

      }
    },
    mounted() {
      this.getDelayData()
    },
    components: {
      delayBar
    },
    watch: {

    }
  };
</script>

<style lang="scss" scoped>
  @import "./../../assets/css/_variable.scss";
  @import "./../../assets/css/_mixin.scss";

  .product-small-wrapper {
    width: 100%;
    height: 100%;
  }

  .product-small-wrapper > div {
    height: 100%;
  }
</style>
