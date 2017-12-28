<template>

  <div class="left-bar-wrapper">
    <ul class="clearfix">
      <router-link class="item" tag="li" :to="{name:'index'}">
        <p><i class="icon iconfont icon-shouye"></i><br/>首页</p>
        <div class=" left-bar-underline"></div>
      </router-link>
      <router-link class="item" tag="li" :to="{name:'product'}">
        <p><i class="icon iconfont icon-guoshumiaomu"></i><br/>生产</p>
        <div class=" left-bar-underline"></div>
      </router-link>
      <router-link class="item" tag="li" :to="{name:'flow'}">
        <p><i class="iconfont icon-icon1460188803541"></i><br/>流通</p>
        <div class="left-bar-underline"></div>
      </router-link>
      <router-link class="item" tag="li" :to="{name:'price'}">
        <p><i class="iconfont icon-jiage"></i><br/>价格</p>
        <div class="left-bar-underline"></div>
      </router-link>
      <router-link class="item" tag="li" :to="{name:'expence'}">
        <p><i class="iconfont icon-xiaofei"></i><br/>消费</p>
        <div class="left-bar-underline"></div>
      </router-link>
      <router-link class="item" tag="li" :to="{name:'ForeignTrade'}">
        <p><i class="iconfont icon-shijieditu"></i><br/>贸易</p>
        <div class="left-bar-underline"></div>
      </router-link>
      <router-link class="item" tag="li" :to="{name:'CostBenefit'}">
        <p><i class="iconfont icon-yizhuanshouyi"></i><br/>成本收益</p>
        <div class="left-bar-underline "></div>
      </router-link>

    </ul>
  </div>

</template>

<script>

  export default {
    name: 'leftBar',
    data() {
      return {};
    },
    methods: {},
    components: {}
  };
</script>

<style lang="scss" scoped>
  @import "./../../assets/css/_variable.scss";
  @import "./../../assets/css/_mixin.scss";

  .left-bar-wrapper {
    position: absolute;
    left: 0.4rem;
    top: 1rem;
    ul {
      color: #0372B1;
      text-align: center;
      li {
        position: relative;
        width: 1.80rem;
        height: 0.84rem;
        line-height: 0.28rem;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 0.18rem;
        cursor: pointer;
        p {
          .iconfont {
            font-size: 0.36rem;
          }
         // &:hover {
         //    color: #00B064;
         //  }
        }

        &.active {
          color: #00B064;
          div {
            background: linear-gradient(to right, #051222, #00724B, #051222);
          }
        }
        .left-bar-underline {
          position: absolute;
          bottom: 0.03rem;
          left: 0;
          width: 100%;
          height: 1px;
          background: linear-gradient(to right, #061125, #193F77, #061125);
        }
      }

    }
  }

</style>
