<template>
  <div class="goods-list-item" @click = 'itemClick'>
    <img :src="showImage" alt="" class="picture" @load='imageLoad'>
    <div class="goods-info">
      <p class="title">{{goodsItem.title}}</p>
      <span class="price">{{goodsItem.price}}</span>
      <span class="collect">{{goodsItem.cfav}}</span>
    </div>
  </div>
</template>

<script>
import debounce from 'common/utils/debounce'

export default {
  name:"GoodsListItem",
  data() {
    return {
      imageEmit:null      
    }
  },
  created(){
    // this.imageEmit = debounce(() => {
    //   if(this.$route.path.indexOf('/home') !== -1) {
    //     this.$bus.$emit('homeItemLoad')
    //     // console.log('首页');
    //   };
    //   this.$emit('imageLoad')
    // })
  },
  props:{
    goodsItem:{
      type:Object,
      default() {
        return {}
      }
    }
  },
  methods:{
    imageLoad() {
      if(this.$route.path.indexOf('/home') !== -1) {
        this.$bus.$emit('homeItemLoad')
      };
    },
    itemClick() {
      // console.log(this.goodsItem);
      this.$router.push('/detail/'+ this.goodsItem.iid);

    }
  },
  computed: {
    showImage() {
      return this.goodsItem.img || this.goodsItem.image || this.goodsItem.show.img
    },

  }

}
</script>

<style>
  .goods-list-item {
    padding-bottom: 40px;
    position: relative;
    width: 48%;
  }

  .goods-list-item .picture {
    width: 100%;
    border-radius: 5px;
  }

  .goods-info {
    font-size: 12px;
    position: absolute;
    bottom: 5px;
    left: 0;
    right: 0;
    overflow: hidden;
    text-align: center;
  }

  .goods-info .title {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    margin-top:3px;
  }

  .goods-info .price {
    color: var(--color-high-text);
    margin-right: 30px;
  }

  .goods-info .collect {
    position: relative;
  }
  .goods-info .collect::before {
    content: '';
    position: absolute;
    left: -15px;
    top: -1px;
    width: 14px;
    height: 14px;
    background: url("~assets/img/common/collect.svg") 0 0/14px 14px;
  }
</style>