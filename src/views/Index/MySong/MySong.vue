<template>
  <div id="mySong_win">
    <my-song-login v-if="!isLogin"/>
    <div id="mySong_main" v-if="isLogin">
      <loading v-if="loading"/>
      <div id="mySong_bac" v-if="!loading">
        <div id="user_content">
          <div id="user_hp"></div>
          <div id="user_name">{{user.username}}</div>
          <div id="user_child">
            <div class="attention_fans" @click="">
              <span>{{singerCount}}</span>
              <span>关注</span>
            </div>
            <div class="attention_fans" @click="">
              <span>{{fanCount}}</span>
              <span>粉丝</span>
            </div>
          </div>
          <div id="mySong_List">
            <List :items="items" :height="50">
              <ListItem :item="item" v-for="item in items" :height="50">
                {{item.name}}
              </ListItem>
            </List>
          </div>
        </div>
      </div>
      <keep-alive>
        <router-view></router-view>
      </keep-alive>
    </div>
  </div>
</template>

<script>
  import List from "../../../components/common/List/List";
  import ListItem from "../../../components/common/List/ListItem";
  import Loading from "../../../components/common/Loading/loading";
  import MySongLogin from "../../../components/content/mySongLogin/mySongLogin";
  import {request} from "../../../network/request";

  export default {
    name: "MySong",
    components: {MySongLogin, Loading, ListItem, List},
    data() {
      return {
        items: [
          {path: "Favorite",toPath:"/Index/MySong/Favorite/Song",name: "我喜欢"},
          //{path: "SongSheet", name: "我创建的歌单"},
          {path: "Attention",toPath:"/Index/MySong/Attention/Singer",name: "关注"},
          {path: "Fans",toPath:"/Index/MySong/Fans", name: "粉丝"},
        ],
        path: "/Index/MySong/Favorite/Song",
        loading: undefined,
        singerCount: 0,//关注的歌手数
        fanCount: 0,//粉丝数量
      }
    },
    computed: {
      isLogin() {//判断是否登录
        return this.$store.state.userInf ? true : false;
      },
      user() {
        this.geSingerCount(this.$store.state.userInf.id)
        return this.$store.state.userInf ? this.$store.state.userInf : {};
      },
    },
    created() {
      this.loading = true//创建，显示加载页面
      //console.log(this.loading)
    },
    mounted() {
      this.loading = false//挂载的时候关闭
      //console.log(this.loading)
    },
    methods: {
      geSingerCount(userId) {//获取用户关注歌手数量
        request({url: "attentionSinger/countByUserId", params: {userId: userId}}).then(res => {
          this.singerCount = res.data;
        })
      }
    },
    activated() {
      if (this.$route.path === "/Index/MySong")
        this.$router.replace(this.path)
    },
    beforeRouteLeave(to, from, next) {
      this.loading = false//离开此页面，关闭加载
      next()
    }
  }
</script>

<style scoped>
  #mySong_win {
    width: 100%;
    /*background-color: white;*/
  }

  #mySong_bac {
    width: 100%;
    height: 380px;
    background-image: url("http://localhost/static/User/bg_profile.webp");
    text-align: center;
  }

  #user_content {
    width: 1200px;
    height: 315px;
    padding-top: 65px;
    margin: 0 auto;
    font-family: poppin, Tahoma, Arial, 微软雅黑, sans-serif;
    color: white;
    position: relative;
  }

  #user_hp {
    width: 110px;
    height: 110px;
    border: 4px solid white;
    border-radius: 50%;
    margin: auto;
    background-image: url("http://localhost/static/music/2/2.jpg");
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
  }

  #user_name {
    width: 100%;
    height: 50px;
    line-height: 50px;
    font-size: 30px;
  }

  #user_child {
    width: 100%;
    font-size: 18px;
    margin-top: 5px;
  }

  .attention_fans {
    box-sizing: border-box;
    padding: 2px 20px;
    display: inline-block;
    cursor: pointer;
  }

  .attention_fans:hover {
    color: rgb(49, 194, 124);
  }

  span {
    display: block;
    padding: 2px;
  }

  #mySong_List {
    width: 100%;
    height: 50px;
    position: absolute;
    bottom: 0px;
  }
</style>