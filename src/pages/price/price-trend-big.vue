<template>
  <div class="forecast-big-wrapper">
    <div class="forecast-wrapper">
      <h2 class="line"><!--{{title}}--></h2>
      <div class="forecast-title">
        <selectDiy @change="_changeDiy" url="apple/price/everyprice/getArea?type=2"></selectDiy>
        <selectTime @chooseTime="_chooseTime" url="apple/price/monitor/getTime" defaultTimeType="年度" :timeTypeData="timeTypeData" :areaId="areaId"></selectTime>
        <explain :eText="eText"></explain>
      </div>
      <trendLine v-if="echartsData.data1.length" :echartsData="echartsData"></trendLine>
    </div>
  </div>
</template>
<script>
  import {rightBarMixin} from 'assets/js/common.js'
  import trendLine from 'pages/price/echarts/price-trend-line.vue'
  import selectDiy from '../../components/selectDiy/selectDiy.vue'
  import selectTime from 'components/selectTime/selectTime'
  import Explain from '../../components/explain/explain.vue'

  export default {

    name: 'warning-big',
    data() {
      return {
        echartsData: {
          xAxisData: [],
          data1: [],
          data2: [],
          data3: [],
          data4: [],
          data5: [],
          name1: [],
          name2: [],
          name3: [],
          name4: [],
          name5: [],
          legendData: [],
          option: {
            dataZoom: [{
              height: 16,
              left: '4%',
              right: '4%',
              bottom: 5,
            }],
            legend: {
              show: true,
              top: 0
            }
          }
        },
        eText: '数据来源于农业部；收购价取值：山东取栖霞市和蓬莱市均值(80#以上一二级)，陕西取洛川县和富县均值(70#以上半商品)，甘肃取肃宁价格(70#以上)。',
        width: '100%',
        height: '100%',
        timeTypeData: ['日度', '月度', '年度'], // selectTime 组件
        //btnIndex: 2,                            // selectBtn 组件
        areaId: '370000',
        time: '',
        timeType: 'year',
        areaType: '中国',
        title: '2017年8月中国地区，苹果零售和批发价差为2.54元/公斤，2017年7月出口和批发价差为-1.18元/公斤。'
      }
    },
    computed: {
      ApibtnParms() {
        return {
          name: this.areaType,
          times: this.time,
          timeType: this.timeType
        }
      }
    },
    methods: {
      //自定义-下拉框改变
      _changeDiy(name) {
        //console.log(name)
        this.areaType = name
      },
      // 时间参数 捕获
      _chooseTime(time) {
        this.time = time.time
        this.timeType = time.timeType
      },
      getTrendData() {
        /*this.echartsData.xAxisData = ['2016-01', '2016-02', '2016-03', '2016-04', '2016-05', '2016-06', '2016-07', '2016-08']
        this.echartsData.seriesData[0] = [7, 5, 4, 8, 6, 4, 7, 4]
        this.echartsData.seriesData[1] = [3, 6, 7, 5, 8, 6, 8, 2]
        this.echartsData.seriesData[2] = ['-', '-', 9, 10, '-', '-', '-', '-']
        this.echartsData.seriesData[3] = ['-', 2, 2, '-', '-', 2, 3, '-']*/
        this.$xhr.get('apple/price/getEveryPriceData', {
          params: {
            ...this.ApibtnParms
          }
        }).then((res) => {
          //console.log(res)
          this.echartsData.xAxisData = res.data.time
          let legendData = []
          if (res.data.hasOwnProperty('sgjg')) {
            legendData.push('收购价格')
            this.echartsData.data1 = res.data.sgjg
            this.echartsData.name1 = '收购价格'
          } else {
            this.echartsData.data1 = []
            this.echartsData.name1 = ''
          }
          if (res.data.hasOwnProperty('pfjg')) {
            legendData.push('批发价格')
            this.echartsData.data2 = res.data.pfjg
            this.echartsData.name2 = '批发价格'
          } else {
            this.echartsData.data2 = []
            this.echartsData.name2 = ''
          }

          if (res.data.hasOwnProperty('ckjg')) {
            legendData.push('出口价格')
            this.echartsData.data3 = res.data.ckjg
            this.echartsData.name3 = '出口价格'
          } else {
            this.echartsData.data3 = []
            this.echartsData.name3 = ''
          }
          if (res.data.hasOwnProperty('jkjg')) {
            this.echartsData.data4 = res.data.jkjg
            legendData.push('进口价格')
            this.echartsData.data4 = res.data.jkjg
            this.echartsData.name4 = '进口价格'
          } else {
            this.echartsData.data4 = []
            this.echartsData.name4 = ''
          }
          if (res.data.hasOwnProperty('lsjg')) {
            legendData.push('零售价格')
            this.echartsData.data5 = res.data.lsjg
            this.echartsData.name5 = '零售价格'
          } else {
            this.echartsData.data5 = []
            this.echartsData.name5 = ''
          }
          this.echartsData.legendData = legendData
          //处理标题部分
          let newYear = res.data.tit.nowTime.substr(0, 4)
          let newMonth = res.data.tit.nowTime.substr(4, 2)
          let newDay = res.data.tit.nowTime.substr(6, 2)
          if (this.timeType == 'year') {
            //黑龙江省地区，批发和收购价差为7.69元/公斤，2017苹果零售和批发价差为1.90元/公斤，2016出口和批发价差为-1.45元/公斤
            this.title = res.data.tit.nowTime + '年' + this.areaType + '苹果批发和收购价差为' + res.data.tit.pf_sg + '元/公斤，零售和批发价差为' + res.data.tit.ls_pf + '元/公斤，出口和批发价差为' + res.data.tit.ck_pf + '元/公斤。'
          }
          if (this.timeType == 'month') {
            //2017年8月黑龙江省地区，苹果零售和批发价差为9.59元/公斤，2017年10月出口和批发价差为0.00元/公斤
            this.title = newYear + '年' + newMonth + '月' + this.areaType + '苹果零售和批发价差为' + res.data.tit.ls_pf + '元/公斤，出口和批发价差为' + res.data.tit.ck_pf + '元/公斤。'
          }
          if (this.timeType == 'day') {
            //2017年10月31日黑龙江省地区，苹果零售和批发价差为0.00元/公斤
            this.title = newYear + '年' + newMonth + '月' + newDay + '日' + this.areaType + '苹果零售和批发价差为' + res.data.tit.ls_pf + '元/公斤。'
          }


        })
      }
    },
    mounted() {
      this.getTrendData()
    },
    components: {
      trendLine,
      Explain,
      selectDiy,
      selectTime
    },
    watch: {
      ApibtnParms(newVal) {
        if (newVal.name && newVal.times && newVal.timeType) {
          this.getTrendData()
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

  .forecast-wrapper {
    width: 100%;
    height: 100%;
    padding: 0.2rem 0.62rem;
    box-sizing: border-box;
  }

  .forecast-wrapper > div:nth-child(3) {
    height: calc(100% - 2rem);
    width: 100%;
    margin-top: 0.2rem;
  }

  .forecast-title {
    display: flex;
    height: 0.8rem;
    align-items: center;
    justify-content: flex-end;
  }

  .forecast-title > div {
    margin-left: 0.2rem;
  }

  .line {
    width: 100%;
    /*height: 0.2rem;
    line-height: 0.2rem;
    font-size: 0.24rem;
    border-bottom: 1px solid #1961A5;*/
    .title-data {
      color: #099d4f;
    }
  }

</style>
