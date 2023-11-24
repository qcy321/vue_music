<template>
  <div id="">
      <div id="title">
        {{list.title}}
      </div>
      <ul id="title_ul">
        <li class="li_item" v-for="(type,index) in list.type">
          <a class="li_type_name" href="javascript:;" @click="show(index)" :class="{'li_type_name_current':position==index}" >{{type.name}}</a>
        </li>
      </ul>
  </div>
</template>

<script>
  import axios from 'axios'

  export default {
    name: "Title",
    components: {},
    props:{
      list:{
        type:Object,
        default: {}
      }
    },
    data() {
      return {
        position : 0//记录当前点击的按钮位置，默认0
      }
    },
    methods:{
      show(index){
        this.position = index;
      },
    },
  }
</script>

<style scoped>
  @import "../../../assets/css/base.css";

  #title{
    height: 114px;
    box-sizing: border-box;
    padding: 50px 0px 25px 0px;
    font-size: 30px;
    text-align: center;
  }

  #title_ul{
    width: 400px;
    height: 50px;
    display: flex;
    justify-content: space-around;
    margin: auto;
  }

  .li_item{
    font-size: 15px;
    text-align: center;
    font-family: poppin, Tahoma, Arial, 微软雅黑, sans-serif;
  }

  .li_type_name{
    display: inline-block;
    width: 50px;
    height: 22px;
    line-height: 22px;
  }

  .li_type_name_current{
    color: rgb(49,194,124);;
  }
</style>