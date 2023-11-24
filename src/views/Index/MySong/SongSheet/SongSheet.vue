<template>
  <div id="song_sheet_win">
    <div id="song_sheet_main">
      <Operate :buts="buts"/>
      <GeneralList :lists="lists" :state="state">
        <general-list-item v-for="i in 1">
          <div class="list_item_i">
            <a class="item_a" href="#">我喜欢</a>
            <i class="song_mv_icon iconfont icon-shipin" v-if="false"></i>
            <ItemOperate/>
          </div>
          <div class="list_item_i">
            <a class="item_a" href="#">40首</a>
          </div>
          <div class="list_item_i">
            <div class="item_rab" v-if="true">
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
  import Operate from "../../../../components/common/GeneralList/Operate";
  import GeneralList from "../../../../components/common/GeneralList/generalList"
  import ItemOperate from "../../../../components/common/GeneralList/ItemOperate";
  import Page from "components/common/Page/page.vue"
  import GeneralListItem from "../../../../components/common/GeneralList/generalListItem";

  export default {
    name: "SongSheet",
    components: {GeneralListItem, GeneralList, ItemOperate, Operate, Page},
    data() {
      return {
        buts: [
          {name: "新建歌单", icon: "icon-icon-test"}
        ],
        lists: [
          {name: "歌单", width: 45},
          {name: "曲目数", width: 45},
          {name: "收听", width: 10},
        ],
        pageTotal: 1,
        state: true
      }
    },
    methods: {
      removeSheet() {
      }
    }
  }
</script>

<style>
  #song_sheet_win {
    width: 100%;
  }

  #song_sheet_main {
    width: 1200px;
    margin: auto;
  }
</style>