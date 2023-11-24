<template>
  <div class="no_data">
    <i class="iconfont icon-wendang no_file"></i>
    <span class="tips">什么也没有，去<a href="/Index" style="color:  rgb(49,194,124)">音乐馆</a>发现好音乐</span>
  </div>
</template>

<script>
  export default {
    name: "noData"
  }
</script>

<style>
  .no_data{
    width: 100%;
  }
  .no_file{
    display: block;
    font-size: 200px;
    text-align: center;
    line-height: 200px;
    width: 200px;
    height: 200px;
    margin: 50px auto 30px auto;
    color: #999;
  }

  .tips{
    display: block;
    text-align: center;
    font-size: 20px;
    line-height: 38px;
    color: #666;
  }
</style>