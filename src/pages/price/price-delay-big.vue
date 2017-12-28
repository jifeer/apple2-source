<template>
  <div class="forecast-big-wrapper">
    <div class="forecast-wrapper">
      <!--<h2 class="line"></h2>-->
      <div class="forecast-title">
        <div class="price-title-info">
          <div class="area-select">
            <selectDiy @change="changeDiy" url="apple/price/conduction/getDelayArea" defaultOption="山东省"></selectDiy>
          </div>
          <explain :eText="eText"></explain>
        </div>
      </div>
      <delayBar :echartsData="echartsData" :selectedName="selectedName"></delayBar>
    </div>
  </div>
</template>

<script>
  import {$, rightBarMixin} from 'assets/js/common.js'

  import delayBar from './echarts/price-delay-bar.vue'
  import selectDiy from '../../components/selectDiy/selectDiy.vue'
  import Explain from '../../components/explain/explain.vue'

  export default {

    name: 'warning-big',
    data() {
      return {
        echartsData: {
          xAxisData: [],
          seriesData: [],
          option: {}
        },
        eText: '以近五年产地和销地价格序列构造向量自回归模型，并对模型使用脉冲响应分析得到产地对销地价格传导的时滞性，例产地A对销地B的时滞为T周，在T周后，对B价格影响达到显著状态。',
        // selectData: ['河北省', '河南省', '辽宁省', '山西省', '山东省'],
        areaType: '',
        selectedName: '河北省'
      };
    },
    computed: {
      ApibtnParms() {
        return {
          area: this.areaType,
        }
      }
    },
    methods: {
      //自定义-下拉框改变
      changeDiy(name) {
        this.areaType = name
        this.selectedName = name
        this.$emit('changeTitle', name)
      },
      getDelayData() {
        /*this.echartsData.xAxisData = ['上海', '内蒙', '贵州', '甘肃', '新疆', '安徽', '天津', '北京', '四川', '江西', '湖南', '重庆', '黑龙江', '湖北', '浙江', '江苏', '广西', '广东']
        this.echartsData.seriesData = [1.9, 2.1, 1.4, 1.7, 2.5, 2.3, 1.8, 2.6, 2.2, 1.9, 2.4, 1.5, 2.3, 1.5, 1.8, 2.0, 2.7, 1.8]*/
        this.$xhr.get('apple/price/conduction/getDelay', {
          params: {
            ...this.ApibtnParms
          }
        }).then((res) => {
          //console.log(res)
          this.echartsData.xAxisData = res.data.AreaData
          this.echartsData.seriesData = res.data.DelayData
        })


      }
    },
    /*mounted() {
      this.getDelayData()
    },*/
    components: {
      delayBar,
      Explain,
      selectDiy
    },
    watch: {
      ApibtnParms(newVal) {
        if (newVal.area) {
          this.getDelayData()
        }
      }
    }
  };
</script>

<style lang="scss" scoped>
  @import "./../../assets/css/_variable.scss";
  @import "./../../assets/css/_mixin.scss";

  .big-window-cont {
    width: 100%;
    height: calc(100% - 0.92rem);
  }

  .selectArea-title {
    text-align: center;
  }

  .forecast-big-wrapper {
    width: 100%;
    height: 100%;

  }

  .area-select {
    margin-right: 0.2rem;
  }

  .forecast-wrapper {
    width: 100%;
    height: 100%;
    padding: 0.2rem 0.62rem;
    box-sizing: border-box;
  }

  .forecast-wrapper > div:nth-child(2) {
    height: calc(100% - 2rem);
    width: 100%;
    //margin-top: 0.2rem;

  }

  .forecast-title {
    display: flex;
    height: 0.8rem;
    align-items: center;
    justify-content: flex-end;
  }

  .price-title-info {
    display: flex;
    justify-content: space-between;
  }

  /*.line {
    width: 100%;
    height: 0;
    border-bottom: 1px solid #1961A5;
    margin-top: 0.4rem;
  }*/
</style>
