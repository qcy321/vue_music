<template>
  <li class="com_item">
    <slot>
      <!--<a class="com_img_a">
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
      </a>-->
    </slot>
  </li>
</template>

<script>
  export default {
    name: "personItem",
    props:{
      item:{
        type:Object,
        default(){
          return undefined
        }
      }
    }
  }
</script>

<style>
  .com_item {
    display: inline-block;
    width: 224px;
    text-align: center;
    margin: 0 8px 40px 8px;
    padding: 15px 0px;
    background-color: white;
  }

  .com_img_a {
    display: block;
  }

  .com_img {
    width: 140px;
    height: 140px;
    margin: auto;
    border-radius: 50%;
  }

  .com_name {
    display: block;
    width: 100%;
    box-sizing: border-box;
    padding: 0 15px;
    text-align: center;
    margin-top: 5px;
  }

  .com_p {
    color: #999;
    margin: 5px 0;
  }

  .com_but {
    display: inline-block;
    width: 120px;
    height: 38px;
    line-height: 38px;
    border: 1px solid grey;
    border-radius: 3px;
    margin-top: 5px;

  }
</style>