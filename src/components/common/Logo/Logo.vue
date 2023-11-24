<template>
  <div id="register_logo" @click="toIndex">
    <i class="iconfont icon-Music" style="color: rgb(49,194,124);font-size: 44px;"></i>
    <i id="music_logo">
      绿润音乐
    </i>
  </div>
</template>

<script>
  export default {
    name: "Logo",
    methods:{
      toIndex(){
        this.$router.push("/Index/Songs/HomePage")
      }
    }
  }
</script>

<style scoped>
  #register_logo {
    width: 200px;
    height: 46px;
    font-size: 24px;
    position: absolute;
    z-index: 1002;
    line-height: 46px;
    box-sizing: border-box;
    padding: 0 28px;
    font-family: poppin, Tahoma, Arial, 微软雅黑, sans-serif;
    cursor: pointer;
  }

  #music_logo {
    font-size: 24px;
    background: linear-gradient(rgb(49,194,124),white);
    -webkit-text-fill-color: transparent;
    -webkit-background-clip: text;
    height: 30px;
    line-height: 30px;
    position: absolute;
    top: 50%;
    margin-top: -15px;
  }

</style>