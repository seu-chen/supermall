<template>
  <div id="app">
    <keep-alive exclude="Detail">
      <router-view></router-view>
    </keep-alive>
    <main-tab-bar class="tab-bar"></main-tab-bar>
  </div>
</template>

<script>
import MainTabBar from 'components/content/mainTabbar/MainTabBar' 

export default {
  name:'app',
  components:{
    MainTabBar
  }
}

</script>
<style>
  @import url('./assets/css/base.css');
  .tab-bar {
    z-index: 99;
  }
</style>

