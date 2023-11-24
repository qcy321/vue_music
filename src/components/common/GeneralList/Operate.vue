<template>
  <div class="operate">
    <div class="song_but">
      <a class="but_item" v-for="(but,index) of buts" :class="{'but_co':index==0}">
        <i class="i_co iconfont" :class="but.icon" :style="{'color':index==0?'white':''}"></i>
        <span>{{but.name}}</span>
      </a>
    </div>
  </div>
</template>

<script>
  export default {//操作组件
    name: "Operate",
    props: {
      buts: {
        type:Array,
        default() {
          return [
            {name: "播放全部", icon: "icon-play"},
            {name: "添加到", icon: "icon-icon-test"},
            {name: "下载", icon: "icon-Group-"},
            {name: "批量操作", icon: "icon-icon-piliangcaozuo"},
          ]
        }
      }
    }
  }
</script>

<style>
  .operate {
    width: 600px;
    margin-top: 45px;
  }

  .but_item {
    display: inline-block;
    height: 38px;
    line-height: 38px;
    border-radius: 2px;
    box-sizing: border-box;
    padding: 0 20px;
    border: 1px solid #c9c9c9;
    margin-right: 10px;
    cursor: pointer;
  }

  .but_item:hover {
    background-color: rgba(188, 188, 188, .6);
  }

  .i_co {
    font-size: 16px;
    color: #999999;
    margin-right: 4px;
  }

  .but_co {
    background-color: rgb(49, 194, 124);
    color: white;
  }
</style>