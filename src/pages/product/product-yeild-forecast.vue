<template>
  <div class="product-yeild-wrapper big-wrapper">
    <div class="bigW-intro">
      根据<span>{{params.area}}</span>苹果主产区气象条件，<span>{{titleInfo.desYear}}</span>年单产预测为<span>{{titleInfo.value}}</span>公斤/亩，同比{{titleInfo.desResult}}<span
      class="title-num">{{titleInfo.desPercent}}</span>。</div>
    <div class="bigW-option">
      <selectTime @chooseTime="_chooseTime" url="apple/production/getDcycTime" defaultTimeType="年度"
                  :timeTypeData="timeTypeData" :areaId="areaId"></selectTime>
      <p>
        <selectTreeAsync @change="_treeArea" url="apple/production/dq"></selectTreeAsync>
      </p>
      <explain :eText="eText"></explain>
    </div>
    <div class="chart">
      <productYeild ref="productYeild" :echartsData="echartsData" :width="width" :height="height"></productYeild>
    </div>
  </div>
</template>

<script>
  import selectTime from 'components/selectTime/selectTime';
  import explain from 'components/explain/explain';
  import selectTreeAsync from 'components/selectTreeAsync/selectTreeAsyncSingle'
  import productYeild from 'pages/product/echarts/product-yeild-big';
  import {rightBarMixin} from 'assets/js/common.js'
  export default {
    name: 'line',
    data() {
      return {
        eText: `使用岭回归、LASSO回归法，依据2000年以来主产县的历史单产、气象条件预测单产数据。数据级别为全国、省级、县级，来源为农业部。`,
        timeTypeData: [],
        areaId: '370000',
        echartsData: {
          data: {},
        },
        width: '100%',
        height: '100%',
        params: {
          // 时间段 2002,2003,2004,2005,2005,2007,2008,2009,2010,2011,2012,2013,2014,2015,2016
          year: '',
          // 地区 陕西 单选
          area: '',
          // type = 1 为省级，其它为县
          type: '',
        },
        titleInfo: {
          desPercent: '2.50%',
          desResult: "增长",
          desYear: "2017",
          value: '3333.22'
        },
      }
    },
    mounted(){

    },

    computed: {
      apiParams() {
        return {
          AREA_NAME: this.params.area,
          TIME_ID: this.params.year,
          type: this.params.type,
        }
      },
    },

    watch: {
      apiParams(newVal) {
        if (newVal.AREA_NAME && newVal.TIME_ID && newVal.type) {
          this.getChartData()
        }
      },

    },

    methods: {

      // get data from server
      getChartData() {
        this.$xhr.get('apple/production/yieldForecast', {
          params: {
            ...this.apiParams
          }
        })
          .then((res) => {
            // 年份
//            this.echartsData.xdata = res.data.dates
            this.echartsData.data = res.data
            // 预测值
//            this.echartsData.data1 = res.data.data1
//             实际值
//            this.echartsData.data2 = res.data.data2
            // title信息 变化率
            this.titleInfo.desPercent = res.data.desPercent
            // 断言
            this.titleInfo.desResult = res.data.desResult
            // 年份
            this.titleInfo.desYear = res.data.desYear
            // 值
            this.titleInfo.value = res.data.desPrice
          })
          .catch((err) => {
            console.log(err)
          })
      },

      // 改变时间
      _chooseTime(val) {
        this.params.year = val.time
      },

      // 改变地图
      _treeArea(val, type) {
        this.params.area = val
        this.params.type = type
      }
    },

    components: {
      selectTime,
      explain,
      selectTreeAsync,
      productYeild
    }

  };
</script>

<style lang="scss" scoped>
  @import "./../../assets/css/_variable.scss";
  @import "./../../assets/css/_mixin.scss";

  .product-yeild-wrapper {
    height: calc(100% - 0.5rem);
    .chart {
      width: 100%;
      padding-top: 0.15rem;
      height: calc(100% - 1.52rem);
    }

    .title-num {
      color: #fff;
    }
    .bigW-option {
      p {
        margin-right: 0.2rem;
      }
    }
  }

</style>
