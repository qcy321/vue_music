<template>
  <div class="item_operate">
    <i class="song_icon iconfont icon-play" title="播放" @click="playSong"></i>
    <i class="song_icon iconfont icon-icon-test" title="添加" @click="addSong"></i>
    <i class="song_icon iconfont icon-Group-" title="下载" @click="uploadSong"></i>
    <i class="song_icon iconfont icon-fenxiang" title="分享" @click="shareSong"></i>
  </div>
</template>

<script>
  export default {
    name: "ItemOperate",
    props: {
      songUrl: {//歌曲地址
        type: String,
        default() {
          return ""
        }
      },
      songTitle: {//歌曲名称
        type: String,
        default() {
          return ""
        }
      }
    },
    methods: {
      playSong() {//播放音乐
        this.$emit("playSong", this.songUrl)
      },
      addSong() {// 添加音乐
        if (this.$store.state.userInf) {
          this.$emit("addSong", this.songUrl)
        } else {
          this.$store.commit('show')
        }
      },
      uploadSong() {//下载音乐
        if (this.$store.state.userInf) {
          if (this.songUrl != "") {
            let a = document.createElement("a")
            a.href = this.songUrl;
            a.download = this.songTitle
            a.click()
          }
          this.$emit("uploadSong", this.songUrl)
        } else {
          this.$store.commit('show')
        }
      },
      shareSong() {//分享音乐
        this.$emit("shareSong", this.songUrl)
      },
    }
  }
</script>

<style>
  .item_operate {
    position: absolute;
    height: 50px;
    line-height: 50px;
    right: 0px;
    display: none;
  }

  .song_icon {
    display: inline-block;
    width: 35px;
    height: 35px;
    line-height: 35px;
    border-radius: 50%;
    text-align: center;
    color: rgb(168, 168, 168);
    border: 1px solid rgb(168, 168, 168);
    margin: 0px 3px;
    cursor: pointer;
  }

  .song_icon:hover {
    border: 1px solid rgb(49, 194, 124);
    color: rgb(49, 194, 124);
  }
</style>