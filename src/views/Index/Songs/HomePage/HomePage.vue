<template>
  <div id="in_home">
    <div id="in_home_main">
      <div style="position: relative">
        <div class="in_home_mo">
          <Title :list="singerTypes"/>
          <div class="in_home_swiper">
            <Swiper v-if="singers.length!=0">
              <SwiperItem v-for="singer in singers" ref="item">
                <div class="in_home_content">
                  <div class="in_home_cm" style="display: inline-block" v-for="i in singer">
                    <a href="#" class="in_home_img">
                      <img :src="i.headPortrait" loading="lazy"/>
                    </a>
                  </div>
                </div>
              </SwiperItem>
            </Swiper>
          </div>
        </div>
        <div class="in_home_mo">
          <Title :list="songTypes"/>
          <div class="in_home_swiper">
            <Swiper v-if="songs.length!=0">
              <SwiperItem v-for="song in songs" ref="item">
                <div class="in_home_content">
                  <div class="in_home_cm" style="display: inline-block" v-for="so in song">
                    <a :href="`/Index/Song/${so.songId}`" class="in_home_img">
                      <img :src="so.album.img"/>
                    </a>
                    <a class="in_home_c" :href="`/Index/Song/${so.songId}`">
                      {{so.songTitle}}
                    </a>
                    <a class="in_home_c singer_name" :href="`/Index/Singer/${so.album.singer.singerId}/Song`">
                      {{so.album.singer.name}}
                    </a>
                  </div>
                </div>
              </SwiperItem>
            </Swiper>
          </div>
        </div>
        <div class="in_home_mo">
          <Title :list="mvTypes"/>
          <div class="in_home_swiper">
            <Swiper>
              <SwiperItem v-for="item in imgs" ref="item">
                <div class="in_home_content">
                  <div class="in_home_cm" style="display: inline-block" v-for="i in item">
                    <a href="#" class="in_home_img">
                      <img :src="i.url" loading="lazy"/>
                    </a>
                  </div>
                </div>
              </SwiperItem>
            </Swiper>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import Title from "components/common/Title/Title";
  import Swiper from "../../../../components/common/Rotation/Swiper";
  import SwiperItem from "../../../../components/common/Rotation/SwiperItem";
  import {request} from "../../../../network/request";
  import {Type} from "../Type";

  export default {
    name: "HomePage",
    components: {
      Title,
      Swiper,
      SwiperItem
    },
    data() {
      return {
        factor: 3,//每个轮换图单次显示的数量
        singerTypes: {},//歌手种类
        songTypes: {},//歌曲种类
        mvTypes: {},//视频种类
        singers: [],//歌手信息
        songs: [],//歌曲信息
        mvs: [],//视频信息
        imgs: [
          [{url: "http://localhost/static/music/2/1/1.jpg"},
            {url: "http://localhost/static/music/2/10/10.png"},
            {url: "http://localhost/static/music/2/11/11.png"}],
          [
            {url: "http://localhost/static/music/2/15/15.jpg"},
            {url: "http://localhost/static/music/2/19/19.jpg"},
            {url: "http://localhost/static/music/2/19/19.jpg"}],
          /*[{url: "http://localhost/static/music/2/1/1.jpg"},
            {url: "http://localhost/static/music/2/10/10.png"},
            {url: "http://localhost/static/music/2/11/11.png"}],*/
        ]
      }
    },
    created() {
      this.init()
    },
    updated() {
    },
    methods: {
      init() {
        this.getSingerTypes()//歌手种类
        this.getSongTypes()//歌曲种类
        this.getMvTypes()//视频种类
        this.getSingers(1)//歌手
        this.getSongs(1)//歌曲
        this.getMVs(1)//视频
      },
      getMvTypes() {
        request({url: "mvType/selectAllType"}).then(res => {
          this.mvTypes = new Type("视 频 推 荐", res.data)
        })
      },
      getSongTypes() {
        request({url: "songType/selectAllType"}).then(res => {
          this.songTypes = new Type("歌 曲 推 荐", res.data)
        })
      },
      getSingerTypes() {
        request({url: "singerType/selectAllType"}).then(res => {
          this.singerTypes = new Type("歌 手 推 荐", res.data)
        })
      },
      getSingers(typeId) {
        request({url: "singer/queryRand", params: {typeId: typeId}}).then(res => {
          this.auto(this.singers, res.data, this.factor)
        })
      },
      getMVs(typeId) {
        request({url: "mv/queryRand", params: {typeId: typeId}}).then(res => {
          this.auto(this.mvs, res.data, this.factor)
        })
      },
      getSongs(typeId) {
        request({url: "song/queryRand", params: {typeId: typeId}}).then(res => {
          this.auto(this.songs, res.data, this.factor);
        })
      },
      auto(val, arr, factor) {//自动封装
        let count = 0;
        let a = new Array()
        for (let ar of arr) {
          a.push(ar)
          count++;
          if (count === factor) {
            val.push(a)
            a = new Array()
            count = 0
          }
        }
        if (a.length != 0)
          val.push(a)
        return val
      }
    },
    activated() {
      /*console.log("进入了")*/
    }
  }
</script>

<style>
  #in_home {
    width: 100%;
  }

  #in_home_main {
    width: 1200px;
    margin: auto;
  }

  .in_home_mo {
    background: linear-gradient(#f2f2f2, white);
  }

  .s_title {
    border: 1px solid black;
    height: 50px;
    font-size: 25px;
    color: grey;
    text-align: center;
  }

  .in_home_swiper {
    width: 900px;
    height: 350px;
    margin: auto;
    position: relative;
    background-color: #0077aa;
  }

  .in_home_img {
    display: inline-block;
    width: 180px;
    height: 180px;
  }

  .in_home_c {
    display: block;
    text-align: left;
    background-color: white;
    font-size: 14px;
  }

  .singer_name {
    color: #999;
  }

  .in_home_content {
    position: relative;
    top: 50%;
    margin-top: -120px
  }

  .in_home_cm {
    padding: 10px 10px;
    margin: 0px 20px;
    box-sizing: border-box;
    background-color: white;
  }
</style>