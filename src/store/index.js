import Vue from 'vue'
import Vuex from 'vuex'
import {request} from "../network/request";
import router from "../router";

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isNone: false,//用来判断登录窗口的状态，true显示，反之不显示
    userInf: undefined,//用户信息
    staticPath: "http://localhost/static/"  //"http://www.qcy123456.cn"
  },
  mutations: {
    show() {
      this.state.isNone = true;
    },
    hidden() {
      this.state.isNone = false
    },
    getUserInf() {//获取用户登录信息
      request({url: "user/isLogin"}).then((res) => {
        if (res.data != "")//表示登录成功
        {
          this.state.userInf = res.data
        }
      })
    },
    Cancel() {//注销登录
      request({url: "user/cancel"}).then((res) => {
        router.go(0)//刷新页面
      })
    }
  },
  actions: {},
  modules: {}
})
