<template>

  <div class="price-small-wrapper">
    <priceKline v-if="this.KlineData.data1.length" :echartsData="KlineData" :dateName="dateName"></priceKline>
  </div>

</template>

<script>
  import {extend} from 'assets/js/common'

  import {convertData, geoCoordMap} from 'assets/js/common'
  import priceKline from './echarts/price-riseFall-Klinesmall.vue'

  export default {

    name: 'seasonalSmall',
    data() {
      return {
        KlineData: {
          Xdata: [],
          data: [],
          data1: [],
          dateName: '',
          option: {
            minData:'',
            maxData:'',
          }
        }
      }

    },
    computed: {
      ApiKlineParms() {
        return {
          areas: '370000',
          areaType: 'province',
          timeType: 'month',
          times: '201701,201702,201703,201704,201705,201706,201707,201708,201709,201710,201711,201712'
        }
      }
    },
    methods: {
      rankingKline() {
        /*this.KlineData.data = [
          //数据顺序:[周初价,周末价,最低价,最高价]
          ['2013/1/24', 2320.26, 2320.26, 2287.3, 2362.94],
          ['2013/1/25', 2300, 2291.3, 2288.26, 2308.38],
          ['2013/1/28', 2295.35, 2346.5, 2295.35, 2346.92],
          ['2013/1/29', 2347.22, 2358.98, 2337.35, 2363.8],
          ['2013/1/30', 2360.75, 2382.48, 2347.89, 2383.76],
          ['2013/1/31', 2383.43, 2385.42, 2371.23, 2391.82],
          ['2013/2/1', 2377.41, 2419.02, 2369.57, 2421.15],
          ['2013/2/4', 2425.92, 2428.15, 2417.58, 2440.38],
          ['2013/2/5', 2411, 2433.13, 2403.3, 2437.42],
          ['2013/2/6', 2432.68, 2434.48, 2427.7, 2441.73],
          ['2013/2/7', 2430.69, 2418.53, 2394.22, 2433.89],
          ['2013/2/8', 2416.62, 2432.4, 2414.4, 2443.03],
          ['2013/2/18', 2441.91, 2421.56, 2415.43, 2444.8],
          ['2013/2/19', 2420.26, 2382.91, 2373.53, 2427.07],
          ['2013/2/20', 2383.49, 2397.18, 2370.61, 2397.94],
          ['2013/2/21', 2378.82, 2325.95, 2309.17, 2378.82],
          ['2013/2/22', 2322.94, 2314.16, 2308.76, 2330.88],
          ['2013/2/25', 2320.62, 2325.82, 2315.01, 2338.78],
          ['2013/2/26', 2313.74, 2293.34, 2289.89, 2340.71],
          ['2013/2/27', 2297.77, 2313.22, 2292.03, 2324.63],
          ['2013/2/28', 2322.32, 2365.59, 2308.92, 2366.16],
          ['2013/3/1', 2364.54, 2359.51, 2330.86, 2369.65],
          ['2013/3/4', 2332.08, 2273.4, 2259.25, 2333.54],
          ['2013/3/5', 2274.81, 2326.31, 2270.1, 2328.14],
          ['2013/3/6', 2333.61, 2347.18, 2321.6, 2351.44]
        ],
        this.KlineData.data1 = [2310, 2310, 2285, 2357, 2360, 2373, 2377, 2435, 2431, 2432, 2430, 2426, 2431, 2430, 2373, 2378, 2352, 2330, 2323, 2287, 2332, 2360, 2330, 2270, 2330]*/
        //处理K线图的后台交互
        this.$xhr.get('apple/price/monitor/getPriceTrend', {
          params: {
            ...this.ApiKlineParms
          }
        }).then((res) => {
          //console.log(res)
          /* let Xdata = []
           res.data.data.forEach((val)=>{
             Xdata.push(val[0])
           })*/
          //console.log(Xdata)
          this.KlineData.data = res.data.data
          this.KlineData.data1 = res.data.data1
          this.KlineData.Xdata = res.data.Xdata
          this.dateName = '月'
          this.KlineData.minData = (res.data.min*0.9).toFixed(1)
          this.KlineData.maxData = (res.data.max*1.1).toFixed(1)
        })

      }

    },
    mounted() {
      this.rankingKline()
    },
    components: {
      priceKline
    },
    watch: {
      ApiKlineParms(newVal) {
        // console.log(newVal)
        this.getKlineData()
      }
    }
  };
</script>

<style lang="scss" scoped>
  @import "./../../assets/css/_variable.scss";
  @import "./../../assets/css/_mixin.scss";

  .price-small-wrapper {
    width: 100%;
    height: 100%;
  }

  .price-small-wrapper > div {
    height: 100%;
  }
</style>
