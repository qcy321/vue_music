<template>
  <div id="album_win">
    <div id="album_main">
      <GeneralList :lists="lists" v-if="albums.length!=0" :key="albums.length">
        <general-list-item :index="index" v-for="(album,index) in albums">
          <div class="list_item_i">
            <a class="item_head" :href="`/Index/Album/${album.albumId}`" :style="`background-image: url(${album.img})`"></a>
            <a class="item_a" :href="`/Index/Album/${album.albumId}`" style="left: 70px">{{album.name}}</a>
            <i class="song_mv_icon iconfont icon-shipin" v-if="false"></i>
          </div>
          <div class="list_item_i">
            <span class="item_a" style="cursor: auto">{{album.number}}</span>
          </div>
          <div class="list_item_i">
            <span class="item_album_time">{{album.timeOfIssue.split(" ")[0]}}</span>
          </div>
        </general-list-item>
      </GeneralList>
      <div class="com_page" v-if="pageTotal>1">
        <Page :pageTotal="pageTotal" @Current="getCurrent"/>
      </div>
    </div>
  </div>
</template>

<script>
  import Page from "components/common/Page/page.vue"
  import GeneralList from "components/common/GeneralList/generalList";
  import GeneralListItem from "../../../../components/common/GeneralList/generalListItem";
  import {request} from "../../../../network/request";

  export default {
    name: "sin_album",
    components: {GeneralListItem, GeneralList, Page},
    data() {
      return {
        lists: [
          {name: "专辑", width: 52},
          {name: "曲目数", width: 34},
          {name: "发行时间", width: 14}
        ],
        pageTotal: 1,
        albums: [],
        eachNumber: 10,//每页显示的个数
        singerId: -1,//歌手id
      }
    },
    created() {
      this.init()
    },
    methods: {
      init() {
        this.singerId = this.$route.params.singerId//获取歌手id
        this.getAlbums(1)
        this.getTotal()
      },
      getAlbums(page) {//获取专辑
        request({
          url: "album/selectAllLimitBySinger",
          params: {singerId: this.singerId, page: page, eachNumber: this.eachNumber}
        }).then((res) => {
          this.albums = res.data;
        })
      },
      getTotal() {//获取当前种类页码总数
        request({
          url: "album/countBySinger",
          params: {singerId: this.singerId, eachNumber: this.eachNumber}
        }).then((res) => {
          if (res.data != "") {
            this.pageTotal = res.data;
          }
        })
      },
      getCurrent(page) {//获取当前页数据
        this.getAlbums(page)
        window.scrollTo(0, 150);
      }
    }
  }
</script>

<style>
  .item_head {
    display: inline-block;
    position: absolute;
    width: 50px;
    height: 50px;
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
    cursor: pointer;
  }
</style>