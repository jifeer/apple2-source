<template>
  <div class="select-wrapper">
    <div class="selectArea" @click.stop="showCont">
      <div class="selectArea-title" v-html="defaultValue"></div>
      <div class="selectArea-select">
        <i class="iconfont icon-arrLeft-fill"></i>
      </div>
    </div>
    <transition name="select">
      <div class="arrow" v-show="selectShow">
        <div class="arrow-cont">
          <ul v-if="dataType">
            <li v-for="(item, index) in selectData" :class="{active: index === activeIndex}"
                @click="change(item, index)">
              {{item.name}}
            </li>
          </ul>
          <ul v-else>
            <li v-for="(item, index) in selectData" :class="{active: index === activeIndex}"
                @click="change(item, index)">
              {{item}}
            </li>
          </ul>
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
        default: "diy"
      },
      num: {
        type: String,
        default: '1'
      },
      defaultOption: {
        type: String,
        default: ''
      },
      url: {
        type: String,
        default: ''
      },
      data: {
        type: Array,
        data: () => []
      }
    },
    data() {
      return {
        selectData: [],
        selectShow: false,
        activeIndex: 0,
        defaultValue: ''
      }
    },
    created() {
      // console.log(this.selectData)
      document.addEventListener('click', this.controlShow)
    },
    mounted() {
      this.getSelectArea()
    },
    computed: {
      dataType() {
        return this.selectData[0] instanceof Object
      }
    },
    methods: {
      showCont() {
        this.selectShow = !this.selectShow
      },
      change(item, index) {

        // 样式 激活态
        this.activeIndex = index

        // 将所选的地区传递出去
        if (this.dataType) {
          this.defaultValue = item.name
          this.$emit('change', item)
        } else {
          this.defaultValue = item
          this.$emit('change', item)
        }
      },
      controlShow() {
        this.selectShow = false
      },
      getSelectArea() {
        if (this.url) {
          this.$xhr.get(this.url).then((res) => {
            this.selectData = res.data
            let index = res.data.findIndex((item, index) => {
              return item === this.defaultOption
            })
            if (this.dataType) {
              // 如果存在 默认地区选项。 不支持多选！
              if (this.defaultOption && index !== -1) {
                this.defaultValue = res.data[index]
                this.activeIndex = index
                this.$emit('change', this.defaultValue)
              } else {
                this.defaultValue = this.selectData[0].name
                // this.$emit('change', this.selectData.slice(0, parseInt(this.num)).map(item => item.name).join(','))
                // 如此默认只传出一个值来
                this.$emit('change', this.selectData.slice(0, parseInt(this.num))[0])
              }
            } else {
              if (this.defaultOption  && index !== -1) {
                this.defaultValue = res.data[index]
                this.activeIndex = index
                this.$emit('change', this.defaultValue)
              } else {
                this.defaultValue = this.selectData[0]
                this.$emit('change', this.selectData.slice(0, parseInt(this.num)).join(','))
              }
            }
          }).catch((error) => {
            console.log(error)
          })
        } else {
          if (this.data instanceof Array) {
            this.selectData = this.data
          } else {
            this.selectData = this.data.split(',')
          }

          if (this.dataType) {
            this.defaultValue = this.selectData[0].name

            this.$emit('change', this.selectData[0])
          } else {
            this.defaultValue = this.selectData[0]

            if (typeof(this.selectData[0]) === 'number') {
              this.$emit('change', (this.selectData[0]).toString())
            } else {
              this.$emit('change', this.selectData[0])
            }
          }

        }
      }
    },
    watch: {
      url(newValue, oldValue){
        this.getSelectArea()
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
    .selectArea {
      display: flex;
      width: 100%;
      // min-width: 1.4rem;
      // max-width: 2rem;
      max-height: 0.3rem;
      line-height: 0.3rem;
      border: 1px solid #1A5484;
      font-size: .18rem;
      color: $blue;
      cursor: pointer;
      box-sizing: border-box;

      .selectArea-title {
        flex: 1;
        // width: calc(100% - 0.35rem);
        @extend %no-wrap;
        border-right: 1px solid #1A5484;
        text-align: center;
      }
      .selectArea-select {
        flex: 0 0 0.35rem;
        text-align: center;
      }
    }
    .arrow {
      width:100%;
      position: absolute;
      top: 39px;
      right: 0;
      z-index: 100;
      border: 1px solid #1A5484;
      background-color: #071429;
      @include arrow-top;
      .arrow-cont {
        margin-top: 15px;
        width: 100%;
        background: #071429;
        max-height: calc(3rem - 15px);
        /*overflow: auto;*/
        // padding-bottom: 36px;
        overflow-x: hidden;
        box-sizing: border-box;
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
            &:hover, &.active {
              background: #0e335b;
            }
          }
        }
      }
    }

  }

  .select-enter-active, .select-leave-active {
    transition: all 0.3s;
  }

  .select-enter, .select-leave-to {
    opacity: 0;
  }

  // .arrow-cont em{
  //     display:block;
  //     position:absolute;
  //     top:-0.09rem;
  //     right:0.1rem;
  //     border-left:8px solid transparent;
  //     border-right:8px solid transparent;
  //     border-bottom:8px solid $blue;
  //     font-size:0;
  //     line-height:0;
  //   }
  // .arrow-cont span{
  //     display:block;
  //     position:absolute;
  //     top:-0.07rem;
  //     right:0.1rem;
  //     border-left:8px solid transparent;
  //     border-right:8px solid transparent;
  //     border-bottom:8px solid #071429;
  //     font-size:0;
  //     line-height:0;
  //   }


</style>
