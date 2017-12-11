<template>
  <div class="price-conduction-wrapper">
    <div class="Mapecharts-box">
      <Mapecharts :echartsData="echartsData" :auxiliary="auxiliary" :flag="flag" @changeProvince="changeProvince" :flowType="marketclass"></Mapecharts>
    </div>
  </div>
</template>

<script>
  import Mapecharts from './echarts/price-conduction-smallchart.vue'
  import {rightBarMixin, convertData} from 'assets/js/common'

  export default {
    mixins: [rightBarMixin],
    data() {
      return {
        flag: true,
        auxiliary: null,
        btnIndex: 0,
        isHide: false,
        marketclass: 'p2s',
        area: '山东',
        screenWidth: document.body.clientWidth,   // 这里是给到了一个默认值 （这个很重要）
        echartsData: {
          xdata: [],
          data: [],
          option: {
            visualMap: {
              //inverse: true,
              itemHeight: 5,
              itemWidth: 7,
              itemGap: 0,
              left: '10%',
              bottom: '6%',
            },
            lineStyle: {
              normal: {
                type: 'dashed'
              }
            }
          }
        }
      }
    },
    computed: {
      conductionDataParms() {
        return {
          area: this.area,
          type: 'p2s',
        }
      }
    },
    mounted() {
      this.getConductiondata()
    },
    methods: {
      getConductiondata() {
        this.$xhr.get('apple/price/conduction/getPriceContribute', {
          params: {
            ...this.conductionDataParms
          }
        }).then((res) => {
          //console.log(res)
          let dataArr = [];
          if (res.data.data.length > 0) {
            res.data.data.forEach(function (val, index, arr) {
              dataArr.push(val);
            })
            this.auxiliary = res.data.areas
            //this.auxiliary = [{ name: '山东', value: 0 }, { name: '北京', value: 0 }]
            this.echartsData.data = [{
              name: this.area,
              data: dataArr
            }]
          }
          //console.log(dataArr)
        })
      },
      changeProvince(provinceName) {
        this.area = provinceName;
      }
    },
    components: {
      Mapecharts,
    },
    watch: {
      conductionDataParms(newVal) {
        if (newVal.area) {
          this.getConductiondata()
        }

      }
    }

  }
</script>

<style lang="scss" scoped>
  @import "./../../assets/css/_variable.scss";
  @import "./../../assets/css/_mixin.scss";

  .price-conduction-wrapper {
    width: 100%;
    height: 100%;
  }

  .map-echarts-wrapper {
    margin: 0 auto;
    position: relative;
    z-index: 0;
    width: 100%;
    height: 100%;

  }

  .Mapecharts-box {
    height: 100%;
  }

  .map-echarts-wrapper > div {
    width: 100%;
    height: 100%;
  }
</style>
