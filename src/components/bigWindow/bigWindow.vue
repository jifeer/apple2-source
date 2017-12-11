<template>
  <transition name="bigWindow-fade">
    <div v-if="isShow" class="big-window-wrapper">
      <div class="big-window-header">
        <div class="title">{{title}}</div>
        <div class="option">
          <div class="openBig" @click="closeBig"><i class="iconfont icon-suoxiao"></i></div>
          <div class="close" @click="close"><i class="iconfont icon-guanbi"></i></div>
        </div>
      </div>
      <div class="big-window-cont">
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
        showbigWindow: false
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
      },
      closeBig() {
        this.$emit('closeBigWindow', this.whichWindow)
      }
    },
    components: {}
  };
</script>

<style lang="scss" scoped>
  @import "./../../assets/css/_variable.scss";
  @import "./../../assets/css/_mixin.scss";

  .big-window-wrapper {
    @include flex(flex-start, center, column);
    width: 15rem;
    height: 95%;
    background: #071429;
    border: 1px solid #1961A5;
    color: #fff;
    position: absolute;
    top: 0;
    left: 2rem;
    z-index: 100;
    .big-window-header {
      flex: 0 0 0.92rem;
      width: 100%;
      .title {
        font-size: 0.36rem;
        line-height: 0.92rem;
        text-align: center;
        font-weight: 100;
      }
      .option {
        width: 1.70rem;
        height: 0.92rem;
        position: absolute;
        right: 0;
        top: 0;
        display: flex;
        justify-content: center;
        align-items: center;
        color: #0372B1;
        .iconfont {
          font-size: 0.36rem;
        }

        .close {
          cursor: pointer;
        }
        .openBig {
          cursor: pointer;
          margin-right: 0.34rem;
        }
      }
    }
    .big-window-cont {
      flex: 1;
      width: 100%;
    }
  }

  .bigWindow-fade-enter-active {
    /*  transition: all .3s;
      opacity:1; 这样也可以*/
    animation: bigWindow-fadein 0.3s;
  }

  .bigWindow-fade-leave-active {
    animation: bigWindow-fadeOut 0.3s;
  }

  @keyframes bigWindow-fadein {
    0% {
      opacity: 0;
      transform: scale(0);
    }

    100% {
      opacity: 1;
      transform: scale(1);
    }
  }

  @keyframes bigWindow-fadeOut {
    0% {
      opacity: 1;
      transform: scale(1);
    }

    100% {
      opacity: 0;
      transform: scale(0);
    }
  }

</style>

