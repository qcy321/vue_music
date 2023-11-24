<template>
  <div class="in_song_lyric">
    <div class="lyric_title">歌词</div>
    <div class="lyr_t">
      <div class="lyric_cont" :class="{'lyric_c':!openState}"></div>
      <div class="lyric_open" @click="open">{{this.openState?"[收起]":"[展开]"}}</div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "lyric",
    data() {
      return {
        openState: false
      }
    },
    props: {
      ric: {
        type: String,
        default() {
          return ""
        }
      }
    },
    /*watch: {
      ric() {
        this.$nextTick(() => {
          let cont = document.getElementById("lyric_cont")
          let ric = this.ric.split(/\s*\n*\[.*?\]/)//正则匹配读取歌词
          for (const ricElement of ric) {
            let para = document.createElement("p");
            let content = document.createTextNode(ricElement);
            para.appendChild(content);
            cont.appendChild(para);
          }
        })
      }
    },*/
    mounted() {
      this.mountedRic()
    },
    methods: {
      open() {//展开收起
        this.openState = !this.openState
      },
      mountedRic() {
        let cont = document.querySelector(".lyric_cont")
        let ric = this.ric.split(/\s*\n*\[.*?\]/)//正则匹配读取歌词
        for (const ricElement of ric) {
          let para = document.createElement("p");
          let content = document.createTextNode(ricElement);
          para.appendChild(content);
          cont.appendChild(para);
        }
      }
    }
  }
</script>

<style>
  .lyric_title {
    font-size: 22px;
    margin-top: 50px;
    padding-bottom: 10px;
  }

  .lyric_cont {
    white-space: pre-line;
    font-size: 14px;
    line-height: 26px;
  }

  .lyric_c {
    max-height: 390px;
    overflow: hidden;
  }

  .lyr_t {
    width: 800px;
    position: relative;
  }

  .lyric_open {
    position: absolute;
    left: 0px;
    bottom: -22px;
    cursor: pointer;
  }

  .lyric_open:hover {
    color: rgb(49, 194, 124);
  }
</style>