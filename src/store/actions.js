import {
  ADD_COUNTER,
  ADD_TO_CART
} from './mutation-types'

export default {
    addCart(context, payload) {
      // let oldProduct = null;

      // for (let item of state.cartList) {
      //   if (item.iid === payload.iid) {
      //     oldProduct = item;
      //   }
      // }
      return new Promise((resolve,reject) => {
        let oldProduct = context.state.cartList.find(item => item.iid === payload.iid)

        if (oldProduct) {
          // oldProduct.count += 1
          context.commit(ADD_COUNTER,oldProduct);
          resolve('当前商品数量加1')
        }else {
          payload.count = 1;
          // state.cartList.push(payload)
          context.commit(ADD_TO_CART, payload);
          resolve('加入购物车成功')
        }
      })
    }
}