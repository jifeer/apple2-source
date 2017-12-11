<template>
  <transition name="small-window">
    <div v-if="isShow" class="small-window-wrapper">
      <div class="small-window-header">
        <div class="title">{{title}}</div>
        <div class="option">
          <div class="openBig" @click="openBig"><i class="iconfont icon-fangda"></i></div>
          <div class="close" @click="close"><i class="iconfont icon-guanbi"></i></div>
        </div>
      </div>
      <div class="small-window-cont">
        <slot></slot>
      </div>
    </div>
  </transition>
</template>

<script>
  export default {
    props: {
      title: {
        type: String,
        default: ''
      },
      isShow: {
        type: Boolean,
        default: false
      },
      whichWindow: {
        type: String,
        default: ''
      }

    },
    name: 'product',
    data() {
      return {
        showSmallWindow: false
      };
    },
    // watch: {
    //     isShow: function (val, oldVal) {
    //           this.isShow = val;
    //     }
    // },
    methods: {
      close() {
        this.$emit('closeWindow', this.whichWindow)
      },
      openBig() {
        this.$emit('openBigWindow', this.whichWindow)
      }
    },
    components: {}
  };
</script>

<style lang="scss" scoped>
  @import "./../../assets/css/_variable.scss";
  @import "./../../assets/css/_mixin.scss";

  .small-window-wrapper {
    @include flex(flex-start, center, column);
    width: 4.8rem;
    height: 28.5%;
    background: #071429;
    border: 1px solid #1961A5;
    color: #fff;
    .small-window-header {
      position: relative;
      flex: 0 0 0.5rem;
      width: 100%;
      .title {
        float: left;
        width: 84%;
        text-align: center;
        text-indent: 2em;
        font-size: 0.18rem;
        padding-top: 0.17rem;
      }
      .option {
        width: 0.74rem;
        padding-top: 0.17rem;
        float: right;
        display: flex;
        justify-content: space-around;
        color: #0372B1;
        .close {
          cursor: pointer
        }
        .openBig {
          cursor: pointer
        }
      }
    }
    .small-window-cont {
      flex: 1;
      width: 100%;
    }
  }

  .small-window-enter-active, .small-window-leave-active {
    transition: opacity .2s
  }

  .small-window-enter, .small-window-leave-to {
    opacity: 0
  }


</style>
