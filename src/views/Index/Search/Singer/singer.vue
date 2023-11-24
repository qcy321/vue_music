<template>
  <div id="search_singer_win">
    <div id="search_singer_main">
      <no-search :content="value" v-if="singers.length==0"/>
      <div id="song_list_win" v-if="singers.length!=0">
        <GeneralList :lists="lists">
          <GeneralListItem :index="index" v-for="(singer,index) in singers">
            <div class="list_item_i">
              <a class="item_head" :href="`/Index/Singer/${singer.singerId}`"
                 :style="`background-image: url(${singer.headPortrait})`"></a>
            </div>
            <div class="list_item_i">
              <a class="item_a"
                 :href="`/Index/Singer/${singer.singerId}/Song`">{{singer.name}}</a>
            </div>
            <div class="list_item_i">
              <a class="item_a" href="javascript:;">{{singer.attentionCount}}</a>
            </div>
          </GeneralListItem>
        </GeneralList>
        <div class="com_page" v-if="pageTotal>1">
          <Page :pageTotal="pageTotal" @Current="getCurrent"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import GeneralList from "../../../../components/common/GeneralList/generalList";
  import GeneralListItem from "../../../../components/common/GeneralList/generalListItem";
  import {request} from "../../../../network/request";
  import Page from "../../../../components/common/Page/page";
  import NoSearch from "../../../../components/common/NoData/noSearch";

  export default {
    name: "singer",
    components: {NoSearch, Page, GeneralListItem, GeneralList},
    data() {
      return {
        lists: [
          {name: "头像", width: 42},
          {name: "歌手", width: 42},
          {name: "粉丝数", width: 16},
        ],
        pageTotal: 1,
        value: "",//查询数据
        eachNumber: 10,//每页显示的个数
        singers: []
      }
    },
    created() {
      this.init()//初始化数据
    },
    methods: {
      init() {
        this.value = this.$route.params.value
        this.getSingers(1)//获取该歌手的所有信息
        this.getTotal()//获取总页数
      },
      getSingers(page) {
        request({
          url: "singer/selectAllLimitByName",
          params: {value: this.value, page: page, eachNumber: this.eachNumber}
        }).then((res) => {
          if (res.data.length != 0) {
            this.singers = res.data;
          }
        })
      },
      getTotal() {//获取当前种类页码总数
        request({
          url: "singer/countByName",
          params: {value: this.value, eachNumber: this.eachNumber}
        }).then((res) => {
          if (res.data != "") {
            this.pageTotal = res.data;
          }
        })
      },
      getCurrent(page) {//获取当前页数据
        this.getSingers(page)
        window.scrollTo(0, 150);
      },
    }
  }
</script>

<style>
  #search_singer_win {
    width: 100%;
    height: 100%;
  }

  #search_singer_main {
    width: 1200px;
    margin: auto;
  }
</style>