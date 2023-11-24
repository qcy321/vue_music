<template>
  <div id="album_list">
    <ul class="album_ul">
      <slot>
        <AlbumListItem :item="item" v-for="item in items">

        </AlbumListItem>
      </slot>
    </ul>
  </div>
</template>

<script>
  import AlbumListItem from "./albumListItem";
  export default {
    name: "albumList",
    components: {AlbumListItem},
    props:{
      items:{
        type:Array,
        default(){
          return []
        }
      }
    }
  }
</script>

<style>
  #album_list {
    width: 100%;
    font-family: poppin, Tahoma, Arial, 微软雅黑, sans-serif;
    font-size: 14px;
  }

  .a_img:hover .album_img {
    transform: scale(1.1);
  }

</style>