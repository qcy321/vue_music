<template>
  <li class="type_item">
    <a class="type_name" :class="{'type_name_current':isActive}" href="javascript:;" @click="show()">{{item.name}}</a>
  </li>
</template>

<script>
  export default {
    name: "item",
    props: {
      item: {
        type: Object,
        default: {}
      },
    },
    data() {
      return {}
    },
    computed: {
      isActive() {
        let path = this.$route.path
        let index = path.lastIndexOf("/" + this.item.path)
        let position = path.length - (this.item.path.length + 1)
        return index == position;
      }
    },
    methods: {
      show() {
        this.$router.replace("/Index/Songs/" + this.item.path)
      }
    }
  }
</script>

<style>
  .type_item {
    float: left;
    text-align: center;
  }

  .type_name {
    display: inline-block;
    line-height: 51px;
  }

  .type_name_current {
    color: rgb(49, 194, 124);
  }
</style>