<template>
  <div id="song_win">
    <div id="song_main">
      <no-data v-if="isData"/>
      <div id="song_list_win" v-if="!isData">
        <Operate :buts="buts"/>
        <GeneralList :lists="lists" :state="true">
          <general-list-item :index="index" v-for="(song,index) in songs">
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
              <div class="item_rab">
                <i class="song_icon iconfont icon-laji" title="删除" @click="removeSong(song.songId)"></i>
              </div>
            </div>
          </general-list-item>
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
  import Operate from "../../../../../components/common/GeneralList/Operate";
  import GeneralListItem from "../../../../../components/common/GeneralList/generalListItem";
  import ItemOperate from "../../../../../components/common/GeneralList/ItemOperate";
  import {request} from "../../../../../network/request";
  import NoData from "../../../../../components/common/NoData/noData";

  export default {
    name: "song",
    components: {NoData, ItemOperate, GeneralListItem, Operate, GeneralList, Page},
    data() {
      return {
        buts: [
          {name: "播放全部", icon: "icon-play"},
          {name: "添加到", icon: "icon-icon-test"},
          {name: "下载", icon: "icon-Group-"},
          {name: "批量操作", icon: "icon-icon-piliangcaozuo"},
        ],
        lists: [
          {name: "歌曲", width: 42},
          {name: "歌手", width: 23},
          {name: "专辑", width: 23},
          {name: "时长", width: 12}
        ],
        pageTotal: 1,//总页数
        songs: [],//歌曲
        eachNumber: 10,//每页显示的个数,
        currentPage:1,
      }
    },
    computed: {
      user() {
        return this.$store.state.userInf;
      },
      isData() {
        return this.songs.length == 0 ? true : false
      }
    },
    created() {
      this.init()
    },
    methods: {
      init() {
        this.getSongs(1);
        this.getTotal()
      },
      getSongs(page) {
        request({
          url: "song/selectAllLimitByUser",
          params: {userId: this.user.id, page: page, eachNumber: this.eachNumber}
        }).then((res) => {
          if (res.data.length != 0) {
            this.songs = res.data
            this.$emit("songUrl", res.data[0].songUrl)//初始赋值第一首个的地址给播放器
            document.querySelector(".audio").load()//重新加载一下
            this.getDuration(this.songs)
          }
        })
      },
      getTotal() {//获取当前种类页码总数
        request({
          url: "song/countByUser",
          params: {userId: this.user.id, eachNumber: this.eachNumber}
        }).then((res) => {
          if (res.data != "") {
            this.pageTotal = res.data;
          }
        })
      },
      getCurrent(page) {//获取当前页数据
        this.currentPage = page
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
      removeSong(songId) {
        request({
          url: "attentionSong/deleteByUserAndSong",
          params: {userId: this.user.id, songId: songId}
        }).then((res) => {
          if (res.data === true) {
            alert("移除成功")
            this.$emit("reload")//重新加载数据
          }else{
            alert("移除失败")
          }
        })
      }
    },
  }
</script>

<style>
  #song_win {
    width: 100%;
    height: 100%;
  }

  #song_main {
    width: 1200px;
    margin: auto;
  }

</style>