<template>
  <div ref="mapChart" class="mapChart-wrapper">
  </div>
</template>

<script>

  import {$, resizeMixin} from 'assets/js/common'

//  import {convertData,geoCoordMap,resizeMixin} from 'assets/js/common'

  export default {
    name: 'mapecharts',
    mixins:[resizeMixin],
    data(){
      return {
        myChart:null
      }
    },
    props: {
      echartsData: {
        type: Object,
        default: null
      }
    },
    watch:{
      echartsData: {
        handler: function (val, oldVal) {
          this.initChart()
        },
        deep: true  //增加deep 观察对象的子对象变化
      }
    },
    mounted() {
      this.$nextTick(()=>{
        this.initChart()
      })
      this.myChart = this.$echarts.init(this.$refs.mapChart)
    },
    computed: {

    },
    methods: {
      initChart(){
        if (Object.keys(this.echartsData).length) {
          //如果有新的配置项的变化 深度拷贝
          if(Object.keys(this.echartsData.option).length){
            option = $.extend(true,option,this.echartsData.option)
          }
          this.myChart.setOption(option);

        }

      },
      _windowResizeHandler(){
        this.myChart.resize()
      },
      _destroyEchart(){
        this.myChart.dispose()
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "./../../../assets/css/_variable.scss";
  @import "./../../../assets/css/_mixin.scss";
  .mapChart-wrapper{
    width: 100%;
    height: 100%;
  }

</style>
