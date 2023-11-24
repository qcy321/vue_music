<template>
  <div id="singer_win">
    <no-data v-if="isData"/>
    <div id="singer_main" v-if="!isData">
      <div id="singer_content">
        <PersonList>
          <PersonItem v-for="singer in singers">
            <a class="com_img_a" :href="`/Index/Singer/${singer.singerId}/Song`">
              <img class="com_img" :src="singer.headPortrait"/>
            </a>
            <a class="com_name" :href="`/Index/Singer/${singer.singerId}/Song`">
              {{singer.name}}
            </a>
            <p class="com_p">
              {{singer.attentionCount}}人关注
            </p>
            <a class="com_but" @click="cancelAttention(singer.singerId)">
              <i>√</i>
              取消关注
            </a>
          </PersonItem>
        </PersonList>
      </div>
      <div class="com_page" v-if="pageTotal>1">
        <Page :pageTotal="pageTotal" @Current="getCurrent"/>
      </div>
    </div>
  </div>
</template>

<script>
  import Page from "components/common/Page/page.vue"
  import PersonList from "../../../../../components/common/GeneralList/PersonList/personList";
  import PersonItem from "../../../../../components/common/GeneralList/PersonList/personItem";
  import {request} from "../../../../../network/request";
  import NoData from "../../../../../components/common/NoData/noData";

  export default {
    name: "singer",
    components: {NoData, PersonItem, PersonList, Page},
    data() {
      return {
        pageTotal: 1,
        singers: [],
        eachNumber: 15,//每页显示的个数,
        currentPage: 1,//当前页数
      }
    },
    computed: {
      user() {
        return this.$store.state.userInf;
      },
      isData() {
        return this.singers.length == 0 ? true : false
      }
    },
    created() {
      this.init()//初始化操作
    },
    methods: {
      init() {
        this.getSingers(1);
        this.getTotal()
      },
      getSingers(page) {
        request({
          url: "singer/selectAllLimitByUser",
          params: {userId: this.user.id, page: page, eachNumber: this.eachNumber}
        }).then((res) => {
          if (res.data.length != 0) {
            this.singers = res.data
          }
        })
      },
      getTotal() {//获取当前种类页码总数
        request({
          url: "singer/countByUser",
          params: {userId: this.user.id, eachNumber: this.eachNumber}
        }).then((res) => {
          if (res.data != "") {
            this.pageTotal = res.data;
          }
        })
      },
      cancelAttention(singerId) {//取消关注
        if (this.user.id != undefined) {
          request({
            url: "attentionSinger/deleteByUserAndSinger",
            params: {singerId: singerId, userId: this.user.id}
          }).then(res => {
            if (res.data === true) {
              alert("取消关注")
              this.getSingers(this.currentPage)//从新加载
              this.getTotal()
            } else {
              alert("取消失败")
            }
          })
        }
      },
      getCurrent(page) {//获取当前页数据
        this.currentPage = page
        this.getSongs(page)
        window.scrollTo(0, 150);
      },
    }
  }
</script>

<style>
  #singer_win {
    width: 100%;
  }

  #singer_main {
    width: 1200px;
    margin: auto;
  }

  #singer_content {
    width: 100%;
    padding-top: 60px;
  }
</style>