<template>
  <li class="com_ul_item" :class="{'com_ul_item_current':isActive}"
      :style="[{height:height+'px'},{lineHeight:height+'px'}]" @click="show">
    <slot>
      <span class="item_span">{{item.name}}</span>
      <span class="item_span">1</span>
    </slot>
  </li>
</template>

<script>
  export default {
    name: "ListItem",
    props: {
      item: {
        type: Object,
        default() {
          return undefined
        }
      },
      height: {
        type: Number,
        default() {
          return 56
        }
      }
    },
    computed: {
      isActive() {
        return this.$route.path.indexOf("/" + this.item.path) !== -1;
      }
    },
    methods: {
      show() {
        this.$router.history.replace(this.item.toPath)
      }
    }
  }
</script>

<style>
  .com_ul_item {
    float: left;
    box-sizing: border-box;
    padding-right: 40px;
    font-size: 16px;
    cursor: pointer;
  }

  .com_ul_item:hover {
    color: rgb(49, 194, 124)
  }

  .com_ul_item_current {
    color: rgb(49, 194, 124)
  }

  .item_span {
    margin-right: 3px;
  }
</style>