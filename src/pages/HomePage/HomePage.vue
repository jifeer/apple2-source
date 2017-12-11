<template>
  <div class="HomePage-wrapper">
  	<h1>这是首页</h1>
  </div>
</template>

<script type="text/javascript">
// **** 组件名称 大驼峰 *****
// ** 本地公用变量 公用函数 **
// ***** 第三方 组件库 *****
// ***** 本地 公用组件 *****
// ** 当前组件的 子组件等 ***

export default {
  name: 'HomePage',
  props: {
    title: {
      type: String,
      default: ''
    }
  },
  data() {
    return {

    }
  }
}
</script>

<style lang="scss" scoped>
.HomePage-wrapper{
	width: 100%;
	height: 100%;
	position: absolute;
	top:0;left:0;
	background: url(assets/img/bg_01.jpg);
	background-size: 1920px 1080px;
	  h1{
	  	color:#fff;
	  }
  }
</style>