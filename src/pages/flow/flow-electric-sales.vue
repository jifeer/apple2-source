<template>
  <div class="flow-electric-supply-wrapper big-wrapper">
    <div class="bigW-intro">
      <h2>{{months}}{{appleTypetit}}苹果电商销量{{values}}吨</h2>
      <div class="bigW-option">
        <selectDiy @change="_changeDiy" :data="typeData" class="typeData"></selectDiy>
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
  import selectDiy from 'components/selectDiy/selectDiy'

  export default {
    name: 'line',
    data() {
      return {
        timeTypeData: ['月度', '年度'],
        typeData: ['全部', '红富士', '冰糖心'],
        eText: '数据起始于2017年5月，级别为全国，来源于电商平台（天猫、淘宝）。',
        months: "",
        appleType:'',
        myowndata: '这里可以定义自己的属性 生产1111',
        btnIndex: 0,
        timeType: 'month',
        years: '',
        values: '',
        appleTypetit: '鲜',
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
          years: this.years,
          appleType: this.appleType
        }
      }
    },
    methods: {
      // 事件选择
      _chooseTime(val) {
        this.years = val.time
        this.timeType = val.timeType
        this.timeType == 'year' ? this.echartsData.option.yAxis.name = '年销量（吨）' : this.echartsData.option.yAxis.name = '月销量（吨）'
      },
      //苹果类型选择
      _changeDiy(val) {
        this.appleType = val
        this.$emit('changeAppletype',val)
        this.appleTypetit = val == '全部' ? '鲜' : val
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
          //console.log(res)
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
      EBsales,
      selectDiy
    },
    watch: {
      flowDataParms(newVal) {
        if (newVal.timeType && newVal.years && newVal.appleType) {
          this.renderChart()
          this.getTitle()
        }

      }
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

  .bigW-option .typeData {
    margin-right: 0.2rem;
    padding-top: 0.14rem;
    box-sizing: border-box;
  }

  .bigW-option {
    .select-date {
      color: #0372b1;
    }
  }
</style>
