<template>
  <div class="wrapper" ref="wrapper">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import BScroll from 'better-scroll'

export default {
  name:"Scroll",
  props:{
    pullUpLoad:{
      type:Boolean,
      default() {
        true
      }
    },
    probeType:{
      type:Number,
      default() {
        return 3
      }
    }
  },
  data() {
    return {
      scroll:null,
    }
  },
  mounted() {
    // 1.创建BScroll对象
 
      this.scroll = new BScroll(this.$refs.wrapper,{
      click:true,
      probeType:this.probeType,
      pullUpLoad:this.pullUpLoad,
      observeDom:true
    })
    
    this.scroll.scrollTo(0,0) 
    
    // 2.监听滚动事件
    this.scroll.on('scroll',(position) => {
      // console.log(position);
      this.$emit('scroll',position)
    })

    // 3.监听上拉加载事件
    this.scroll.on('pullingUp', () => {
      // console.log('上拉加载更多');
      this.$emit('pullingUp')
    })

  },
  //
  
  methods:{
    scrollTo(x,y,time=300) {
      // console.log(this.scroll);
      this.scroll && this.scroll.scrollTo(x,y,time)
    },
    // 表明完上拉加载，可以下一次上拉加载
    finishPullUp() {
      this.scroll && this.scroll.finishPullUp()
    },
    refresh() {
      console.log('-------');
      this.scroll && this.scroll.refresh()
    },
    getScrollY() {
      return this.scroll ? this.scroll.y : 0
    }
  }
}
</script>

<style scoped>

</style>