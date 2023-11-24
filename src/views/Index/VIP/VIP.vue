<template>
  <div id="vip_win">
    <loading v-if="loading" />
    <div id="vip_main">
      这里是vip区域
    </div>
    <!--<div class="vip_but">
      <custom-button ><i class="iconfont icon-shoucang1"></i>自定义</custom-button>
    </div>-->
  </div>
</template>

<script>
  import Loading from "../../../components/common/Loading/loading";
  import {request} from "../../../network/request";
  import customButton from "../../../components/common/Button/customButton";

  export default {
    name: "VIP",
    components: {Loading,customButton},
    data() {
      return {
        loading: undefined
      }
    },
    computed: {
      key() {
        return this.$route.name !== undefined ? this.$route.name + new Date() : this.$route + new Date()
      },
    }, activated() {
      this.loading = true;//当处于活跃状态时，显示加载动画
      request({url: "singer/selectAllLimit", params: {offset: 0, limit: 2}}).then((res) => {
        //let start = new Date()
        console.log(res.data)
        //console.log("数据加载完成")
        //console.log(new Date() - start)
      }, error => {
        console.log(error.response.status)
      }).finally(() => {
        //console.log("请求完成销毁")
        this.loading = false
      })
    },
    beforeRouteLeave(to, from, next) {
      this.loading = false;
      next()
    }
  }
</script>

<style>
  #vip_win {
    width: 100%;
    height: 100%;
    position: relative;
  }

  #vip_main {
    width: 1200px;
    margin: auto;
  }

  .vip_but{
    width:100px;
    height: 40px;
    background-color: rgb(49,194,124);
    color: white;
    border: 1px solid transparent;
    border-radius: 2px;
    font-size: 14px;
  }

</style>