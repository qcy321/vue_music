<template>
  <div id="head">
    <div class="commentWidth">
      <div id="music_title">
        <div id="music_log">
          <Logo/>
        </div>
        <ul id="title_list">
          <List_Item :item="item" v-for="item in items"/>
        </ul>
        <div id="music_search">
          <SearchInput/>
        </div>
        <div id="music_login">
          <div id="music_login_link">
            <a href="javascript:;" @click="login" v-if="!isState">登录</a>
            <a href="/Index/MySong" v-if="isState">
              <img id="user_hp" @mouseenter="showInf" @mouseleave="noneInf" :src="user.headPortrait"/>
            </a>
          </div>
          <div id="user_inf" @mouseenter="showInf" @mouseleave="noneInf" v-if="isState"><!--用户头像框提示-->
            <div id="user_i" style="height: 50px;line-height: 50px">
              <a id="a_head" href="/Index/MySong">
                <img id="user_head" :src="user.headPortrait"/>
              </a>
              <a id="a_name" href="/Index/MySong">
                {{user.username}}
              </a>
            </div>
            <div id="user_cancel"><a @click="cancel" href="javascript:;">退出登录</a></div>
          </div>
          <div id="music_VIP_link">
            <a id="vip_color" href="javascript:;">开通VIP</a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import List_Item from "./List_Item/List_Item";
  import Logo from "../../common/Logo/Logo";
  import SearchInput from "./searchInput";
  import axios from "axios";

  export default {
    name: "Head",
    components: {SearchInput, Logo, List_Item},
    data() {
      return {
        items: [
          {path: "Songs", default: "/HomePage", name: "音乐馆"},
          {path: "MySong", default: "/Favorite/Song", name: "我的音乐"},
          {path: "VIP", default: "", name: "VIP"},
        ],
        time: null
      }
    },
    created() {
      this.init()//初始化加载
    },
    computed: {
      isState() {
        return this.$store.state.userInf ? true : false;
      },
      user(){
        return this.$store.state.userInf
      }
    },
    methods: {
      init() {
        this.getLogin();
      },
      getLogin() {//获取登录信息
        this.$store.commit('getUserInf')
      },
      login() {
        this.$emit("login-click")
      },
      showInf() {//提示框显示
        if (this.time != null)
          clearTimeout(this.time)
        let user_inf = document.getElementById("user_inf")
        user_inf.style.display = "block"
      },
      noneInf() {//提示框隐藏
        let user_inf = document.getElementById("user_inf")
        if (this.time != null)
          clearTimeout(this.time)
        this.time = setTimeout(function () {
          user_inf.style.display = "none"
        }, 1000)
      },
      cancel() {//注销登录
        this.$store.commit('Cancel')
      }
    }
  }
</script>

<style>
  .commentWidth {
    max-width: 1200px;
    font-size: 14px;
    font-family: sans-serif;
    font-weight: 500;
    margin: auto;
  }

  #head {
    background: white;
    font-family: sans-serif;
    display: block;
  }

  #music_title {
    height: 90px;
    margin: auto;
    position: relative;
  }

  #music_title #music_log {
    position: absolute;
    left: 0;
    top: 22px;
  }

  #log_img {
    width: 170px;
    height: 46px;
  }

  #title_list {
    width: 300px;
    height: 100%;
    position: absolute;
    left: 198px;
  }

  #music_search {
    position: absolute;
    right: 284px;
    top: 0;
  }

  #music_login {
    position: absolute;
    top: 0;
    right: 0;
    height: 90px;
    line-height: 90px;
  }

  #music_login_link {
    position: relative;
    float: left;
    font-size: 16px;
    width: 38px;
    margin-right: 10px;
    text-align: center;
    height: 90px;
  }

  #user_hp {
    width: 38px;
    height: 38px;
    border-radius: 50%;
    margin-top: 24px;
  }

  #user_inf {
    width: 300px;
    border: 1px solid #f2f2f2;
    position: absolute;
    top: 90px;
    left: -20px;
    background-color: white;
    padding: 5px;
    box-sizing: border-box;
    display: none;
    z-index: 10;
  }

  #user_i {
    position: relative;
  }

  #a_head {
    display: inline-block;
    height: 50px;
  }

  #a_name {
    display: inline-block;
    position: absolute;
    left: 60px;
    top: 0px;
    height: 50px;
  }

  #user_head {
    width: 50px;
    height: 50px;
    border-radius: 50%;
  }

  #user_cancel {
    width: 100%;
    height: 40px;
    line-height: 40px;
    font-size: 16px;
  }

  #music_VIP_link {
    float: left;
    position: relative;
    height: 38px;
    width: 122px;
    line-height: 38px;
    font-size: 13px;
    margin-top: 24px;
    text-align: center;
    background-color: rgb(49, 194, 124);
    border-radius: 3px;
    cursor: pointer;
  }

  #vip_color {
    color: white;
  }
</style>