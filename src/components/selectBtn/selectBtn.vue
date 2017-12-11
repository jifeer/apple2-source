<template>
  <div class="selectBtn-wrapper">
    <div v-if="dataType" class="selectBtn" :class="{'active':index === btnIndex}" v-for="(item, index) in btnData" @click="changeBtn(item, index)">
      {{item.name}}
    </div>
    <div v-if="!dataType"  class="selectBtn" :class="{'active':index === btnIndex}" v-for="(item, index) in btnData" @click="changeBtn(item, index)">
      {{item}}
    </div>
  </div>
</template>
<script>
  export default {
    props: {
      btnData: {
        type: Array,
        default: function() {
          return ['月度', '年度']
        }
      },
      btnIndex: {
        type: Number,
        default: 0
      }
    },
    mounted() {
      if (this.dataType) {

        if (typeof(this.btnData[this.btnIndex].value) === 'number') {
          this.$emit('changeBtn', (this.btnData[this.btnIndex].value).toString())
        } else {
          this.$emit('changeBtn', this.btnData[this.btnIndex].value)
        }

      } else {
        this.$emit('changeBtn', this.btnData[this.btnIndex])
      }
    },
    computed: {
      dataType() {
        return this.btnData[0] instanceof Object
      }
    },
    methods: {
      changeBtn(item, index) {
        this.$emit('update:btnIndex', index)
        if (this.dataType) {
          if (typeof(item.value) === 'number') {
            this.$emit('changeBtn', (item.value).toString())
          } else {
            this.$emit('changeBtn', item.value)
          }
        } else {
          this.$emit('changeBtn', item)
        }
      }
    }
  }

</script>
<style lang="scss" scoped>
  @import "./../../assets/css/_variable.scss";
  @import "./../../assets/css/_mixin.scss";

  .selectBtn-wrapper {
    display: inline-block;
    height: 0.3rem;
    box-sizing: border-box;
    border: 1px solid #1A5484;
    .selectBtn {
      position: relative;
      box-sizing: border-box;
      display: inline-block;
      width: 1.06rem;
      height: 100%;
      line-height: 0.28rem;
      box-sizing: border-box;
      text-align: center;
      font-size: .18rem;
      color: $blue;
      cursor: pointer;
      @include animation(0.1s);
      &.active,
      &:hover {
        color: $green;
        font-weight: bold;
      }
      &:after {
        content: '';
        width: 1px;
        height: 0.2rem;
        position: absolute;
        top: 0.06rem;
        right: 0;
        background-color: #0372b1
      }
      &:last-child {
        &:after {
          content: '';
          width: 0px;
        }
      }
    }
  }

</style>
