<template>
  <div id="search_input">
    <input id="search_input_input" type="text" placeholder="搜索音乐,MV,歌手" v-model="value" @keydown.enter="search">
    <button id="search_input_btn">
      <i id="icon_search" class="iconfont icon-sousuo1" @click="search"></i>
      <span id="icon_txt">搜索</span>
    </button>
  </div>
</template>

<script>
  export default {
    name: "searchInput",
    data() {
      return {
        value: ""
      }
    },
    mounted() {
      this.$EventBus.$on("sear", (data) => {
        this.value = data;
      })
    },
    methods: {
      search() {
        if (this.value.trim() === "")
          this.value = "许嵩";
        if (this.$route.path.indexOf("/Index/Search/Song") == -1) {
          this.$router.push(`/Index/Search/Song/${this.value}`)
        }
        this.$EventBus.$emit("search", this.value);//通知另外一个输入矿
      }
    }
  }
</script>

<style>

  #search_input {
    border: 1px solid #c9c9c9;
    padding: 0 33px 0 11px;
    line-height: 36px;
    height: 36px;
    position: relative;
    margin-top: 26px;
    border-radius: 3px;
    background-color: #fff;
  }

  #search_input_input {
    width: 174px;
    height: 36px;
    border: 0 none;
    font-size: 14px;
    font-family: "微软黑体", "sans-serif";
  }

  #search_input_input:focus {
    outline: none;
  }

  #search_input_btn {
    position: absolute;
    top: 0;
    right: 0;
    border: 0 none;
    background: 0 0;
    width: 38px;
    height: 35px;
    overflow: visible;
  }

  #icon_search {
    position: absolute;
    top: 50%;
    right: 11px;
    margin-top: -8px;
    width: 16px;
    height: 16px;
    line-height: 16px;
    color: rgba(100, 100, 100, .8);
  }

  #icon_search:hover {
    color: rgb(49, 194, 124);
  }

  #icon_txt {
    font: 0/0 a;
  }
</style>