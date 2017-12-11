<template>

  <div class="product-small-wrapper">
    <Linechart v-if="this.lineChartData.data1.length" :lineChart="lineChartData"></Linechart>
  </div>

</template>

<script>
  import {$, extend} from 'assets/js/common'

  import {convertData, geoCoordMap} from 'assets/js/common'
  import Linechart from './echarts/price-forecast-linesmall.vue'

  export default {

    name: 'warning-small',
    data() {
      return {
        lineChartData: {
          Xdata: [],
          data1: [],
          data2: [],
          option: {}
        }
      };
    },
    computed: {
      ApibtnParms() {
        return {
          areaName: '北京市',
          timeType: 'nextMonth'
        }
      }
    },
    methods: {
      /*getWarningData() {
        //折线的数据
        this.lineChartData.Xdata = ['北京', "山西", "陜西", "河南", "河北", '广州', '湖北', '山东', '湖南', '天津']
        this.lineChartData.data1 = [50, 40, 30, 20, 10, 10, 20, 30, 40, 50]
        this.lineChartData.data2 = [30, 60, 70, 80, 125, 70, 100, 150,]
      }*/
      getWarningData() {
        this.$xhr.get('apple/price/waring/priceForecast', {
          params: {
            ...this.ApibtnParms
          }
        }).then((res) => {
          /*console.log(res)
          console.log(res.data.year)*/
          //折线的数据
          this.lineChartData.Xdata = res.data.year
          this.lineChartData.data1 = res.data.data1
          this.lineChartData.data2 = res.data.data2
        })

      }
    },
    mounted() {
      this.getWarningData()
    },
    components: {
      Linechart
    },
    watch: {}

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
