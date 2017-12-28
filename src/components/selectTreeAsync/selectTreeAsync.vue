<template>
  <div class="select-wrapper">
    <div class="selectArea" @click.stop="showCont">
      <div class="selectArea-title">{{localId}}</div>
      <div class="selectArea-select">
        <i class="iconfont icon-arrLeft-fill"></i>
      </div>
    </div>
    <!-- <transition name="select"> -->
    <i class="arrow" v-if="selectShow"></i>
    <!-- </transition> -->
    <transition name="select">
      <div class="arrow-cont" ref="arrowCont"  v-if="selectShow">
        <div class="scroll-wrapper" ref="scrollWrapper">
          <el-tree
            :props="props"
            :load="loadNode"
            lazy
            accordion
            :highlight-current="highlightCurrent"
            @check-change="handleCheckChange"
            @node-click="handleNodeClick"

            @node-expand="refreshBtn"
            @node-collapse="refreshBtn">
          </el-tree>
        </div>
        <div class="btnGroup" ref="btnGroup">
          <div class="btnSure" @click="emit">
            确定
          </div>
          <div class="btnSure" @click="close">
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
      url: {
        type: String,
        default: ''
      },
    },
    data() {
      return {
        props: {
          label: 'name',
          children: 'zones'
        },
        highlightCurrent: true,
        selectShow: false,
        localId: '全国'
      }
    },
    mounted() {
      document.addEventListener('click', this.controlShow)
      this.emit()
    },
    methods: {
      // select-tree 树
      handleNodeClick(data) {
        this.localId = data.name
      },
      handleCheckChange(data, checked, indeterminate) {
        // console.log(data, checked, indeterminate);
      },
      loadNode(node, resolve) {
        // 加延时 是因为 tree 组件先执行 loadNode 方法 将 localId 先拿过来后 在执行 handleNodeClick 方法
        // 好像也不是这样的。。。加大延时
        // this.handleNodeClick()
        setTimeout(() => {
          this.$xhr.get(this.url, {
            params: {
              AREA_NAME: this.localId
            }
          }).then((res) => {
            resolve(res.data)
          }).catch((err) => {
            resolve([])
          })
        }, 1000)
      },


      emit() {
        this.$emit("change", this.localId)
      },
      close() {
        this.controlShow();
      },
      showCont() {
        this.selectShow = !this.selectShow
      },
      controlShow() {
        this.selectShow = false
      },
      refreshBtn() {
        setTimeout(() => {
          const appHeight = this.$refs.arrowCont.clientHeight
          const scrollHeight = this.$refs.scrollWrapper.clientHeight
          if (scrollHeight >= appHeight - 33) {
            this.$refs.btnGroup.style.position = 'relative'
          } else {
            this.$refs.btnGroup.style.position = 'absolute'
          }
        }, 201)
      },
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
    width: 1.5rem; // min-width: 1.4rem;
    box-sizing: border-box;

    .selectArea {
      display: flex;
      width: 100%; // max-width: 2rem;
      height: 0.3rem;
      line-height: 0.3rem;
      border: 1px solid $blue;
      font-size: .18rem;
      color: $blue;
      cursor: pointer;
      box-sizing: border-box;

      .selectArea-title {
        flex: 1; // width: calc(100% - 0.35rem);
        @extend %no-wrap;
        border-right: 1px solid $blue;
        text-align: center;
      }
      .selectArea-select {
        flex: 0 0 0.35rem;
        text-align: center;
      }
    }
    .arrow-cont {
      position: absolute;
      top: calc(0.3rem + 0.09rem);
      right: 0;
      width: 3rem;
      height: 3rem;
      padding: .2rem 0 0;
      border: 1px solid $blue;
      background: #071429;
      z-index: 100;
      text-align: left;
      overflow-y: auto;
      overflow-x: hidden;
      @include arrow-top;
      box-sizing: border-box;
      .scroll-wrapper {
        //overflow-y:scroll;
        width: 3rem; // height: calc(100% - 0.33rem);
        // padding-bottom: 0.33rem;
      }
      ul {
        li {
          padding-left: 0.15rem;
          height: 0.31rem;
          line-height: 0.31rem;
          font-size: 0.16rem;
          text-align: left;
          color: #fff;
          cursor: pointer;
          @extend %no-wrap;
          @include animation();
          &:hover,
          &.active {
            background: #0e335b;
          }
        }
      }
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

  .arrow {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    right: 0;
    @include arrow-bottom();
  }

</style>
