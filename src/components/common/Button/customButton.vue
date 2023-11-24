<template>
  <div class="customButton">
    <slot>

    </slot>
  </div>
</template>

<script>
  export default {
    name: "customButton",
  }
</script>

<style scoped>
  .customButton {
    /*display: inline-block;*/
    width: 100%;
    height: 100%;
    padding: 8px 15px;
    text-align: center;
    cursor: pointer;
    background-color: transparent;
    box-sizing: border-box;

    display: -webkit-box;
    -webkit-box-orient: horizontal;
    -webkit-box-pack: center;
    -webkit-box-align: center;

    display: -moz-box;
    -moz-box-orient: horizontal;
    -moz-box-pack: center;
    -moz-box-align: center;

    display: -o-box;
    -o-box-orient: horizontal;
    -o-box-pack: center;
    -o-box-align: center;

    display: -ms-box;
    -ms-box-orient: horizontal;
    -ms-box-pack: center;
    -ms-box-align: center;

    display: box;
    box-orient: horizontal;
    box-pack: center;
    box-align: center;
  }
</style>