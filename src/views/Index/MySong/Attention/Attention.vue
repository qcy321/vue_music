<template>
  <div id="attention_win">
    <div id="attention_main">
      <List :items="items">
        <ListItem :item="item" v-for="item in items">
          {{item.name}}
        </ListItem>
      </List>
    </div>
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
  </div>
</template>

<script>
  import ListItem from "../../../../components/common/List/ListItem";
  import List from "../../../../components/common/List/List";

  export default {
    name: "Attention",
    components: {List, ListItem},
    data() {
      return {
        items: [
          {path: "Singer",toPath: "/Index/MySong/Attention/Singer", name: "歌手"},
          {path: "User",toPath: "/Index/MySong/Attention/User", name: "用户"},
        ],
        path: "/Index/MySong/Attention/Singer",
      }
    },
    activated() {
      if (this.$route.path === "/Index/MySong/Attention")
        this.$router.replace(this.path)
    }
  }
</script>

<style>
  #attention_win{
    width: 100%;
  }
  #attention_main{
    width: 1200px;
    margin: auto;
  }

</style>