<template>
  <div id="com_list">
    <ul class="com_list_ul">
      <slot>
        <PersonItem :item="item" v-for="item in items">
          <a class="com_img_a">
            <img class="com_img" src="http://y.gtimg.cn/music/photo_new/T001R150x150M000000CK5xN3yZDJt_1.jpg"/>
          </a>
          <a class="com_name">
            许嵩
          </a>
          <p class="com_p">
            20人关注
          </p>
          <a class="com_but">
            <i>√</i>
            关注
          </a>
        </PersonItem>
      </slot>
    </ul>
  </div>
</template>

<script>
  import PersonItem from "./personItem";

  export default {
    name: "personList",
    components: {PersonItem},
    props:{
      items:{
        type:Array,
        default(){
          return []
        }
      }
    }
  }
</script>

<style>
  .com_list_ul {
    width: 100%;
  }
</style>