<template>
  <div class="select-wrapper">
    <div class="selectArea" @click.stop="showCont">
      <div class="selectArea-title">{{showId}}</div>
      <div class="selectArea-select">
        <i class="iconfont icon-arrLeft-fill"></i>
      </div>
    </div>
    <!-- <transition name="select"> -->
    <i class="arrow" v-show="selectShow"></i>
    <!-- </transition> -->
    <transition name="select">
      <div class="arrow-cont" ref="arrowCont" v-show="selectShow">
        <div class="help-wrappper">
          <div class="scroll-wrapper" ref="scrollWrapper">
            <el-tree :props="props" :load="loadNode" lazy accordion :highlight-current="highlightCurrent" @check-change="handleCheckChange" @node-click="handleNodeClick" @node-expand="refreshBtn" @node-collapse="refreshBtn">
            </el-tree>
          </div>
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
      timeType: {
        type: String,
        default: 'month'
      },
      appleType: {
        type: String,
        default: '富士苹果'
      }
    },
    data() {
      return {
        props: {
          label: 'name',
          children: 'zones'
        },
        highlightCurrent: true,
        selectShow: false,
        // 供显示使用
        showId: '山东',
        //供点击使用
        clickId: '',
        clickType: 0,
        // 供查询使用
        type: 0,

        // 传递到自组件中的type
        emitType: 1
      }
    },
    mounted() {
      document.addEventListener('click', this.controlShow)
      // this.emit()
      this.$emit("change", {id: '370000', name: '山东', grade: 1})
    },

    methods: {
      // select-tree 树
      handleNodeClick(data, node, self) {
        // console.log('handleNodeClick')
        // id : "110000"
        // name : "北京市"
        // type : "1"
        // grade=0&area=370000
        this.showId = data.name
        this.clickId = data.id
        this.clickType = data.type

        this.$emit("change", {id: data.id, name: data.name, grade: data.type})
      },
      handleCheckChange(data, checked, indeterminate) {
        //        console.log(data, checked, indeterminate);
      },
      loadNode(node, resolve) {
        if (node.data) {
          this.clickId = node.data.id
          this.clickType = node.data.type
        }
        //        node.childNodes[0].checked  = true
        this.$xhr.get(this.url, {
          params: {
            // AREA_NAME: ,
            // type: this.type
            type: this.timeType,
            appleType: this.appleType,
            grade: this.clickType,
            area: this.clickId
          }
        }).then((res) => {
          resolve(res.data)
        }).catch((err) => {
          resolve([])
        })
      },
      emit() {
        // if (this.clickType === 1 || this.clickType === 3) {
        //   this.showId = this.clickId
        // } else if (this.clickType == 2) {
        //   this.open()
        // }
        // this.$emit("change", {id: '370000', name: '山东', grade: 1})
        this.controlShow();
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

      open() {
        this.$message({
          message: '市级不可选',
          center: true
        })
      },
      refreshBtn() {
        /*setTimeout(() => {
         const appHeight = this.$refs.arrowCont.clientHeight
         const scrollHeight = this.$refs.scrollWrapper.clientHeight
         if (scrollHeight >= appHeight - 33) {
         this.$refs.btnGroup.style.position = 'relative'
         } else {
         this.$refs.btnGroup.style.position = 'absolute'
         }
         }, 201)*/
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
      border: 1px solid #1A5484;
      font-size: .18rem;
      color: $blue;
      cursor: pointer;
      box-sizing: border-box;

      .selectArea-title {
        flex: 1; // width: calc(100% - 0.35rem);
        @extend %no-wrap;
        border-right: 1px solid #1A5484;
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
      padding: .2rem 0 .33rem;
      border: 1px solid #1A5484;
      background: #071429;
      z-index: 100;
      text-align: left;

      @include arrow-top;
      box-sizing: border-box;
      .help-wrappper {
        width: 100%;
        height: 2.45rem;
        overflow-y: auto;
        overflow-x: hidden;
      }

      .scroll-wrapper {
        //overflow-y:scroll;
        width: 3rem; // height: calc(100% - 0.33rem);
        .el-tree /deep/ .el-tree-node .el-tree-node__content .el-tree-node__label {
          font-size: 18px;
          font-weight: 200;
        }
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
      /*.btnGroup {
        position: absolute;
        bottom: 0;
        left: 0;
      }*/
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
