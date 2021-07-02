import {
  ADD_COUNTER,
  ADD_TO_CART
} from './mutation-types'

export default {
   // mutation 唯一的目的就是修改state中的状态
    // mutation 中的每一个方法尽可能完成的事件单一
    // 1、商品数量加一
    [ADD_COUNTER](state,payload) {
      payload.count++
    },
    // 2、添加新商品
    [ADD_TO_CART](state, payload) {
      payload.checked = true
      state.cartList.push(payload)
    }

}