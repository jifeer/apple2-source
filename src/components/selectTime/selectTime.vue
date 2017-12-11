<template>
  <div class="selectTime-wrapper">
    <div class="time-des" @click.stop="selectTime">时间：</div>
    <div class="time-txt-wrap" @click.stop="selectTime">
      <div class="time-txt" v-html="defaultTime"></div>
      <i class="iconfont icon-arrLeft-fill"></i>
    </div>
    <div v-if="MonthOrYear" v-show="dateShow" class="timeArea timearea0" :class="widStyle" @click.stop>
      <div class="scoll-wrap">
        <div class="checkAll" v-if="this.timeType==='year'">
          <label>
            <input ref="checkAllBtn" type="checkbox" name="" value="all" @click="fncheckAll" v-model="checkAll">
            <i class="iconfont icon-unchecked"></i>
            <span>全选</span>
          </label>
        </div>
        <ul>
          <li v-for="(item, index) in timeData" @click="getTime(item,index)">
            <label>
              <input type="checkbox" name="" :value="item" v-model="checkNames">
              <i class="iconfont icon-unchecked"></i>
              <span> {{item}}</span>
            </label>
          </li>
        </ul>
        <div class="btnGroup">
          <div class="btnSure" @click="emitTime">
            确定
          </div>
          <div class="btnSure" @click="closeTime">
            取消
          </div>
        </div>
      </div>
    </div>
    <div v-if="WeekOrDay" v-show="dateShow" class="timeArea timeArea1" :class="widStyle" @click.stop>
      <div class="scoll-wrap">
        <div class="timeWeekOrDay">
          <ul>
            <li v-for="(item,index) in timeData" @click="getTime(item,index)">
              <label>
                <input type="checkbox" name="" :value="item" v-model="checkNames">
                <i class="iconfont icon-unchecked"></i>
                <span> {{item}}</span>
              </label>
            </li>
          </ul>
          <ul>
            <li v-for="(item,index) in monthData" @click="getTime(item,index)">
              <label>
                <input type="checkbox" name="" :value="item" v-model="checkMonthNames">
                <i class="iconfont icon-unchecked"></i>
                <span> {{item}}</span>
              </label>
            </li>
          </ul>
        </div>
        <div class="btnGroup">
          <div class="btnSure" @click="emitTime">
            确定
          </div>
          <div class="btnSure" @click="closeTime">
            取消
          </div>
        </div>
      </div>
    </div>

    <ul class="timeTypeData" ref="timeTypeData">
      <li v-for="(item, index) in timeTypeData" class="item-item" @click="changeTimeType(item, index)" :class="{active: index === timeIndex}">{{item}}</li>
    </ul>
  </div>
</template>

<script>
  import { getArrayMax, getArrayMin, handleTimeData} from 'assets/js/common'

  export default {
    props: {
      url: {
        type: String,
        default: ''
      },
      timeTypeData: {
        type: Array,
        default: () => []
      },
      defaultTimeType: {
        type: String,
        default: 'year'
      },
      areaId: {
        type: String,
        default: ''
      },
      productId: {
        type: String,
        default: ''
      }
    },
    data() {
      return {
        dateShow: false,
        checkAll: false,
        timeIndex: 0,

        timeType: '',
        defaultTime: '',
        timeData: [],
        checkNames: [], // 年 月 周 日 选择值
        checkMonthNames: [], //周，日  月度选择值
        monthData: ['12月', '11月', '10月', '9月', '8月', '7月', '6月', '5月', '4月', '3月', '2月', '1月']
      }
    },
    mounted() {
      this._initTimeIndex()
      // this.initTime()
      setTimeout(() => {
        // 当没有 年度月度的时候 去除边框
        this.timeTypeData.length === 0 ? this.$refs.timeTypeData.style.border = 'none' : ''
      }, 20)
      document.addEventListener('click', this.closeTime)
    },
    computed: {
      widStyle() {
        if (this.size == "big")
          return `width:2rem`
        else if (this.size == "small") {
          return `width:1rem`
        }
      },
      MonthOrYear() {
        if (this.timeType === "month" || this.timeType === "year") {
          return true
        } else {
          return false
        }
      },
      WeekOrDay() {
        if (this.timeType === "week" || this.timeType === "day") {
          return true
        } else {
          return false
        }
      }
    },
    methods: {
      getTime() {
        if (this.timeType === "year") {
          console.log(this.checkNames)
          if (this.timeData.length != this.checkNames.length) {
            this.checkAll = false;
          } else {
            this.checkAll = true;
          }
        }
      },
      selectTime() {
        this.dateShow = !this.dateShow
      },
      closeTime() {
        this.dateShow = false
      },
      fncheckAll() {
        console.log("111")
        this.checkAll = !this.checkAll
        this.checkNames = []
        if (this.checkAll) {
          this.timeData.forEach((v) => {
            this.checkNames.push(v)
          })
        }
      },
      emitTime() {
        if (this.timeType === "year") {
          //先排序，选择的年份区间按从大到小
          let newArry = this.checkNames.sort(function(a, b) {
            let _a = parseInt(a.substring(0, 4))
            let _b = parseInt(b.substring(0, 4))
            return _b - _a
          })
          let times = [];
          newArry.forEach((v, i) => {
            times.push({
              index: this.timeData.indexOf(v),
              timeCt: v
            })
          })
          if (times.length == 0) {
            //如果什么都没选
            this.dateShow = false
          } else {
            for (let i = 0; i < times.length - 1; i++) {
              let rt1 = times[i + 1].index - times[i].index;
              if (rt1 > 1) {
                alert("请选取连续的时间段");
                return;
              }
            }
            let endTime = times[0].timeCt.split("-")[1];
            let startTime = times[times.length - 1].timeCt.split("-")[0];

            let str = startTime + '-' + endTime;
            this.times = str;
            this.defaultTime = str;
            //console.log(JSON.stringify(str, null, 4))
            let convertData = this.handleTime(str, 'year')
            this.$emit('chooseTime', {time: convertData, timeType: this.timeType})
            this.dateShow = false
          }
        } else if (this.timeType === "month") {
          let MaxYear = getArrayMax(this.checkNames) || this.timeData[0]
          let MinYear = getArrayMin(this.checkNames) || this.timeData[0]

          let str = MinYear + '-' + MaxYear
          this.times = str;
          this.defaultTime = str;
          let convertData = this.handleTime(str, 'month')
          this.$emit('chooseTime', {time: convertData, timeType: this.timeType})
          this.dateShow = false
        } else if (this.timeType === "week" || this.timeType === "day") {
          let MaxYear = getArrayMax(this.checkNames) || this.timeData[0]
          let MinYear = getArrayMin(this.checkNames) || this.timeData[0]

          let MaxMonth = getArrayMax(this.checkMonthNames) || "12"
          let MinMonth = getArrayMin(this.checkMonthNames) || "1"
          let str1 = MinYear + '.' + MinMonth + '-' + MaxYear + '.' + MaxMonth
          this.times = str1;
          // this.$emit('update:defaultTime', str1)
          if (this.timeType === "week") {
            // str1 = str1 + ' 周'
            str1 = str1
          } else if (this.timeType === "day") {
            // str1 = str1 + ' 日'
            str1 = str1
          }
          this.defaultTime = str1;
          let convertData = this.handleTime(str1, 'week')
          this.dateShow = false
          this.$emit('chooseTime', {time: convertData, timeType: this.timeType})
          // this.dateShow = false
        }
      },
      handleTime(data, type) {
        let arr = [];
        let str = '';
        if (type === 'year') {
          let start = data.substring(0, 4);
          let end = data.substring(5)
          for (let i = start; i <= end; i++) {
            arr.push(i)
          }
          str = arr.join(',')
          return str
        }

        if (type === 'month') {
          let start = data.substring(0, 4);
          let end = data.substring(5)
          let result = [];
          for (let i = start; i <= end; i++) {
            for (let j = 1; j <= 12; j++) {
              if (j.toString().length !== 2) {
                j = '0' + j.toString();
              }
              result.push(i.toString() + j)
            }
          }
          return result.join(',')
        }

        if (type === 'week' || type === 'day') {
          let res = []
          // 首先 将 2014.1 - 2015.12 这种分割成 ['2014.1','2015.12']这种数组
          let twoArr = data.split('-')
          twoArr.forEach((v, i, a) => {
            //v  就是 2014.1   2015.12
            //oneArr 就是  ['2014',1]  ['2015','12']
            let oneArr = v.split('.')
            res.push(oneArr) //二维数组 [['2014',1],['2015','12']]
          })
          let startYear = parseInt(res[0][0]);
          let startMonth = parseInt(res[0][1]);
          let endYear = parseInt(res[1][0]);
          let endMonth = parseInt(res[1][1]);

          let result = [];

          let contYear = parseInt(endYear) - parseInt(startYear);
          //如果开始年和结束年是同一年
          if (contYear === 0) {
            // debugger
            for (let i = startMonth; i <= endMonth; i++) {
              if (i.toString().length !== 2) {
                i = '0' + i.toString();
              }
              result.push(startYear.toString() + i)
            }
          }
          //如果开始年和结束年不是同一年
          if (contYear > 0) {
            //先塞入开始年1-12月
            for (let i = startMonth; i <= 12; i++) {
              if (i.toString().length !== 2) {
                i = '0' + i.toString();
              }
              result.push(startYear.toString() + i)
            }

            //再塞入开始年之后一年 到 结束年之前一年的 之间的所有年份的1-12月
            for (let i = startYear + 1; i < endYear; i++) {
              for (let j = 1; j <= 12; j++) {
                if (j.toString().length !== 2) {
                  j = '0' + j.toString();
                }
                result.push(i.toString() + j)
              }
            }

            //最后塞入  最后一年的 1月到 12月
            for (let i = 1; i <= endMonth; i++) {
              if (i.toString().length !== 2) {
                i = '0' + i.toString();
              }
              result.push(endYear.toString() + i)
            }
          }
          return result.join(',')
        }
      },
      changeTimeType(item, index) {
        this.checkNames = [] //切换标签重置已选择的checkbox
        this.checkMonthNames = []
        this.timeIndex = index
        this.timeType = this._switchTimeType(item)
      },
      initTime() {
        this.$xhr({
          method: 'get', // method: 'post',
          url: this.url,
          data: {
            areaId: this.areaId,
            timeType: this.timeType,
            productId: this.productId
          }
        }).then((res) => {
          this.timeData = res.data.year
          this.defaultTime = res.data.default
          this.$emit('chooseTime', {time: handleTimeData(this.defaultTime, this.timeType), timeType: this.timeType})
        })
      },
      // 只在页面初始化的时候 获取 timeIndex 值即可
      _initTimeIndex() {
        this.timeType = this._switchTimeType(this.defaultTimeType)
        this.timeTypeData.some((item, index) => {
          if (this.defaultTimeType === item) {
            this.timeIndex = index
            return true
          }
        })
      },
      _switchTimeType(item) {
        let type = ''
        switch(item) {
          case '年度':
            type = 'year'
            break
          case '月度':
            type = 'month'
            break
          case '周度':
            type = 'week'
            break
          case '日度':
            type = 'day'
            break
          default:
            type = 'year'
        }
        return type
      }
    },
    watch: {
      timeType(newValue, oldValue) {
        if (newValue) {
          this.initTime()
          //重置此控件
          this.checkNames = [];
        }
      },
      areaId(newValue, oldValue) {
        if (newValue) {
          this.initTime()
          //重置此控件
          this.checkNames = [];
        }
      }
    },
    beforeDestroy() {
      document.removeEventListener('click', this.controlShow)
    }
  }
</script>
<style lang="scss" scoped>
  @import "./../../assets/css/_variable.scss";
  @import "./../../assets/css/_mixin.scss";

  .scoll-wrap {
    overflow-y: auto;
    margin-top: 15px;
    padding-right: 15px;
  }

  .checkAll {
    line-height: 0.5rem;
    padding-left: 0.15rem;
    text-align: left;
    label {
      display: inline-block;
      width: 100%;
      height: 100%;
    }
    span {
      margin-left: .1rem;
    }

    i {
      color: $blue;
    }
  }

  .selectTime-wrapper {
    @include flex();
    float: right;
    position: relative;
    color: #fff;
    line-height: 0.3rem;
    font-size: .18rem;
    .timeArea {
      display: flex;
      flex-direction: column;
      position: absolute;
      z-index: 100;
      // min-width: 3rem;
      min-width: 1.8rem;
      border: 1px solid #1A5484;
      // background: rgba(11, 13, 29, .8);
      background: #071429;
      top: 39px;
      left: .1rem;
      height: 3rem;
      // overflow: visable;

      padding-bottom: .3rem;
      box-sizing: border-box;
      @include arrow-top(0.1rem !important, '');
      &.timeArea0 {
        right: 0;
      }
      &.timeArea1 {
        // width: 4rem;
        .timeWeekOrDay {
          display: flex
        }
      }

      ul {
        li {
          line-height: 0.5rem;
          padding-left: 0.15rem;
          span {
            margin-left: .1rem;
          }

          i {
            color: $blue;
          }
        }
      }
      .btnGroup {
        display: flex;
        .btnSure {
          width: 1rem;
          height: 0.5rem;
          line-height: .5rem;
          text-align: center
        }
      }
    }
  }

  .timeTypeData {
    @include flex();
    border: 1px solid #1A5484;
    box-sizing: border-box;
    height: 0.3rem;
    .item-item {
      // flex: 1;
      @include flex(center, center);
      box-sizing: border-box;
      width: 1.06rem;
      height: 0.2rem;
      border-right: 1px solid #1A5484;
      font-size: .18rem;
      color: #40b0fc;
      cursor: pointer;
      transition: all 0.1s ease-in;
      &:last-child {
        border-radius: none;
        border-right: none;
      }
      &:hover, &.active {
        color: #03734c;
        font-weight: bold;
      }
    }
  }

  // 修补样式
  .timeWeekOrDay {
    li {
      min-width: 0.95rem;
      box-sizing: border-box;
    }
  }
  .time-des {
    color: $blue;
    cursor: pointer;
  }
  .time-txt-wrap {
    @include flex(flex-start);
    height: 0.28rem;
    line-height: 0.28rem;
    margin-right: 0.2rem;
    .iconfont {
      text-align: center;
      width: 0.35rem;
      // max-height: 0.3rem;
      // line-height: 0.3rem;
      border: 1px solid #1A5484;
      font-size: .18rem;
      color: #40b0fc;
      cursor: pointer;
      box-sizing: border-box;
    }
  }
  .time-txt {
    border: 1px solid #1A5484;
    border-right: none;
    min-width: 1.0rem;
    color: $blue;
    cursor: pointer;
    box-sizing: border-box;
    text-align: center;
    padding: 0 0.03rem;
  }
</style>
