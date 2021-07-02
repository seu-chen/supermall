<template>
  <div class="tab-control">
    <div v-for="(item,index) in titles" class="tab-control-item" 
        :class="{active:index === currentIndex}"
        @click = 'itemClick(index)' :key="index">
      <span>{{item}}</span>
    </div>
  </div>
</template>

<script>
export default {
  name:"TabControl",
  data() {
    return {
         currentIndex:0
    }
  },
  props: {
    titles:{
      type:Array,
      default() {
        return []
      }
    }
  },
  methods: {
    itemClick(index) {
      this.currentIndex = index;
      this.$emit('tabClick',index)
    }
  }
}
</script>

<style>
  .tab-control {
    display: flex;
    text-align: center;
  }

  .tab-control-item {
    flex: 1;
    height: 40px;
    line-height: 40px;
  }

  .active span{
    color: var(--color-high-text);
    border-bottom: var(--color-tint) 3px solid;
    padding: 5px;
  }
</style>