<template>
  <div class="comment_win">
    <div>
      <userComment v-for="i in 2"></userComment>
    </div>
    <div class="com_page">
      <Page :pageTotal="pageTotal" @Current="getCurrent"/>
    </div>
  </div>
</template>

<script>
  import userComment from "./userComment";
  import {request} from "../../../network/request";
  import Page from "../Page/page";

  export default {
    name: "commentContent",
    components: {userComment,Page},
    props: {
      songId: {
        type: String,
        default() {
          return null
        }
      },
      userId:{
        type: String,
        default() {
          return null;
        }
      }
    },
    data() {
      return {
        comments: null,
        pageTotal: 1,
        currentTypeId: null,
      }
    },
    mounted() {
      this.init()
    },
    methods: {
      init() {
        //this.getComment(this.songId);
        //this.getTotal(this.songId)
      },
      getComment(id, page) {
        request({url: "", params: {songId: id, page: page}}).then((res) => {
          this.comments = res.data
          console.log(res.data)
        })
      },
      getTotal(id) {
        request({url: "song/selectFkNumber", params: {id: id}}).then((res) => {
          if (res.data != "") {
            this.pageTotal = res.data;
          }
        })
      },
      getCurrent(page) {
        this.getComment(this.songId, page)//获取某一页数据
        window.scrollTo(0, 150)
      }
    }
  }
</script>

<style>
  .comment_win {
    width: 100%;
    height: 100%;
  }
</style>