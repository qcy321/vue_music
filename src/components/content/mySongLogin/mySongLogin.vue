<template>
  <div id="my_login_bac">
    <div id="my_login_position">
      <div id="my_login_title">
        私人音乐空间，听我想听的歌
      </div>
      <div id="my_login_intro">
        登录我的管理，享受更多特权
      </div>
      <div id="my_login_but" @click="login">
        立即登录
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "mySongLogin",
    methods: {
      login() {//跳出登录框
        this.$store.commit("show")
      }
    },
  }
</script>

<style>
  #my_login_bac {
    width: 100%;
    height: 635px;
    background-image: url("http://localhost/static/Index/private.jpeg");
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
  }

  #my_login_position {
    text-align: center;
    position: relative;
    color: white;
    top: 25%;
    font-family: poppin, Tahoma, Arial, 微软雅黑, sans-serifs;
  }

  #my_login_title {
    font-size: 50px;
    padding: 10px;
  }

  #my_login_intro {
    font-size: 22px;
    padding: 15px;
  }

  #my_login_but {
    display: inline-block;
    width: 100px;
    line-height: 48px;
    border-radius: 2px;
    background-color: rgb(49, 194, 124);
    font-size: 20px;
    padding: 0 15px;
    cursor: pointer;
  }
</style>