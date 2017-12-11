<template>
  <div class="flow-electric-supply-wrapper big-wrapper">
    <div class="bigW-intro">
      <h2>{{months}}苹果电商销量{{values}}吨</h2>
      <div class="bigW-option">
        <selectTime @chooseTime="_chooseTime" :timeTypeData="timeTypeData" defaultTimeType="月度" url="apple/circulation/getDsChannelDropTime"></selectTime>
        <explain :eText="eText"></explain>
      </div>
    </div>

    <div class="ebsales-box">
      <EBsales :echartsData="echartsData"></EBsales>
    </div>
  </div>
</template>

<script>
  import selectTime from 'components/selectTime/selectTime';
  import selectBtn from 'components/selectBtn/selectBtn';
  import explain from 'components/explain/explain';
  import EBsales from './echarts/flow-EBsales.vue';
  import {rightBarMixin} from 'assets/js/common.js'

  export default {
    name: 'line',
    data() {
      return {
        timeTypeData: ['月度', '年度'],
        eText: '数据来源于电商平台（天猫、淘宝），起始于2017年5月，级别为全国。',
        months: "",
        myowndata: '这里可以定义自己的属性 生产1111',
        btnIndex: 0,
        timeType: 'month',
        years: '',
        values: '',
        echartsData: {
          id: "eb-sales",
          xdata: [],
          data: [],
          option: {
            yAxis: {
              name: ''
            },
            grid: {
              top: '15%',
              right: '0',
              bottom: '10%'
            }
          }
        }
      }
    },
    mounted() {
      this.renderChart()//渲染图表
      this.getTitle()
    },
    computed: {
      flowDataParms() {
        return {
          timeType: this.timeType,
          years: this.years
        }
      }
    },
    watch: {
      flowDataParms(newVal) {
        this.renderChart()
        this.getTitle()
      }
    },
    methods: {

      // 事件选择
      _chooseTime(val) {
        this.years = val.time
        this.timeType = val.timeType
        this.time == 'year' ? this.echartsData.option.yAxis.name = '年销量（吨）' : this.echartsData.option.yAxis.name = '月销量（吨）'
      },
      myownEvent() {
        this.changeBar()
      },
      renderChart() {
        this.$xhr.get('apple/circulation/getDsChannelSaleAys', {
          params: {
            ...this.flowDataParms
          }
        }).then((res) => {
          this.echartsData.xdata = res.data.time,
            this.echartsData.data = res.data.dataDS

        })
      },
      getTitle() {
        this.$xhr.get('apple/circulation/getDsCountYearTitle', {
          params: {
            ...this.flowDataParms
          }
        }).then((res) => {
          this.months = res.data.showTime
          this.values = res.data.showValue
        })
      },
      changeBar() {
        // 在这里发送请求
        setTimeout(() => {
          this.echartsData.xdata = ['Mon', 'Tue', 'Wed']
          this.echartsData.data = [10, 152, 100]
          this.echartsData.option = {
            yAxis: [
              {
                type: 'value',
                name: 'tes22222222222'
              }
            ],
          }
        }, 500)
      }

    },
    components: {
      selectTime,
      selectBtn,
      explain,
      EBsales
    }

  };
</script>

<style lang="scss" scoped>
  @import "./../../assets/css/_variable.scss";
  @import "./../../assets/css/_mixin.scss";

  .flow-electric-supply-wrapper {
    height: calc(100% - 0.92rem);
    .ebsales-box {
      height: calc(100% - 0.46rem);
    }
  }

  .bigW-intro {
    display: flex;
    justify-content: space-between;
  }

  .selectTime-wrapper {
    width: 4.6rem
  }

  .big-window-cont {
    height: calc(100% - 0.92rem);
  }

  .bigW-option {
    .select-date {
      color: #0372b1;
    }
  }
</style>
