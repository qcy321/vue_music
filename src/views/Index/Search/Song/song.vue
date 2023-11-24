<template>
  <div id="search_song_win">
    <div id="search_song_main">
      <no-search :content="value" v-if="songs.length==0"/>
      <div id="song_list_win">
        <GeneralList :lists="lists" v-if="songs.length!=0">
          <GeneralListItem :index="index" v-for="(song,index) in songs">
            <div class="list_item_i">
              <a class="item_a" :href="`/Index/Song/${song.songId}`">{{song.songTitle}}</a>
              <i class="song_mv_icon iconfont icon-shipin" v-if="false"></i>
              <ItemOperate @playSong="playSong" :songUrl="song.songUrl" :songTitle="song.songTitle"/>
            </div>
            <div class="list_item_i">
              <a class="item_a"
                 :href="`/Index/Singer/${song.album.singer.singerId}/Song`">{{song.album.singer.name}}</a>
            </div>
            <div class="list_item_i">
              <a class="item_a" :href="`/Index/Album/${song.album.albumId}`">{{song.album.name}}</a>
            </div>
            <div class="list_item_i">
              <span class="item_time_content">{{song.duration}}</span>
            </div>
          </GeneralListItem>
        </GeneralList>
        <div class="com_page" v-if="pageTotal>1">
          <Page :pageTotal="pageTotal" @Current="getCurrent"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

  import Page from "components/common/Page/page.vue"
  import GeneralList from "components/common/GeneralList/generalList";
  import Operate from "components/common/GeneralList/Operate";
  import GeneralListItem from "../../../../components/common/GeneralList/generalListItem";
  import ItemOperate from "../../../../components/common/GeneralList/ItemOperate";
  import {request} from "../../../../network/request";
  import NoSearch from "../../../../components/common/NoData/noSearch";

  export default {
    name: "song",
    components: {NoSearch, ItemOperate, GeneralListItem, Operate, GeneralList, Page},
    data() {
      return {
        lists: [
          {name: "歌曲", width: 42},
          {name: "歌手", width: 23},
          {name: "专辑", width: 23},
          {name: "时长", width: 12}
        ],
        pageTotal: 1,
        value: "",//查询数据
        eachNumber: 10,//每页显示的个数
        songs: []
      }
    },
    created() {
      this.init()//初始化数据
    },
    methods: {
      init() {
        this.value = this.$route.params.value
        //console.log(this.value)
        this.getSongs(1)//获取该歌手的所有信息
        this.getTotal()//获取总页数
      },
      getSongs(page) {
        request({
          url: "song/selectAllLimitByName",
          params: {value: this.value, page: page, eachNumber: this.eachNumber}
        }).then((res) => {
          if (res.data.length != 0) {
            this.songs = res.data;
            this.$emit("songUrl", res.data[0].songUrl)//初始赋值第一首个的地址给播放器
            document.querySelector(".audio").load()//重新加载一下
            this.getDuration(this.songs)
          }
        })
      },
      getTotal() {//获取当前种类页码总数
        request({
          url: "song/countByName",
          params: {value: this.value, eachNumber: this.eachNumber}
        }).then((res) => {
          if (res.data != "") {
            this.pageTotal = res.data;
          }
        })
      },
      getCurrent(page) {//获取当前页数据
        this.getSongs(page)
        window.scrollTo(0, 150);
      },
      getDuration(songs) {//获取时长
        for (let song of songs) {
          let audio = document.createElement("audio")
          audio.src = song.songUrl
          audio.ondurationchange = () => {
            let duration = Math.round(audio.duration)
            let minute = Math.floor(duration / 60).toString()
            let second = (duration % 60).toString();
            this.$set(song, "duration", (minute.length < 2 ? "0" + minute : minute) + ":" + (second.length < 2 ? "0" + second : second))
          }
        }
      },
      playSong(songUrl) {//播放音乐
        this.$emit("songUrl", songUrl)//初始赋值第一首个的地址给播放器
        this.$parent.$refs.play.showAudio()
        this.$parent.$refs.play.hiddenAudio()
        document.querySelector(".audio").load()
        document.querySelector(".audio").play()
      },
    }
  }
</script>

<style>
  #search_song_win {
    width: 100%;
    height: 100%;
  }

  #search_song_main {
    width: 1200px;
    margin: auto;
  }
</style>