<template>
  <div class="small-wrapper">
    <appleBag ref="appleBagSm" :echartsData="echartsData"></appleBag>
  </div>
</template>

<script>
  import appleBag from 'pages/product/echarts/product-applebag';
  import {rightBarMixin} from 'assets/js/common.js'
  export default {
    name: 'apple-bag-small',
    data(){
      return {
        echartsData: {
          data: [],
        },
      }
    },
    mounted() {
      this._getTestData()
    },
    methods: {
      _getTestData() {
        this.$xhr.get('apple/production/bagging', {
          params: {
            Area: '莱州,招远'
          }
        })
          .then((res)=>{
            this.echartsData.data = res.data
          })
      }
    },
    components: {
      appleBag
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
