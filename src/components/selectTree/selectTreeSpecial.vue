<template>
  <div class="select-wrapper">
    <div class="selectArea" @click.stop="showCont">
      <div class="selectArea-title">{{xianshi}}</div>
      <div class="selectArea-select">
        <i class="iconfont icon-arrLeft-fill"></i>
      </div>
    </div>
    <!-- <transition name="select"> -->
    <i class="arrow" v-if="selectShow"></i>
    <!-- </transition> -->
    <transition name="select">
      <div class="arrow-cont" v-show="selectShow" ref="arrowCont">
        <div class="arrow-wrap">
          <div class="scroll-wrapper" ref="scrollWrapper">
            <el-tree
              ref="tree"
              :data="data"
              :props="defaultProps"
              show-checkbox
              :check-strictly='true'
              :highlight-current=false
              node-key="itemId"
              :default-checked-keys="defaultChecked"
              :default-expanded-keys="[data.length?data[0].id:0]"
              @check-change="handleCheckChange"
              @node-click="handleNodeClick"


              @node-expand="refreshBtn"
              @node-collapse="refreshBtn">
            </el-tree>
          </div>
        </div>
        <div class="btnGroup" ref="btnGroup">
          <div class="btnSure" @click.stop="pick">
            确定
          </div>
          <div class="btnSure" @click.stop="close">
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
        aa: true,         // 显示高亮
        selectShow: false,  // 控制显示隐藏
        data: [],         // xhr 返回来的数据
        defaultProps: {   // 标签类型
          label: 'label',
          children: 'children'
        },
        xianshi: '',    // 仅用于页面显示
        localId: [],     // 收集所有选中的没有选中的

        defaultChecked: [],
        defaultExpand: [],
        level: 1,
        checkedCache: [],
      }
    },
    mounted() {
      document.addEventListener('click', this.controlShow)
      this.getData()
    },
    methods: {
      getData() {
        this.$xhr.get(this.url, {
          params: {}
        }).then((res) => {
          this._handleRes(res.data)
          this.data = res.data
          // 设置默认选中
          this.defaultChecked[0] = res.data[0].itemId - 0

          this.checkedCache[0] = res.data[0]
          // 初始化获取数据后，让html显示第一个item的label，并将其id传出去
          this.xianshi = res.data[0].label
          let idStr = ''
          if (!!res.data[0].JitemId) {
            idStr = [res.data[0].itemId, res.data[0].JitemId].join(',')
          } else {
            idStr = res.data[0].itemId
          }
          this.$emit("change", [idStr, res.data[0].level])
        })
      },

      // 给每一项添加ID和level
      _handleRes(res) {
        res.forEach((v, i) => {
          v.id = v.itemId - 0
          v.level = 1
          if (v.children && v.children.length) {
            v.children.forEach((v, i) => {
              v.id = v.itemId - 0
              v.level = 2
              if (v.children && v.children.length) {
                v.children.forEach((v, i) => {
                  v.id = v.itemId - 0
                  v.level = 3
                })
              }
            })
          }
        })
      },


      handleCheckChange(data, checked, indeterminate) {
        // 得到选中的所有节点
        this.checkedCache = this.$refs.tree.getCheckedNodes()
        // 排序选中的节点
        this._sortArr(this.checkedCache)

        //console.log(this.checkedCache)
        /*if(checked){
         this.xianshi = data.label
         } else {
         this.xianshi = this.checkedCache[this.checkedCache.length - 1].label
         }*/
      },

      // 给选中的节点按照level来排序 升序
      _sortArr(arr) {
        if (!arr.length) {
          return
        }
        arr.sort((a, b) => {
          return a.level - b.level
        })
      },

      // 筛选节点
      _selectNode(node) {
        this.newNodes = []
        let newNode3 = []
        let newNode2 = []
        let newNode1 = []
        node.forEach((item, index) => {
          if (item.level === 3) {
            newNode3.push(item)
          } else if (item.level === 2) {
            newNode2.push(item)
          } else if (item.level === 1) {
            newNode1.push(item)
          }
        })
        if (newNode3.length) {
          this.newNodes = newNode3
        } else if (newNode2.length) {
          this.newNodes = newNode2
        } else if (newNode1.length) {
          this.newNodes = newNode1
        }
        let newNodesStr = []
        this.newNodes.forEach((node, index) => {
          if (!!node.JitemId) {
            newNodesStr.push(node.itemId, node.JitemId)
          } else {
            newNodesStr.push(node.itemId)
          }
        })
        return newNodesStr.toString()
      },


      handleNodeClick(data) {
        // console.log(data)
//        this.xianshi = data.label
      },
      _handleIds(arr) {
        let obj = {}
        for (let i = 0; i < arr.length; i++) {
          obj[arr[i].id] = arr[i].flag
        }

        for (let j in obj) {
          if (!obj[j]) {
            delete obj[j]
          }
        }
        return Object.keys(obj)
      },
      pick() {
        //let a = this._handleIds(this.localId)

        if (!this.checkedCache.length) {
          this.open()
          return
        }
        let a = this._selectNode(this.checkedCache)
        // console.log(a)
        // 修改显示的
        this.xianshi = this.newNodes[this.newNodes.length - 1].label

        // 触发事件
        this.$emit("change", [a, this.newNodes[0].level])
        this.close()
      },

      // 提示信息
      open() {
        this.$message({
          message: '至少选择一项',
          center: true
        })
      },
      // 关闭
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
        // setTimeout(() => {
        //   const appHeight = this.$refs.arrowCont.clientHeight
        //   const scrollHeight = this.$refs.scrollWrapper.clientHeight
        //   if (scrollHeight >= appHeight - 33) {
        //     this.$refs.btnGroup.style.position = 'relative'
        //   } else {
        //     this.$refs.btnGroup.style.position = 'absolute'
        //   }
        // }, 201)
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
      // padding: .2rem 0 0;
      border: 1px solid #1A5484;
      background: #071429;
      z-index: 100;
      text-align: left;
      overflow-y: auto;
      overflow-x: hidden;
      @include arrow-top;
      box-sizing: border-box;
      .arrow-wrap {
        position: relative;
        width: 100%;
        height: 100%;
        box-sizing: border-box;
        padding-bottom: 0.3rem;
        overflow-y: auto;
        overflow-x: hidden;
      }
      .scroll-wrapper {
        position: absolute;
        top: .2rem;
        left: 0;
        //overflow-y:scroll;
        width: 3rem;
        // height: 2.78rem;
        margin-bottom: 0.33rem;
        box-sizing: border-box;
        > div {
          // height: 2.0rem;
          box-sizing: border-box;
        }
        // padding-bottom: 0.33rem;
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
      .btnGroup {
        position: absolute;
        height: 0.33rem !important;
        // border-top: none;
        // position: absolute;
        // bottom: 0;
        // left: 0;
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
