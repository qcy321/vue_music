<template>
  <div id="music_login_windows" :style="{display:isNone?'block':'none'}">
    <div id="win_close" @click="close">
      <i class="iconfont icon-guanbi"></i>
    </div>
    <iframeLogin/>
  </div>
</template>

<script>

  import iframeLogin from "./iframeLogin";

  export default {
    name: "Login",
    components: {iframeLogin},
    props: {
      isNone: {//窗口状态，关闭就隐藏
        type: Boolean,
        default: false,
      }
    },
    methods: {
      close() {
        this.$emit("close")
      }
    }
  }
</script>

<style scoped>
  #music_login_windows {
    width: 400px;
    height: 420px;
    position: fixed;
    z-index: 1001;
    background-color: white;
    top: 50%;
    left: 50%;
    margin-top: -210px;
    margin-left: -200px;
    box-shadow: 0px 0px 5px 5px rgba(122, 122, 122, .6);
  }

  #win_close {
    position: absolute;
    width: 40px;
    height: 30px;
    right: 0;
    top: 0;
    font-size: 14px;
    text-align: center;
    line-height: 30px;
    cursor: pointer;
  }
</style>