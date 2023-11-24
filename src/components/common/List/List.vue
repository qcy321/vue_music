<template>
  <div id="com_list" :style="{height:height+'px'}">
    <ul id="com_ul">
      <slot>
        <ListItem :item="item" :path="path" v-for="item in items" :height="height">
          <span class="item_span">{{item.name}}</span>
          <span class="item_span">1</span>
        </ListItem>
      </slot>
    </ul>
  </div>
</template>

<script>
  import ListItem from "./ListItem";

  export default {
    name: "List",
    components: {ListItem},
    props: {
      items: {
        type: Array,
        default() {
          return [
            {path: "Favorite", name: "我喜欢"},
            {path: "SongSheet", name: "我创建的歌单"},
            {path: "Attention", name: "关注"},
            {path: "Fans", name: "粉丝"},
          ]
        }
      },
      path:{
        type:String,
        default() {
          return "";
        }
      },
      height:{
        type:Number,
        default() {
          return 56
        }
      },
    },
  }
</script>

<style>
  #com_list {
    width: 100%;
    box-sizing: border-box;
  }

  #com_ul {
    width: 800px;
    font-family: poppin, Tahoma, Arial, 微软雅黑, sans-serif;
  }
</style>