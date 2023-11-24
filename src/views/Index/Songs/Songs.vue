<template>
  <div id="Songs_win">
    <type_item :items="items"/>
    <keep-alive>
      <router-view :key="songKey"></router-view>
    </keep-alive>
  </div>
</template>

<script>
  import Type_item from "../../../components/common/type_item/type_item";

  export default {
    name: "Songs",
    components: {Type_item},
    data() {
      return {
        items: [
          {path: "HomePage", name: "首页"},
          {path: "Singer", name: "歌手"},
          {path: "Song", name: "歌曲"},
          {path: "RankingList", name: "排行榜"},
          {path: "MV", name: "MV"},
        ],
        path:"/Index/Songs/HomePage"
      }
    },
    computed:{
      songKey(){
        return this.$route.name !==undefined?this.$route.name+new Date():this.$route+new Date()
      }
    },
    activated() {
      if(this.$route.path === "/Index/Songs")
        this.$router.replace(this.path)
    },
    /*beforeRouteLeave(to, from, next) {
      this.path = this.$route.path;
      next()
    }*/
  }
</script>

<style>
</style>