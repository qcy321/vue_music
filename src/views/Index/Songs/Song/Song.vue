<template>
  <div id="s_new_win">
    <div id="s_new_main">
      <div style="margin: 40px 0">
        <TypeList :items="songTypes" @getData="getSongs" @getTotal="getTotal"/>
      </div>
      <div id="s_new_content">
        <div v-if="songs.length==0">
          没有数据
        </div>
        <AlbumList>
          <AlbumListItem v-for="song in songs" :key="song.songId">
            <div class="a_li">
              <a :href="`/Index/Song/${song.songId}`" class="a_img">
                <img class="album_img" :src="song.album.img" loading="lazy"/>
              </a>
            </div>
            <div class="a_li"><a :href="`/Index/Song/${song.songId}`" class="a_title">{{song.songTitle}}</a></div>
            <div class="a_li"><a :href="`/Index/Singer/${song.album.singer.singerId}/Song`" class="a_name">{{song.album.singer.name}}</a>
            </div>
          </AlbumListItem>
        </AlbumList>
      </div>
      <div class="com_page">
        <Page :pageTotal="pageTotal" @Current="getCurrent"/>
      </div>
    </div>
  </div>
</template>

<script>
  import TypeList from "../../../../components/common/TypeList/typeList";
  import Page from "components/common/Page/page.vue";
  import AlbumList from "../../../../components/common/GeneralList/AlbumList/albumList";
  import {request} from "../../../../network/request";
  import {Type} from "../Type";
  import AlbumListItem from "../../../../components/common/GeneralList/AlbumList/albumListItem";

  export default {
    name: "New",
    components: {AlbumListItem, AlbumList, TypeList, Page},
    data() {
      return {
        songTypes: [],
        songs: [],
        pageTotal: 1,
        currentTypeId:null,
      }
    },
    created() {
      this.init()
    },
    methods: {
      init() {
        this.getSongTypes()//获取种类
        this.getSongs(null, 1)//获取所有歌手
        this.getTotal(null)//获取总页数
      },
      getSongTypes() {
        request({url: "songType/selectAllType"}).then(res => {
          this.songTypes.push(new Type("全部", res.data))
        })
      },
      getSongs(id, page) {
        this.currentTypeId = id//保存当前点击的种类
        request({url: "song/selectTypeLimit", params: {typeId: id, page: page}}).then((res) => {
          this.songs = res.data;
        })
      },
      getTotal(id) {
        request({url: "song/selectFkNumber", params: {id: id}}).then((res) => {
          if (res.data != "") {
            this.pageTotal = res.data;
          }
        })
      },
      getCurrent(page) {
        this.getSongs(this.currentTypeId,page)//获取某一页数据
        window.scrollTo(0,150)
      }
    }
  }
</script>

<style>
  #s_new_win {
    width: 100%;
  }

  #s_new_main {
    width: 1200px;
    margin: auto;
  }
</style>