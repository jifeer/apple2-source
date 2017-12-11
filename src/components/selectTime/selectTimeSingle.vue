<template>
  <div class="selectTime-wrapper">
    <div class="time-des" @click.stop="selectTime">时间：</div>
    <div class="time-txt-wrap" @click.stop="selectTime">
      <div class="time-txt"  v-html="defaultTime"></div>
      <i class="iconfont icon-arrLeft-fill"></i>
    </div>
    <div v-show="dateShow" class="timeArea timearea0" @click.stop>
      <div class="scoll-wrap">
        <ul>
          <li v-for="(item, index) in timeData" :class="{active: index === activeIndex}" @click="getTime(item,index)">
            <label>
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
  </div>
</template>

<script>

  export default {
    props: {
      url: {
        type: String,
        default: ''
      },
    },
    data() {
      return {
        dateShow: false,

        activeIndex: 0,
        selectYear: '',
        defaultTime: '',
        defaultIndex: 0,
        timeData: [],
      }
    },
    mounted() {
      document.addEventListener('click', this.closeTime)
      this.initTime()
    },

    computed: {},

    methods: {
      // 选中一个日期
      getTime(item, index) {
        this.activeIndex = index
        this.selectYear = item
      },

      // 确认一个时间
      selectTime() {
        this.dateShow = !this.dateShow
      },

      // 关闭窗口 的时候你需要重置被选中的
      closeTime() {
        this.dateShow = false
        this.selectYear = this.defaultTime
        this.activeIndex = this.defaultIndex
      },

      emitTime() {
        this.defaultTime = this.selectYear
        this.defaultIndex = this.activeIndex
        this.dateShow = false
        this.$emit('chooseTime', this.defaultTime)
      },

      initTime() {
        this.$xhr({
          method: 'get',
          url: this.url,
          data: {}
        }).then((res) => {
          this.timeData = res.data.year
          this.defaultTime = res.data.default
          this.defaultIndex = 0
          this.$emit('chooseTime', this.defaultTime)
        }).catch((error) => {
          console.log(error)
        })
      },

    },
    watch: {},
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
      min-width: 1.5rem;
      border: 1px solid #1A5484;
      background: #071429;
      top: 40px;
      right: .2rem;
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
          cursor: pointer;
          span {
            margin-left: .1rem;
            cursor: pointer;
          }
          &:hover {
            background: #0e335b;;
          }
          &.active {
            background-color: #0e335b;
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
  .time-des {
    color: $blue;
    cursor: pointer;
  }
</style>
