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
  import selectTree from 'components/selectTree/selectTree';
  import explain from 'components/explain/explain';
  export default {
    name: 'laborCost',
    data() {
      return {
        myowndata: "我国苹果种植成本收益评估",
        timeType: "year",
        areaId: 37000,
        btnIndex: 0,
        selectData: [{
          label: '人工成本',
          children: [
            {
              label: '雇工费用',
              children: [{
                label: '雇工天数'
              }, {
                label: '雇工工价'
              }]
            },
            {
              label: '家庭用工折价',
              children: [{
                label: '家庭用工天数'
              }, {
                label: '家庭劳动日工价'
              }]
            },

          ],
        }],

        btnData: [{                             // selectBtn 组件
          name: '单位面积',
          value: 0
        }, {
          name: '单位产品',
          value: 1
        }],
        eText: "数据来源于农业部，起始于1998年。级别为全国、省级。",
        selectArea: "人工成本",
        lcChartData: {
          data: [],
          timeData: [],
          option: {
            yAxis: {
              name: '',
            }
          },
        },
        area: "",
        time: "",
        type: 101002,
        itemId: '',
        i: 1,
        item: null,
      }
    },
    mounted() {

    },
    computed: {
      ApiLCchartParms() {
        return {
          area: this.area,
          time: this.time,
          type: this.type,
          itemId: this.itemId,
        }
      },
    },

    watch: {
      ApiLCchartParms(newVal){
        if (newVal.area && newVal.time && newVal.type && newVal.itemId) {
          this.getlcChartData()
        }
      }
    },
    methods: {
      _chooseTime(time){

        this.time = time.time
      },
      _chooseArea(area){
        if (this.i == 1) {
          area = [101, 116, 128]
          this.i++;
        }
        this.area = area.toString()
      },
      _treeAsync(item){
//  	  console.log(item)
        //判断应该返回的itemId
        let string = item.toString()
        if (item.length == 3) {
          if (string.indexOf("102027") != -1 && string.indexOf("102028") != -1) {
            this.itemId = "101009"
          } else if (string.indexOf("102030") != -1 && string.indexOf("102031") != -1) {
            this.itemId = "101010"
          } else {
            this.itemId = string
          }
        } else if (item.length > 3) {
          if (item.length == 6) {
            this.itemId = string
          }
          else if (string.indexOf("101010") != -1 && string.indexOf("101009") != -1) {
            this.itemId = "101008"
          }
          else if (item.length < 7) {
            alert("单位不统一")
            if (string.indexOf("101009")) {
              this.itemId = "101010"
            } else if (string.indexOf("101010")) {
              this.itemId = "101009"
            }
          }
        } else {
          this.itemId = string
        }
        //当选中第三级数据改变单位后再点击其他级数据改变单位
        if (this.itemId.indexOf("102027") != -1 || this.itemId.indexOf("102028") != -1 || this.itemId.indexOf("102030") != -1 || this.itemId.indexOf("102031") != -1) {
          this.item = 2
          this.lcChartData.option.yAxis.name = '       元/（亩·日）'
        } else {
          if (this.type == 101002) {
            this.item = 0
            this.lcChartData.option.yAxis.name = '元/亩          '
          } else {
            this.item = 1
            this.lcChartData.option.yAxis.name = '元/公斤  '
          }
        }

      },
      _changeBtn(val) {
//      console.log(val)
        if (this.item != 2) {
          if (val == 0) {
            this.type = 101002
            this.lcChartData.option.yAxis.name = '元/亩          '
            this.item = 0
          }
          else {
            this.type = 101018
            this.lcChartData.option.yAxis.name = '元/公斤  '
            this.item = 1
          }
        }
      },
      //获取数据
      getlcChartData(){
        this.$xhr.get('/apple/income/getLaborCostData', {
          params: {
            ...this.ApiLCchartParms
          }
        }).then((res) => {
          this.lcChartData.data = res.data.data
          this.lcChartData.timeData = res.data.time
//     	  	  console.log(res)

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
