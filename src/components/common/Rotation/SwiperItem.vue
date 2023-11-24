<template>
  <div class="item" :class="{item_clone:clone}">
    <slot>
      <!--插入向展示的标签-->
    </slot>
  </div>
</template>

<script>
  export default {
    name: "RotDiagramItem",
    props: {
      clone: {
        type: Boolean,
        default: () => false
      }
    },
  }
</script>

<style>
  .item {
    width: 100%;
    height: 100%;
    cursor: pointer;
    list-style-type: none;
    position: absolute;
    border-radius: 3px;
    text-align: center;
  }
  img {
    width: 100%;
    height: 100%;
  }
</style>