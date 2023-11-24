<template>
  <div id="Sign_win">
    <div id="Sign_top">
      <div id="Sign_top_c">
        <div id="Sign_logo">
          <Logo/>
        </div>
      </div>
    </div>
    <div id="Sign_bac">
      <div id="Sign_img" :style="`background-image: url('${$store.state.staticPath}/Sign/622d6a4e0b8be8bd58003345f4accf7b.jpeg')`">
        <div id="Sign_Login">
          <iframeLogin :an="id"/>
        </div>
      </div>
    </div>
    <div id="Sign_fo">
      <Footer/>
    </div>
  </div>
</template>

<script>
  import Logo from "../../components/common/Logo/Logo";
  import Footer from "../../components/common/Footer/Footer";
  import iframeLogin from "../../components/common/Login/iframeLogin";

  export default {
    name: "Sign",
    components: {iframeLogin, Footer, Logo},
    data() {
      return {
        id: ""
      }
    },
    created() {
      this.init();
    },
    methods: {
      init() {
        this.getId()
      },
      getId() {
        if (this.$route.query.hasOwnProperty("id"))
          this.id = this.$route.query.id
      }
    }
  }
</script>

<style scoped>
  #Sign_win {
    width: 100%;
    min-width: 1200px;
    background-color: white;
    position: relative;
  }

  #Sign_logo {
    position: absolute;
    top: 20px;
  }

  #Sign_top {
    width: 100%;
    height: 100px;
  }

  #Sign_top_c {
    width: 1200px;
    margin: auto;
    position: relative;
  }

  #Sign_bac {
    width: 100%;
    background-color: #BBDBCC;
  }

  #Sign_img {
    width: 1200px;
    height: 575px;
    margin: auto;
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
    position: relative;
  }

  #Sign_Login {
    width: 420px;
    height: 440px;
    position: absolute;
    right: 50px;
    top: 50%;
    margin-top: -220px;
    background-color: white;
    border-radius: 2px;
    box-shadow: 0 0 2px 2px rgb(222, 222, 222);
  }

  #Sign_fo {
    width: 100%;
    height: 20px;
    margin-top: 200px;
  }

</style>