<template>
  <div class="select-wrapper">
    <div class="selectArea" @click.stop="showCont">
      <div class="selectArea-title">{{defaultValue}}</div>
      <div class="selectArea-select">
        <i class="iconfont icon-arrLeft-fill"></i>
      </div>
    </div>
    <transition name="select">
      <div class="arrow-cont" v-show="selectShow">
        <div class="scroll-wrapper" v-if="dataType">
          <ul v-if="this.type === 'check'">
            <li v-for="(item, index) in selectData" @click.stop>
              <label>
                <input type="checkbox" name="" :value="item" v-model="checkNames">
                <i class="iconfont icon-unchecked"></i>
                <span> {{item.name}}</span>
              </label>
            </li>
          </ul>
          <ul v-else>
            <li v-for="(item,index) in selectData" @click="change(item)">
              {{item.name}}
            </li>
          </ul>
          <div class="btnGroup" v-if="this.type === 'check'">
            <div class="btnSure" @click="emitArea">
              确定
            </div>
            <div class="btnSure" @click="closeArea">
              取消
            </div>
          </div>
        </div>
        <div v-else>
          <ul v-if="this.type === 'check'" class="scroll-wrapper">
            <li v-for="(item, index) in selectData" @click.stop>
              <label>
                <input type="checkbox" name="" :value="item" v-model="checkNames">
                <i class="iconfont icon-unchecked"></i>
                <span> {{item}}</span>
              </label>
            </li>
          </ul>
          <ul v-else>
            <li v-for="(item,index) in selectData" @click="change(item)">
              {{item}}
            </li>
          </ul>
          <div class="btnGroup" v-if="this.type === 'check'">
            <div class="btnSure" @click="emitArea">
              确定
            </div>
            <div class="btnSure" @click="closeArea">
              取消
            </div>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>
<script>
  export default {
    props: {
      num: {
        type: String,
        default: '1'
      },
      type: {
        type: String,
        default: "check"
      },
      url: {
        type: String,
        default: ''
      }
    },
    data() {
      return {
        selectShow: false,
        selectData: [],
        checkNames: [],
        defaultValue: ''
      }
    },
    created() {},
    mounted() {
      document.addEventListener('click', this.controlShow)
      this._getSelectArea()
    },
    computed: {
      dataType() {
        return this.selectData[0] instanceof Object
      }
    },
    methods: {
      controlShow() {
        this.selectShow = false
      },
      showCont() {
        this.selectShow = !this.selectShow;
      },
      change(item) {
        // 将所选的地区传递出去
        if (this.dataType) {
          this.defaultValue = item.name
          this.$emit('change', item.value)
        } else {
          this.defaultValue = item
          this.$emit('change', item)
        }
      },
      closeArea() {
        this.selectShow = false;
      },
      emitArea() {
        if (this.checkNames.length > 3) {
          this.$message({
            message: '最多选择三个地区',
            center: true
          })
          return
        }
        if (this.dataType) {
          this.defaultValue = this.checkNames[0].name
          this.$emit('change', this.checkNames.map(item => item.value).join(','))
        } else {
          this.defaultValue = this.checkNames[0]
          this.$emit('change', this.checkNames.join(','))
        }

      },
      _getSelectArea() {
        this.$xhr.get(this.url).then((res) => {
          this.selectData = res.data
          if (this.dataType) {
            this.defaultValue = this.selectData[0].name
            // this.checkNames[0]= res.data[0].value
            let firstArea = res.data.slice(0, parseInt(this.num)).map(item => item.value).join(',')
            this.$emit('change', firstArea)
          } else {
            this.defaultValue = this.selectData[0]
            // this.checkNames[0] = res.data[0]
            let firstArea = res.data.slice(0, parseInt(this.num)).join(',')
            this.$emit('change', firstArea)
          }
        }).catch((error) => {
          this.selectData = error
        })
      }
    },
    beforeDestroy() {
      document.removeEventListener('click', this.controlShow)
    },
    watch: {
      url(newVal) {
        if (newVal) {
          this._getSelectArea()
        }
      }
    }
  }

</script>
<style lang="scss" scoped>
  @import "./../../assets/css/_variable.scss";
  @import "./../../assets/css/_mixin.scss";

  .select-wrapper {
    position: relative;
    width: 1.5rem;
    height: 0.3rem;
    line-height: 0.3rem;
    box-sizing: border-box;
    display: inline-block;
    .selectArea {
      width: auto;
      display: inline-block;
      max-height: 0.3rem;
      line-height: 0.3rem;
      border: 1px solid #1A5484;
      font-size: .18rem;
      color: $blue;
      cursor: pointer;
      box-sizing: border-box;
      white-space: nowrap;
      overflow: hidden;
      .selectArea-title {
        // flex: 1;
        // width: calc(100% - 0.35rem);
        display: inline-block;
        white-space: nowrap;
        padding: 0 3px;
        min-width: 1rem;
        text-align: center;
      }
      .selectArea-select {
        // flex: 0 0 0.35rem;
         display: inline-block;
         border-left: 1px solid #1A5484;
         width: 0.35rem;
        text-align: center;
      }
    }
    .arrow-cont {
      position: absolute;
      top: 39px;
      right: 0;
      height: 2.3rem;
      width: 2rem;
      border: 1px solid #1A5484;
      background: #071429;
      box-sizing: border-box;
      z-index: 100;
      @include arrow-top;
      >div {
        height: 100%;
        box-sizing: border-box;
      }
      .scroll-wrapper {
        overflow-y: auto;
        height: 100%;
        padding: 0.15rem 0 0.3rem;
        box-sizing: border-box;
      }
      ul {
        height: 100%;
        overflow-y: auto;
        li {
          line-height: 0.34rem;
          font-size: 0.16rem;
          text-align: left;
          padding-left: .2rem;
          color: #fff;
          /*cursor: pointer;*/
          span {
            cursor: pointer;
            margin-left: .1rem;
          }

          i {
            cursor: pointer;
            color: $blue;
          }
        }
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

  .select-enter-active,
  .select-leave-active {
    transition: all 0.3s;
  }

  .select-enter,
  .select-leave-to {
    opacity: 0;
  }

</style>
