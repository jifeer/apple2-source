<template>

  <div class="price-small-wrapper">
    <Linechart v-if="echartsData.data1.length" :echartsData="echartsData"></Linechart>
  </div>

</template>

<script>
  import {extend} from 'assets/js/common'
  import Linechart from './echarts/price-seasonal-lawsmall.vue'

  export default {

    name: 'seasonalSmall',
    data() {
      return {
        echartsData: {
          xAxisData: [],
          data1: [],
          data2: [],
          option: {
            /*dataZoom: '',
            legend: {
              show: false
            },

            xAxis: [{
              axisLabel: {
                show: false,
                textStyle: {
                  fontSize: 14,
                  color: '#e9e9ea'
                }
              }
            }],
            series: [{}, {}, {}, {},
              {
                markArea: {
                  label: {
                    normal: {
                      offset: [0, 10],
                      align: 'center',
                      position: 'bottom',
                      textStyle: {
                        color: '#fff',
                        fontSize: 14
                      }
                    }
                  }

                }
              }]*/
          }
        }
      };
    },
    computed: {
      getSeasonalParams() {
        return {
          area: '全国'
        }
      }
    },
    /*watch(){
      this.getSeasonalData()
    },*/
    mounted() {
      this.getSeasonalData()
    },
    methods: {
      getSeasonalData() {
        /*this.echartsData.xAxisData = ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月']
        this.echartsData.data1 = [24.8, 29.6, 24.1, 26.3, 26.4, 24.8, 20.6, 24.1, 26.3, 16.4, 12, 22]
        this.echartsData.data2 = [4.8, 29.6, 24.1, 26.3, 26.4, 4.8, 29.6, 34.1, 16.3, 36.4, 32, 52]*/
        this.$xhr.get('apple/price/monitor/getHpSeason', {
          params: {
            ...this.getSeasonalParams
          }
        }).then((res) => {
          //console.log(res.data)
          this.echartsData.xAxisData = res.data.months
          this.echartsData.data1 = res.data.pifa
          this.echartsData.data2 = res.data.lingshou

        })
      }
    },
    components: {
      Linechart
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
