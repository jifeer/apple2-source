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
                  node-key="id"
                  accordion
                  show-checkbox
                  :highlight-current=false
                  @check-change="handleCheckChange"
                  @node-click="handleNodeClick"
                  :default-checked-keys="defcheck"
                  @node-expand="refreshBtn"
                  @node-collapse="refreshBtn">
            </el-tree>
          </div>
        </div>
        <div class="btnGroup" ref="btnGroup">
          <div class="btnSure" @click="pick">
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
        aa: true,         // 显示高亮
        selectShow: false,  // 控制显示隐藏
        data: [],         // xhr 返回来的数据
        defaultProps: {   // 标签类型
          label: 'label',
          children: 'children'
        },
        xianshi: '',    // 仅用于页面显示
        localId: [],     // 收集所有选中的没有选中的
        checkedCache: [],
        defcheck: []
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
          /*this.data = res.data.map((v,i)=>{
              return {id: v.id-0,label:v.label,type: v.type-0, children: v.children.map((vv, ii)=>{
                  return {id: vv.id-0,label:vv.label,type: vv.type-0}
              })}
          })*/
          this.data = res.data

          // 初始化获取数据后，让html显示第一个item的label，并将其id传出去

          let newData = []
          if(res.data[0].children.length > 5){
            for (let i = 0; i < 5; i++) {
              this.defcheck.push(res.data[0].children[i].id)
              newData.push(res.data[0].children[i].label)
            }
          } else {
            for (let i = 0; i < res.data[0].children.length; i++) {
              this.defcheck.push(res.data[0].children[i].id)
              newData.push(res.data[0].children[i].label)
            }
          }
          this.xianshi = newData[newData.length - 1]
          this.$emit("change", newData.toString())
        })
      },
      handleCheckChange(data, checked, indeterminate) {
        this.checkedCache = this.$refs.tree.getCheckedNodes()
        // console.log(this.checkedCache)
        let current = {
          // data,
          id: data.id,
          flag: checked,
          label: data.label,
          type: data.type
        }
        this.localId.push(current)
        this.xianshi = this.checkedCache[this.checkedCache.length - 1].label
      },
      handleNodeClick(data) {
        // console.log(data)
        // this.xianshi = data.label
      },
      _handleIds(arr) {
        let obj = {}
        for(let i = 0; i < arr.length; i++) {
          obj[arr[i].id] = arr[i].flag
        }

        for (let j in obj) {
          if (!obj[j]) {
            delete obj[j]
          }
        }
        return Object.keys(obj)
      },
      _handleArea(arr) {
        let str = []
        for (let i = 0; i < arr.length; i++) {
          if(arr[i].type == 2){
              str.push(arr[i].label)
          }
        }
        return str.toString()
      },
      pick() {
        //console.log(this.localId)
        //let a = this._handleIds(this.localId)
        if(this.checkedCache.filter((v,i)=>{
            return v.type == 2
        }).length > 5){
          this.open()
          this.checkedCache.length = 5
          this.xianshi = this.checkedCache[this.checkedCache.length - 1].label
          this.$refs.tree.setCheckedNodes(this.checkedCache)
          return
        }
        let a = this._handleArea(this.checkedCache)
        this.$emit("change", a)
      },
      // 提示信息
      open() {
        this.$message({
          message: '最多可以选择5个地区',
          center: true
        })
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
