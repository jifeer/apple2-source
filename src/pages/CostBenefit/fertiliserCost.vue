<template>
  <div>
    <div class="fertiliserCost-wrapper big-wrapper">
      <!--<div class="bigW-intro"></div>-->
      <div class="bigW-option">
        <selectTime class="selectTime" @chooseTime="_chooseTime" url="apple/income/getTime?timeType=1"
                    defaultTimeType="年度"></selectTime>
        <selectArea class="selectArea" @change="_changeArea" url="apple/income/getArea"></selectArea>
        <selectTree @change="_treeAsync" url="apple/income/getCostSelectData?costType=103015"></selectTree>
        <selectBtn class="selectBtn" :btnIndex.sync="btnIndex" :btnData="btnData" @changeBtn="_changeBtn"></selectBtn>
        <explain :eText="eText"></explain>
      </div>

      <div class="FCchart-box">
        <FCchart :item="item" :FCchartData="FCchartData"></FCchart>
      </div>
    </div>
  </div>
</template>

<script type="text/javascript">
  import FCchart from "./echarts/FCchart.vue"
  import selectArea from 'components/selectArea/selectArea';
  import selectBtn from 'components/selectBtn/selectBtn';
  import selectTime from 'components/selectTime/selectTime';
  import selectTree from 'components/selectTree/selectTree';
  import explain from 'components/explain/explain';
  export default {
    name: 'fertiliserCost',

    data() {
      return {
        myowndata: "我国苹果种植成本收益评估",
        timeType: "day",
        btnIndex: 0,
        btnData: [{                             // selectBtn 组件
          name: '用量',
          value: 0
        }, {
          name: '金额',
          value: 1
        }],
        eText: "数据来源于农业部，起始于2004年。级别为全国、省级。",
//		selectData: [{
//        label: '化肥',
//        children: [
//          {
//          	label: '氮肥',
//          },
//          {
//          	label: '磷肥',
//          },
//          {
//          	label: '钾肥',
//          },
//          {
//          	label: '复混肥',
//          },
//          {
//          	label: '其他肥料',
//          },
//
//        ],
//      }],
        FCchartData: {
          data: [],
          timeData: [],
          option: {
            yAxis: {
              name: '公斤/亩      ',
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
    mounted(){
//	this.getFCchartData()
    },
    computed: {
      ApiFCchartParms() {
        return {
          area: this.area,
          time: this.time,
          type: this.type,
          itemId: this.itemId,
        }
      },
    },
    methods: {
      _chooseTime(time){

        this.time = time.time
      },
      _changeBtn(val) {
        if (val == 0) {
          this.type = 101002
          this.FCchartData.option.yAxis.name = '公斤/亩   '
          this.item = true;
        }
        else {
          this.type = 101018
          this.FCchartData.option.yAxis.name = '元/亩        '
          this.item = false
        }
      },
      _changeArea(area){
        if (this.i == 1) {
          area = [101, 116, 128]
          this.i++;
        }
        this.area = area.toString()
      },
      _treeAsync(val){
        let string = val.toString()
        if (string.indexOf("103016") != -1 && string.indexOf("103020") != -1 && string.indexOf("103022") != -1 && string.indexOf("103024") != -1 && string.indexOf("103030") != -1) {
          this.itemId = "103015"
        } else {
          this.itemId = val.toString()
        }
      },
//获取数据
      getFCchartData(){
        this.$xhr.get('/apple/income/getChemicalFertilizerData', {
          params: {
            ...this.ApiFCchartParms
          }
        }).then((res) => {
          this.FCchartData.data = res.data.data
          this.FCchartData.timeData = res.data.time
        })
      },

    },
    watch: {
      ApiFCchartParms(newVal){
        if (newVal.area && newVal.time && newVal.type && newVal.itemId) {
          this.getFCchartData()
        }
      }
    },
    components: {
      FCchart,
      selectTime,
      selectBtn,
      selectTree,
      selectArea,
      explain,
    }
  }
</script>

<style lang="scss" scoped>
  @import "./../../assets/css/_variable.scss";
  @import "./../../assets/css/_mixin.scss";

  .FCchart-box {
    width: 13.3rem;
    height: 4.5rem;
  }

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

  .select-cost-wrapper {
    width: 1.6rem !important;
  }

  .big-window-cont {
    display: flex;
    & > div {
      flex: 1;
      height: calc(100% - 50px);
      display: flex;
      .fertiliserCost-wrapper {
        flex: 1;
        height: 100%;
        display: flex;
        flex-direction: column;
        .FCchart-box {
          height: calc(100% - 0.8rem);
          padding-top: 0.3rem;
          width: 100%;
        }
      }
    }
  }

  .selectArea, .select-wrapper {
    margin-right: 0.2rem;
  }
  .selectBtn {
    margin-right: 0.2rem;
  }
</style>
