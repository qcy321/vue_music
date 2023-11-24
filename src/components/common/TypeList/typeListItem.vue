<template>
  <div class="s_sin_list">
    <slot>
      <a class="s_win_but s_sin_a" :class="{'s_sin_a_current':current===-1}"
         @click="isCurrent(-1,null)">{{item.title}}</a>
      <a class="s_sin_a" v-for="(li,index) in item.type" @click="isCurrent(index,li.typeId)"
         :class="{'s_sin_a_current':current===index}">{{li.name}}</a>
    </slot>
  </div>
</template>

<script>
  export default {
    name: "typeListItem",
    props: {
      item: {
        type: Object,
        default() {
          return []
        }
      }
    },
    data() {
      return {
        current: -1
      }
    },
    methods: {
      isCurrent(index,id) {
        this.current = index
        this.$emit("getData",id)//获取数据
        this.$emit("getTotal",id)//获取总数
      },
    }
  }
</script>

<style>
  .s_win_but {
    display: inline-block;
    padding-top: 2px;
    padding-bottom: 2px;
    border-radius: 2px;
    margin-right: 30px;
  }

  .s_sin_a {
    display: inline-block;
    padding-left: 5px;
    padding-right: 5px;
    margin: 10px;
  }

  .s_sin_a_current {
    background-color: rgb(49, 194, 124);
    color: white;
  }

  .s_sin_a_current:hover {
    background-color: rgb(49, 194, 124);
    color: white;
  }
</style>