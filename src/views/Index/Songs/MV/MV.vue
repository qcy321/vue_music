<template>
  <div id="s_mv_win">
    <div id="s_mv_main">
      <div style="margin: 40px 0">
        <TypeList :items="bars"/>
      </div>
      <div id="s_new_content">
        <MvList :mvs="mvs"/>
      </div>
      <div class="com_page">
        <Page :pageTotal="pageTotal"/>
      </div>
    </div>
  </div>
</template>

<script>
  import Page from "components/common/Page/page.vue";
  import MvList from "../../../../components/common/GeneralList/MvList/mvList";
  import TypeList from "../../../../components/common/TypeList/typeList";

  export default {
    name: "MV",
    components:{TypeList, MvList, Page},
    data() {
      return {
        bars: [
          {title: "全部", list: ["内地", "港台", "欧美", "韩国", "日本","其他"]},
        ],
        pageTotal: 6,
        mvs:[{},{},{},{},{},{},{},{},{},{},{},{}]
      }
    }
  }
</script>

<style >
  #s_mv_win {
    width: 100%;
  }

  #s_mv_main {
    width: 1200px;
    margin: auto;
  }
</style>