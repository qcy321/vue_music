<template ref="index">
  <div id="app">
    <div id="main">
      <Head @login-click="show"/>
    </div>
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
    <div id="bac_vague" :style="{display:$store.state.isNone?'block':'none'}"></div>
    <Login @close="hidden" :isNone="$store.state.isNone"/>
    <div class="Index_footer">
      <Footer/>
    </div>
  </div>
</template>

<script>
  import Login from "../../components/common/Login/Login";
  import Head from "../../components/content/Head/Head";
  import Footer from "../../components/common/Footer/Footer";

  export default {
    name: "Index",
    components: {Footer, Login, Head},
    data() {
      return {
        path: "/Index/Songs/HomePage"
      }
    },
    computed:{
      key(){
        return this.$route.name !==undefined?this.$route.name+new Date():this.$route+new Date()
      }
    },
    methods: {
      show() {
        this.$store.commit('show')
      },
      hidden() {
        this.$store.commit('hidden')
      }
    },
    activated() {
      if (this.$route.path === "/Index")
        this.$router.replace(this.path)
    }
  }
</script>

<style>
  #app {
    width: 100%;
    height: 100%;
    position: relative;
    background-color: #fbfbfb;
    z-index: 1000;
  }

  #main {
    min-width: 1200px;
    z-index: 1;
  }

  button {
    cursor: pointer;
  }

  #bac_vague {
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0px;
    background-color: rgba(55, 55, 55, .2);
    z-index: 1000;
  }

  .Index_footer{
    width: 100%;
    height: 20px;
    margin-top: 200px;
  }

</style>