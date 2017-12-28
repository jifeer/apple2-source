<template>
  <div>
    <div class="landCost-wrapper big-wrapper">
      <!--<div class="bigW-intro"></div>-->
      <div class="bigW-option">
        <selectTime class="selectTime" @chooseTime="_chooseTime" url="apple/income/getTime?timeType=1"
                    defaultTimeType="年度"></selectTime>
        <selectArea class="selectArea" @change="_chooseArea" url="apple/income/getArea"></selectArea>
        <selectTree @change="_treeAsync" url="apple/income/getCostSelectData?costType=101011"></selectTree>
        <selectBtn class="selectBtn" :btnIndex.sync="btnIndex" :btnData="btnData" @changeBtn="_changeBtn"></selectBtn>
        <explain :eText="eText"></explain>
      </div>
      <div class="landchart-box">
        <landChart :item="item" :landChartData="landChartData"></landChart>
      </div>
    </div>
  </div>
</template>
<script type="text/javascript">
  import landChart from "./echarts/LandChart.vue"
  import selectArea from 'components/selectArea/selectArea';
  import selectBtn from 'components/selectBtn/selectBtn';
  import selectTime from 'components/selectTime/selectTime';
  import selectTree from 'components/selectTree/selectTreeSpecial';
  import explain from 'components/explain/explain';

  export default {
    name: 'landCost',
    data() {
      return {
        myowndata: "我国苹果种植成本收益评估",
        timeType: "year",
        btnIndex: 0,
        btnData: [{                             // selectBtn 组件
          name: '单位面积',
          value: 0
        }, {
          name: '单位产品',
          value: 1
        }],
        eText: "数据起始于1998年，级别为全国、省级，来源于农业部。其中，北京2001-2003年及2005年、山东的2002年、宁夏1999年及2008-2011年、甘肃2002及2003年、辽宁2001-2003年、河南2003年的数据为估算值。",
        selectArea: "人工成本",
        landChartData: {
          data: [],
          timeData: [],
          option: {
            yAxis: {
              name: '元/亩',
            }
          },
        },
        area: "",
        time: "",
        type: 101002,
        itemId: null,
        i: 1,
        item: null,
      }
    },
    mounted() {
      // 获取地区数据
//    this.getlandChartData()
    },
    computed: {
      ApilandChartParms() {
        return {
          area: this.area,
          time: this.time,
          type: this.type,
          itemId: this.itemId,
        }
      },
    },
    methods: {
      _chooseTime(time) {
        this.time = time.time

      },

      _changeBtn(val) {
        if (val == 0) {
          this.type = 101002
          this.landChartData.option.yAxis.name = '元/亩'
          this.item = true
        }
        else {
          this.type = 101018
          this.landChartData.option.yAxis.name = '元/公斤'
          this.item = false
        }
      },
      _chooseArea(area) {
        if (this.i == 1) {
          area = [101, 116, 128]
          this.i++
        }
        this.area = area.toString()
      },
      _treeAsync(val) {
//    	alert(val)    //101011,101012,101013
        /*if (val.toString().indexOf("101012") != -1 && val.toString().indexOf("101013") != -1) {
          this.itemId = "101011"
        }
        else {
          this.itemId = val.toString()
        }*/
        this.itemId = val[0]
      },
      //获取数据
      getlandChartData() {
        this.$xhr.get('/apple/income/getLandCostData', {
          params: {
            ...this.ApilandChartParms
          }
        }).then((res) => {
          this.landChartData.data = res.data.data
          this.landChartData.timeData = res.data.time
//     	  	  console.log(res)

        })
      },

    },
    watch: {
      ApilandChartParms(newVal) {
        if (newVal.area && newVal.time && newVal.type && newVal.itemId) {
          this.getlandChartData()
        }
      }
    },
    components: {
      landChart,
      selectBtn,
      explain,
      selectArea,
      selectTime,
      selectTree,
    }
  }

</script>
<style lang="scss" scoped>
  @import "./../../assets/css/_variable.scss";
  @import "./../../assets/css/_mixin.scss";

  .bigW-option {
    color: #0164A0;
    padding-top: 0.2rem;
  }

  .bigW-intro {
    height: 0;
    span {
      color: #00B060
    }
  }

  .select-wrapper {
    margin-right: 0.2rem;
    &:nth-child(2) {
      width: auto;
    }
  }

  .select-cost-wrapper {
    width: 1.6rem !important;
    .selectArea-title {
    }
  }

  .big-window-cont {
    display: flex;
    & > div {
      flex: 1;
      height: 100%;
      display: flex;
      .landCost-wrapper {
        flex: 1;
        height: calc(100% - 50px);
        display: flex;
        flex-direction: column;
        .landchart-box {
          height: calc(100% - 0.8rem);
          padding-top: 0.3rem;
          width: 100%;
        }
      }
    }
  }

  .big-wrapper {
    padding: 0 0.55rem 0.5rem 0.55rem;
  }

  .selectBtn {
    margin-right: 0.2rem;
  }
</style>
