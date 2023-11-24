<template>
  <div id="video_win">
    <div id="video_main">
      <div id="v_l">
        <MvList :mvs="mvs"/>
      </div>
      <div class="com_page" v-if="pageTotal>1">
        <Page :pageTotal="pageTotal"/>
      </div>
    </div>
  </div>
</template>

<script>
  import Page from "components/common/Page/page.vue"
  import MvList from "components/common/GeneralList/MvList/mvList.vue";

  export default {
    name: "sin_mv",
    components: {MvList, Page},
    data() {
      return {
        pageTotal: 1,
        mvs: [{}]
      }
    }
  }
</script>

<style>

</style>