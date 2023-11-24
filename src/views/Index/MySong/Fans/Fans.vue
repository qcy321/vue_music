<template>
  <div id="fans_win">
    <div id="fans_main">
      <div id="fans_content">
        <PersonList :items="items"/>
      </div>
      <div class="com_page" v-if="pageTotal>1">
        <Page :pageTotal="pageTotal"/>
      </div>
    </div>
  </div>
</template>

<script>
  import Page from "components/common/Page/page.vue"
  import PersonList from "components/common/GeneralList/PersonList/personList";
  import PersonItem from "components/common/GeneralList/PersonList/personItem";

  export default {
    name: "Fans",
    components: {PersonItem, PersonList, Page},
    data() {
      return {
        pageTotal: 1,
        items:[{}]
      }
    }
  }
</script>

<style>
  #fans_win {
    width: 100%;
  }

  #fans_main {
    width: 1200px;
    margin: auto;
  }

  #fans_content {
    width: 100%;
    padding-top: 60px;
  }
</style>