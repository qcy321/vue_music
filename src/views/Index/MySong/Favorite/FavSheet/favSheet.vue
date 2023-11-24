<template>
  <div id="fs_win">
    <div id="fs_main">
      <GeneralList :lists="lists" :state="state">
        <general-list-item v-for="i in 1">
          <div class="list_item_i">
            <a class="item_head" href="#"></a>
            <a class="item_a" style="left: 70px" href="#">我喜欢</a>
            <i class="song_mv_icon iconfont icon-shipin" v-if="false"></i>
            <ItemOperate/>
          </div>
          <div class="list_item_i">
            <a class="item_a" href="#">1</a>
          </div>
          <div class="list_item_i">
            <a class="item_a" href="#">胖子</a>
          </div>
          <div class="list_item_i">
            <span class="item_sheet_num">2</span>
            <div class="item_rab" v-if="state">
              <i class="song_icon iconfont icon-laji" @click="removeSheet"></i>
            </div>
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
  import GeneralListItem from "../../../../../components/common/GeneralList/generalListItem";

  export default {
    name: "favSheet",
    components: {GeneralListItem, ItemOperate, GeneralList, Page},
    data() {
      return {
        lists: [
          {name: "歌单", width: 42},
          {name: "曲目数", width: 23},
          {name: "创建人", width: 23},
          {name: "收听", width: 12}
        ],
        pageTotal: 1,
        state: true,
      }
    },
    methods: {
      removeSheet() {
        //删除歌曲
      }
    }
  }
</script>

<style>
  #fs_win {
    width: 100%;
  }

  #fs_main {
    width: 1200px;
    margin: auto;
  }

  /*.item_head{
    display: inline-block;
    position: absolute;
    width: 50px;
    height: 50px;
    background-image: url("http://localhost/static/music/2/2.jpg");
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
    cursor: pointer;
  }*/
</style>