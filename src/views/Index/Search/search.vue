<template>
  <div id="search_win">
    <div id="search_img">
      <div id="search_inp_ps">
        <input class="search_i" type="text" v-model="value" placeholder="搜索音乐,MV,歌手" @keyup.enter="search"/>
        <i class="search_icon iconfont icon-sousuo1" @click="search"></i>
      </div>
    </div>
    <div id="search_main">
      <div id="search_singer" v-if="singer">
        <a :href="`/Index/Singer/${singer.singerId}`"><img id="sin_img" :src="singer.headPortrait"/></a>
        <span id="sin_name"><a :href="`/Index/Singer/${singer.singerId}`">{{singer.name}}</a></span>
      </div>
      <div id="search_list">
        <List :items="items">
          <ListItem :item="item" v-for="item in items">
            <span class="item_span">{{item.name}}</span>
          </ListItem>
        </List>
      </div>
      <router-view v-if="reloadState" ref="child" @songUrl="getCurrentSong"></router-view>
    </div>
    <Play ref="play" :url="currentSong"></Play>
  </div>
</template>

<script>
  import SearchInput from "../../../components/content/Head/searchInput";
  import List from "../../../components/common/List/List";
  import ListItem from "../../../components/common/List/ListItem";
  import {request} from "../../../network/request";
  import Play from "../../../components/common/Play/play";

  export default {
    name: "search",
    components: {Play, ListItem, List, SearchInput},
    data() {
      return {
        items: [
          {path: "Song", toPath: "/Index/Search/Song", name: "歌曲"},
          {path: "Album", toPath: "/Index/Search/Album", name: "专辑"},
          /*{path: "MV", toPath: "/Index/Search/MV", name: "MV"},*/
          {path: "Singer", toPath: "/Index/Search/Singer", name: "歌手"},
        ],
        value: "",//搜索的数据
        singer: undefined,//歌手
        path: "/Index/Search/Song",
        prefixPath: "/Index/Search",
        reloadState: true,
        currentSong: this.$store.state.staticPath + "music/2/3/song/2sa3as11.mp3",//当前播放的音乐,默认一个地址
      }
    },
    created() {
      this.value = this.$route.params.value;
      this.search()
    },
    mounted() {
      this.$EventBus.$on("search", (data) => {
        this.value = data;
        this.search()
      })
    },
    methods: {
      setPath(prefix) {//设置路径
        for (let item of this.items) {
          item.toPath = prefix + "/" + item.path + "/" + this.value
        }
      },
      search() {
        this.$EventBus.$emit("sear",this.value)//通知另外一个输入框
        let le = this.$route.path.lastIndexOf("/")
        this.value = this.value.trim() == "" ? "许嵩" : this.value
        this.setPath(this.prefixPath)
        this.$router.push(this.$route.path.substring(0, le) + "/" + this.value)
        this.getSinger()
        this.reloadState = false
        this.$nextTick(() => {
          this.reloadState = true
        })
      },
      getSinger() {//获取一个歌手
        request({
          url: "singer/selectAllLimitByName",
          params: {value: this.value, page: 1, eachNumber: 1}
        }).then((res) => {
          if (res.data.length != 0) {
            this.singer = res.data[0];
          }
        })
      },
      getCurrentSong(songUrl) {//获取歌曲地址
        this.currentSong = songUrl
      }
    },
    activated() {
      if (this.$route.path === "/Index/Search")
        this.$router.replace(this.path)
    }
  }
</script>

<style>
  #search_win {
    width: 100%;
  }

  #search_main {
    width: 1200px;
    margin: auto;
  }

  #search_singer {
    height: 100px;
    width: 100%;
    position: relative;
    margin-top: 20px;
  }

  #sin_img {
    width: 100px;
    height: 100px;
    border-radius: 50%;
    position: absolute;
    left: 0px;
  }

  #sin_name {
    display: inline-block;
    position: absolute;
    left: 120px;
    height: 100px;
    line-height: 100px;
  }

  #search_list {
    margin-bottom: 50px;
  }

  #search_img {
    width: 100%;
    min-width: 1200px;
    height: 250px;
    background-image: url("http://localhost/static/Index/search.jpeg");
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
    position: relative;
  }

  #search_inp_ps {
    width: 600px;
    height: 50px;
    position: absolute;
    top: 50%;
    left: 50%;
    margin-left: -250px;
    margin-top: -25px;
    border: 1px solid #999;
    border-radius: 6px;
    background-color: white;
  }

  .search_i {
    position: relative;
    width: 90%;
    height: 100%;
    border: none;
    font-size: 18px;
    font-family: poppin, Tahoma, Arial, 微软雅黑, sans-serif;
    outline: none;
    left: 10px;
  }

  .search_icon {
    display: inline-block;
    height: 100%;
    line-height: 50px;
    padding: 0px 15px;
    position: absolute;
    right: 0px;
    font-size: 22px;
    color: #999;
    cursor: pointer;
  }

  .search_icon:hover {
    color: rgb(49, 194, 124);;
  }


</style>