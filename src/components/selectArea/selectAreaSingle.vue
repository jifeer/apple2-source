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
            <li v-for="(item,index) in selectData" @click.stop>
              <label>
                <input type="checkbox" name="" :value="item.value" v-model="checkNames">
                <i class="iconfont icon-unchecked"></i>
                <span> {{item.name}}</span>
              </label>
            </li>
          </ul>
          <ul v-else>
            <li v-for="(item,index) in selectData" @click="_change(item)">
              {{item.name}}
            </li>
          </ul>
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
            <li v-for="(item,index) in selectData" @click="_change(item)">
              {{item}}
            </li>
          </ul>

        </div>
        <div class="btnGroup" v-if="this.type === 'check'">
          <div class="btnSure" @click="emitArea">
            确定
          </div>
          <div class="btnSure" @click="closeArea">
            取消
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>
<script>
  export default {
    props: {
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
        selectShow: false,     // 控制展开与否
        selectData: [],        // 后台返回的地区数组
        checkNames: [],        // 被选中的地区数组
        defaultValue: ''       // 默认值， 用于显示
      }
    },
    created() {},
    mounted() {
      document.addEventListener('click', this.controlShow)
      // 如果需要联动，注释掉
      this._getSelectArea()
    },
    computed: {
      dataType() {
        return this.selectData[0] instanceof Object
      }
    },
    // watch是为了联动
    watch: {
      url: {
        handler: function (val, oldVal) {
          this.checkNames = []
          this._getSelectArea()
        },
        deep: true  //增加deep 观察对象的子对象变化
      }
    },

    methods: {
      // 关闭
      controlShow() {
        this.selectShow = false
      },
      showCont() {
        this.selectShow = !this.selectShow;
      },
      // 点击的是时候就change
      _change(item) {
        // 将所选的地区传递出去
        if (this.dataType) {
          this.defaultValue = item.name
          this.$emit('change', item.value)
        } else {
          this.defaultValue = item
          this.$emit('change', item)
        }
      },
      // 关闭
      closeArea() {
        this.selectShow = false;
      },
      // 点击确认
      emitArea() {
        // 被选中的地区不可超过3个
        if (this.checkNames.length > 3) {
          this.$message({
            message: '最多选择三个地区',
            center: true
          })
          return
        }
        // 设置默认值用于显示
        this.defaultValue = this.checkNames[0]
        // 向父组件传递选中的地区字符串
        this.$emit('change', this.checkNames.join(','))
      },
      // 从服务器获取地区数据
      _getSelectArea() {
        this.$xhr.get(this.url).then((res) => {
          this.selectData = res.data
          if (this.dataType) {
            this.defaultValue = this.selectData[0].value
            this.checkNames[0]= res.data[0].value
          } else {
            this.defaultValue = this.selectData[0]
            this.checkNames[0] = res.data[0]
          }
          this.$emit('change', this.defaultValue)
        }).catch((error) => {
          this.selectData = error
        })
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

  .select-wrapper {
    position: relative;
    width: 1.5rem;
    height: 0.3rem;
    line-height: 0.3rem;
    box-sizing: border-box;
    .selectArea {
      position: absolute;
      right: 0;
      display: flex;
      width: 100%;
      height: 0.3rem;
      line-height: 0.3rem;
      border: 1px solid #1A5484;
      font-size: .18rem;
      color: $blue;
      cursor: pointer;
      box-sizing: border-box;
      .selectArea-title {
        flex: 1;
        border-right: 1px solid $blue;
        text-align: center;
      }
      .selectArea-select {
        flex: 0 0 35px;
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
      z-index: 100;
      @include arrow-top;
      .scroll-wrapper {
        height: calc(2.13rem - 0.33rem);
        overflow-y: auto;
        margin-top: 0.15rem;
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
