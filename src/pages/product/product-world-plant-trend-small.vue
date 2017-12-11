<template>
  <div class="small-wrapper">
    <productWorldTrend :echartsData="echartsData" :width="width" :height="height"></productWorldTrend>
  </div>
</template>

<script>
  import productWorldTrend from 'pages/product/echarts/product-world-trend';
  import {rightBarMixin} from 'assets/js/common.js'
  export default {
    data(){
      return {
        echartsData: {
          xdata: [],
          cdata1: [],
          cdata2: [],
          wdata1: [],
          wdata2: [],
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
        //  get data from server
        this.$xhr.get('apple/production/changeQq',{
          params: {
            AREA_NAME: '全球,中国',
            TIME_ID: '2000,2001,2002,2003,2004,2005,2006,2007,2008,2009,2010,2011,2012,2013,2014',
            type: '121689'
          }
        })
          .then((res) => {
            this.echartsData.xdata = res.data.xdata
            this.echartsData.wdata1 = res.data['全球'].data1
            this.echartsData.wdata2 = res.data['全球'].data2
            this.echartsData.cdata1 = res.data['中国'].data1
            this.echartsData.cdata2 = res.data['中国'].data2
          })
          .catch((err) => {
            console.log(err)
          })
      },

    },
    components: {
      productWorldTrend
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
