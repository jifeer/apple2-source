<template>
  <div class="small-wrapper">
    <EBsales :echartsData="echartsData"></EBsales>
  </div>
</template>

<script>

  import EBsales from './echarts/flow-EBsales-small.vue';
  import {rightBarMixin} from 'assets/js/common.js'

  export default {
    name: 'line',
    data() {
      return {
        echartsData: {
          id: "eb-sales-small",
          xdata: [],
          data: [],
          option: {

          }
        }
      }
    },
    mounted() {
      this.renderChart()
    },

    methods: {
      renderChart() {

        let str = '';
        for (let i = 1; i <= 12; i++) {
          if (i == 12) {
            str += new Date().getFullYear() + '0' + i;
          } else {
            str += new Date().getFullYear() + '0' + i + ',';
          }

        }

        this.$xhr.get('apple/circulation/getDsChannelSaleAys', {
          params: {
            timeType: 'month',
            years: str
          }
        }).then((res) => {
          this.echartsData.xdata = res.data.time,
            this.echartsData.data = res.data.dataDS
        })


      }
    },
    components: {
      EBsales
    }
  };
</script>

<style lang="scss" scoped>
  @import "./../../assets/css/_variable.scss";
  @import "./../../assets/css/_mixin.scss";

  .small-wrapper {
    padding: 0 0.2rem;
    height: 100%;
  }

</style>
