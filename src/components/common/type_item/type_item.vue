<template>
  <div id="type_win">
    <div id="type_bar">
      <div id="music_type">
        <ul class="music_type_ul">
          <item :item="item" v-for="item in items"/>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
  import Item from "./item";
  export default {
    name: "type_item",
    components: {Item},
    props:{
      items:{
        type:Array,
        default:[]
      }
    },
    data(){
      return {
      }
    }
  }
</script>

<style>
  #type_win {
    background-color: white;
    /*box-shadow: 0px 0px 5px 0px rgba(222, 222, 222, .8);*/
  }

  #type_bar {
    width: 1200px;
    margin: auto;
  }

  #music_type {
    box-sizing: border-box;
    padding: 0 200px;
    height: 51px;
    line-height: 51px;
    font-size: 15px;
    border-top: 1px solid #f2f2f2;
  }

  .music_type_ul {
    display: flex;
    justify-content: space-around;
  }

</style>