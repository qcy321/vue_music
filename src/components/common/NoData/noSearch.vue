<template>
  <div class="no_search">
    很抱歉，暂时没有找到与"<span style="color: rgb(49,194,124)">{{content}}</span>"相关的结果
  </div>
</template>

<script>
  export default {
    name: "noSearch",
    props:{
      content:{
        type:String,
        default(){
          return ""
        }
      }
    }
  }
</script>

<style >
  .no_search{
    width: 100%;
    text-align: center;
    font-size: 30px;
    font-family: poppin, Tahoma, Arial, 微软雅黑, sans-serif;
    color: #999999;
  }
</style>