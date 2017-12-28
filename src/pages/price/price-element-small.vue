<template>
  <div class="product-small-wrapper">
    <elementBar v-if="this.chartBarData.Xdata.length" :chartBar="chartBarData"></elementBar>
  </div>
</template>

<script>
  import elementBar from './echarts/price-element-barsmall.vue'

  export default {

    name: 'warning-small',
    data() {
      return {
        chartBarData: {
          Xdata: [],
          data1: [],
          data2: [],
          data3: [],
          data4: [],
          option: {
            legend: {
              show: false
            },
            grid: {
              bottom: '15%',
              top: '18%',
              left: '5%',
              right: '5%'
            }
          }
        }
      };
    },
    mounted() {
      this.getElementData()
    },
    methods: {
      /*getElementData() {
        //折线的数据
        this.chartBarData.Xdata = ['2006-2007年度', "2008-2019年度"]
        this.chartBarData.data1 = [5, 1]
        this.chartBarData.data2 = [2, -1]
        this.chartBarData.data3 = [4, -3]
        this.chartBarData.data4 = [-1, 4]
      }*/
      getElementData() {
        //柱图的数据
        this.$xhr.get('apple/price/influence/impact', {
          /*params: {
            ...this.getElementParams
          }*/
        }).then((res) => {
          //console.log(res)
          this.chartBarData.Xdata = res.data.time
          this.chartBarData.data1 = res.data.data[0].data
          this.chartBarData.data2 = res.data.data[1].data
          this.chartBarData.data3 = res.data.data[2].data
          this.chartBarData.data4 = res.data.data[3].data
        })
      }
    },
    components: {
      elementBar
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
