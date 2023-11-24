<template>
  <div class="s_sin_tag">
    <slot>
      <type-list-item v-for="item in items" :item="item" @getData="getData" @getTotal="getTotal">
      </type-list-item>
    </slot>
  </div>
</template>

<script>
  import TypeListItem from "./typeListItem";

  export default {
    name: "typeList",
    components: {TypeListItem},
    props: {
      items: {
        type: Array,
        default() {
          return [
            /*{title: "热门", list: new Array(26).fill('').map((item, index) => String.fromCharCode(index + 65))},*/
            {title: "全部", list: ["内地", "港台", "欧美", "日本", "韩国", "其他"]},
            {title: "全部", list: ["男", "女", "组合"]}
          ]
        }
      }
    },
    methods: {
      getData(id) {
        this.$emit("getData", id)
      },
      getTotal(id) {
        this.$emit("getTotal", id)
      }
    }
  }
</script>

<style>
  .s_sin_tag {
    width: 100%;
    font-size: 14px;
    font-family: poppin, Tahoma, Arial, 微软雅黑, sans-serif;
  }
</style>