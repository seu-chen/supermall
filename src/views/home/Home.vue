<template>
  <div id="home">
    <nav-bar class="home-nav"><div slot="center" >购物街</div></nav-bar>
    <tab-control :titles="['流行','新款','精选']" ref="tabControl1" @tabClick='tabClick' v-show="isFixed" class="tab-control"></tab-control>

    <scroll class="content" 
            ref="scroll" 
            :probe-type='3'
            :pull-up-load=true
            @scroll="contentScroll"
            @pullingUp ='loadMore'>
      <home-swiper :banners = 'banners' @swiperImageLoad = 'swiperImageLoad'></home-swiper>
      <home-recommend-view :recommends = 'recommends'></home-recommend-view>
      <home-feature/>

      <tab-control :titles="['流行','新款','精选']" ref="tabControl2" @tabClick='tabClick'></tab-control>
      <goods-list :goods='goods[currentType].list'></goods-list>
    </scroll>

    <back-top @click.native = 'backClick' v-show="isShowBackUp"></back-top>
  </div>
</template>

<script>
// 首页子组件
import HomeSwiper from './childComps/HomeSwiper'
import HomeRecommendView from './childComps/HomeRecommendView'
import HomeFeature from './childComps/HomeFeature'
// 公共子组件
import NavBar from 'components/common/navbar/NavBar'
import Scroll from 'components/common/scroll/Scroll'

import TabControl from 'components/content/tabControl/TabControl'
import GoodsList from 'components/content/goods/GoodsList.vue'
import BackTop from 'components/content/bcakTop/BackTop.vue'
// 功能相关方法
import {
  getHomeMultidata,
  getHomeGoods
} from "network/home"


import debounce from 'common/utils/debounce'


export default {
    name:"Home",
    components: { 
    HomeSwiper,
    HomeRecommendView,
    HomeFeature,

    NavBar,
    Scroll,
    TabControl,
    GoodsList,
    BackTop,
  },
  
  data() {
    return {
      banners:[],
      recommends:[],
      goods:{
        'pop':{page:0,list:[]},
        'new':{page:0,list:[]},
        'sell':{page:0,list:[]},
      },
      currentType:'pop',
      isShowBackUp:false,
      scrollDis:0,
      tabOffset:590,
      isFixed:false,
      saveY:0,
    }
  },
  // 生命周期函数的created(),
  created() {
    // 1、请求多个数据
    this.getHomeMultidata();

    this.getHomeGoods('pop');
    this.getHomeGoods('new');
    this.getHomeGoods('sell');
    
  },
  mounted() {
    const refresh = debounce(this.$refs.scroll.refresh,100)
    // 3.监听图片加载事件
    this.$bus.$on('homeItemLoad',() => {
     
      refresh()
      // console.log('-----------');
    }) 
  },
  destroyed() {
    // console.log('destory');
  },
  // 路由活跃信息
  activated() {
    // console.log('活跃了');
    this.$refs.scroll.scrollTo(0, this.saveY, 0)
    this.$refs.scroll.refresh()
  },
  deactivated() {
    // console.log('不活跃了');
    this.saveY = this.$refs.scroll.getScrollY()
    // console.log(this.saveY);
  },
  methods:{
    // 事件监听相关方法
    tabClick(index) {
      // console.log('1');
      switch (index) {
        case 0:
          this.currentType = 'pop';
          break
        case 1:
          this.currentType = 'new';
          break
        case 2:
          this.currentType = 'sell';
          break
      }
      // 为了保持两个tabControl的活跃位置是一样的
      this.$refs.tabControl1.currentIndex = index;
      this.$refs.tabControl2.currentIndex = index;
    },
    swiperImageLoad() {
      // console.log('1111');  
      // console.log(this.$refs.tabControl); // 这样直接拿到的是组件
      // console.log(this.$refs.tabControl.$el);  // 加上$el之后，可以拿到对应组件内的元素
      this.tabOffset = this.$refs.tabControl2.$el.offsetTop; 
    },
    backClick() {
      // console.log('点击了一下');
      // console.log(this.$refs.scroll)
      this.$refs.scroll.scrollTo(0,0)   
    },
    // 滚动位置 判断距离
    contentScroll(position) {
      this.scrollDis = 0-position.y;
      // console.log(this.scrollDis);
      if(this.scrollDis >= 1000) {
        this.isShowBackUp = true
      }else {
        this.isShowBackUp = false
      }

      this.isFixed = this.scrollDis > this.tabOffset? true:false;
    },
    // 上拉加载更多
    loadMore() {
      this.getHomeGoods(this.currentType)
    },
    // 网络请求相关方法
    getHomeMultidata() {
      getHomeMultidata().then((result) => {
      // console.log(result)
      // this.result = result
      this.banners = result.data.banner;
      this.recommends = result.data.recommend;
    }).catch((err) => {
      console.log(err);
    })
    },
    getHomeGoods(type) {
      const page = this.goods[type].page + 1
      getHomeGoods(type, page).then(res => {
        this.goods[type].list.push(...res.data.list)
        this.goods[type].page +=1
      }).catch(err => {
        console.log('获取失败');
      })
      // 独立思考的结果 
      this.$nextTick(() => {
        this.$refs.scroll.finishPullUp()
      }) 
    },
   
  }
}
</script>

<style scoped>
  #home {
    height: 100vh;
    position: relative;
  }
  .home-nav {
    background-color: var(--color-tint);
    color: white;
    /* 导航设置fixed会脱离标准流，现在使用betterscroll 不需要fixed*/
    /* position: fixed;
    left: 0;
    top: 0;
    z-index: 999; */
  }

  .content {
    overflow: hidden;

    position: absolute;
    top: 44px;
    bottom: 49px;
    left: 0;
    right: 0;
  }

  .tab-control {
    position: relative;
    z-index: 999;
    background-color: #fff;
  }
</style>