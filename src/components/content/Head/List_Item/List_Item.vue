<template>
  <li class="list_item">
    <a class="a_list" :class="{'a_list_current':isActive()}" href="javascript:;" @click="show()">{{item.name}}</a>
  </li>
</template>

<script>
  export default {
    name: "List_Item",
    props: {
      item: {
        type: Object,
        default: {}
      },
    },
    data() {
      return {}
    },
    methods: {
      isActive() {
        return this.$route.path.indexOf("/" + this.item.path) !== -1;
      },
      show() {
        this.$router.replace("/Index/"+this.item.path+this.item.default)
      }
    }
  }
</script>

<style>
  .list_item {
    float: left;
  }

  .a_list {
    display: block;
    height: 90px;
    line-height: 90px;
    font-size: 18px;
    padding: 0px 20px;
    text-align: center;
    color: black;
  }

  .a_list_current, .a_list_current:hover {
    background-color: rgb(49, 194, 124);
    color: white;
  }
</style>