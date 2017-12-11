<template>
  <div class="explain-wrapper" @mouseover="showDetail" @mouseout="closeDetail">
    <i class="iconfont icon-weibiaoti6-copy"></i>
    <div v-if="eText" class="text" ref="text" v-html="eText"></div>
    <div v-else class="text" ref="text">
      <slot></slot>
    </div>
  </div>
</template>
<script>

import { prefixStyle } from 'assets/js/dom'

const transition = prefixStyle('transition')

export default {
  data() {
    return {
      show: false
    }
  },
  props: {
    eText: {
      type: String,
      default: ''
    }
  },
  methods: {
    showDetail() {
      this.$refs.text.style[transition] = 'all .2s ease-in'
      this.$refs.text.style.opacity = '1'
      this.$refs.text.style.zIndex = '101'

      // const transform = prefixStyle('transform')
      // const transitionDuration = prefixStyle('transitionDuration')
      //  this.$refs.lyricList.$el.style[transform] = `translate3d(${offsetWidth}px,0,0)`
      //             this.$refs.lyricList.$el.style[transitionDuration] = 0
    },
    closeDetail() {
      this.$refs.text.style.opacity = '0'
      this.$refs.text.style.zIndex = '-1'
    }
  }
}

</script>
<style lang="scss" scoped>
@import "./../../assets/css/_variable.scss";
@import "./../../assets/css/_mixin.scss";

.explain-wrapper {
  height: 0.31rem;
  line-height: 0.31rem;
  position: relative;
  i {
    font-size: 24px;
    color: $blue;
    cursor: pointer;
    &:hover {color: #00B064;}
  }
  .text {
    position: absolute;
    top: 0.3rem;
    right: 0;
    color: #fff;
    width: 5rem;
    padding: 0.2rem;
    font-size: 0.18rem;
    // @include arrow-top(0.04rem !important,'');
    // @include border;
    // background: rgba(11, 13, 29, .8);
    background: rgba(11, 13, 29, 1);
    opacity: 0;
    z-index: -1;
    text-align: left;
  }
}

.explain-enter-active,
.explain-leave-active {
  transition: all 1s
}

.explain-enter,
.explain-leave-to {
  opacity: 0; // display: none;
} // .explainFade-enter-active{
//    transition: all .5s;
//     opacity:1;
// }
// .explainFade-leave-active{
//    transition: all .5s;
//     opacity:0;
// }

</style>
