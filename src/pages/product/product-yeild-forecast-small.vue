<template>
  <div class="small-wrapper">
    <productYeild :echartsData="echartsData" :width="width" :height="height"></productYeild>
  </div>
</template>

<script>
  import productYeild from 'pages/product/echarts/product-yeild';
  import {rightBarMixin} from 'assets/js/common.js'
  export default {
    name: 'yeildSmall',
    data(){
      return {
        echartsData: {
          id: "yeild-small",
          xdata: [],
          data1: [],
          data2: [],
        },
        width: '100%',
        height: '100%',
      }
    },
    mounted() {
      this.renderChart()
    },
    methods: {
      renderChart(){
        //  在这里修改数据

        this.$xhr.get('apple/production/yieldForecast', {
          params: {
            AREA_NAME: '陕西',
            TIME_ID: '2002,2003,3004,2005,2006,2007,2008,2009,2010,2011,2012,2013,2014,2015,2016,2017',
            type: 1
          }
        })
          .then((res) => {
            this.echartsData.xdata = res.data.dates
            this.echartsData.data1 = res.data.data1
            this.echartsData.data2 = res.data.data2
          })
        /*this.echartsData.data1 = [];
         this.echartsData.data2 = [];
         this.echartsData.xdata = ['2002', '2003', '2004', '2005', '2006', '2007', '2008', '2009', '2010', '2011', '2012', '2013', '2014', '2015', '2016'];
         for (let i = 1; i < this.echartsData.xdata.length + 1; i++) {
         this.echartsData.data1.push(Math.round(Math.random() * 100));
         this.echartsData.data2.push(Math.round(Math.random() * 100));
         }*/

      },
    },
    components: {
      productYeild
    }

  };
</script>

<style lang="scss" scoped>
  @import "./../../assets/css/_variable.scss";
  @import "./../../assets/css/_mixin.scss";

  .small-wrapper {
    height: 100%;
    padding: 0 0.2rem;
  }
</style>
