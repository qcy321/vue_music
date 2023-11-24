<template>
  <div class="comment">
    <div class="comment_title">
      评论
    </div>
    <div class="comment_write" @click="hid">
      <div class="comment_inp comment_default" contenteditable="true">说说你的看法</div>
      <div class="comment_inp comment_cur" ref="content" style="display: none" contenteditable="true" @focus="hid"
           @blur="show"></div>
    </div>
    <div class="comment_but" @click="publish(userId,songId)">
      发表评论
    </div>
  </div>
</template>

<script>
  import {request} from "../../../network/request";

  export default {
    name: "comment",
    props: {
      songId: {
        type: String,
        default() {
          return null;
        }
      },
      userId:{
        type:String,
        default() {
          return null;
        }
      }
    },
    data() {
      return {
        publish_comment: "",
      }
    },
    methods: {
      hid() {
        document.querySelector(".comment_default").style.display = "none"
        let cur = document.querySelector(".comment_cur")
        cur.style.display = "block"
        cur.focus();
      },
      show() {
        let cur = document.querySelector(".comment_cur")
        if (cur.textContent === "") {
          document.querySelector(".comment_default").style.display = "block"
          cur.style.display = "none"
        }
      },
      publish(userId, songId) {
        let text = this.$refs.content.innerText;
        request({
          url: "comment/insert",
          params: {user: {id: userId}, song: {songId: songId}, content: text}
        }).then(res => {
          console.log(res.data)
        })
        //request({url:"",params:{}})
      }
    }
  }
</script>

<style>
  .comment {
    width: 100%;
    height: 100%;
  }

  .comment_title {
    font-size: 30px;
  }

  .comment_write {
    width: 850px;
    height: 120px;
    background-color: white;
    border: 1px solid #999;
    box-sizing: border-box;
    padding: 10px;
    border-radius: 3px;
    margin-top: 10px;
  }

  .comment_inp {
    width: 100%;
    height: 100%;
    outline: none;
    overflow-y: auto;
  }

  .comment_default {
    color: #999999;
  }

  .comment_but {
    width: 120px;
    height: 30px;
    line-height: 30px;
    background-color: rgb(49, 194, 124);
    color: white;
    margin-top: 10px;
    text-align: center;
    cursor: pointer;
  }

</style>