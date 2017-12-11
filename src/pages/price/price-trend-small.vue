<template>

  <div class="product-small-wrapper">
    <elementLine v-if="echartsData.data1.length" :echartsData="echartsData"></elementLine>
  </div>

</template>

<script>
  import elementLine from 'pages/price/echarts/price-trend-linesmall.vue'

  export default {

    name: 'warning-small',
    data() {
      return {
        echartsData: {
          xAxisData: [],
          data1: [],
          data2: [],
          data3: [],
          data4: [],
          data5: [],
          name1: [],
          name2: [],
          name3: [],
          name4: [],
          name5: [],
          option: {}
        }
      };
    },
    computed: {
      ApibtnParms() {
        return {
          name: '全国',
          times: '2012,2013,2014,2015,2016,2017',
          timeType: 'year'
        }
      }
    },
    methods: {
      /*firstLoad() {
        this.echartsData.xAxisData = ['2016-01', '2016-02', '2016-03', '2016-04', '2016-05', '2016-06', '2016-07', '2016-08']
        this.echartsData.seriesData[0] = [7, 5, 4, 8, 6, 5, 6, 8]
        this.echartsData.seriesData[1] = [3, 6, 7, 5, 8, 7, 5, 7]
        this.echartsData.seriesData[2] = ['-', '-', 9, 10, '-', '-', '-', '-']
        this.echartsData.seriesData[3] = ['-', 2, 2, '-', '-', 2, 3, '-']
      }*/
      getTrendData() {
        this.$xhr.get('apple/price/getEveryPriceData', {
          params: {
            ...this.ApibtnParms
          }
        }).then((res) => {
          //console.log(res)
          this.echartsData.xAxisData = res.data.time
          this.echartsData.data1 = res.data.lsjg
          this.echartsData.data2 = res.data.pfjg
          this.echartsData.data3 = res.data.jkjg
          this.echartsData.data4 = res.data.ckjg
          this.echartsData.data5 = res.data.sgjg
          /*let legendData = []
          if (res.data.hasOwnProperty('lsjg')) {
            legendData.push('零售价格')
          } if (res.data.hasOwnProperty('pfjg')){
            legendData.push('批发价格')
          } if (res.data.hasOwnProperty('jkjg')){
            legendData.push('进口价格')
          } if (res.data.hasOwnProperty('ckjg')){
            legendData.push('出口价格')
          } if (res.data.hasOwnProperty('sgjg')){
            legendData.push('收购价格')
          }

          this.echartsData.legendData = legendData*/

          this.echartsData.name1 = '零售价格'
          this.echartsData.name2 = '批发价格'
          this.echartsData.name3 = '进口价格'
          this.echartsData.name4 = '出口价格'
          this.echartsData.name5 = '收购价格'
        })
      }
    },
    mounted() {
      this.getTrendData()
    },
    components: {
      elementLine
    },
    watch: {
      ApibtnParms(newVal) {
        this.getTrendData()
      }
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
