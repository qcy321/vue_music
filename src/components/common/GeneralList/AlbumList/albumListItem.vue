<template>
  <li class="album_li">
    <slot>
      <div class="a_li">
        <a class="a_img">
          <img class="album_img" :src="`${$store.state.staticPath+'music/2/1/1.jpg'}`"/>
        </a>
      </div>
      <div class="a_li"><a class="a_title">自定义</a></div>
      <div class="a_li"><a class="a_name">许嵩</a></div>
      <div class="a_li"><span class="a_time">2020-10-25</span></div>
    </slot>
  </li>
</template>

<script>
  export default {
    name: "albumListItem",
    props:{
      item:{
        type:Object,
        default(){
          return undefined
        }
      }
    }
  }
</script>

<style>
  .album_li {
    width: 20%;
    box-sizing: border-box;
    display: inline-block;
    margin-bottom: 45px;
  }

  .a_li {
    margin: 3px 0;
  }

  .a_img {
    display: inline-block;
    overflow: hidden;
  }

  .album_img {
    display: block;
    width: 228px;
    height: 228px;
    transition-duration: .5s;
  }


  .a_name {
    color: #999;
  }

  .a_time {
    color: #999;
  }
</style>