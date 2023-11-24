<template>
  <div class="user_reply">
    <div class="u_c">
      <div class="reply_head"></div>
      <div class="reply_name">小强</div>
    </div>
    <div class="reply_comment">这个东很好看</div>
    <div class="reply_i">
      <i class="reply_icon">时间</i>
      <i class="reply_icon iconfont icon-dianzan"></i>
      <i class="reply_icon icon_f iconfont icon-dianzan"></i>
      <i class="reply_icon">回复</i>
    </div>
  </div>
</template>

<script>
  export default {
    name: "userReply",
    props: {
      replyContent: {
        type: Object,
        default() {
          return null
        }
      }
    },
    methods:{
      init(){},
      reply(){},
      //点赞
      //点踩
    }
  }
</script>

<style>
  .user_reply {
    width: 100%;
    margin: 10px 0;
  }

  .u_c {
    height: 24px;
    line-height: 24px;
    position: relative;
    color: #999;
  }

  .reply_comment {
    padding-left: 40px;
    margin: 5px 0;
    font-size: 14px;
  }

  .reply_i {
    margin-left: 40px;
    color: #999;
    height: 24px;
    line-height: 24px;
    padding-bottom: 15px;
    /*border-bottom: 1px solid rgba(55,55,55,.1);*/
  }

  .reply_icon {
    display: inline-block;
    font-size: 13px;
    padding: 2px 10px;
    cursor: pointer;
  }

  .reply_icon:hover {
    color: rgb(49, 194, 124);
  }

  .icon_f {
    transform: rotate(180deg);
  }

  .reply_head {
    width: 24px;
    height: 24px;
    border-radius: 50%;
    background-color: #b3d4fc;
    position: absolute;
    left: 0px;
  }

  .reply_name {
    position: absolute;
    left: 40px;
    font-size: 13px;
  }
</style>