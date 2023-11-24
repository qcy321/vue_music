<template>
  <div id="in_sin_win">
    <div id="in_sin_main">
      <div id="in_sin_cont">
        <a><img id="in_sin_sin" :src="singer.headPortrait"/></a>
        <div id="in_sin_name">
          {{singer.name}}
        </div>
        <div id="in_sin_base">
          <div class="isb"><span>外文名:</span><span>{{singer.foreignName}}</span></div>
          <div class="isb"><span>国籍:</span><span>{{singer.nationality}}</span></div>
          <div class="isb"><span>出生地:</span><span>{{singer.birthplace}}</span></div>
          <div class="isb"><span>职业:</span><span>{{singer.occupation}}</span></div>
          <div class="isb"><span>代表作:</span><span>{{singer.representative}}</span></div>
        </div>
        <div id="in_sin_but">
          <button id="in_sin_play" type="button" @click="playSong"><i class="iconfont icon-play"></i>播放</button>
          <button class="in_sin_add" type="button" v-if="!attentionStatus"
                  @click="attention"><i
              class="iconfont icon-icon-test"></i>关注
          </button>
          <button class="in_sin_add" type="button" v-if="attentionStatus"
                  @click="cancelAttention"><i
              class="iconfont icon-icon-test"></i>已关注
          </button>
        </div>
      </div>
      <div id="in_sin_list">
        <List :items="items">
          <ListItem :item="item" v-for="item in items">
            <span class="item_span">{{item.name}}</span>
          </ListItem>
        </List>
      </div>
      <keep-alive>
        <router-view  @songUrl="getCurrentSong"></router-view>
      </keep-alive>
    </div>
    <Play ref="play" :url="currentSong"></Play>
  </div>
</template>

<script>
  import List from "../../../components/common/List/List";
  import ListItem from "../../../components/common/List/ListItem";
  import {request} from "../../../network/request";
  import Play from "../../../components/common/Play/play";

  export default {
    name: "singer",
    components: {Play, ListItem, List},
    data() {
      return {
        items: [
          {path: "Song", toPath: "", name: "歌曲"},
          {path: "Album", toPath: "", name: "专辑"},
          {path: "MV", toPath: "", name: "MV"},
        ],
        singer: {},
        path: "/Index/Singer/2/Song",//默认
        currentSong: this.$store.state.staticPath+"music/2/3/song/2sa3as11.mp3",//当前播放的音乐,默认一个地址
        attentionStatus: false,//关注状态
      }
    },
    computed: {
      key() {
        return this.$route.name !== undefined ? this.$route.name + new Date() : this.$route + new Date()
      },
      userId() {
        return this.$store.state.userInf ? this.$store.state.userInf.id : undefined//登录了才能获取到id
      },
      singerId() {
        return this.$route.params.singerId
      }
    },
    watch: {
      userId() {
        this.$nextTick(() => {
          this.isAttention(this.userId)
        })
      }
    },
    created() {
      this.init()//初始化加载数据
    },
    methods: {
      init() {
        this.getSinger()//获取该歌手的所有信息
        let prefix = `/Index/Singer/${this.singerId}`
        this.path = prefix + "/Song"
        this.setPath(prefix)
      },
      setPath(prefix) {
        for (let item of this.items) {
          item.toPath = prefix + "/" + item.path
        }
      },
      getSinger() {//获取歌手信息
        request({url: "singer/selectOne", params: {id: this.singerId}}).then((res) => {
          this.singer = res.data;
        })
      },
      attention() {//关注
        if (this.userId) {
          request({
            url: "attentionSinger/insert",
            params: {singerId: this.singerId, userId: this.userId}
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
            url: "attentionSinger/deleteByUserAndSinger",
            params: {singerId: this.singerId, userId: this.userId}
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
            url: "attentionSinger/isAttention",
            params: {singerId: this.singerId, userId: userId}
          }).then(res => {
            if (res.data === false) {
              this.attentionStatus = false;
              // console.log("没有关注")
            } else {
              this.attentionStatus = true;
              // console.log("已关注")
            }
          })
        } else {
          // console.log("没有登录")
          this.attentionStatus = false;//没有登录的就显示关注按钮
        }
      },
      playSong() {
        this.$refs.play.showAudio()
        this.$refs.play.hiddenAudio()
        this.$refs.play.$refs.audio.play()//播放
      },
      getCurrentSong(songUrl) {//获取歌曲地址
        this.currentSong = songUrl
      }
    }
  }
</script>

<style>
  #in_sin_win {
    width: 100%;
  }

  #in_sin_main {
    width: 1200px;
    margin: 0 auto;
    font-family: poppin, Tahoma, Arial, 微软雅黑, sans-serif;
  }

  #in_sin_cont {
    width: 1200px;
    height: 200px;
    padding-left: 270px;
    box-sizing: border-box;
    position: relative;
    margin-top: 50px;
  }

  #in_sin_list {
    margin-top: 30px;
  }

  #in_sin_sin {
    position: absolute;
    left: 0px;
    width: 200px;
    height: 200px;
    border-radius: 50%;
  }

  #in_sin_name {
    font-size: 38px;
    margin: 5px 0px;
  }

  #in_sin_base {
    height: 50px;
    margin: 5px 0px;
    line-height: 50px;
    font-size: 16px;
    overflow: auto;
  }

  .isb {
    display: inline-block;
    padding: 0 5px;
  }

  .isb > span {
    padding: 0px 2px;
  }

  #in_sin_but {
    height: 50px;
    line-height: 50px;
  }

  #in_sin_play {
    width: 160px;
    height: 40px;
    background-color: rgb(49, 194, 124);
    color: white;
    border: none;
    border-radius: 3px;
    margin-right: 10px;
  }

  #in_sin_play:hover {
    background-color: rgb(39, 184, 114);
  }

  .in_sin_add {
    width: 160px;
    height: 40px;
    background-color: white;
    border: 1px solid #999;
    border-radius: 3px;
  }

  #in_sin_add:hover {
    background-color: rgb(222, 222, 222);
  }

</style>