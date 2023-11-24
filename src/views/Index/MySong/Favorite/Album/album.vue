<template>
  <div id="album_win">
    <no-data v-if="isData"/>
    <div id="album_main" v-if="!isData">
      <GeneralList :lists="lists">
        <general-list-item v-for="album in albums">
          <div class="list_item_i">
            <a class="item_head" :href="`/Index/Album/${album.albumId}`" :style="`background-image: url(${album.img})`"></a>
            <a class="item_a" style="left: 70px" :href="`/Index/Album/${album.albumId}`">{{album.name}}</a>
          </div>
          <div class="list_item_i">
            <a class="item_a" href="javasript:;">{{album.number}}</a>
          </div>
          <div class="list_item_i">
            <a class="item_a" :href="`/Index/Singer/${album.singer.singerId}/Song`">{{album.singer.name}}</a>
          </div>
          <div class="list_item_i">
            <span class="item_album_time">{{album.timeOfIssue.split(" ")[0]}}</span>
            <div class="item_rab">
              <i class="song_icon iconfont icon-laji" @click="removeAlbum(album.albumId)"></i>
            </div>
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
  import ItemOperate from "components/common/GeneralList/ItemOperate";
  import GeneralListItem from "../../../../../components/common/GeneralList/generalListItem";
  import NoData from "../../../../../components/common/NoData/noData";
  import {request} from "../../../../../network/request";

  export default {
    name: "album",
    components: {NoData, GeneralListItem, ItemOperate, GeneralList, Page},
    data() {
      return {
        lists: [
          {name: "专辑", width: 42},
          {name: "曲目数", width: 23},
          {name: "歌手", width: 23},
          {name: "发行时间", width: 12}
        ],
        pageTotal: 1,
        eachNumber: 10,//每页显示的个数,
        albums: [],
        currentPage:1,
      }
    },
    computed: {
      user() {
        return this.$store.state.userInf;
      },
      isData() {
        return this.albums.length == 0 ? true : false;
      }
    },
    created() {
      this.init()//初始化操作
    },
    methods: {
      init() {
        this.getAlbums(1);
        this.getTotal()
      },
      getAlbums(page) {
        request({
          url: "album/selectAllLimitByUser",
          params: {userId: this.user.id, page: page, eachNumber: this.eachNumber}
        }).then((res) => {
          if (res.data.length != 0) {
            this.albums = res.data
          }
        })
      },
      getTotal() {//获取当前种类页码总数
        request({
          url: "album/countByUser",
          params: {userId: this.user.id, eachNumber: this.eachNumber}
        }).then((res) => {
          if (res.data != "") {
            this.pageTotal = res.data;
          }
        })
      },
      getCurrent(page) {//获取当前页数据
        this.currentPage = page
        this.getAlbums(page)
        window.scrollTo(0, 150);
      },
      removeAlbum(albumId) {//删除专辑
        request({
          url: "attentionAlbum/deleteByUserAndAlbum",
          params: {userId: this.user.id, albumId: albumId}
        }).then((res) => {
          if (res.data === true) {
            alert("移除成功")
            this.getAlbums(this.currentPage)//重新加载一下数据
            this.getTotal()//重新获取页码数
            this.$emit("getAlbumTotal")
          }else{
            alert("移除失败")
          }
        })
      }
    }
  }
</script>

<style>
  #album_win {
    width: 100%;
  }

  #album_main {
    width: 1200px;
    margin: auto;
  }

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