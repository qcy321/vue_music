<template>
  <div class="play_audio" @mouseenter="showAudio" @mouseleave="hiddenAudio">
    <div class="audio_main">
      <audio class="audio" loop="loop" ref="audio" controls>
        <source :src="url" type="audio/mpeg"/>
      </audio>
    </div>
  </div>
</template>

<script>
  export default {
    name: "play",
    data() {
      return {
        time: null,
      }
    },
    props: {
      url: {
        type: String,
        default() {
          return ""
        }
      }
    },
    methods: {
      showAudio(e) {//播放框弹出
        if (this.time != null)
          clearTimeout(this.time)
        document.querySelector(".play_audio").style.bottom = "0px"
      },
      hiddenAudio(e) {
        if (this.time != null)
          clearTimeout(this.time)
        this.time = setTimeout(function () {
          document.querySelector(".play_audio").style.bottom = "-40px"
        }, 1000)
      }
    }
  }
</script>

<style>
  .play_audio {
    width: 100%;
    height: 40px;
    padding-top: 20px;
    position: fixed;
    bottom: -40px;
    z-index: 1003;
    transition-duration: .4s;
    cursor: pointer;
  }

  .audio_main {
    width: 1200px;
    margin: auto;
  }

  .audio {
    width: 100%;
  }
</style>