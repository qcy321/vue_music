<template>
  <div class="comment_user">
    <div class="c_u">
      <div class="user_head"></div>
      <div class="user_name">小强</div>
    </div>
    <div class="user_comment">这个很好看s</div>
    <div class="user_i">
      <i class="user_icon">2021-5-25 15:39</i>
      <i class="user_icon iconfont icon-dianzan"></i>
      <i class="user_icon icon_f iconfont icon-dianzan"></i>
      <i class="user_icon">回复</i>
    </div>
    <div class="reply">
      <user-reply v-for="i in 3"></user-reply>
      <div class="view_more">共<b>33</b>条回复，<a class="but_more" @click="viewMore">点击查看</a></div>
    </div>
  </div>
</template>

<script>
  import UserReply from "./userReply";

  export default {
    name: "usercomment",
    components: {UserReply},
    props: {
      comment: {
        type: Array,
        default() {
          return []
        }
      }
    },
    data() {
      return {}
    },
    methods: {
      init() {

      },
      getMoreReply(id) {

      },
      reply() {//回复

      },
      viewMore() {

      }
    }
  }
</script>

<style>
  .comment_user {
    width: 850px;
    margin: 10px 0;
  }

  .c_u {
    height: 38px;
    line-height: 38px;
    position: relative;
    color: #999;
  }

  .user_comment {
    padding-left: 50px;
    margin: 5px 0;
  }

  .reply {
    margin-left: 50px;
    padding: 5px;
    border-bottom: 1px solid rgba(55, 55, 55, .2);
    /*background-color: rgba(100,100,100,.1);*/
    border-radius: 4px;
  }

  .view_more {
    font-size: 12px;
    box-sizing: content-box;
  }

  .but_more {
    color: #0077aa;
  }

  .user_i {
    margin-left: 50px;
    color: #999;
    height: 24px;
    line-height: 24px;
  }

  .user_icon {
    display: inline-block;
    font-size: 13px;
    padding: 2px 10px;
    cursor: pointer;
  }

  .user_icon:hover {
    color: rgb(49, 194, 124);
  }

  .icon_f {
    transform: rotate(180deg);
  }

  .user_head {
    width: 38px;
    height: 38px;
    border-radius: 50%;
    background-color: #b3d4fc;
    position: absolute;
    left: 0px;
  }

  .user_name {
    position: absolute;
    left: 50px;
  }

</style>