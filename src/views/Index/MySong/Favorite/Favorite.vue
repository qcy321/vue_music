<template>
  <div id="fav_win">
    <div id="fav_main">
      <List :items="items">
        <ListItem :item="item" v-for="item in items">
          <span class="item_span">{{item.name}}</span>
          <span class="item_span">{{item.count?item.count:0}}</span>
        </ListItem>
      </List>
    </div>
    <router-view v-if="isRouterAlive" @reload="reload" @songUrl="getCurrentSong" @getSongTotal="getSongCount"
                 @getAlbumTotal="getAlbumCount"></router-view>
    <Play ref="play" :style="{'display':active?'block':'none'}" :url="currentSong"></Play>
  </div>
</template>

<script>
  import List from "../../../../components/common/List/List";
  import ListItem from "../../../../components/common/List/ListItem";
  import {request} from "../../../../network/request";
  import Play from "../../../../components/common/Play/play";

  export default {
    name: "Favorite",
    components: {Play, ListItem, List},
    data() {
      return {
        items: [
          {path: "Song", toPath: "/Index/MySong/Favorite/Song", name: "歌曲", count: null},
          //{path: "FavSheet", name: "歌单"},
          {path: "Album", toPath: "/Index/MySong/Favorite/Album", name: "专辑", count: null},
          {path: "myVideo", toPath: "/Index/MySong/Favorite/myVideo", name: "视频", count: null},
        ],
        path: "/Index/MySong/Favorite/Song",
        currentSong: this.$store.state.staticPath + "music/2/3/song/2sa3as11.mp3",//当前播放的音乐,默认一个地址
        isRouterAlive: true,
        active: true,
      }
    },
    computed: {
      user() {
        return this.$store.state.userInf;
      }
    },
    created() {
      this.init();//初始化
    },
    methods: {
      init() {
        this.getSongCount();//关注歌曲数量
        this.getAlbumCount();//专辑数量
        //this.getMvCount();
      },
      getSongCount() {//关注歌曲数量
        request({url: "attentionSong/countByUserId", params: {userId: this.user.id}}).then(res => {
          this.items[0].count = res.data
        })
      },
      getAlbumCount(userId) {//专辑数量
        request({url: "attentionAlbum/countByUserId", params: {userId: this.user.id}}).then(res => {
          this.items[1].count = res.data;
        })
      },
      /*getMvCount(userId){
        request({url: "/api/attentionMv/countByUserId", params: {userId: userId}}).then(res => {
          this.singerCount = res.data;
        })
      }*/
      getCurrentSong(songUrl) {//获取歌曲地址
        this.currentSong = songUrl
      },
      reload() {
        console.log("开始执行")
        this.isRouterAlive = false
        this.$nextTick(() => {
          console.log("执行完成")
          this.isRouterAlive = true
        })
      }
    },
    activated() {
      this.active = true;
      if (this.$route.path === "/Index/MySong/Favorite")
        this.$router.replace(this.path)
    },
    beforeRouteLeave(to, from, next) {
      this.active = false;
      next();
    }
  }
</script>

<style>
  #fav_win {
    width: 100%;
    height: 100%;
    /*background-color: white;*/
  }

  #fav_main {
    width: 1200px;
    margin: auto;
  }
</style>