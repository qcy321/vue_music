<template>
  <div id="in_song_win" v-if="song.album">
    <div id="in_song_main">
      <div id="in_song_content">
        <a href="#"><img id="in_song_img" :src="song.album.img"/></a>
        <div id="in_song_title">
          {{song.songTitle}}
        </div>
        <div id="in_song_name">
          <a :href="`/Index/Singer/${song.album.singer.singerId}/Song`">{{song.album.singer.name}}</a>
        </div>
        <div id="in_song_base">
          <ul id="in_song_ul">
            <li class="in_item"><span class="in_item_c">专辑:</span><a class="in_item_c">{{song.album.name}}</a></li>
            <li class="in_item"><span class="in_item_c">唱片公司:</span><span
                class="in_item_c">{{song.album.company}}</span></li>
            <li class="in_item"><span class="in_item_c">发行时间:</span><span class="in_item_c">{{song.album.timeOfIssue.split(" ")[0]}}</span>
            </li>
          </ul>
        </div>
        <div id="in_song_but">
          <button class="song_but song_but_play" type="button" @click="playSong"><i class="iconfont icon-play"></i>播放
          </button>
          <button class="song_but" type="button" v-if="!attentionStatus" @click="attention"><i
              class="iconfont icon-shoucang1"></i>收藏
          </button>
          <button class="song_but" type="button" v-if="attentionStatus" @click="cancelAttention"><i
              class="iconfont icon-shoucang1 icon-like"></i>已收藏
          </button>
          <button class="song_but" type="button"><i class="iconfont icon-diandian"></i>评论</button>
        </div>
      </div>
      <lyric :ric="song.lyric"></lyric>
      <div id="in_song_comment">
        <div class="publish_comment">
          <Comment :song-id="songId" :user-id="userId"></Comment>
        </div>
        <div class="comment_content">
          <CommentContent :song-id="songId" :user-id="userId"></CommentContent>
        </div>
      </div>
    </div>
    <Play :url="song.songUrl" ref="play"></Play>
  </div>
</template>

<script>

  import Comment from "../../../components/common/Comment/comment";
  import {request} from "../../../network/request"
  import Play from "../../../components/common/Play/play";
  import Lyric from "../../../components/content/lyric/lyric";
  import CommentContent from "../../../components/common/Comment/commentContent";

  export default {
    name: "song",
    components: {CommentContent, Lyric, Play, Comment},
    data() {
      return {
        song: {},
        attentionStatus: false,//关注状态
      }
    },
    computed: {
      songId() {
        return this.$route.params.songId
      },
      userId() {
        return this.$store.state.userInf ? this.$store.state.userInf.id : undefined//登录了才能获取到id
      },
    },
    watch: {
      userId() {
        this.$nextTick(() => {
          this.isAttention(this.userId)
        })
      }
    },
    created() {
      this.init()
    },
    methods: {
      init() {
        this.getSong()//获取音乐
      },
      getSong() {
        request({url: "song/selectOne", params: {songId: this.songId}}).then(res => {
          this.song = res.data
        })
      },
      attention() {//关注
        if (this.userId) {
          request({
            url: "attentionSong/insert",
            params: {songId: this.songId, userId: this.userId}
          }).then(res => {
            if (res.data.isEmpty) {
              alert("关注失败")
            } else {
              alert("关注成功")
              this.attentionStatus = true;
            }
          })
        } else {
          this.$store.commit('show')
        }
      },
      cancelAttention() {//取消关注
        if (this.userId) {
          request({
            url: "attentionSong/deleteByUserAndSong",
            params: {songId: this.songId, userId: this.userId}
          }).then(res => {
            if (res.data.isEmpty) {
              alert("取消失败")
            } else {
              alert("取消关注")
              this.attentionStatus = false;
            }
          })
        }
      },
      isAttention(userId) {//判断是否登录
        if (userId) {
          request({
            url: "attentionSong/isAttention",
            params: {songId: this.songId, userId: userId}
          }).then(res => {
            if (res.data === false) {
              this.attentionStatus = false;
              console.log("没有关注")
            } else {
              this.attentionStatus = true;
              console.log("已关注")
            }
          })
        } else {
          console.log("没有登录")
          this.attentionStatus = false;//没有登录的就显示关注按钮
        }
      },
      playSong() {//播放音乐
        let auto = document.querySelector(".audio")
        auto.load();
        auto.play();
        this.$refs.play.showAudio()
        this.$refs.play.hiddenAudio()
      },
    },
  }
</script>

<style>
  #in_song_win {
    width: 100%;
  }

  #in_song_main {
    width: 1200px;
    margin: auto;
  }

  #in_song_content {
    width: 1200px;
    height: 250px;
    padding-left: 300px;
    margin-top: 50px;
    position: relative;
    box-sizing: border-box;
  }

  #in_song_img {
    width: 250px;
    height: 250px;
    position: absolute;
    left: 0px;
  }

  #in_song_title {
    height: 50px;
    line-height: 50px;
    font-size: 30px;
  }

  #in_song_name {
    height: 30px;
    line-height: 30px;
  }

  #in_song_ul {
    width: 520px;
  }

  .in_item {
    width: 260px;
    height: 40px;
    font-size: 18px;
    line-height: 40px;
  }

  .in_item_c {
    margin-right: 5px;
  }

  .song_but {
    width: 160px;
    height: 40px;
    line-height: 40px;
    border-radius: 3px;
    border: 1px solid #999;
    background-color: white;
    margin-right: 10px;
  }

  .song_but i {
    margin-right: 3px;
  }

  .song_but_play {
    background-color: rgb(49, 194, 124);
    color: white;
  }

  .song_but:hover {
    background-color: rgb(233, 233, 233);
    color: rgb(49, 194, 124);;
  }

  #in_song_comment {
    margin-top: 30px;
  }

  .comment_content {
    margin-top: 20px;
  }

</style>