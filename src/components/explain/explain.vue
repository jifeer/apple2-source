<template>
  <div class="explain-wrapper" @click.stop="showDetail">
    <i :class="{ activetoo: isActive }" class="iconfont icon-weibiaoti6-copy" ></i>
    <div v-if="eText" @click.stop :class="{active: isActive}" class="text" ref="text" v-html="eText"></div>
    <div v-else class="text" ref="text" :class="{active: isActive}" @click.stop>
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
      show: false,
      isActive: false
    }
  },
  props: {
    eText: {
      type: String,
      default: ''
    }
  },
  mounted() {
    document.addEventListener('click', this.controlHide)
  },
  methods: {
    showDetail() {
      this.isActive = !this.isActive
    },
    controlHide() {
     // console.log('something')
      this.isActive = false
    },
    closeDetail() {
      this.$refs.text.style.opacity = '0'
      this.$refs.text.style.zIndex = '-1'
    }
  },
  beforeDestroy() {
    document.removeEventListener('click', this.controlHide)
  }
}

</script>
<style lang="scss" scoped>
@import "./../../assets/css/_variable.scss";
@import "./../../assets/css/_mixin.scss";

.explain-wrapper {
  height: 0.3rem;
  line-height: 0.3rem;
  position: relative;
  i {
    font-size: 24px;
    color: $blue;
    cursor: pointer;
    &:hover {color: #00B064;}
  }
  .activetoo {
    color: #00B064;
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
    transition: all .2s ease-in;
    opacity: 0;
    z-index: -1;
    text-align: left;
  }
  .active {
    transition: all .2s ease-in;
    opacity: 1;
    z-index: 10;
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
