<template>
  <li class="video_item">
    <slot>
      <a class="video_i" @click="">
        <img class="video_mv" src="//y.qq.com/music/photo_new/T015R640x360M102002TyT4g3mvuAG.jpg?max_age=2592000"/>
        <i class="video_play iconfont icon-arrow-"></i>
        <i class="video_bac"></i>
      </a>
      <div class="video_t"><a @click="">乌鸦</a></div>
      <div class="video_t video_c"><a @click="">许嵩</a></div>
    </slot>
  </li>
</template>

<script>
  export default {
    name: "mvListItem",
    props: {
      mv: {
        type: Object,
        default() {
          return undefined
        }
      }
    }
  }
</script>

<style>
  .video_item {
    margin: 0px 15px 20px 0px;
  }

  .video_i {
    display: block;
    height: 160px;
    position: relative;
    margin-bottom: 15px;
    overflow: hidden;
  }

  .video_mv {
    width: 285px;
    position: relative;
    transform: scale(1);
    transition: transform .75s;
    /*background: linear-gradient(180deg,transparent 0,rgba(0,0,0,.4) 80%,rgba(0,0,0,.7))*/
  }

  .video_i:hover .video_play {
    opacity: .9;
    transform: scale(1) translateZ(0);
  }

  .video_i:hover .video_mv {
    transform: scale(1.05);
  }

  .video_i:hover .video_bac {
    background-color: rgba(0, 0, 0, .4);
  }

  .video_play {
    display: inline-block;
    width: 70px;
    height: 70px;
    background-color: rgba(100, 100, 100, .4);
    color: white;
    border-radius: 50%;
    line-height: 70px;
    text-align: center;
    position: absolute;
    top: 50%;
    left: 50%;
    margin: -35px 0 0 -35px;
    font-size: 70px;
    opacity: 0;
    transform: scale(.7) translateZ(0);
    transition-property: opacity, transform;
    transition-duration: .5s;
    z-index: 1002;
  }

  .video_bac {
    position: absolute;
    width: 100%;
    height: 100%;
    background: linear-gradient(rgba(100, 100, 100, .4), transparent, rgba(100, 100, 100, .4));
    z-index: 1001;
    left: 0;
    top: 0;
    transition-duration: .5s;
  }

  .video_t {
    width: 100%;
    height: 21px;
  }

  .video_c {
    color: #999;
  }
</style>