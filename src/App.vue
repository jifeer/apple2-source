<template>
    <div id="app">
    <headerWrap></headerWrap>

    <div class="app-content">
       	<!-- <keep-alive> -->
        	<router-view></router-view>
        <!-- </keep-alive> -->
    </div>
    </div>
</template>


<script>
import headerWrap from 'components/header/header'

export default {
    name: 'app',
    components: {
        headerWrap
    }
}
</script>

<style lang="scss" scoped>

</style>
