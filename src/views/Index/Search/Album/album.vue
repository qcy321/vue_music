<template>
  <div id="search_album_win">
    <div id="search_album_main">
      <no-search :content="value" v-if="albums.length==0"/>
      <GeneralList :lists="lists" v-if="albums.length!=0">
        <general-list-item v-for="album in albums">
          <div class="list_item_i">
            <a class="item_head" :href="`/Index/Album/${album.albumId}`"
               :style="`background-image: url(${album.img})`"></a>
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
          </div>
        </general-list-item>
      </GeneralList>
      <div class="com_page" v-if="pageTotal>1">
        <Page :pageTotal="pageTotal"/>
      </div>
    </div>
  </div>
</template>

<script>
  import Page from "components/common/Page/page.vue"
  import GeneralList from "components/common/GeneralList/generalList";
  import ItemOperate from "components/common/GeneralList/ItemOperate";
  import GeneralListItem from "../../../../components/common/GeneralList/generalListItem";
  import {request} from "../../../../network/request";
  import NoSearch from "../../../../components/common/NoData/noSearch";

  export default {
    name: "album",
    components: {NoSearch, GeneralListItem, ItemOperate, GeneralList, Page},
    data() {
      return {
        lists: [
          {name: "专辑", width: 42},
          {name: "曲目数", width: 23},
          {name: "歌手", width: 23},
          {name: "发行时间", width: 12}
        ],
        pageTotal: 1,
        value: "",//参数
        eachNumber: 10,//每页显示的个数,
        albums: [],
      }
    },
    created() {
      this.init()//初始化操作
    },
    methods: {
      init() {
        this.value = this.$route.params.value
        this.getAlbums(1);
        this.getTotal()
      },
      getAlbums(page) {
        request({
          url: "album/selectAllLimitByName",
          params: {value: this.value, page: page, eachNumber: this.eachNumber}
        }).then((res) => {
          if (res.data.length != 0) {
            this.albums = res.data
          }
        })
      },
      getTotal() {//获取当前种类页码总数
        request({
          url: "album/countByName",
          params: {value: this.value, eachNumber: this.eachNumber}
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
    }
  }
</script>

<style>
  #search_album_win{
    width: 100%;
    height: 100%;
  }

  #search_album_main{
    width: 1200px;
    margin: auto;
  }
</style>