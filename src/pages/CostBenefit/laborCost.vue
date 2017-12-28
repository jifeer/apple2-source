<template>
  <div>
    <div class="laborCost-wrapper big-wrapper">
      <!--<div class="bigW-intro"></div>-->
      <div class="bigW-option">
        <selectTime class="selectTime" @chooseTime="_chooseTime" url="apple/income/getTime?timeType=1"
                    defaultTimeType="年度"></selectTime>
        <selectArea class="selectArea" @change="_chooseArea" url="apple/income/getArea"></selectArea>
        <selectTree class="selectTree" @change="_treeAsync"
                    url="apple/income/getCostSelectData?costType=101008"></selectTree>
        <selectBtn class="selectBtn" :item="item" :btnIndex.sync="btnIndex" :btnData="btnData"
                   @changeBtn="_changeBtn"></selectBtn>
        <explain :eText="eText"></explain>
      </div>
      <div class="LCchart-box">
        <LCchart :item="item" :lcChartData="lcChartData" :btnIndex="btnIndex"></LCchart>
      </div>
    </div>
  </div>
</template>
<script type="text/javascript">
  import LCchart from "./echarts/LCchart.vue"
  import selectArea from 'components/selectArea/selectArea';
  import selectBtn from 'components/selectBtn/selectBtn';
  import selectTime from 'components/selectTime/selectTime';
  import selectTree from 'components/selectTree/selectTreeSpecial';
  import explain from 'components/explain/explain';

  export default {
    name: 'laborCost',
    data() {
      return {
        timeType: "year",
        areaId: 37000,

        btnIndex: 0,
        btnData: [{                             // selectBtn 组件
          name: '单位面积',
          value: 0,
          type: 101002
        }, {
          name: '单位产品',
          value: 1,
          type: 101018
        }],
        eText: "数据起始于1998年，级别为全国、省级，来源于农业部。其中，北京2001-2003年及2005年、山东的2002年、宁夏1999年及2008-2011年的数据为估算值。",

        // 图表需要的数据
        lcChartData: {
          data: [],
          timeData: [],
        },
        area: "",       // 地区
        time: "",       // 时间
        itemId: '',     // 成本种类
        i: 1,           // 判断地区是否第一次
        item: null,

        // calcUnit: ''    // 单位
      }
    },
    mounted() {

    },
    computed: {
      ApiLCchartParms() {
        return {
          area: this.area,
          time: this.time,
          type: this.btnData[this.btnIndex].type,
          itemId: this.itemId,
        }
      },
    },

    watch: {
      ApiLCchartParms(newVal) {
        if (newVal.area && newVal.time && newVal.type && newVal.itemId) {
          this.getlcChartData()
        }
      }
    },
    methods: {
      // 选择时间
      _chooseTime(time) {
        this.time = time.time
      },
      // 选择地区
      _chooseArea(area) {
        if (this.i == 1) {
          area = [101, 116, 128]
          this.i++;
        }
        this.area = area.toString()
      },

      // 计算单位值
      /*_getUnit() {
        if (this.btnIndex == 0 && this.level != 3) {
          this.calcUnit = '元/亩'
        } else if (this.btnIndex == 1 && this.level != 3) {
          this.calcUnit = '元/公斤'
        } else if (this.level === 3) {
          this.calcUnit = '元/（亩·日）'
        }
      },*/

      // 选择类别
      _treeAsync(item) {
        // 得到item的序列字符串和对应的level
        this.itemId = item[0]
        this.level = item[1]

      },
      _changeBtn(val) {

      },
      //获取数据
      getlcChartData() {
        this.$xhr.get('/apple/income/getLaborCostData', {
          params: {
            ...this.ApiLCchartParms
          }
        }).then((res) => {
          this.lcChartData.data = res.data.data
          this.lcChartData.timeData = res.data.time
        })
      },

    },
    components: {
      LCchart,
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
    &:nth-child(1) {
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
      .laborCost-wrapper {
        flex: 1;
        height: calc(100% - 50px);
        display: flex;
        flex-direction: column;
        .LCchart-box {
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

  .selectTime {
    color: #35A7F6;
  }

  .selectBtn {
    margin-right: 0.2rem;
  }

</style>
