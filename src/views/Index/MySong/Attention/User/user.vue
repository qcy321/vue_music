<template>
  <div id="user_win">
    <div id="user_main">
      <div id="user_content">
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
  import PersonList from "../../../../../components/common/GeneralList/PersonList/personList";
  import PersonItem from "../../../../../components/common/GeneralList/PersonList/personItem";

  export default {
    name: "user",
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
  #user_win {
    width: 100%;
  }

  #user_main {
    width: 1200px;
    margin: auto;
  }

  #user_content {
    width: 100%;
    padding-top: 60px;
  }
</style>