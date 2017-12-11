<template>
  <div class="small-wrapper">
    <productHistorcal :echartsData="echartsData" :flag="flag" :width="width" :height="height"></productHistorcal>
  </div>
</template>

<script>
  import productHistorcal from 'pages/product/echarts/product-historical';
  import {rightBarMixin} from 'assets/js/common.js'

  export default {
    data(){
      return {
        echartsData: {
          data: {},
          xdata: [],
          data1: [],
          data2: [],
//          option: {
//            series: [{}, {
//              markArea: {
//                silent: true
//              }
//            }],
//            dataZoom: '',
//          }
        },
        flag: [
          [0, 4],
          [4, 8],
          [8, 12],
          [12, 15]
        ],
        width: '100%',
        height: '100%',
      }
    },
    created() {

    },
    mounted() {
      this.renderChart()
    },
    methods: {
      renderChart(){
        //  获取数据
        this.$xhr.get('apple/production/change', {
          params: {
            AREA_NAME: '全国',
            TIME_ID: '2002,2003,2004,2005,2006,2007,2008,2009,2010,2011,2012,2013,2014,2015,2016',
            type: '121689'
          }
        })
          .then((res) => {
            this.echartsData.data = res.data
//            this.echartsData.data1 = res.data['全国'].data1
//            this.echartsData.data2 = res.data['全国'].data2
          })
          .catch((err) => {
            console.log(err)
          })


        // mock data
        /*this.echartsData.data1 = [];
         this.echartsData.data2 = [13, 14, 18, 20, 0, -10, -23, -30, 23, 25, 24, 28, 35, 54, 89];
         this.echartsData.xdata = ['2002', '2003', '2004', '2005', '2006', '2007', '2008', '2009', '2010', '2011', '2012', '2013', '2014', '2015', '2016'];
         for (let i = 1; i < this.echartsData.xdata.length + 1; i++) {
         this.echartsData.data1.push(Math.round(Math.random() * 500) + 200);
         }*/
        /*
         setTimeout(()=>{
         this.echartsData.data  = {
         "xdata": [
         "2002",
         "2003",
         "2004",
         "2005",
         "2005",
         "2007",
         "2008",
         "2009",
         "2010",
         "2011",
         "2012",
         "2013",
         "2014",
         "2015",
         "2016"
         ],
         "全国": {
         "data2": [
         -6.19,
         -1.95,
         -1.25,
         0.72,
         0.72,
         3.32,
         1.55,
         2.86,
         4.43,
         1.75,
         2.48,
         1.83,
         0,
         1.54,
         -6.28
         ],
         "data1": [
         2907.45,
         2850.75,
         2815.05,
         2835.45,
         2835.45,
         2942.7,
         2988.3,
         3073.67,
         3209.88,
         3265.98,
         3347.02,
         3408.3,
         3408.3,
         3460.8,
         3243.38
         ]
         }
         }
         },100)*/

      },
    },
    components: {
      productHistorcal
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
