<template>
  <div class="small-wrapper">
    <productAreaProportionFull :echartsData="echartsData" :width="width" :height="height"></productAreaProportionFull>
  </div>
</template>

<script>
  import productAreaProportionFull from './echarts/product-area-full.vue';
  import {rightBarMixin} from 'assets/js/common.js'
  export default {
    data(){
      return {
        echartsData: {
          xdata: [],
          data1: [],
          data2: [],
          option: {
            grid: {
              left: '4%',
              right: '4%',
              bottom: '15%',
              top: '22%',
              containLabel: true
            },
            textStyle: {
              fontSize: 10
            },
            legend: {
              top: 0,
              right: 'center',
              icon: 'line',
              itemWidth: 15,
            },
            xAxis: [{
              axisLabel: {
                textStyle: {
                  fontSize: 10,
                }
              },
            }],
            yAxis: [{
              nameTextStyle: {
                fontSize: 10,
              },
              axisLabel: {
                textStyle: {
                  fontSize: 10,
                }
              },
            }],
            dataZoom: '',
          }
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
      this.echartsData.data1 = [];
        this.echartsData.data2 = [];
        this.echartsData.xdata = ['2002', '2003', '2004', '2005', '2006', '2007', '2008', '2009', '2010', '2011', '2012', '2013', '2014', '2015', '2016'];
        for (let i = 1; i < this.echartsData.xdata.length + 1; i++) {
          this.echartsData.data1.push(Math.round(Math.random() * 100));
          this.echartsData.data2.push(Math.round(Math.random() * 100));
        }

      },

    },
    components: {
      productAreaProportionFull
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
