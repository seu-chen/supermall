<template>
  <div class="recommends">
    <div v-for="(item,index) in recommends.list" :key="index" class="recommend-item">
      <a :href="item.link">
        <img :src="item.image" alt="">
        <div>{{item.title}}</div>
      </a>
    </div>
  </div>
</template>

<script>
export default {
  name:'HomeRecommendView',
  props:{
    recommends:{
      default() {
        return []
      }
    }
  }
}
</script>

<style>
  .recommends{
    display: flex;
    width: 100%;
    text-align: center;
    font-size: 12px;

    padding:10px 0 20px;
    border-bottom: 10px solid #eee;
  }
  .recommends .recommend-item {
    flex: 1;
  }
  .recommend-item img {
    width: 70px;
    margin-bottom: 5px;
  }
</style>