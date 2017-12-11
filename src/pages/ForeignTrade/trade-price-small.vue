<template>
  <div class="trade-small5-wrapper">
    <tradeSmall5 :data="echartsData" v-if="flag"></tradeSmall5>
  </div>
</template>
<script>
  import tradeSmall5 from './small/trade-small5-chart.vue'

  export default {
    name: 'trade-small5',
    data() {
      return {
        echartsData: [],
        time: '',
        area: '',
        flag: false       // 获取数据后的flag
      };
    },
    mounted() {
      this._changeArea()
      // this.getData()
    },
    computed: {
      ApiParams() {
        return {
          TIME_ID: this.time,
          AREA: this.area,
          PRODUCT: '鲜苹果'
        }
      }
    },
    methods: {
      _chooseTime() {
        // this.time = val.time
        this.$xhr.get('apple/trade/scale/getTime', {
          params: {
            areaId: this.area
          }
        }).then((res) => {
          this.time = res.data.year.slice(0, 10).join(',')
        })
      },
      // 地区下拉
      _changeArea() {
        // this.area = val
        this.$xhr.get('apple/trade/internationalStatus/getArea').then((res) => {
          this.area = res.data.slice(0, 3).join(',')
          this._chooseTime()
        })
      },
      getData() {
        this.$xhr.get('apple/trade/internationalStatus', {
          params: {
            ...this.ApiParams
          }
        }).then((res) => {
          this.echartsData = res.data
          this.flag = true
        })
      }
    },
    components: {
      tradeSmall5
    },
    watch: {
      ApiParams(val) {
        if (val.TIME_ID && val.AREA && val.PRODUCT) {
          this.getData()
        }
      }
    }
  };

</script>
<style lang="scss" scoped>
  @import "./../../assets/css/_variable.scss";
  @import "./../../assets/css/_mixin.scss";
  .trade-small5-wrapper {
    width: 100%;
    height: 100%;
  }

  .trade-small5-wrapper>div {
    height: 100%;
  }

</style>
