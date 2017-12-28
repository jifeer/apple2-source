<template>
  <div class="small-wrapper">
    <disasterMap :echartsData="echartsData" :width="width" :height="height"></disasterMap>
  </div>
</template>
this.renderChart()

<script>
  import disasterMap from 'pages/product/echarts/product-map-province';
  import {rightBarMixin} from 'assets/js/common.js'
  export default {
    name: 'disaster-map',
    data(){
      return {
        echartsData: {
          data: {},
          province: '山东'
        },
        width: '100%',
        height: '100%',
      }
    },
    created() {
      this.renderChart()
    },
    mounted() {
    },
    methods: {
      renderChart(){
        //  在这里修改数据
        /*this.echartsData.data1 = [];
         this.echartsData.data2 = [];
         this.echartsData.xdata = ['2002', '2003', '2004', '2005', '2006', '2007', '2008', '2009', '2010', '2011', '2012', '2013', '2014', '2015', '2016'];
         for (let i = 1; i < this.echartsData.xdata.length + 1; i++) {
         this.echartsData.data1.push(Math.round(Math.random() * 100));
         this.echartsData.data2.push(Math.round(Math.random() * 100));
         }*/

        this.$xhr.get('apple/production/disasterMonitor', {
          params: {
            AREA_NAME: "山东",
            TIME_ID: '2016',
            factor: '果实成熟期'
          }
        })
          .then((res) => {
            this.echartsData.data = res.data
          })
          .catch((err) => {
            console.log(err)
          })

      },
    },
    components: {
      disasterMap
    }

  };
</script>

<style lang="scss" scoped>
  @import "./../../assets/css/_variable.scss";
  @import "./../../assets/css/_mixin.scss";

  .small-wrapper {
    height: 90%;
    padding: 0 0.2rem;
    .disaster-map-wrapper {
      height: 100%;
    }
  }
</style>
