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
    name: "myVideo",
    components: {MvList, Page},
    data() {
      return {
        pageTotal: 1,
        mvs: [{}]
      }
    },
    methods: {}
  }
</script>

<style>
  #video_win {
    width: 100%;
  }

  #video_main {
    width: 1200px;
    margin: auto;
  }

  #v_l{
    margin-top: 25px;
  }
</style>