<template>

  <div class="header-wrapper">
    <div class="header-logo"><img src="../../assets/img/logo_apple.png"/></div>
    <!--<div class="header-right">
      <ul>
        <li> <i class="iconfont icon-iconzhenghe31"></i></li>
        <li> <i class="iconfont icon-shezhi"></i></li>
        <li> <i class="iconfont icon-iconfontmall01"></i></li>
      </ul>
    </div>-->
  </div>

</template>

<script>

  export default {
    name: 'header',
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

  .header-wrapper {
    width: 100%;
    height: $size*98rem;
    display: flex;
    align-items: center;
    justify-content:space-between;
    .header-logo {
      width: 3.5rem;
      font-size:0.22rem;
      margin-left: 1.2rem;
      display: flex;
      align-items: center;
      height: 100%;
      img {
        width: 100%;
      }

    }
    .header-right{
      color:#fff;

      text-align: right;
      ul{
        display:flex;
        height:100%;
        margin-right:0.3rem;
        li{
          margin:0 0.1rem;
          cursor: pointer;
        }
        li:hover{
          color:#00af67;
        }
      }
    }
  }

</style>
