<template>
  <div class="small-wrapper">
    <productAreaProportion ref="productAreaSmall" :echartsData="echartsData"></productAreaProportion>
  </div>
</template>

<script>
  import productAreaProportion from 'pages/product/echarts/product-area';
  import {rightBarMixin} from 'assets/js/common.js'
  export default {
    name: 'proportion-small',
    data(){
      return {
        echartsData: {
          id: "area-pro-small",
          xdata: [],
          data: [],
          option: {

          }
        },
      }
    },
    mounted() {
      this.renderChart()
    },
    methods: {
      renderChart(){
        //  在这里修改数据
        this.echartsData.data = [];
        this.echartsData.xdata = ['2002', '2003', '2004', '2005', '2006', '2007', '2008', '2009', '2010', '2011', '2012', '2013', '2014', '2015', '2016'];
        for (let i = 1; i < this.echartsData.xdata.length + 1; i++) {
          this.echartsData.data.push(Math.round(Math.random() * 100));
        }

      },
    },
    components: {
      productAreaProportion
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
