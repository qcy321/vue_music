<template>
  <div id="in_album_win">
    <div id="in_album_main">
      <div id="in_album_content" v-if="album.singer!=undefined">
        <a class="in_album_img"><img class="in_album_photo" :src="album.img"/></a>
        <div class="in_album_data">
          <div class="in_album_title">{{album.name}}</div>
          <a class="in_album_name"
             :href="`/Index/Singer/${album.singer.singerId}/Song`"><i></i>{{album.singer.name}}</a>
          <div class="in_album_type"><span>种类：</span><span>{{album.albumType.name}}</span></div>
          <div class="in_album_time"><span>发行时间：</span><span>{{album.timeOfIssue.split(" ")[0]}}</span></div>
        </div>
        <div class="in_album_op">
          <button class="in_album_but play_but" @click="listPlay"><i class="iconfont icon-play"></i>播放全部</button>
          <button class="in_album_but coll_but" @click="collection" v-if="!collectionStatus"><i
              class="iconfont icon-shoucang1"></i>收藏
          </button>
          <button class="in_album_but  coll_but icon-like" @click="cancelCollection" v-if="collectionStatus"><i
              class="iconfont icon-shoucang1"></i>已收藏
          </button>
        </div>
      </div>
      <div id="in_album_introduction" v-if="album.introduce">
        <div style="font-size: 22px">简介</div>
        <div id="i_t">
          <div :class="[this.openState?'in_o':'in_c']">
            {{album.introduce}}
          </div>
          <div id="in_open" @click="open">{{this.openState?"[收起]":"[展开]"}}</div>
        </div>
      </div>
      <div id="in_album_list">
        <GeneralList :lists="lists" v-if="songs.length!=0">
          <GeneralListItem :index="index" v-for="(song,index) in songs">
            <div class="list_item_i">
              <a class="item_a" :href="`/Index/Song/${song.songId}`">{{song.songTitle}}</a>
              <i class="song_mv_icon iconfont icon-shipin" v-if="false"></i>
              <ItemOperate @playSong="playSong" :songUrl="song.songUrl" :songTitle="song.songTitle"/>
            </div>
            <div class="list_item_i">
              <a class="item_a" :href="`/Index/Singer/${album.singer.singerId}/Song`" v-if="album.singer!=undefined">{{album.singer.name}}</a>
            </div>
            <div class="list_item_i">
              <span class="item_time_content">{{song.duration}}</span>
              <div class="item_rab" v-if="false">
                <i class="song_icon iconfont icon-laji" @click="removeSong"></i>
              </div>
            </div>
          </GeneralListItem>
        </GeneralList>
        <div class="com_page" v-if="pageTotal>1">
          <Page :pageTotal="pageTotal" @Current="getCurrent"/>
        </div>
      </div>
    </div>
    <Play ref="play" :url="currentSong"></Play>
  </div>
</template>

<script>
  import GeneralList from "../../../components/common/GeneralList/generalList";
  import GeneralListItem from "../../../components/common/GeneralList/generalListItem";
  import Page from "../../../components/common/Page/page";
  import {request} from "../../../network/request";
  import {getDuration} from "../../../assets/js/duration";
  import ItemOperate from "../../../components/common/GeneralList/ItemOperate";
  import Play from "../../../components/common/Play/play";

  export default {
    name: "album",
    components: {Play, ItemOperate, Page, GeneralListItem, GeneralList},
    data() {
      return {
        lists: [
          {name: "歌曲", width: 52},
          {name: "歌手", width: 34},
          {name: "时长", width: 12}
        ],
        pageTotal: 1,
        album: {},
        songs: [],
        eachNumber: 10,//每页显示的个数
        albumId: -1,//歌手id
        currentSong: this.$store.state.staticPath + "/music/2/3/song/2sa3as11.mp3",//当前播放的音乐,默认一个地址
        openState: false,//展开状态
        collectionStatus: false//收藏状态
      }
    },
    computed: {
      userId() {
        return this.$store.state.userInf ? this.$store.state.userInf.id : undefined//登录了才能获取到id
      },
    },
    watch: {
      userId() {
        this.$nextTick(() => {
          this.isCollection(this.userId)
        })
      }
    },
    created() {
      this.init()//初始化加载数据
    },
    methods: {
      init() {
        this.albumId = this.$route.params.albumId
        this.getAlbum()//获取专辑信息
        this.getSongs(1)//获取该歌手的所有信息
        this.getTotal()//获取总页数
      },
      getAlbum() {
        request({
          url: "album/selectOne",
          params: {albumId: this.albumId}
        }).then((res) => {
          this.album = res.data;
        })
      },
      getSongs(page) {
        request({
          url: "song/selectAllLimitByAlbum",
          params: {albumId: this.albumId, page: page, eachNumber: this.eachNumber}
        }).then((res) => {
          this.songs = res.data;
          this.currentSong = res.data[0].songUrl
          document.querySelector(".audio").load()//重新加载一下
          getDuration(this.songs, this)
        })
      },
      getTotal() {//获取当前种类页码总数
        request({
          url: "song/countByAlbum",
          params: {albumId: this.albumId, eachNumber: this.eachNumber}
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
      playSong(songUrl) {//播放音乐
        this.currentSong = songUrl
        this.$refs.play.showAudio()
        this.$refs.play.hiddenAudio()
        document.querySelector(".audio").load()
        document.querySelector(".audio").play()
      },
      listPlay() {
        this.$refs.play.showAudio()
        this.$refs.play.hiddenAudio()
        document.querySelector(".audio").play()
      },
      collection() {
        if (this.userId) {
          request({
            url: "attentionAlbum/insert",
            params: {albumId: this.albumId, userId: this.userId}
          }).then(res => {
            if (res.data.isEmpty) {
              alert("关注失败")
            } else {
              alert("关注成功")
              this.collectionStatus = true;
            }
          })
        } else {
          this.$store.commit('show')
        }
      },
      cancelCollection() {//取消收藏
        if (this.userId) {
          request({
            url: "attentionAlbum/deleteByUserAndAlbum",
            params: {albumId: this.albumId, userId: this.userId}
          }).then(res => {
            if (res.data.isEmpty) {
              alert("取消失败")
            } else {
              alert("取消关注")
              this.collectionStatus = false;
            }
          })
        }
      },
      isCollection(userId) {//是否收藏
        if (userId) {
          request({
            url: "attentionAlbum/isAttention",
            params: {albumId: this.albumId, userId: userId}
          }).then(res => {
            if (res.data === false) {
              this.collectionStatus = false;
              // console.log("没有关注")
            } else {
              this.collectionStatus = true;
              //console.log("已关注")
            }
          })
        } else {
          //console.log("没有登录")
          this.collectionStatus = false;//没有登录的就显示关注按钮
        }
      },
      open() {
        this.openState = !this.openState
      }
    }
  }
</script>

<style>
  #in_album_win {
    width: 100%;
  }

  #in_album_main {
    width: 1200px;
    margin: auto;
  }

  #in_album_content {
    height: 250px;
    margin-top: 40px;
    padding-left: 340px;
    margin-bottom: 35px;
    position: relative;
  }

  .in_album_img {
    position: absolute;
    left: 0px;
    width: 250px;
    height: 250px;
  }

  .in_album_data {
    width: 100%;
    font-family: poppin, Tahoma, Arial, 微软雅黑, sans-serif;
    margin-bottom: 20px;
  }

  .in_album_title {
    height: 50px;
    line-height: 50px;
    font-size: 30px;
  }

  .in_album_name {
    display: inline-block;
    height: 40px;
    line-height: 40px;
    color: #999;
  }

  .in_album_type {
    height: 30px;
    line-height: 30px;
  }

  .in_album_time {
    height: 30px;
    line-height: 30px;
  }

  .in_album_photo {
    width: 100%;
    height: 100%;
  }

  .in_album_but {
    font-size: 14px;
    height: 38px;
    line-height: 38px;
    margin-right: 20px;
    padding: 0px 40px;
    border-radius: 2px;
  }

  .play_but {
    background-color: rgb(49, 194, 124);
    color: white;
    border: 1px solid transparent;
  }

  .coll_but {
    background: transparent;
    border: 1px solid #999;
  }

  .coll_but:hover {
    background-color: rgb(235, 235, 235);
  }

  .play_but:hover {
    background-color: rgb(39, 184, 114);
  }

  .in_album_but i {
    margin-right: 5px;
  }

  #in_album_list {
    margin-top: 50px;
  }

  #in_album_introduction {
    width: 100%;
    margin-top: 30px;
  }

  #i_t {
    width: 800px;
    margin-top: 10px;
    position: relative;
    font-size: 14px;
    font-family: poppin, Tahoma, Arial, 微软雅黑, sans-serif;
  }

  .in_c {
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
  }

  .in_o {
    white-space: pre-wrap;
  }

  #in_open {
    position: absolute;
    right: 0px;
    bottom: -22px;
    cursor: pointer;
    color: #0077aa;
  }

  #in_open:hover {
    color: rgb(49, 194, 124);
  }
</style>